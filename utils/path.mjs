import path from 'path';
import pkg from 'glob';
const { glob } = pkg;
const getCpnPath = root => {
  return glob
    .sync(root, {
      dot: true,
    })
    .map(x => path.resolve(x))
    .map(x => path.dirname(x).split(path.sep).pop())
    .reduce((p, name) => {
      p[name] = `./packages/components/${name}/index.js`;
      return p;
    }, {});
};

export default getCpnPath;
