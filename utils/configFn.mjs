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
  ],
});

export default configFn;
