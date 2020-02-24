#!/usr/bin/env node
'use strict';

const { DEFAULT_CONFIG } = require("../params"),
      ArgumentParser = require("argparse").ArgumentParser,
      parser = new ArgumentParser({
        version: '0.0.1',
        addHelp: true,
        description: 'convert some 30 second snippets to yasnippets',
      });

parser.addArgument(['-u', '--url'],
                   { help: 'Location of snippet.json vscode file.',
                     defaultValue: DEFAULT_CONFIG.jsSnippetUri
                   });
parser.addArgument(['-d', '--directory'],
                   { help: 'Output directory to put the snippets.',
                     defaultValue: '30-second-snippets'
                   });
parser.addArgument(['-p', '--prefix'],
                   { help: 'Snippet expansion prefix to append.',
                     defaultValue: DEFAULT_CONFIG.prefix
                   });

const args = parser.parseArgs();
console.dir(args);
