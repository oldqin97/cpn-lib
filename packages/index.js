/*
 * @Author: qin
 * @Date: 2022-11-04 22:18:04
 * @LastEditTime: 2022-11-06 23:15:15
 * @FilePath: /ui-lib/packages/index.js
 *  -> The best way to explain it is to do it
 */

import LibFold from './components/LibFold/';
import LibDivider from './components/LibDivider/';
import LibSpace from './components/LibSpace/';
import LibIcons from './components/LibIcons/';
import LibMessage from './components/LibMessage';
import './style/base.scss';
import './assets/icons/iconfont.css';

import './loadSvg';

const cpnList = [LibFold, LibDivider, LibSpace, LibIcons];

function install(app) {
  cpnList.forEach(item => {
    app.use(item);
  });
  app.config.globalProperties.$message = LibMessage;
}

export {
  install,
  LibFold,
  LibDivider,
  LibSpace,
  LibIcons,
  LibMessage,
};

const xxxLib = {
  version: '0.0.1',
  install,
};

export default xxxLib;
