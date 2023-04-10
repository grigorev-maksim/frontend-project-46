import yaml from 'js-yaml';

const parse = (data, fileformat) => {
  const parsers = { yml: yaml.load, yaml: yaml.load, json: JSON.parse };
  return parsers[fileformat](data);
};

export default parse;
