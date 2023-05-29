import path from 'path';
import { readFileSync } from 'node:fs';
import parse from './src/parsers.js';
import gendiff from './src/formatters/index.js';
import diff from './src/genDiff.js';

const getPath = (filename) => path.resolve(process.cwd(), filename);

const readFile = (filepath) => readFileSync(filepath, 'utf8');

const getFileFormat = (filename) => path.extname(filename).slice(1);

export default (file1, file2, formatName) => {
  const path1 = getPath(file1);
  const fileformat1 = getFileFormat(file1);
  const datafile1 = readFile(path1);
  const data1 = parse(datafile1, fileformat1);

  const path2 = getPath(file2);
  const fileformat2 = getFileFormat(file2);
  const datafile2 = readFile(path2);
  const data2 = parse(datafile2, fileformat2);

  const tree = diff(data1, data2);

  return gendiff(tree, formatName);
};
