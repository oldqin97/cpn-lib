/*
 * @Author: qin
 * @Date: 2022-11-04 22:11:05
 * @LastEditTime: 2022-11-06 17:52:32
 * @FilePath: /ui-lib/rollup.config.prod.mjs
 *  -> The best way to explain it is to do it
 */
import path from 'path';
import { fileURLToPath } from 'url';

import getCpnPath from './utils/path.mjs';
import getConfigList from './utils/configFn.mjs';
import {
  inputPath as inputPathFn,
  outputPath,
} from './utils/inputPath.mjs';

// 获取所有组件 { test: './packages/components/test/index.js' }
const componentsObject = getCpnPath(
  'packages/components/**/index.js',
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = inputPathFn(__dirname, './packages/index.js'); // 输入路径
const inputPathSvg = inputPathFn(__dirname, './packages/loadSvg.js'); // 输入路径

const outputUmdPath = outputPath(__dirname, './dist/myLib.dev.js'); // 输出路径
const outputEsPath = outputPath(__dirname, './dist/myLib.dev.es.js'); // 输出路径

const outputUmdPathSvg = outputPath(
  __dirname,
  './dist/myLibIcons.dev.js',
); // Svg输出路径
const outputEsPathSvg = outputPath(
  __dirname,
  './dist/myLibIcons.dev.es.js',
); // Svg输出路径

const cpnsConfigs = Object.keys(componentsObject).map(name => {
  const config = getConfigList(name, 'prod');
  config.input = [componentsObject[name]];
  config.output = {
    file: `./lib/${name}.js`,
    format: 'es',
  };
  return config;
});

const allConfigs = {
  input: inputPath,
  output: [
    {
      file: outputUmdPath,
      format: 'umd',
      name: 'myLib',
      sourcemap: false,
      globals: {
        vue: 'Vue',
      },
    },
    {
      file: outputEsPath,
      format: 'es',
      sourcemap: false,
      globals: {
        vue: 'Vue',
      },
    },
  ],
  ...getConfigList('index', 'prod'),
  external: ['vue'],
};

const SvgConfig = {
  input: inputPathSvg,
  output: [
    {
      file: outputUmdPathSvg,
      format: 'umd',
      name: 'myLibIcons',
      sourcemap: false,
      globals: {
        vue: 'Vue',
      },
    },
    {
      file: outputEsPathSvg,
      format: 'es',
      sourcemap: false,
      globals: {
        vue: 'Vue',
      },
    },
  ],
  ...getConfigList('index', 'prod'),
  external: ['vue'],
};

export default [allConfigs, ...cpnsConfigs, SvgConfig];
