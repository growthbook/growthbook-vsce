import * as vscode from "vscode";
import * as Fs from "fs";

/**
 * Get the root of the directory opened in VSCode.
 * Ref: https://code.visualstudio.com/api/extension-guides/tree-view#registering-the-treedataprovider
 */
export const getWorkspaceRootPath = (): string | undefined =>
  vscode.workspace.workspaceFolders &&
  vscode.workspace.workspaceFolders.length > 0
    ? vscode.workspace.workspaceFolders[0].uri.fsPath
    : undefined;

/**
 * Find out if something exists.
 * Recommended to be used with {@link getWorkspaceRootPath}
 * @param path
 * @returns
 */
export const doesPathExist = (path: string): boolean => {
  try {
    Fs.accessSync(path);
  } catch (err) {
    return false;
  }
  return true;
};
