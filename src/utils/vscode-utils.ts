import * as vscode from "vscode";
import * as Fs from "fs";

export const getWorkspaceRootPath = (): string | undefined =>
  vscode.workspace.workspaceFolders &&
  vscode.workspace.workspaceFolders.length > 0
    ? vscode.workspace.workspaceFolders[0].uri.fsPath
    : undefined;

export const doesPathExist = (path: string): boolean => {
  try {
    Fs.accessSync(path);
  } catch (err) {
    return false;
  }
  return true;
};
