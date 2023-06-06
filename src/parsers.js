import yaml from 'js-yaml';
import _ from 'lodash';

const parse = (data, format) => {
  switch (format) {
    case 'yml':
      return yaml.load(data);
    case 'yaml':
      return yaml.load(data);
    case 'json':
      return JSON.parse(data);
    default:
      throw new Error(`Invalid extension: '${format}'! Try supported formats.`);
  }
};

export default parse;
