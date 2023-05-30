import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';

import parser from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test.each([
  ['file1.json', 'file2.json', 'file_result1.txt'],
  ['file1.yml', 'file2.yml', 'file_result1.txt'],
])('%s %s', (filepath1, filepath2, expected) => {
  const filename1 = getFixturePath(filepath1);
  const filename2 = getFixturePath(filepath2);
  const resultname = getFixturePath(expected);
  const result = readFileSync(resultname, 'utf8');
  expect(parser(filename1, filename2)).toBe(result);
});

test.each([
  ['file1.json', 'file2.json', 'stylish', 'file_result1.txt'],
  ['file1.yml', 'file2.yml', 'stylish', 'file_result1.txt'],
  ['file1.json', 'file2.json', 'plain', 'file_result2.txt'],
  ['file1.yml', 'file2.yml', 'plain', 'file_result2.txt'],
])('%s %s %s', (filepath1, filepath2, format, expected) => {
  const filename1 = getFixturePath(filepath1);
  const filename2 = getFixturePath(filepath2);
  const resultname = getFixturePath(expected);
  const result = readFileSync(resultname, 'utf8');
  expect(parser(filename1, filename2, format)).toBe(result);
});

test.each([
  ['file1.json', 'file2.json', 'json'],
  ['file1.yml', 'file2.yml', 'json'],
])('%s %s %s', (filepath1, filepath2, format) => {
  const filename1 = getFixturePath(filepath1);
  const filename2 = getFixturePath(filepath2);
  const data = parser(filename1, filename2, format);
  expect(() => JSON.parse(data)).not.toThrow();
});
