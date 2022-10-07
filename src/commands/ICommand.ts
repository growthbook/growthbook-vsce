import { Disposable } from "vscode";

export interface ICommand {
  register(): Disposable;
}
