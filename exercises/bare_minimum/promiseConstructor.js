/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

var fs = require('fs');
// const https = require('https');
var request = require('request');
var Promise = require('bluebird');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFileAsync = function (filePath) {
  const returnedPromise = new Promise((resolve, reject) => {
    if (typeof filePath === 'string') {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          reject(err);
        } else {
          const humanData = data.toString();
          let result = '';
          for (let i = 0; i < humanData.length; i++) {
            if (humanData[i] === '\n') {
              break
            }

            result += humanData[i];
          }

          resolve(result);
        }
      });
    }
  })

  return returnedPromise;
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCodeAsync = function (url) {
  const resultPromise = new Promise((resolve, reject) => {
    if (typeof url === 'string') {
      request(url, (err, res, body) => {
        if (err) {
          reject(err);
        }
        if (res) {
          resolve(res.statusCode)
        }
      })
    };
  });
  return resultPromise;
}

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
};
