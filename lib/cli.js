'use strict';

const { DEFAULT_CONFIG } = require("../params"),
      ArgumentParser = require("argparse").ArgumentParser,
      pkg = require('../package.json'),
      cli = new ArgumentParser({
        description: pkg.description,
        version: pkg.version,
        addHelp: true,
      });

cli.addArgument(['-u', '--url'],
                { help: 'Location of snippet.json vscode file.',
                  defaultValue: DEFAULT_CONFIG.jsSnippetUri
                });
cli.addArgument(['-d', '--directory'],
                { help: 'Output directory to put the snippets.',
                  defaultValue: DEFAULT_CONFIG.directory
                });
cli.addArgument(['-p', '--prefix'],
                { help: 'Snippet expansion prefix to append.',
                  defaultValue: DEFAULT_CONFIG.prefix
                });
cli.addArgument(['-f', '--force'],
                { help: 'Overwrite any snippets in directory when present.',
                  defaultValue: DEFAULT_CONFIG.overwriteSnippets,
                  storeValue: true,
                  dest: 'overwrite'
                });

export default cli;
