import * as vscode from "vscode";
import { Disposable, Uri } from "vscode";
import { ICommand } from "./ICommand";
import {
  getGrowthBookConfig,
  getWorkspaceRootPath,
} from "../utils/vscode-utils";
import { FeatureListTreeItem } from "../features/FeatureListTreeDataProvider";

export class EditFeatureCommand implements ICommand {
  register(): Disposable {
    return vscode.commands.registerCommand(
      "growthbook.editFeature",
      (treeItem: FeatureListTreeItem) => {
        const rootPath = getWorkspaceRootPath();
        if (!rootPath) {
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
        const url = `${config.appHost}/features/${feature.id}`;
        const uri = Uri.parse(url);

        vscode.env.openExternal(uri);
      }
    );
  }
}
