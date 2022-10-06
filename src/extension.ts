// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { ApiClient } from "./api/api-client";
import { FeatureListTreeDataProvider } from "./features/FeatureListTreeDataProvider";
import { getWorkspaceRootPath } from "./utils/vscode-utils";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
  // Register the tree view
  const rootPath = getWorkspaceRootPath();

  if (rootPath) {
    // TODO: Read config from local file
    const apiClient = new ApiClient({
      appHost: "http://localhost:3100",
      featuresHost: "http://localhost:3100",
      apiKey: "key_prod_b118a91f4800c2c6",
    });
    const features = await apiClient.getFeatures();

    vscode.window.registerTreeDataProvider(
      "featuresList",
      new FeatureListTreeDataProvider(context, features)
    );

    const treeView = vscode.window.createTreeView("featuresList", {
      treeDataProvider: new FeatureListTreeDataProvider(context, features),
    });

    context.subscriptions.push(treeView);
  }

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log("Congratulations, your extension 'growthbook' is now active!");

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand(
    "growthbook.helloWorld",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage("Hello World from growthbook!");
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
