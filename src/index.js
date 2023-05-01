import renderTree from './formatters/stylish.js';
import parse from './parsers.js';

export default (file1, file2, format) => {
  const data1 = parse(file1);
  const data2 = parse(file2);
  switch (format) {
    case 'stylish':
      return renderTree(data1, data2);
    default:
      return renderTree(data1, data2);
  }
};
