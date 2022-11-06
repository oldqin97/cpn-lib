/*
 * @Author: qin
 * @Date: 2022-11-04 22:18:04
 * @LastEditTime: 2022-11-06 17:16:21
 * @FilePath: /ui-lib/packages/index.js
 *  -> The best way to explain it is to do it
 */

import LibFold from './components/LibFold/';
import LibDivider from './components/LibDivider/';
import LibSpace from './components/LibSpace/';
import LibIcons from './components/LibIcons/';
import './style/base.scss';

import './assets/svg/display.svg';
import './assets/svg/pine.svg';

const cpnList = [LibFold, LibDivider, LibSpace, LibIcons];

function install(Vue) {
  cpnList.forEach(item => {
    Vue.use(item);
  });
}

export { LibFold, LibDivider, LibSpace, LibIcons };

export default install;
