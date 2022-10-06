// TODO: Improve conditions, variations
type FeatureRule = {
  condition: Record<
    string,
    string | Record<string, string | Record<string, string>>
  >;
  variations: boolean[] | string[] | unknown;
  weights: number[];
  key: string;
  force: boolean;
  coverage: number;
  hashAttribute: string;
};

type FeatureProperties = {
  defaultValue: boolean | string;
  rules: FeatureRule[];
};

export type FeaturesResponse = {
  status: number;
  features: Record<string, FeatureProperties>;
};
