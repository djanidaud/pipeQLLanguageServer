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
        console.log(position);
        return {
            contents: ['Hover Content']
        };
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