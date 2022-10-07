import * as vscode from "vscode";
import { ExtensionManagement } from "./services/ExtensionInitialization";
import {
  onExtensionError,
  onExtensionWarning,
} from "./utils/error-messaging/error-messaging-utils";

let extensionInitializationService: ExtensionManagement | null = null;

export async function activate(context: vscode.ExtensionContext) {
  extensionInitializationService = ExtensionManagement.getInstance(
    context,
    (s) => {
      onExtensionError(s);
    },
    (s) => {
      onExtensionWarning(s);
    }
  );

  extensionInitializationService?.activate().catch((e) => {
    onExtensionError(e);
  });
}

export function deactivate() {
  extensionInitializationService?.deactivate();
}
