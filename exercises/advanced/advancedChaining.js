/**
 * Your task is to write a function that uses a deep learning
 * algorithm to determine the common set of concepts between
 * multiple github profile pictures
 *
 * Given an array of github handles, searchCommonConceptsFromGitHubProfiles should:
 *   1) get the public profile associated with each handle
 *   2) extract the avatar_url of each profile
 *   4) get the set of concepts for each avatar_url (requires API key)
 *   5) find the intersection of the concepts
 *
 * Much of the heavy lifting has been done already in `lib/advancedChainingHelpers`,
 * you just have to wire everything up together! Once you pass this one, you'll
 * be a promise chaining master! Have fun!
 */

var Promise = require('bluebird');
var lib = require('../../lib/advancedChainingLib');

const { getGitHubProfile, getIntersection, predictImage } = lib;
// We're using Clarifai's API to recognize concepts in an image into a list of concepts
// Visit the following url to sign up for a free account
//     https://developer.clarifai.com/login/
// Then, create a new API Key and add your API key to the
// `advancedChainingLib.js` file. When creating an API key, you can give it
// the `Predict on Public and Custom Models` scope

/*
I: array of strings
O: array of values
C: deep learning algorithim
E:
*/

var searchCommonConceptsFromGitHubProfiles = function (githubHandles) {
  const promiseArray = [];
  for (handle of githubHandles) {
    promiseArray.push(getGitHubProfile(handle));
  }

  return Promise.all(promiseArray)
    .then(arrayOfValues => {
      console.log('values ', arrayOfValues)
      //isolate urls into array
      const urlArray = [];
      for (obj of arrayOfValues) {
        urlArray.push(obj.avatarUrl);
      }

      return urlArray;
    })
    //then for loop array through predictImage()
    .then(urlArray => {
      urlArray.map(url => {
        console.log('single url', url)
        predictImage(url)
      })
    })
    .then(arrayOfArrays => console.log('tags'))

  //then run result thru getIntersections();

};

// Export these functions so we can unit test them
module.exports = {
  searchCommonConceptsFromGitHubProfiles,
};
