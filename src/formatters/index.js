import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (data1, data2, format) => {
  switch (format) {
    case 'stylish':
      return stylish(data1, data2);
    case 'plain':
      return plain(data1, data2);
    case 'json':
      return json(data1, data2);
    default:
      return stylish(data1, data2);
  }
};
