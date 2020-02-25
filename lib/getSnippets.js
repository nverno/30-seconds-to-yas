'use strict';

const axios = require('axios');

/**
 * Returns a Promise with the snippet json on success, exits on failure.
 * @param options Configuration to pass to axios.get
 */
function getSnippets(options) {
  return axios.get(options.url, {responseType: 'json', responseEncoding: 'utf8'})
    .then(response => response.data)
    .catch(error => {
      if (error.response) {        // status code out of 2xx range
        console.log('Error: status code', error.response.status);
        console.log(error.toJSON());
      } else if (error.request) {  // no response received
        console.log('Error: no response received\n', error.request);
      } else {                     // error setting up request
        console.log('Error:', error.message);
      }
      console.log('Error: configuration:\n', error.config);
      process.exit(1);
    });
}

// if (!module.parent) {
//   const { cli } = require('../index'),
//         options = cli.parseArgs();
//   getSnippets(options).then((data) => {
//     console.log(data["all"]);
//   });
// }

module.exports = getSnippets;
