import { assert, expect } from "chai";
import { DesktopAgent } from "fdc3_1_2/dist/api/DesktopAgent";

declare let fdc3: DesktopAgent;

function wrapPromise(): {
  promise: Promise<void>;
  resolve: () => void;
  reject: (reason?: any) => void;
} {
  let wrapperResolve;
  let wrapperReject;

  const promise = new Promise<void>((resolve, reject) => {
    wrapperResolve = resolve;
    wrapperReject = reject;
  });

  return { promise, resolve: wrapperResolve, reject: wrapperReject };
}

export default () =>
  describe("fdc3.joinChannel", () => {
    afterEach(async () => {
      await fdc3.leaveCurrentChannel();
    });

    it("(BasicJC1) Can join channel", async () => {
      const channels = await fdc3.getSystemChannels();

      if (channels.length > 0) {
        try {
          await fdc3.joinChannel(channels[0].id);

          const currentChannel = await fdc3.getCurrentChannel();

          expect(currentChannel).to.not.be.null;

        } catch (ex) {
          assert.fail("Error while joining channel: " + (ex.message ?? ex));
        }
      } else {
        assert.fail("No system channels available");
      }

    });

    it("(BasicJC2) Can join the correct system channel", async () => {
      const [channel] = await fdc3.getSystemChannels();

      await fdc3.joinChannel(channel.id);

      const current = await fdc3.getCurrentChannel();

      expect(current.id).to.eql(channel.id);
    })
  });
