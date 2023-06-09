import yaml from 'js-yaml';

const parse = (data, format) => {
  switch (format) {
    case 'yml':
      return yaml.load(data);
    case 'yaml':
      return yaml.load(data);
    case 'json':
      return JSON.parse(data);
    default:
      throw new Error(`Invalid format: '${format}'! Try supported formats.`);
  }
};

export default parse;
