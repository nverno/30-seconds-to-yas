'use strict';

const fs = require('fs'),
      path = require('path');

// Note: need to escape snippet bodies
export const yasTemplate =`
# -*- snippet -*-
# name: {{name}}
# key: {{key}}
# contributor: 30-seconds
# --
{{body}}`.trim();

/**
 * Return converted yasnippet
 * @param snippet JSON snippet object
 * @param prefix The snippet prefix to use instead of '30s_'
 */
export const convertSnippet = (snippet, prefix) => {
  try {
    const name = snippet['prefix'].replace('30s_', ''),
          key = prefix + name,
          body = snippet['body'].join('\n').replace(/([\\$`])/g, '\\$1');

    return yasTemplate
      .replace('{{name}}', name)
      .replace('{{key}}', key)
      .replace('{{body}}', body);

  } catch (err) { console.error(err.message); return null; }
};


/**
 * Write converted snippets to output directory.
 * @param snippets JSON with vscode style snippets
 * @param options CLI parameters
 */
export const writeSnippets = (snippets, options) => {
  const { directory, overwrite, prefix } = options;
  // console.dir(options);
  
  if (fs.existsSync(directory)) {
    console.error(`Directory ${directory} already exists`);
    if (!overwrite) process.exit(1);
  } else {
    fs.mkdirSync(directory);
  }

  for (const [key, val] of Object.entries(snippets)) {
    let snippet = convertSnippet(val, prefix);
    fs.writeFileSync(path.join(directory, key), snippet);
  }
};
