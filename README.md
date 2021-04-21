# PipeQL Language Server
Implemented as a VS Code extension in Node.js

## Functionality

This Language Server works for .cql files. It has the following language features:
- Keyword Auto-Completions
- Hovers
- Folding
- Syntax Highlighting (for any TextMate editor)


## Structure

```
├── client // Language Client
│   └── src
│       └── extension.ts // Language Client entry point
│       
├── themes 
|     └── PipeQueryLanguageTheme.json // Official Colour Theme
|
├── syntaxes
│     └── pipeql.tmLanguage.json // Syntax Highlighting
|
├──  language-configuration.json // Language  Configuration
│ 
├── package.json // The extension manifest.
└── server // Language Server
    └── src
        └── server.ts // Language Server entry point
```

## Running the extension

- Run `npm install` in this folder. This installs all necessary npm modules in both the client and server folder
- Open VS Code on this folder.
- Press Ctrl+Shift+B to compile the client and server.
- Switch to the Debug viewlet.
- Select `Launch Client` from the drop down.
- Run the launch config.
- Open a ".cql" file and start coding!


## Install the extension

- To start using your extension with Visual Studio Code copy it into the `<user home>/.vscode/extensions` folder and restart VS Code.
