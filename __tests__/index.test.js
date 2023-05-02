import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';

import parser from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('stylish json1', () => {
  const filename1 = getFixturePath('file1.json');
  const filename2 = getFixturePath('file2.json');
  const resultname = getFixturePath('file_result1.txt');
  const result = readFileSync(resultname, 'utf8');
  expect(parser(filename1, filename2, 'stylish')).toBe(result);
});

test('stylish yml1', () => {
  const filename1 = getFixturePath('file1.yml');
  const filename2 = getFixturePath('file2.yml');
  const resultname = getFixturePath('file_result1.txt');
  const result = readFileSync(resultname, 'utf8');
  expect(parser(filename1, filename2, 'stylish')).toBe(result);
});

test('stylish json2', () => {
  const filename1 = getFixturePath('file3.json');
  const filename2 = getFixturePath('file4.json');
  const resultname = getFixturePath('file_result2.txt');
  const result = readFileSync(resultname, 'utf8');
  expect(parser(filename1, filename2, 'stylish')).toBe(result);
});

test('stylish yml2', () => {
  const filename1 = getFixturePath('file3.yml');
  const filename2 = getFixturePath('file4.yml');
  const resultname = getFixturePath('file_result2.txt');
  const result = readFileSync(resultname, 'utf8');
  expect(parser(filename1, filename2, 'stylish')).toBe(result);
});

test('plain json3', () => {
  const filename1 = getFixturePath('file3.json');
  const filename2 = getFixturePath('file4.json');
  const resultname = getFixturePath('file_result3.txt');
  const result = readFileSync(resultname, 'utf8');
  expect(parser(filename1, filename2, 'plain')).toBe(result);
});

test('plain yml3', () => {
  const filename1 = getFixturePath('file3.yml');
  const filename2 = getFixturePath('file4.yml');
  const resultname = getFixturePath('file_result3.txt');
  const result = readFileSync(resultname, 'utf8');
  expect(parser(filename1, filename2, 'plain')).toBe(result);
});

test('json json4', () => {
  const filename1 = getFixturePath('file3.json');
  const filename2 = getFixturePath('file4.json');
  const resultname = getFixturePath('file_result4.txt');
  const result = readFileSync(resultname, 'utf8');
  expect(parser(filename1, filename2, 'json')).toBe(result);
});

test('json yml4', () => {
  const filename1 = getFixturePath('file3.yml');
  const filename2 = getFixturePath('file4.yml');
  const resultname = getFixturePath('file_result4.txt');
  const result = readFileSync(resultname, 'utf8');
  expect(parser(filename1, filename2, 'json')).toBe(result);
});
