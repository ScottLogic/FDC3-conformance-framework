import { assert } from "chai";
import { wait } from "../../utils";
import {
  JOIN_AND_BROADCAST,
  JOIN_AND_BROADCAST_TWICE,
} from "../common/channel-control";
import { ChannelControl } from "./channel-control";

export function createUserChannelTests(
  cc: ChannelControl<any, any>,
  documentation: string,
  prefix: string
): Mocha.Suite {
  const channelName = prefix === "" ? "System channels" : "User channels";
  return describe(channelName, () => {
    beforeEach(cc.channelCleanUp);

    afterEach(async function afterEach() {
      await cc.closeChannelsAppWindow(this.currentTest.title);
      await cc.leaveChannel();
    });

    const scTestId1 =
      "(" +
      prefix +
      "UCBasicUsage1) Should receive context when adding a listener then joining a user channel before app B broadcasts context to the same channel";
    it(scTestId1, async () => {
      const errorMessage = `\r\nSteps to reproduce:\r\n- Add fdc3.instrument context listener to app A\r\n- App A joins channel 1\r\n- App B joins channel 1\r\n- App B broadcasts fdc3.instrument context${documentation}`;

      const resolveExecutionCompleteListener =
        cc.initCompleteListener(scTestId1);
      let receivedContext = false;
      await cc.setupAndValidateListener1(
        null,
        null,
        "fdc3.instrument",
        errorMessage,
        () => (receivedContext = true)
      );
      const channel = await cc.retrieveAndJoinChannel(1);
      await cc.openChannelApp(scTestId1, channel.id, JOIN_AND_BROADCAST);
      await resolveExecutionCompleteListener;

      if (!receivedContext) {
        assert.fail("No context received" + errorMessage);
      }
    });

    const scTestId2 =
      "(" +
      prefix +
      "UCBasicUsage2) Should receive context when joining a user channel then adding a context listener before app B broadcasts context to the same channel";
    it(scTestId2, async () => {
      const errorMessage = `\r\nSteps to reproduce:\r\n- App A joins channel 1\r\n- Add listener of type fdc3.instrument to App A\r\n- App B joins channel 1\r\n- App B broadcasts fdc3.instrument context${documentation}`;

      const resolveExecutionCompleteListener =
        cc.initCompleteListener(scTestId2);
      const channel = await cc.retrieveAndJoinChannel(1);
      let receivedContext = false;
      await cc.setupAndValidateListener1(
        null,
        null,
        "fdc3.instrument",
        errorMessage,
        () => (receivedContext = true)
      );
      await cc.openChannelApp(scTestId2, channel.id, JOIN_AND_BROADCAST);
      await resolveExecutionCompleteListener;

      if (!receivedContext) {
        assert.fail(`No context received!\n${errorMessage}`);
      }
    });

    const scTestId3 =
      "(" +
      prefix +
      "UCBasicUsage3) Should receive context when app B joins then broadcasts context to a user channel before A joins and listens on the same channel";
    it(scTestId3, async () => {
      const errorMessage = `\r\nSteps to reproduce:\r\n- App B joins channel 1\r\n- App B broadcasts fdc3.instrument context\r\n- App A joins channel 1\r\n- App A adds fdc3.instrument context listener${documentation}`;

      const resolveExecutionCompleteListener =
        cc.initCompleteListener(scTestId3);
      const channel = await cc.getUserChannel(1);
      await cc.openChannelApp(scTestId3, channel.id, JOIN_AND_BROADCAST);
      await cc.joinChannel(channel);
      let receivedContext = false;
      await cc.setupAndValidateListener1(
        null,
        null,
        "fdc3.instrument",
        errorMessage,
        () => (receivedContext = true)
      );
      await resolveExecutionCompleteListener;

      if (!receivedContext) {
        assert.fail(`No context received!\n${errorMessage}`);
      }
    });

    const scTestId4 =
      "(" +
      prefix +
      "UCFilteredContext1) Should receive context when app A joins a user channel before adding a listener and app B broadcasts the listened type to the same user channel";
    it(scTestId4, async () => {
      const errorMessage = `\r\nSteps to reproduce:\r\n- App A adds fdc3.instrument context listener\r\n- App A joins channel 1\r\n- App B joins channel 1\r\n- App B broadcasts context of type fdc3.instrument${documentation}`;

      const resolveExecutionCompleteListener =
        cc.initCompleteListener(scTestId4);
      let receivedContext = false;
      await cc.setupAndValidateListener1(
        null,
        "fdc3.instrument",
        "fdc3.instrument",
        errorMessage,
        () => (receivedContext = true)
      );
      const channel = await cc.retrieveAndJoinChannel(1);
      await cc.openChannelApp(scTestId4, channel.id, JOIN_AND_BROADCAST);
      await resolveExecutionCompleteListener;

      if (!receivedContext) {
        assert.fail(`No context received!\n${errorMessage}`);
      }
    });

    const scTestId5 =
      "(" +
      prefix +
      "UCFilteredContext2) Should receive multiple contexts when app B broadcasts the listened types to the same user channel";
    it(scTestId5, async () => {
      const errorMessage = `\r\nSteps to reproduce:\r\n- App A adds fdc3.instrument and fdc3.contact context listener\r\n- App A joins channel 1\r\n- App B joins channel 1\r\n- App B broadcasts both context types${documentation}`;

      const resolveExecutionCompleteListener =
        cc.initCompleteListener(scTestId5);
      let contextTypes: string[] = [];
      let receivedContext = false;

      const contextId = cc.getRandomId();

      function checkIfBothContextsReceived() {
        if (contextTypes.length === 2) {
          console.warn(JSON.stringify(contextTypes));
          if (
            !contextTypes.includes(`fdc3.contact.${contextId}`) ||
            !contextTypes.includes(`fdc3.instrument.${contextId}`)
          ) {
            assert.fail("Incorrect context received", errorMessage);
          } else {
            receivedContext = true;
          }
        }
      }

      await cc.setupAndValidateListener1(
        null,
        `fdc3.instrument.${contextId}`,
        `fdc3.instrument.${contextId}`,
        errorMessage,
        (context) => {
          contextTypes.push(context.type);
          checkIfBothContextsReceived();
        }
      );

      await cc.setupAndValidateListener2(
        null,
        `fdc3.contact.${contextId}`,
        `fdc3.contact.${contextId}`,
        errorMessage,
        (context) => {
          contextTypes.push(context.type);
          checkIfBothContextsReceived();
        }
      );

      const channel = await cc.retrieveAndJoinChannel(1);
      await cc.openChannelApp(
        scTestId5,
        channel.id,
        JOIN_AND_BROADCAST_TWICE,
        undefined,
        true,
        contextId
      );
      await resolveExecutionCompleteListener;

      if (!receivedContext) {
        assert.fail(`At least one context was not received!\n${errorMessage}`);
      }
    });

    const scTestId6 =
      "(" +
      prefix +
      "UCFilteredContext3) Should not receive context when A & B join different user channels and app B broadcasts a listened type";
    it(scTestId6, async () => {
      const errorMessage = `\r\nSteps to reproduce:\r\n- App A adds fdc3.instrument and fdc3.contact context listener\r\n- App A joins channel 2\r\n- App B joins channel 1\r\n- App B broadcasts both context types${documentation}`;

      await cc.setupAndValidateListener1(
        null,
        "fdc3.instrument",
        "unexpected-context",
        errorMessage,
        () => {
          /* noop */
        }
      );
      await cc.setupAndValidateListener2(
        null,
        "fdc3.contact",
        "unexpected-context",
        errorMessage,
        () => {
          /* noop */
        }
      );

      const channels = await cc.getSystemChannels();
      if (channels.length < 1)
        assert.fail("No system channels available for app A");

      await cc.joinChannel(channels[0]);
      await cc.openChannelApp(
        scTestId6,
        channels[1].id,
        JOIN_AND_BROADCAST_TWICE
      );
      await wait();
    });

    const scTestId7 =
      "(" +
      prefix +
      "UCUnsubscribe) Should not receive context when unsubscribing a user channel before app B broadcasts the listened type to that channel";
    it(scTestId7, async () => {
      const errorMessage = `\r\nSteps to reproduce:\r\n- App A adds context listener of type fdc3.instrument\r\n- App A joins channel 1\r\n- App A unsubscribes the listener\r\n- App B joins channel 1\r\n- App B broadcasts context of type fdc3.instrument${documentation}`;

      const resolveExecutionCompleteListener =
        cc.initCompleteListener(scTestId7);
      await cc.setupAndValidateListener1(
        null,
        "fdc3.instrument",
        "unexpected-context",
        errorMessage,
        () => {
          /* noop */
        }
      );
      await cc.setupAndValidateListener2(
        null,
        "fdc3.contact",
        "unexpected-context",
        errorMessage,
        () => {
          /* noop */
        }
      );
      const channel = await cc.retrieveAndJoinChannel(1);
      await cc.unsubscribeListeners();
      await cc.openChannelApp(scTestId7, channel.id, JOIN_AND_BROADCAST);
      await resolveExecutionCompleteListener;
    });

    const scTestId8 =
      "(" +
      prefix +
      "UCFilteredContext4) Should not receive context when joining two different user channels before app B broadcasts the listened type to the first channel that was joined";
    it(scTestId8, async () => {
      const errorMessage = `\r\nSteps to reproduce:\r\n- App A adds context listener of type fdc3.instrument\r\n- App A joins channel 1\r\n- App A joins channel 2\r\n- App B joins channel 1\r\n- App B broadcasts context of type fdc3.instrument${documentation}`;

      const contextId = cc.getRandomId();
      await cc.setupAndValidateListener1(
        null,
        `fdc3.instrument.${contextId}`,
        "unexpected-context",
        errorMessage,
        async () => {
          /* noop */
        }
      );
      await cc.setupAndValidateListener2(
        null,
        `fdc3.contact.${contextId}`,
        "unexpected-context",
        errorMessage,
        () => {
          /* noop */
        }
      );

      const channels = await cc.getSystemChannels();
      if (channels.length < 1) {
        assert.fail("No system channels available for app A");
      }

      await cc.joinChannel(channels[0]);
      await cc.joinChannel(channels[1]);
      await cc.openChannelApp(
        scTestId8,
        channels[0].id,
        JOIN_AND_BROADCAST,
        undefined,
        true,
        contextId
      );
      await wait(3000);
    });
  });
}
