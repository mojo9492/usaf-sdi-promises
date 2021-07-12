/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
const promiseConstructor = require('./promiseConstructor.js');
const { pluckFirstLineFromFileAsync } = promiseConstructor;
const promisificaion = require('./promisification');
const { getGitHubProfileAsync } = promisificaion;



var fetchProfileAndWriteToFile = function (readFilePath, writeFilePath) {
  if (typeof readFilePath === 'string') {
    const resultPromise = new Promise((resolve, reject) => {

      fs.readFile(readFilePath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          const userName = pluckFirstLineFromFileAsync(readFilePath);
          resolve(userName);
        }
      })
    })

    resultPromise
      .then(userName => {
        return getGitHubProfileAsync(userName)
      })
      .then(userProfile => {

        // console.log('USER PROFILEEEEEEEE')
        // console.log(userProfile)

        const humanData = JSON.stringify(userProfile);

        // console.log('HUMAN DATAAAAAAAA')
        // console.log(humanData)

        fs.writeFile(writeFilePath, humanData, (err) => {
          if(err){
            console.log(err)
          }
        })
      })
      .catch(err => {
        console.log(err)
      });

    return resultPromise;
  }
};



// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
