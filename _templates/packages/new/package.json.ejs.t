---
to: packages/<%= name %>/package.json
---
{
  "name": "@lubycon/<%= name %>",
  "description": "<%= description %>",
  "sideEffects": false,
  "version": "1.0.0",
  "keywords": [
    "lubycon",
    "<%= name %>"
  ],
  "main": "esm/index.js",
  "typings": "dist/types/index.d.ts",
  "publishConfig": {
    "access": "public",
    "main": "esm/index.js",
    "typings": "dist/types/index.d.ts"
  },
  "scripts": {
    "prebuild": "rimraf dist",
    "build": "tsc --module commonjs && rollup -c rollup.config.js",
    "start": "rollup -c rollup.config.js -w",
    "typecheck": "tsc --noEmit"
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
    "rollup-plugin-pnp-resolve": "^3.4.0",
    "rollup-plugin-sourcemaps": "^0.4.2",
    "rollup-plugin-typescript2": "^0.30.0",
    "tslib": "^2.3.0",
    "typescript": "^4.3.5"
  }
}
