/*
 * @Author: qin
 * @Date: 2022-11-06 17:15:31
 * @LastEditTime: 2022-11-06 17:15:35
 * @FilePath: /ui-lib/packages/components/LibIcons/index.js
 *  -> The best way to explain it is to do it
 */
import LibIcons from './index.vue';

LibIcons.install = App => {
  App.component(LibIcons.name, LibIcons);
};

export default LibIcons;
