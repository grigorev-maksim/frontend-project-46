import yaml from 'js-yaml';
import path from 'path';
import { readFileSync } from 'node:fs';

const getPath = (filename) => path.resolve(process.cwd(), filename);

const readFile = (filepath) => readFileSync(filepath, 'utf8');

const getFileFormat = (filename) => path.extname(filename).slice(1);

const parse = (file) => {
  const path1 = getPath(file);
  const fileformat = getFileFormat(file);
  const data = readFile(path1);
  const parsers = { yml: yaml.load, yaml: yaml.load, json: JSON.parse };
  return parsers[fileformat](data);
};

export default parse;
