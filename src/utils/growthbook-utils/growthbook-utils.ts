import { GrowthBookConfig } from "../vscode-utils";

type ConfigValidation = {
  isValid: boolean;
  errors: string[];
};

export const validateConfig = (config: GrowthBookConfig): ConfigValidation => {
  const requiredConfig: (keyof GrowthBookConfig)[] = [
    "appHost",
    "featuresHost",
    "featuresKey",
  ];
  const errors: string[] = requiredConfig.filter((k) => !config[k]);

  if (errors.length) {
    return {
      isValid: false,
      errors,
    };
  }

  return {
    isValid: true,
    errors: [],
  };
};
