import { ResolveError } from "@finos/fdc3";
import { expect } from "chai";

const ExpectedErrorNotThrownError = "Expected error NoAppsFound not thrown";

export default () =>
  describe("fdc3.raiseIntentForContext", async () => {
    it("Method is callable", async () => {
      const context = {
        type: "ThisContextDoesNotExist",
        name: "Name",
        id: {
          ticker: "ticker",
          ISIN: "US0378331005",
          CUSIP: "037833100",
          FIGI: "BBG000B9XRY4",
        },
      };

      try {
        await window.fdc3.raiseIntentForContext(context);
        throw new Error(ExpectedErrorNotThrownError);
      } catch (ex) {
        expect(ex).to.have.property("message", ResolveError.NoAppsFound);
      }
    });
  });
