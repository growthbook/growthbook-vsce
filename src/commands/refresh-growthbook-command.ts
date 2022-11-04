import * as vscode from "vscode";
import { Disposable } from "vscode";
import { ICommand } from "./ICommand";
import { FeatureListTreeItem } from "../features/FeatureListTreeDataProvider";

export class RefreshGrowthBookCommand implements ICommand {
  constructor(private performRefresh: () => Promise<void>) {}

  register(): Disposable {
    return vscode.commands.registerCommand(
      "growthbook.refreshFeatures",
      (_treeItem: FeatureListTreeItem) => {
        this.performRefresh();
      }
    );
  }
}
