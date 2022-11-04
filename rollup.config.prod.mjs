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
const outputUmdPath = outputPath(__dirname, './dist/myLib.dev.js'); // 输出路径
const outputEsPath = outputPath(__dirname, './dist/myLib.dev.es.js'); // 输出路径

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

export default [allConfigs, ...cpnsConfigs];
