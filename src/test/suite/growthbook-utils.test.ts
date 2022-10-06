import * as assert from "assert";
import { validateConfig } from "../../utils/growthbook-utils";

suite("Extension Test Suite", () => {
  test("validateConfig", () => {
    assert.deepEqual(
      validateConfig({
        appHost: "http://localhost:3100",
        featuresHost: "http://localhost:3100",
        featuresKey: "key_dev_abc123",
      }),
      { isValid: true, errors: [] }
    );
    assert.deepEqual(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      validateConfig({
        featuresHost: "http://localhost:3100",
        featuresKey: "key_dev_abc123",
      }),
      { isValid: false, errors: ["appHost"] }
    );
    assert.deepEqual(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      validateConfig({
        appHost: "http://localhost:3100",
        featuresKey: "key_dev_abc123",
      }),
      { isValid: false, errors: ["featuresHost"] }
    );
    assert.deepEqual(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      validateConfig({
        appHost: "http://localhost:3100",
      }),
      { isValid: false, errors: ["featuresHost", "featuresKey"] }
    );
  });
});
