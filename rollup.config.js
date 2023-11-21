import glob from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

export default {
  input: Object.fromEntries(
    glob.sync('src/**/*.{jsx,js}').map((file) => [
      // This remove `src/` as well as the file extension from each
      // file, so e.g. src/nested/foo.js becomes nested/foo
      path.relative(
        'src',
        file.slice(0, file.length - path.extname(file).length)
      ),
      // This expands the relative paths to absolute paths, so e.g.
      // src/nested/foo becomes /project/src/nested/foo.js
      fileURLToPath(new URL(file, import.meta.url)),
    ])
  ),
  output: {
    format: 'cjs',
    dir: 'dist',
    manualChunks: function manualChunks(id) {
      if (id.includes('node_modules') || id.includes('vendor')) {
        return 'vendor';
      }
    },
  },
  // must external the sub dependency
  // i.e. foo dependon bar, you should external bar
  external: ['@uni/env'],
  plugins: [
    commonjs({}),
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      exclude: 'node_modules/**',
    }),
  ],
};
