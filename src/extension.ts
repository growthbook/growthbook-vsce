import * as vscode from "vscode";
import { ExtensionInitialization } from "./services/extension-initialization.service";

let extensionInitializationService: ExtensionInitialization | null = null;

export async function activate(context: vscode.ExtensionContext) {
  extensionInitializationService = ExtensionInitialization.getInstance(context);

  extensionInitializationService?.activate();
}

export function deactivate() {
  extensionInitializationService?.deactivate();
}
