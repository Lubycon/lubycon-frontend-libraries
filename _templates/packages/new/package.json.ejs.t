---
to: packages/<%= name %>/package.json
---
{
  "name": "<%= name %>",
  "description": "<%= description %>",
  "sideEffects": false,
  "version": "1.0.0",
  "keywords": [
    "lubycon",
    "<%= name %>"
  ],
  "typings": "dist/types/index.d.ts",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "publishConfig": {
    "access": "public",
    "main": "dist/index.js",
    "module": "dist/index.esm.js",
    "typings": "dist/types/index.d.ts"
  },
  "scripts": {
    "lint": "eslint . --ext .ts,.tsx",
    "prebuild": "rimraf dist",
    "build": "tsc --module commonjs && rollup -c rollup.config.js",
    "start": "rollup -c rollup.config.js -w",
    "typecheck": "tsc --noEmit",
    "test": "echo '<%= name %>: 테스트가 없습니다'"
  },
  "devDependencies": {
    "@types/node": "^10.11.0",
    "@types/react": "^17.0.13",
    "cross-env": "^5.2.0",
    "prettier": "^2.3.2",
    "rimraf": "^2.6.2",
    "rollup": "^2.38.5",
    "rollup-plugin-commonjs": "^10.1.0",
    "rollup-plugin-json": "^3.1.0",
    "rollup-plugin-pnp-resolve": "^2.0.0",
    "rollup-plugin-sourcemaps": "^0.4.2",
    "rollup-plugin-typescript2": "^0.30.0",
    "tslib": "^2.3.0",
    "typescript": "^4.3.5"
  }
}
