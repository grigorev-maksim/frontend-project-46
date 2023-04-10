import { readFileSync } from 'node:fs';
import path from 'path';
import genDiff from './genDiff.js';
import parse from './parsers.js';

const getPath = (filename) => path.resolve(process.cwd(), filename);

const readFile = (filepath) => readFileSync(filepath, 'utf8');

const getFileFormat = (filename) => path.extname(filename).slice(1);

const parser = (filepath1, filepath2) => {
  const path1 = getPath(filepath1);
  const data1 = parse(readFile(path1), getFileFormat(filepath1));

  const path2 = getPath(filepath2);
  const data2 = parse(readFile(path2), getFileFormat(filepath2));

  return genDiff(data1, data2);
};

export default parser;
