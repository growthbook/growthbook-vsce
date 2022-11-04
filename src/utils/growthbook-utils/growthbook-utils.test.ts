import { validateConfig } from "./growthbook-utils";

describe("growthbook-utils", () => {
  it("validates the config", () => {
    expect(
      validateConfig({
        appHost: "http://localhost:3100",
        featuresEndpoint:
          "https://cdn.growthbook.io/api/features/key_prod_a1f3c34b105965df",
      })
    ).toEqual({ isValid: true, errors: [] });
    expect(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      validateConfig({
        featuresEndpoint:
          "https://cdn.growthbook.io/api/features/key_prod_a1f3c34b105965df",
      })
    ).toEqual({ isValid: false, errors: ["appHost"] });
    expect(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      validateConfig({
        appHost: "http://localhost:3100",
      })
    ).toEqual({ isValid: false, errors: ["featuresEndpoint"] });
  });
});
