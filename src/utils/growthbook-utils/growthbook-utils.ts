import { GrowthBookConfig } from "../vscode-utils";

type ConfigValidation = {
  isValid: boolean;
  errors: string[];
};

/**
 * Validates the provided config. If any of the required keys are missing, it will not be valid and will return a list of errors.
 * Configs are loaded from the file system and are JSON parsed, so it is possible at runtime the config will not be valid.
 * @param config
 * @returns
 */
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
