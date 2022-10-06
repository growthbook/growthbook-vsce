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

export type GrowthBookConfig = {
  featuresHost: string | null;
  featuresKey: string | null;
  appHost: string | null;
};

/**
 * Get the GrowthBook config from the provided workspace root.
 * If no file is found, or the file fails to parse, it will return null.
 * @param workspaceRoot
 * @returns
 */
export const getGrowthBookConfig = (
  workspaceRoot: string
): GrowthBookConfig | null => {
  const configPath = `${workspaceRoot}/.growthbook.json`;

  try {
    const configContents = Fs.readFileSync(configPath, "utf-8");
    console.log("config contents", configContents);
    const parsedConfig = JSON.parse(configContents);

    return {
      featuresHost: parsedConfig.featuresHost || null,
      featuresKey: parsedConfig.featuresKey || null,
      appHost: parsedConfig.appHost || null,
    };
  } catch (e) {
    return null;
  }
};
