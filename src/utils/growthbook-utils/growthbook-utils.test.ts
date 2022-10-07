import { validateConfig } from "./growthbook-utils";

describe("growthbook-utils", () => {
  it("validates the config", () => {
    expect(
      validateConfig({
        appHost: "http://localhost:3100",
        featuresHost: "http://localhost:3100",
        featuresKey: "key_dev_abc123",
      })
    ).toEqual({ isValid: true, errors: [] });
    expect(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      validateConfig({
        featuresHost: "http://localhost:3100",
        featuresKey: "key_dev_abc123",
      })
    ).toEqual({ isValid: false, errors: ["appHost"] });
    expect(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      validateConfig({
        appHost: "http://localhost:3100",
        featuresKey: "key_dev_abc123",
      })
    ).toEqual({ isValid: false, errors: ["featuresHost"] });
    expect(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      validateConfig({
        appHost: "http://localhost:3100",
      })
    ).toEqual({ isValid: false, errors: ["featuresHost", "featuresKey"] });
  });
});
