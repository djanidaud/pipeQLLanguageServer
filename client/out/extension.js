"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const path = require("path");
const vscode_1 = require("vscode");
const vscode = require("vscode");
const node_1 = require("vscode-languageclient/node");
let client;
vscode.languages.registerHoverProvider('pipeql', {
    provideHover(document, position, token) {
        const range = document.getWordRangeAtPosition(position);
        const word = document.getText(range);
        let val = "";
        switch (word) {
            case "csv":
                val = "CSV Variable Declaration";
                break;
            case "query":
                val = "Query Declaration";
                break;
            case "import":
                val = "Import Statement";
                break;
            case "print":
                val = "Print Pipe";
                break;
            case "asc":
                val = "Ascend Pipe";
                break;
            case "desc":
                val = "Descend Pipe";
                break;
            case "select":
                val = "Select Pipe";
                break;
            case "reform":
                val = "Reform Pipe";
                break;
            case "update":
                val = "Update Pipe";
                break;
            case "write":
                val = "Write Pipe";
                break;
            case "note":
                val = "Note Pipe";
                break;
            case "unique":
                val = "Unique Pipe";
                break;
            case "error":
                val = "Error Pipe";
                break;
            case "id":
                val = "ID Entry Operator";
                break;
            case "arity":
                val = "Arity Entry Operator";
                break;
            case "if":
                val = "If Control";
                break;
            case " x ":
                val = "Cross-Product Pipe";
                break;
            case "++":
                val = "Union Pipe";
                break;
            case "--":
                val = "Difference Pipe";
                break;
        }
        if (val != "") {
            return new vscode.Hover({
                language: "PipeQL language",
                value: val
            });
        }
    }
});
function activate(context) {
    // The server is implemented in node
    let serverModule = context.asAbsolutePath(path.join('server', 'out', 'server.js'));
    // The debug options for the server
    // --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
    let debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };
    let serverOptions = {
        run: { module: serverModule, transport: node_1.TransportKind.ipc },
        debug: {
            module: serverModule,
            transport: node_1.TransportKind.ipc,
            options: debugOptions
        }
    };
    let clientOptions = {
        // Registers the server for PipeQL documents
        documentSelector: [{ scheme: 'file', language: 'pipeql' }],
        synchronize: {
            // Notify the server about file changes to '.clientrc files contained in the workspace
            fileEvents: vscode_1.workspace.createFileSystemWatcher('**/.clientrc')
        }
    };
    // Creates and starts the language client
    client = new node_1.LanguageClient('pipeqlLanguageServer', 'PipeQL Language Server', serverOptions, clientOptions);
    client.start();
}
exports.activate = activate;
function deactivate() {
    return !client ? undefined : client.stop();
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map