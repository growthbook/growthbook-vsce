import * as vscode from "vscode";
import { Disposable } from "vscode";
import { ICommand } from "./ICommand";
import { FeatureListTreeItem } from "../features/FeatureListTreeDataProvider";
import {
  getGrowthBookConfig,
  getWorkspaceRootPath,
} from "../utils/vscode-utils";

export class CopyFeatureKeyCommand implements ICommand {
  register(): Disposable {
    return vscode.commands.registerCommand(
      "growthbook.copyFeatureKey",
      (treeItem: FeatureListTreeItem) => {
        const rootPath = getWorkspaceRootPath();
        if (!rootPath) {
          vscode.window.showErrorMessage(
            "Must be in a folder in order to create a GrowthBook configuration file"
          );
          return;
        }

        const config = getGrowthBookConfig(rootPath);
        if (!config) {
          vscode.window.showErrorMessage(
            "The .growthbook.json file appears to be misconfigured"
          );
          return;
        }

        const feature = treeItem.getFeature();

        vscode.env.clipboard.writeText(feature.id);
        vscode.window.showInformationMessage(
          `Feature key "${feature.id}" copied to clipboard`
        );
      }
    );
  }
}
