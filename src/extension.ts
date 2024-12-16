// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { IrisGlobal, IrisGlobalsTreeProvider } from './IrisGlobalsProvider';

export function activate(context: vscode.ExtensionContext) {

	const irisGlobalsProvider = new IrisGlobalsTreeProvider(context);
	vscode.window.registerTreeDataProvider('irisGlobals', irisGlobalsProvider);
	const disposableRefresh = vscode.commands.registerCommand('irisGlobals.refreshEntry', () => irisGlobalsProvider.refresh());
	const disposableAdd = vscode.commands.registerCommand('irisGlobals.addEntry', () => irisGlobalsProvider.add());
	const disposableDelete = vscode.commands.registerCommand('irisGlobals.deleteEntry', (node: IrisGlobal) => irisGlobalsProvider.delete(node.label));
	const disposableEdit = vscode.commands.registerCommand('irisGlobals.editEntry', (node: IrisGlobal) => irisGlobalsProvider.edit(node.label));
	const disposableTextEdit = vscode.commands.registerCommand('irisGlobals.editTextEntry', (node: IrisGlobal) => irisGlobalsProvider.editText(node.label));


	context.subscriptions.push(vscode.workspace.onDidSaveTextDocument(editorsaveevent => {      

        if (editorsaveevent) {
			irisGlobalsProvider.saveGlobalWithYaml(editorsaveevent.fileName);
        }

    }));
	
	context.subscriptions.push(disposableRefresh);
	context.subscriptions.push(disposableAdd);
	context.subscriptions.push(disposableDelete);
	context.subscriptions.push(disposableEdit);
	context.subscriptions.push(disposableTextEdit);
}

// This method is called when your extension is deactivated
export function deactivate() {}
