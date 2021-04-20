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
            label: 'csv',
            detail: 'CSV variable declaration. Captures and stores the value of a query.',
            kind: node_1.CompletionItemKind.Keyword
        },
        {
            label: 'query',
            detail: 'Query declaration. Stores a reference to a query.',
            kind: node_1.CompletionItemKind.Keyword
        },
        {
            label: 'import',
            detail: 'Import pipe. Returns a CSV. Expects a string / path to a ".csv" file. Throws an error if it fails to import the desired file.',
            kind: node_1.CompletionItemKind.Keyword
        },
        {
            label: 'print',
            detail: 'Print pipe. Takes a CSV, prints it, and outputs it to the next pipe.',
            kind: node_1.CompletionItemKind.Keyword
        },
        {
            label: 'asc',
            detail: 'Ascend pipe. Takes a CSV, orders it in ascening order and returns it to the next pipe.',
            kind: node_1.CompletionItemKind.Keyword
        },
        {
            label: 'desc',
            detail: 'Descend pipe. Takes a CSV, orders it in descending order and returns it to the next pipe.',
            kind: node_1.CompletionItemKind.Keyword
        },
        {
            label: 'select',
            detail: 'Select pipe. Expects a predicate. Takes a CSV and filters it based on the predicate.',
            kind: node_1.CompletionItemKind.Keyword
        },
        {
            label: 'reform',
            detail: 'Reform pipe. Expects a list of colums. Takes a CSV and re-shapes it based on the list of columns.',
            kind: node_1.CompletionItemKind.Keyword
        },
        {
            label: 'update',
            detail: 'Update pipe. Expects two columns. Takes a CSV and updates the first column based on the second one.',
            kind: node_1.CompletionItemKind.Keyword
        },
        {
            label: 'write',
            detail: 'Write pipe. Expects a string / path to a ".csv" file. Takes a CSV and writes it in the desired location. Passes the CSV to the next pipe.',
            kind: node_1.CompletionItemKind.Keyword
        },
        {
            label: 'note',
            detail: 'Note pipe. Expects a string. Prints a message to the console.',
            kind: node_1.CompletionItemKind.Keyword
        },
        {
            label: 'unique',
            detail: 'Unique pipe. Takes a CSV and filters out all duplicate entries.',
            kind: node_1.CompletionItemKind.Keyword
        },
        {
            label: 'error',
            detail: 'Error pipe. Expects a string. Terminates the program with an error message.',
            kind: node_1.CompletionItemKind.Keyword
        },
        {
            label: 'id',
            detail: 'Id operator. Returns a non-negative int. Used to reference an entry\'s id.',
            kind: node_1.CompletionItemKind.Keyword
        },
        {
            label: 'arity',
            detail: 'Arity operator. Returns a non-negative int. Used to reference an entry\'s arity.',
            kind: node_1.CompletionItemKind.Keyword
        },
        {
            label: 'if',
            detail: 'If contol. Takes a predicate and applies a query to all enntries that satisfy the predicate.',
            kind: node_1.CompletionItemKind.Keyword
        },
        {
            label: 'x',
            detail: 'Cross-product pipe. Takes two queries and outputs their cartessian product.',
            kind: node_1.CompletionItemKind.Keyword
        },
        {
            label: '++',
            detail: 'Union pipe. Takes two queries and outputs their union.',
            kind: node_1.CompletionItemKind.Keyword
        },
        {
            label: '--',
            detail: 'Difference pipe. Takes two queries and outputs their difference.',
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