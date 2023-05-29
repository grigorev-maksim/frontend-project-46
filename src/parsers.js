import yaml from 'js-yaml';
import _ from 'lodash';

const parse = (data, fileformat) => {
  const parsers = { yml: yaml.load, yaml: yaml.load, json: JSON.parse };
  switch (_.has(parsers, fileformat)) {
    case true:
      return parsers[fileformat](data);
    default:
      throw new Error();
  }
};

export default parse;
