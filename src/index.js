import parse from './parsers.js';
import gendiff from './formatters/index.js';

export default (file1, file2, formatName) => {
  const data1 = parse(file1);
  const data2 = parse(file2);
  return gendiff(data1, data2, formatName);
};
