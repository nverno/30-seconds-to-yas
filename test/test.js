import axios from 'axios';
import getSnippets from '../lib/getSnippets';
import { writeSnippets, convertSnippet } from '../lib/writeSnippets';
import cli from "../lib/cli";
import fs from "fs";
const options = cli.parseArgs();
jest.mock('axios');

const rawSnippet = {
  prefix: '30s_all',
  body: [ 'const all = (arr, fn = Boolean) => arr.every(fn);' ],
  description: 'Returns `true` if the provided predicate function returns `true` for all elements in a collection, `false` otherwise.\n' +
    '\n' +
    'Use `Array.prototype.every()` to test if all elements in the collection return `true` based on `fn`.\n' +
    'Omit the second argument, `fn`, to use `Boolean` as a default.\n'
};

const snippet = 
      ['# -*- snippet -*-',
       '# name: all',
       '# key: f_all',
       '# contributor: 30-seconds',
       '# --',
       'const all = (arr, fn = Boolean) => arr.every(fn);'].join('\n');

test('should fetch snippet data', () => {
  const response = { data: rawSnippet };
  // axios.get.mockResolvedValue(response);
  axios.get.mockImplementation(() => Promise.resolve(response));

  return getSnippets(options).then(data => expect(data).toEqual(rawSnippet));
});

test('should convert snippet data', () => {
  const res = convertSnippet(rawSnippet, options['prefix']);
  expect(res).toEqual(snippet);
});
