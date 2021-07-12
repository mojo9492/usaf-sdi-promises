/**
 * Using Promise.all, write a function, combineFirstLineOfManyFiles, that:
 *    1. Reads each file at the path in the `filePaths` array
 *    2. Plucks the first line of each file
 *    3. Joins each first line into a new file
 *      - The lines should be in the same order with respect to the input array
 *      - i.e. the second line in the new file should be the first line of `filePaths[1]`
 *    4. Writes the new file to the file located at `writePath`
 */
const promiseConstructor = require('../bare_minimum/promiseConstructor');
const { pluckFirstLineFromFileAsync } = promiseConstructor;

var fs = require('fs');
var Promise = require('bluebird');
var request = require('request');


var combineFirstLineOfManyFiles = function (filePaths, writePath) {
  const promiseArray = [];
  for (filePath of filePaths) {
    promiseArray.push(pluckFirstLineFromFileAsync(filePath))
  }

  return Promise.all(promiseArray)
    .then(firstLineArray => {
      let result = firstLineArray.join('\n');

      fs.writeFile(writePath, result, (err, data) => {
        if (err) console.log(err);
      });
    })

};

// Export these functions so we can unit test them
module.exports = {
  combineFirstLineOfManyFiles: combineFirstLineOfManyFiles
};