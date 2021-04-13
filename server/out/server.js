"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("vscode-languageserver/node");
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
let connection = node_1.createConnection(node_1.ProposedFeatures.all);
let hasConfigurationCapability = false;
let hasWorkspaceFolderCapability = false;
connection.onInitialize((params) => {
    let capabilities = params.capabilities;
    let workspace = capabilities.workspace;
    hasConfigurationCapability = !!(workspace && !!workspace.configuration);
    hasWorkspaceFolderCapability = !!(workspace && !!workspace.workspaceFolders);
    const result = {
        capabilities: {
            textDocumentSync: node_1.TextDocumentSyncKind.Incremental,
            // Tell the client that this server supports code completion.
            completionProvider: {
                resolveProvider: true
            }
        }
    };
    if (hasWorkspaceFolderCapability) {
        result.capabilities.workspace = {
            workspaceFolders: {
                supported: true
            }
        };
    }
    return result;
});
connection.onInitialized(() => {
    if (hasConfigurationCapability)
        connection.client.register(node_1.DidChangeConfigurationNotification.type, undefined);
    if (hasWorkspaceFolderCapability) {
        connection.workspace.onDidChangeWorkspaceFolders(_event => {
            connection.console.log('Workspace folder change event received.');
        });
    }
});
connection.onCompletion((_textDocumentPosition) => {
    return [
        {
            label: 'select',
            detail: 'Select Pipe It is a pipe which acts like a filter :)',
            kind: node_1.CompletionItemKind.Keyword
        },
        {
            label: 'reform',
            detail: 'Reform',
            kind: node_1.CompletionItemKind.Keyword
        }
    ];
});
connection.onCompletionResolve((item) => {
    item.documentation = 'PipeQL Documentation';
    return item;
});
new node_1.TextDocuments(vscode_languageserver_textdocument_1.TextDocument).listen(connection);
connection.listen();
//# sourceMappingURL=server.js.map