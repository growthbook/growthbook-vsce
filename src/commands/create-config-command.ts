import * as vscode from "vscode";
import { Disposable } from "vscode";
import { onExtensionError } from "../utils/error-messaging/error-messaging-utils";
import {
  doesPathExist,
  getWorkspaceRootPath,
  GrowthBookConfig,
} from "../utils/vscode-utils";
import { ICommand } from "./ICommand";

export class CreateGrowthBookConfigCommand implements ICommand {
  register(): Disposable {
    return vscode.commands.registerCommand("growthbook.createConfig", () => {
      const rootPath = getWorkspaceRootPath();

      if (!rootPath) {
        vscode.window.showErrorMessage(
          "Must be in a folder in order to create a GrowthBook configuration file"
        );
        return;
      }

      const configPath = `${rootPath}/.growthbook.json`;

      const configFileExists = doesPathExist(configPath);
      if (configFileExists) {
        vscode.window.showWarningMessage(
          "A .growthbook.json file already exists in the project root. Skipping."
        );
        return;
      }

      try {
        const defaultConfig: GrowthBookConfig = {
          featuresEndpoint: "",
          appHost: "https://app.growthbook.io",
        };

        const buffer = Buffer.from(JSON.stringify(defaultConfig, null, 2));

        const configUri = vscode.Uri.parse(configPath);

        vscode.workspace.fs.writeFile(configUri, buffer);
      } catch (e) {
        onExtensionError("Unable to write configuration file");
      }
    });
  }
}
