import * as Fs from "fs";
import * as Path from "path";
import {
  Event,
  ExtensionContext,
  ProviderResult,
  TreeDataProvider,
  TreeItem,
  TreeItemCollapsibleState,
} from "vscode";
import { FeatureDefinition } from "./types";

/**
 * This class helps populate the tree view
 */
export class FeatureListTreeDataProvider
  implements TreeDataProvider<FeatureListTreeItem>
{
  constructor(
    private context: ExtensionContext,
    private features: FeatureDefinition[]
  ) {}

  onDidChangeTreeData?:
    | Event<
        void | FeatureListTreeItem | FeatureListTreeItem[] | null | undefined
      >
    | undefined;

  getTreeItem(element: FeatureListTreeItem): TreeItem | Thenable<TreeItem> {
    return element;
  }

  // TODO: Do we need this element??
  getChildren(
    element?: FeatureListTreeItem | undefined
  ): ProviderResult<FeatureListTreeItem[]> {
    const treeItems = this.features.map(
      (feature) =>
        new FeatureListTreeItem(
          feature.id,
          feature,
          TreeItemCollapsibleState.None
        )
    );

    return Promise.resolve(treeItems);
  }

  // TODO: Do we need to implement these?
  // getParent?(element: FeatureListTreeItem): ProviderResult<FeatureListTreeItem> {
  //   throw new Error("Method not implemented.");
  // }
  // resolveTreeItem?(item: TreeItem, element: FeatureListTreeItem, token: CancellationToken): ProviderResult<TreeItem> {
  //   throw new Error("Method not implemented.");
  // }
}

class FeatureListTreeItem extends TreeItem {
  constructor(
    public readonly label: string,
    private feature: FeatureDefinition,
    public readonly collapsibleState: TreeItemCollapsibleState
  ) {
    super(label, collapsibleState);
    this.tooltip = this.feature.raw || "";
    this.description = `(default: ${this.feature.defaultValue})`;
  }

  iconPath = {
    light: Path.join(__filename, "..", "..", "..", "resources", "ic_flag.svg"),
    dark: Path.join(__filename, "..", "..", "..", "resources", "ic_flag.svg"),
  };
}
