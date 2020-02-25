const getSnippets = require('./lib/getSnippets'),
      cli = require('./lib/cli'),
      { writeSnippets } = require('./lib/writeSnippets');

module.exports = {
  getSnippets,
  writeSnippets,
  cli
};
