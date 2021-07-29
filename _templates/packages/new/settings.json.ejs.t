---
to: packages/<%= name %>/.vscode/settings.json
---
{
  "search.exclude": {
    "**/.yarn": true,
    "**/.pnp.*": true
  },
  "eslint.nodePath": "../../.yarn/sdks",
  "prettier.prettierPath": "../../.yarn/sdks/prettier/index.js",
  "typescript.tsdk": "../../.yarn/sdks/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImport": true
  },
  "prettier.configPath": "../../.prettierrc"
}
