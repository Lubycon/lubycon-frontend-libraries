---
to: packages/<%= name %>/tsconfig.json
---

{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "declarationDir": "dist/types"
  },
  "include": ["src"]
}
