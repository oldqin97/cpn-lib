import LibFold from './components/LibFold/';
import LibDivider from './components/LibDivider/';
import './style/base.scss';

const cpnList = [LibFold, LibDivider];

function install(Vue) {
  cpnList.forEach(item => {
    Vue.use(item);
  });
}

export { LibFold, LibDivider };

export default install;
