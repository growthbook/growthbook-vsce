import * as Path from 'path';
import * as Fs from 'fs';
import { CancellationToken, Event, ExtensionContext, ProviderResult, TreeDataProvider, TreeItem, TreeItemCollapsibleState } from "vscode";
import { FeatureDefinition } from "./types";

/**
 * This class helps populate the tree view
 */
export class FeatureListTreeDataProvider implements TreeDataProvider<FeatureListTreeItem> {
  constructor(
    private context: ExtensionContext,
    private features: FeatureDefinition[]
  ) {
  }

  onDidChangeTreeData?: Event<void | FeatureListTreeItem | FeatureListTreeItem[] | null | undefined> | undefined;

  getTreeItem(element: FeatureListTreeItem): TreeItem | Thenable<TreeItem> {
    console.log('returning element', element);
    return element;
  }
  getChildren(element?: FeatureListTreeItem | undefined): ProviderResult<FeatureListTreeItem[]> {
    const treeItems = this.features
      .map((feature) => (
        new FeatureListTreeItem(feature.id, feature, TreeItemCollapsibleState.None)
      ));

    return Promise.resolve(treeItems);
  }
  // getParent?(element: FeatureListTreeItem): ProviderResult<FeatureListTreeItem> {
  //   throw new Error("Method not implemented.");
  // }
  // resolveTreeItem?(item: TreeItem, element: FeatureListTreeItem, token: CancellationToken): ProviderResult<TreeItem> {
  //   throw new Error("Method not implemented.");
  // }

  private pathExists(p: string): boolean {
    try {
      Fs.accessSync(p);
    } catch (err) {
      return false;
    }
    return true;
  }
}

class FeatureListTreeItem extends TreeItem {
  constructor(
    public readonly label: string,
    private feature: FeatureDefinition,
    public readonly collapsibleState: TreeItemCollapsibleState
  ) {
    super(label, collapsibleState);
    this.tooltip = this.feature.description || '';
    this.description = this.feature.valueType;
  }

  iconPath = {
    light: Path.join(__filename, '..', '..', '..', 'resources', 'ic_flag.svg'),
    dark: Path.join(__filename, '..', '..', '..', 'resources', 'ic_flag.svg')
  };
}