import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import vue from 'rollup-plugin-vue';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.resolve(__dirname, './packages/index.js'); // 输入路径
const outputUmdPath = path.resolve(__dirname, './dist/myLib.dev.js'); // 输出路径
const outputEsPath = path.resolve(
  __dirname,
  './dist/myLib.dev.es.js',
); // 输出路径

export default {
  input: inputPath,
  output: [
    {
      file: outputUmdPath,
      format: 'umd',
      name: 'myLib',
      sourcemap: true,
      globals: {
        vue: 'Vue',
      },
    },
    {
      file: outputEsPath,
      format: 'es',
      name: 'myLib',
      sourcemap: true,
      globals: {
        vue: 'Vue',
      },
    },
  ],
  plugins: [
    commonjs(),
    nodeResolve(),
    vue(),
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env'],
      babelHelpers: 'bundled',
    }),
    json(),
    postcss({
      extract: 'style/index.css',
      extensions: ['.css', '.scss'],
      plugins: [autoprefixer()],
    }),
  ],

  external: ['vue'],
};
