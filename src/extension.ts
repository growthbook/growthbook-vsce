import * as vscode from "vscode";
import { ExtensionInitialization } from "./services/ExtensionInitialization";
import {
  onExtensionError,
  onExtensionWarning,
} from "./utils/error-messaging/error-messaging-utils";
import { validateConfig } from "./utils/growthbook-utils/growthbook-utils";
import {
  doesPathExist,
  getGrowthBookConfig,
  getWorkspaceRootPath,
} from "./utils/vscode-utils";

let extensionInitializationService: ExtensionInitialization | null = null;

export async function activate(context: vscode.ExtensionContext) {
  const rootPath = getWorkspaceRootPath();
  if (!rootPath) return;

  const configFileExists = doesPathExist(`${rootPath}/.growthbook.json`);
  const config = getGrowthBookConfig(rootPath);
  if (!config) {
    if (configFileExists) {
      onExtensionError(`GrowthBook config cannot be read`);
      return;
    }
    return;
  }

  const { isValid, errors } = validateConfig(config);
  if (!isValid) {
    console.error("Invalid GrowthBook configuration", errors);
    onExtensionWarning(`GrowthBook config missing: ${errors.join(", ")}`);
    return;
  }

  extensionInitializationService = ExtensionInitialization.getInstance(
    context,
    config,
    (s) => {
      onExtensionError(s);
    }
  );

  extensionInitializationService?.activate().catch((e) => {
    onExtensionError(e);
  });
}

export function deactivate() {
  extensionInitializationService?.deactivate();
}
