import { Listener } from "@finos/fdc3";
import { assert, expect } from "chai";
import APIDocumentation from "../apiDocuments";

const documentation =
  "\r\nDocumentation: " + APIDocumentation.addContextListener + "\r\nCause";

export default () =>
  describe("fdc3.addContextListener", () => {
    let listener: Listener;

    afterEach(() => {
      if (listener !== undefined) {
        listener.unsubscribe();
        listener = undefined;
      }
    });

    it("Method is callable", async () => {
      const contextType = "fdc3.contact";
      try {
        listener = await window.fdc3.addContextListener(
          contextType,
          (info: any) => {
            console.log(
              `Context listener of type ${contextType} triggered with result ${info}`
            );
          }
        );
      } catch (ex) {
        assert.fail(documentation + (ex.message ?? ex));
      }
    });

    it("Returns listener object", async () => {
      try {
        listener = await window.fdc3.addContextListener(null, () => {});
        assert.isObject(listener, documentation);
        expect(typeof listener.unsubscribe, documentation).to.be.equals(
          "function"
        );
      } catch (ex) {
        assert.fail(documentation + (ex.message ?? ex));
      }
    });
  });
