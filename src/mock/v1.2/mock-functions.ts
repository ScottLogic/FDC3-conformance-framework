import { DesktopAgent } from "fdc3_1_2/dist/api/DesktopAgent";
import constants from "../../constants";
import { AppControlContext } from "../../test/common/channel-control";

declare let fdc3 : DesktopAgent

export const onFdc3Ready = () =>
  new Promise((resolve) => {
    if (window.fdc3) {
      resolve(undefined);
    } else {
      window.addEventListener("fdc3Ready", () => resolve(undefined));
    }
  });

export const closeWindowOnCompletion = async () => {
  console.log("Setting up closeWindow listener on app-control channel");
  const appControlChannel = await fdc3.getOrCreateChannel(constants.ControlChannel);
  appControlChannel.addContextListener("closeWindow", async (context : AppControlContext) => {
    //notify app A that window was closed
    appControlChannel.broadcast({
      type: "windowClosed",
      testId: context.testId,
    } as AppControlContext);
    setTimeout(() => {
      //yield to make sure the broadcast gets out before we close
      window.close();
      return;
    }, 5);
  });
};

export const sendContextToTests = async(context) =>{
  console.log("Sending context to app-control channel: ", context);
  const appControlChannel = await fdc3.getOrCreateChannel(
    constants.ControlChannel
  );
  appControlChannel.broadcast(context);
}
