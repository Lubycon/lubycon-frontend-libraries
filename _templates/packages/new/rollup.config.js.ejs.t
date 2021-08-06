---
to: packages/<%= name %>/rollup.config.js
---

import path from 'path';
import resolve from 'rollup-plugin-pnp-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import packageJSON from './package.json';

const external = (pkg) => {
  const externals = Object.keys({
    ...packageJSON.dependencies,
    ...packageJSON.peerDependencies,
  });

  return externals.some((externalPkg) => {
    return pkg.startsWith(externalPkg);
  });
};

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

function buildJS(input, output, format) {
  const isESMFormat = format === 'es';
  return {
    input,
    external,
    output: [
      {
        format,
        ...(isESMFormat ? { dir: output } : { file: output }),
      },
    ],
    plugins: [
      json(),
      typescript({ useTsconfigDeclarationDir: true }),
      resolve({ extensions }),
      commonjs({
        include: 'node_modules/**',
      }),
    ],
    preserveModules: isESMFormat,
  };
}

function buildCJS(input) {
  const filename = path.parse(input).name;
  return buildJS(input, `dist/${filename}.js`, 'cjs');
}

function buildESM(input) {
  return buildJS(input, path.dirname(packageJSON.publishConfig.module), 'es');
}

export default [buildCJS('src/index.ts'), buildESM('src/index.ts')];
