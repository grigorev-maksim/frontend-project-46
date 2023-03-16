import { readFileSync } from 'node:fs';
import path from 'path';
import genDiff from './genDiff.js';

const getPath = (filename) => path.resolve(process.cwd(), filename);

const readFile = (filepath) => readFileSync(filepath, 'utf8');

const parser = (filepath1, filepath2) => {
  const path1 = getPath(filepath1);
  const data1 = JSON.parse(readFile(path1));

  const path2 = getPath(filepath2);
  const data2 = JSON.parse(readFile(path2));

  return genDiff(data1, data2);
};

export default parser;
