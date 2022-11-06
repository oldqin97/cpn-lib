/*
 * @Author: qin
 * @Date: 2022-11-04 23:19:42
 * @LastEditTime: 2022-11-06 18:22:34
 * @FilePath: /ui-lib/utils/configFn.mjs
 *  -> The best way to explain it is to do it
 */
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import vue from 'rollup-plugin-vue';
import json from '@rollup/plugin-json';
import replacePlugin from '@rollup/plugin-replace';
import svgPlugin from 'rollup-plugin-svg-sprites';
// import svgDe from 'rollup-plugin-svg-sprite-deterministic';
import contextRequire from '@godxiaoji/rollup-plugin-require-context';

const configFn = (name = 'index', env = 'prod') => ({
  plugins: [
    vue(),
    nodeResolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
    }),
    postcss({
      extract: `theme-chalk/${name}.css`,
      extensions: ['.css', '.scss'],
      plugins: [autoprefixer(), env === 'prod' ? cssnano() : ''],
    }),
    env === 'prod' ? terser() : '',
    json(),
    replacePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        env === 'prod' ? 'production' : 'development',
      ),
      'preventAssignment': true,
    }),
    contextRequire(),
    svgPlugin({
      symbolId(filename) {
        const fileArr = filename.split('/');
        return 'icons-' + fileArr[fileArr.length - 1].split('.')[0];
      },
    }),
  ],
});

export default configFn;
