import path from 'path';
const inputPath = (dirname, IP) => path.resolve(dirname, IP); // 输入路径

const outputPath = (dirname, OP) => path.resolve(dirname, OP);

export { inputPath, outputPath };
