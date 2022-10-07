import * as vscode from "vscode";
import { ApiClient } from "../api/api-client";
import { RefreshGrowthBookCommand } from "../commands/refresh-growthbook-command";
import {
  FeatureListTreeDataProvider,
  FeatureListTreeItem,
} from "../features/FeatureListTreeDataProvider";
import { FeatureDefinition } from "../features/types";
import {
  getGrowthBookConfig,
  getWorkspaceRootPath,
  GrowthBookConfig,
} from "../utils/vscode-utils";

interface IExtensionInitialization {
  activate(): Promise<void>;
  deactivate(): Promise<void>;
}

let extensionInitializationService: ExtensionInitialization | null = null;

/**
 * Use the getInstance() method of the class.
 * If you do not provide a valid config, your instance will be null.
 */
export class ExtensionInitialization implements IExtensionInitialization {
  private apiClient: ApiClient;
  private features: FeatureDefinition[] = [];
  private treeView: vscode.TreeView<FeatureListTreeItem> | null = null;

  private constructor(
    private context: vscode.ExtensionContext,
    private growthBookConfig: GrowthBookConfig,
    private onError: (message: string) => void
  ) {
    const { featuresHost, featuresKey, appHost } = this.growthBookConfig;

    /* eslint-disable @typescript-eslint/no-non-null-assertion -- handled in getInstance() */
    this.apiClient = new ApiClient({
      appHost: appHost!,
      featuresHost: featuresHost!,
      featuresKey: featuresKey!,
    });
    /* eslint-enable @typescript-eslint/no-non-null-assertion */
  }

  static getInstance(
    context: vscode.ExtensionContext,
    growthBookConfig: GrowthBookConfig | null = getGrowthBookConfig(
      getWorkspaceRootPath() || ""
    ),
    onError: (message: string) => void
  ): ExtensionInitialization | null {
    if (!growthBookConfig) {
      console.error("ImplementationError: missing GrowthBook config");
      return null;
    }

    const { featuresHost, featuresKey, appHost } = growthBookConfig;
    if (!featuresHost || !featuresKey || !appHost) {
      console.error(
        "ImplementationError: all GrowthBook config values are required for initialization"
      );
      return null;
    }

    extensionInitializationService = new ExtensionInitialization(
      context,
      growthBookConfig,
      onError
    );

    return extensionInitializationService;
  }

  /**
   * Implement in the extension's activate() lifecycle hook
   */
  async activate(): Promise<void> {
    try {
      // Initialize the commands
      this.context.subscriptions.push(
        new RefreshGrowthBookCommand(this.refreshFeatures.bind(this)).register()
      );

      // Initialize the tree view
      this.features = await this.apiClient.getFeatures();
      this.initializeTreeView();

      return Promise.resolve();
    } catch (e) {
      return Promise.reject("GrowthBook: Cannot fetch features");
    }
  }

  /**
   * Implement in the extension's deactivate() lifecycle hook
   */
  async deactivate(): Promise<void> {
    this.treeView?.dispose();
    return Promise.resolve();
  }

  async refreshFeatures(): Promise<void> {
    this.features = [];
    this.initializeTreeView();

    try {
      this.features = await this.apiClient.getFeatures();
      this.initializeTreeView();
      return Promise.resolve();
    } catch (e) {
      this.onError("GrowthBook: Cannot refresh features");
    }
  }

  /**
   * Populate the left side tree view with the features data
   */
  private initializeTreeView(): void {
    vscode.window.registerTreeDataProvider(
      "featuresList",
      new FeatureListTreeDataProvider(this.context, this.features)
    );

    this.treeView = vscode.window.createTreeView("featuresList", {
      treeDataProvider: new FeatureListTreeDataProvider(
        this.context,
        this.features
      ),
    });

    this.context.subscriptions.push(this.treeView);
  }
}
