import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import packageJSON from './package.json';

export default {
  input: `src/index.ts`,
  output: [{ dir: packageJSON.module, format: 'cjs', sourcemap: true }],
  external: [],
  watch: {
    include: 'src/**',
  },
  plugins: [
    json(),
    typescript({ useTsconfigDeclarationDir: true }),
    resolve(),
    commonjs({
      include: 'node_modules/**',
    }),
    sourceMaps(),
  ],
};
