import * as vscode from "vscode";
import { ApiClient } from "../api/api-client";
import { CopyFeatureKeyCommand } from "../commands/copy-feature-key-command";
import { CreateGrowthBookConfigCommand } from "../commands/create-config-command";
import { EditFeatureCommand } from "../commands/edit-feature-command";
import { RefreshGrowthBookCommand } from "../commands/refresh-growthbook-command";
import {
  FeatureListTreeDataProvider,
  FeatureListTreeItem,
} from "../features/FeatureListTreeDataProvider";
import { FeatureDefinition } from "../features/types";
import { validateConfig } from "../utils/growthbook-utils/growthbook-utils";
import {
  doesPathExist,
  getGrowthBookConfig,
  getWorkspaceRootPath,
  GrowthBookConfig,
} from "../utils/vscode-utils";

interface IExtensionManagement {
  activate(): Promise<void>;
  deactivate(): Promise<void>;
}

let extensionManager: ExtensionManagement | null = null;

/**
 * Use the getInstance() method of the class.
 * If you do not provide a valid config, your instance will be null.
 */
export class ExtensionManagement implements IExtensionManagement {
  private growthBookConfig: GrowthBookConfig | null = null;
  private apiClient: ApiClient | null = null;
  private features: FeatureDefinition[] = [];
  private treeView: vscode.TreeView<FeatureListTreeItem> | null = null;

  private constructor(
    private context: vscode.ExtensionContext,
    private onError: (message: string) => void,
    private onWarning: (message: string) => void
  ) {
    this.initializeGrowthBookConfig();
  }

  /**
   * Retrieves the config from the workspace's .growthbook.json config file.
   * Performs validation and warns the user if there are any issues with the config if it has one.
   * @returns
   */
  private initializeGrowthBookConfig(): void {
    this.growthBookConfig = null;
    this.apiClient = null;

    const rootPath = getWorkspaceRootPath();
    const configFileExists = doesPathExist(`${rootPath}/.growthbook.json`);

    // User is not in a workspace
    if (!rootPath) return;

    // User has not defined a .growthbook.json
    if (!configFileExists) return;

    // User has defined a .growthbook.json file

    this.growthBookConfig = getGrowthBookConfig(rootPath);

    // The config file cannot be parsed
    if (!this.growthBookConfig) {
      this.onError(`GrowthBook config cannot be read`);
      return;
    }

    // Perform config validation. If there are any missing fields, the user will see a warning.
    const isValid = this.validateConfigForUser();
    if (!isValid) {
      return;
    }

    // The .growthbook.json config file is considered to be valid at this point and we can safely initialize the ApiClient
    const { featuresEndpoint, appHost } = this.growthBookConfig;

    /* eslint-disable @typescript-eslint/no-non-null-assertion -- handled by validateConfig() */
    this.apiClient = new ApiClient({
      appHost: appHost!,
      featuresEndpoint: featuresEndpoint!,
    });
    /* eslint-enable @typescript-eslint/no-non-null-assertion */
  }

  static getInstance(
    context: vscode.ExtensionContext,
    onError: (message: string) => void,
    onWarning: (message: string) => void
  ): ExtensionManagement {
    if (!extensionManager) {
      extensionManager = new ExtensionManagement(context, onError, onWarning);
    }

    return extensionManager;
  }

  /**
   * Implement in the extension's activate() lifecycle hook
   */
  async activate(): Promise<void> {
    try {
      // Initialize the commands
      this.context.subscriptions.push(
        new RefreshGrowthBookCommand(
          this.refreshFeatures.bind(this)
        ).register(),
        new CreateGrowthBookConfigCommand().register(),
        new EditFeatureCommand().register(),
        new CopyFeatureKeyCommand().register()
      );

      // Initialize the tree view
      if (this.apiClient) {
        this.features = await this.apiClient.getFeatures();
        this.initializeTreeView();
      }

      return Promise.resolve();
    } catch (e) {
      console.error("❗️ Extension activation error", e);
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
    // Re-initialize the config. This will let the user know if the config is invalid.
    this.initializeGrowthBookConfig();

    // Clear existing tree
    this.features = [];
    this.initializeTreeView();

    // Do not proceed if the config is invalid
    if (!this.isConfigValid()) {
      this.onError("Invalid GrowthBook config");
      return;
    }

    if (!this.apiClient) {
      // We should not get here. If we have a valid config and no API client, there is an issue.
      this.onError("GrowthBook: Unknown extension error");
      return;
    }

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
      "growthbook.featuresList",
      new FeatureListTreeDataProvider(this.context, this.features)
    );

    this.treeView = vscode.window.createTreeView("growthbook.featuresList", {
      treeDataProvider: new FeatureListTreeDataProvider(
        this.context,
        this.features
      ),
    });

    this.context.subscriptions.push(this.treeView);
  }

  private isConfigValid(): boolean {
    const { isValid } = validateConfig(this.growthBookConfig);
    return isValid;
  }

  /**
   * Will provide user feedback when the config is not valid
   */
  private validateConfigForUser(): boolean {
    const { isValid, errors } = validateConfig(this.growthBookConfig);
    if (!isValid) {
      this.onWarning(`GrowthBook config missing: ${errors.join(", ")}`);
    }

    return isValid;
  }
}
