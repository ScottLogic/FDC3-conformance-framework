import { Listener } from "fdc3_2_0";
import { assert, expect } from "chai";
import { DesktopAgent } from "fdc3_2_0/dist/api/DesktopAgent";
import { APIDocumentation2_0 } from "../apiDocuments-2.0";
import { basicCL1 } from "../../common/basic/fdc3.basic";

declare let fdc3: DesktopAgent;
const documentation =
  "\r\nDocumentation: " + APIDocumentation2_0.addContextListener + "\r\nCause";

export default () =>
  describe("fdc3.addContextListener", () => {
    let listener: Listener;

    afterEach(() => {
      if (listener !== undefined) {
        listener.unsubscribe();
      }
    });

    basicCL1(fdc3, documentation, listener);

    it("(2.0-BasicCL1) Method is callable", async () => {
      const contextType = "fdc3.contact";
      try {
        listener = await fdc3.addContextListener(contextType, (info: any) => {
          console.log(
            `Context listener of type ${contextType} triggered with result ${info}`
          );
        });
        assert.isTrue(listener && typeof listener === "object", documentation);
        expect(typeof listener.unsubscribe, "the listener did not contain an unsubscribe function" + documentation).to.be.equals("function");
      } catch (ex) {
        assert.fail(documentation + (ex.message ?? ex));
      }
    });

    it("(2.0-BasicCL2) Returns listener object", async () => {
      try {
        listener = await fdc3.addContextListener(null, () => {});
        assert.isTrue(listener && typeof listener === "object", documentation);
        expect(typeof listener.unsubscribe, documentation).to.be.equals(
          "function"
        );
      } catch (ex) {
        assert.fail(documentation + (ex.message ?? ex));
      }
    });
  });
