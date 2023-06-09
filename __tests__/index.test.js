import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const resultname1 = getFixturePath('file_result1.txt');
const resultStylish = readFileSync(resultname1, 'utf8');

const resultname2 = getFixturePath('file_result2.txt');
const resultPlain = readFileSync(resultname2, 'utf8');

test.each([
  ['file1.json', 'file2.json'],
  ['file1.yml', 'file2.yml'],
])('%s %s', (filepath1, filepath2) => {
  const filename1 = getFixturePath(filepath1);
  const filename2 = getFixturePath(filepath2);
  expect(genDiff(filename1, filename2)).toBe(resultStylish);
  expect(genDiff(filename1, filename2, 'stylish')).toBe(resultStylish);
  expect(genDiff(filename1, filename2, 'plain')).toBe(resultPlain);
  expect(() => JSON.parse(genDiff(filename1, filename2, 'json'))).not.toThrow();
});
