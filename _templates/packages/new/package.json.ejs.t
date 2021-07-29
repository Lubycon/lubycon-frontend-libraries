---
to: packages/<%= name %>/package.json
---
{
  "name": "@lubycon/<%= name %>",
  "description": "<%= description %>",
  "sideEffects": false,
  "version": "1.0.0",
  "keywords": [
    "lubycon"
  ],
  "main": "./dist/index.js",
  "module": "./dist",
  "typings": "./dist/types/index.d.ts",
  "publishConfig": {
    "access": "public"
  },
  "files": [
    "./dist"
  ],
  "scripts": {
    "lint": "tslint  --project tsconfig.json -t codeFrame 'src/**/*.ts' 'test/**/*.ts'",
    "prebuild": "rimraf dist",
    "build": "tsc --module commonjs && rollup -c rollup.config.ts",
    "start": "rollup -c rollup.config.ts -w",
    "typecheck": "tsc --noEmit"
  },
  "devDependencies": {
    "@types/node": "^10.11.0",
    "@types/react": "^17.0.13",
    "@typescript-eslint/eslint-plugin": "^4.28.5",
    "@typescript-eslint/parser": "^4.28.5",
    "cross-env": "^5.2.0",
    "eslint": "^7.27.0",
    "eslint-config-prettier": "^8.3.0",
    "eslint-plugin-prettier": "^3.4.0",
    "prettier": "^2.3.2",
    "rimraf": "^2.6.2",
    "rollup": "^2.38.5",
    "rollup-plugin-commonjs": "^10.1.0",
    "rollup-plugin-json": "^3.1.0",
    "rollup-plugin-node-resolve": "^3.4.0",
    "rollup-plugin-sourcemaps": "^0.4.2",
    "rollup-plugin-typescript2": "^0.30.0",
    "typescript": "^4.3.5"
  }
}
