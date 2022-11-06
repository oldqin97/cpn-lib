/*
 * @Author: qin
 * @Date: 2022-11-06 17:51:03
 * @LastEditTime: 2022-11-06 21:16:48
 * @FilePath: /ui-lib/packages/loadSvg.js
 *  -> The best way to explain it is to do it
 */
// import './assets/styles/iconfont.css';
const req = require.context('../packages/assets/svg', true, /\.svg$/);

export default req;
