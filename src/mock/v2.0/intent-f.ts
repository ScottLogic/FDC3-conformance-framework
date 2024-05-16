import { closeWindowOnCompletion, onFdc3Ready, sendContextToTests, validateContext } from "./mock-functions";
import { DesktopAgent } from "fdc3_2_0";
import { wait } from "../../utils";
import { ContextType, ControlContextType, Intent } from "../../test/v2.0/support/intent-support-2.0";
import constants from "../../constants";
declare let fdc3: DesktopAgent;

//used in '2.0-RaiseIntentPrivateChannelResult'
onFdc3Ready().then(async () => {
  await closeWindowOnCompletion();
  const { appMetadata } = await fdc3.getInfo();

  fdc3.addIntentListener(Intent.sharedTestingIntent2, async (context) => {
    validateContext(context.type, ContextType.testContextY);
    const privateChannel = await fdc3.createPrivateChannel();

    //set-up alert to test framework that the task was completed after a short delay
    setTimeout(async () => {
      await sendContextToTests({ type: ControlContextType.sharedTestingIntent2ResultSent, id: { key: "uniqueId" }, instanceId: appMetadata.instanceId });
    }, constants.ShortWait)
    
    return privateChannel;
  });
});
