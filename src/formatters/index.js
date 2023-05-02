import stylish from './stylish.js';
import plain from './plain.js';

export default (data1, data2, format) => {
  switch (format) {
    case 'stylish':
      return stylish(data1, data2);
    case 'plain':
      return plain(data1, data2);
    default:
      throw new Error();
  }
};
