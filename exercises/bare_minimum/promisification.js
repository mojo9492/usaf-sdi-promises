/**
 * Create the promise returning `Async` suffixed versions of the functions below,
 * Promisify them if you can, otherwise roll your own promise returning function
 */

var fs = require('fs');
var request = require('request');
var crypto = require('crypto');
var Promise = require('bluebird');

// (1) Asyncronous HTTP request
var getGitHubProfileAsync = function (user) {

  const resultPromise = new Promise((resolve, reject) => {

    var options = {
      url: 'https://api.github.com/users/' + user,
      headers: { 'User-Agent': 'request' },
      json: true  // will JSON.parse(body) for us
    };

    request.get(options, function (err, res, body) {
      if (err) {
        reject(err);
      } else if (body.message) {
        const errorMsg = new Error('Failed to get GitHub profile: ' + body.message);
        reject(errorMsg);
      } else {
        resolve(res.body);
      }
    });
  });

  resultPromise
    .then(res => {
      return res
    })
    .catch(err => {
      console.log(err)
    });
  return resultPromise;
};

// (2) Asyncronous token generation
var generateRandomTokenAsync = function (callback) {
  const resultPromise = new Promise((resolve, reject) => {
    crypto.randomBytes(20, function (err, buffer) {
      if (err) {
        reject (err);
      } else {
        resolve(buffer.toString('hex'));
      }
    });

  })

  resultPromise
    .then(res => {
      return res
    })
    .catch(err => {
      console.log(err)
    });






  // crypto.randomBytes(20, function (err, buffer) {
  //   if (err) { return callback(err, null); }
  //   callback(null, buffer.toString('hex'));
  // });

  return resultPromise
};

// (3) Asyncronous file manipulation
var readFileAndMakeItFunnyAsync = function (filePath, callback) {

  const resultPromise = new Promise((resolve, reject) => {
    if (typeof filePath === 'string') {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          var funnyFile = data.split('\n')
            .map(line => line + ' lol')
            .join('\n');
          resolve(funnyFile)
        }
      })
    }
  });

  resultPromise
    .then(res => {
      return res
    })
    .catch(err => {
      console.log(err)
    });

  // fs.readFile(filePath, 'utf8', function (err, file) {
  //   if (err) { return callback(err); }

  //   var funnyFile = file.split('\n')
  //     .map(function (line) {
  //       return line + ' lol';
  //     })
  //     .join('\n');

  //   callback(funnyFile);
  // });

  return resultPromise;
};

var readFileAndMakeItFunnyAsync; // TODO

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getGitHubProfileAsync: getGitHubProfileAsync,
  generateRandomTokenAsync: generateRandomTokenAsync,
  readFileAndMakeItFunnyAsync: readFileAndMakeItFunnyAsync
};
