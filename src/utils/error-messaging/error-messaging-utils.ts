import * as vscode from "vscode";

// TODO: We may need to refactor this to take an error monitor

/**
 * Handle the errors.
 * We can show an error to the user as well as add any error logging here
 * @param errorMessage
 */
export const onExtensionError = (errorMessage: string) => {
  vscode.window.showErrorMessage(errorMessage);
};

/**
 * Handle warning messages.
 * We can show an error to the user as well as add any error logging here
 * @param warningMessage
 */
export const onExtensionWarning = (warningMessage: string) => {
  vscode.window.showWarningMessage(warningMessage);
};
