import * as path from 'path';
import { workspace, ExtensionContext } from 'vscode';
import * as vscode from 'vscode';
import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient/node';

let client: LanguageClient;


vscode.languages.registerHoverProvider('pipeql', {
	provideHover(document, position, token) {
		const range = document.getWordRangeAtPosition(position);
        const word = document.getText(range);

		let val = "";
		switch(word) {
			case "csv": val = "CSV Variable Declaration"; break;
			case "query": val = "Query Declaration"; break;
			case "import": val = "Import Statement"; break;
			case "print": val = "Print Pipe"; break;
			case "asc": val = "Ascend Pipe"; break;
			case "desc": val = "Descend Pipe"; break;
			case "select": val = "Select Pipe"; break;
			case "reform": val = "Reform Pipe"; break;
			case "update": val = "Update Pipe"; break;
			case "write": val = "Write Pipe"; break;
			case "note": val = "Note Pipe"; break;
			case "unique": val = "Unique Pipe"; break;
			case "error": val = "Error Pipe"; break;
			case "id": val = "ID Entry Operator"; break;
			case "arity": val = "Arity Entry Operator"; break;
			case "if": val = "If Control"; break;
			case " x ": val = "Cross-Product Pipe"; break;
			case "++": val = "Union Pipe"; break;
			case "--": val = "Difference Pipe"; break;
		}
		
		if(val != "") {
			return new vscode.Hover({
				language: "PipeQL language",
				value: val
			});
		}
	}
  });

export function activate(context: ExtensionContext) {
	// The server is implemented in node
	let serverModule = context.asAbsolutePath(
		path.join('server', 'out', 'server.js')
	);

	// The debug options for the server
	// --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
	let debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };

	let serverOptions: ServerOptions = {
		run: { module: serverModule, transport: TransportKind.ipc },
		debug: {
			module: serverModule,
			transport: TransportKind.ipc,
			options: debugOptions
		}
	};

	let clientOptions: LanguageClientOptions = {
		// Registers the server for PipeQL documents
		documentSelector: [{ scheme: 'file', language: 'pipeql' }],
		synchronize: {
			// Notify the server about file changes to '.clientrc files contained in the workspace
			fileEvents: workspace.createFileSystemWatcher('**/.clientrc')
		}
	};

	// Creates and starts the language client
	client = new LanguageClient(
		'pipeqlLanguageServer',
		'PipeQL Language Server',
		serverOptions,
		clientOptions
	);
	client.start();
}

export function deactivate(): Thenable<void> | undefined {
	return !client ? undefined : client.stop();
}
