#! /usr/bin/env node
'use strict';

const { cli, getSnippets, writeSnippets } = require('../index'),
      options = cli.parseArgs();

getSnippets(options).then(data => {
  writeSnippets(data, options);
});
