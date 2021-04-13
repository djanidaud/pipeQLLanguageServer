import {
	createConnection,
	TextDocuments,
	ProposedFeatures,
	InitializeParams,
	DidChangeConfigurationNotification,
	CompletionItem,
	CompletionItemKind,
	TextDocumentPositionParams,
	TextDocumentSyncKind,
	InitializeResult
} from 'vscode-languageserver/node';
import {TextDocument} from 'vscode-languageserver-textdocument';

let connection = createConnection(ProposedFeatures.all);
let hasConfigurationCapability: boolean = false;
let hasWorkspaceFolderCapability: boolean = false;

connection.onInitialize((params: InitializeParams) => {
	let capabilities = params.capabilities;
	let workspace = capabilities.workspace;
	hasConfigurationCapability = !!(workspace && !!workspace.configuration);
	hasWorkspaceFolderCapability = !!(workspace && !!workspace.workspaceFolders);

	const result: InitializeResult = {
		capabilities: {
			textDocumentSync: TextDocumentSyncKind.Incremental,
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
	if (hasConfigurationCapability) connection.client.register(DidChangeConfigurationNotification.type, undefined);
	if (hasWorkspaceFolderCapability) {
		connection.workspace.onDidChangeWorkspaceFolders(_event => {
			connection.console.log('Workspace folder change event received.');
		});
	}
});


connection.onCompletion((_textDocumentPosition: TextDocumentPositionParams): CompletionItem[] => {
		return [
			{
				label: 'select',
				detail: 'Select Pipe It is a pipe which acts like a filter :)',
				kind: CompletionItemKind.Keyword
			},
			{
				label: 'reform',
				detail: 'Reform',
				kind: CompletionItemKind.Keyword
			}
		];
	}
);

connection.onCompletionResolve((item: CompletionItem): CompletionItem => {
		item.documentation = 'PipeQL Documentation';
		return item;
	}
);

new TextDocuments(TextDocument).listen(connection);
connection.listen();
