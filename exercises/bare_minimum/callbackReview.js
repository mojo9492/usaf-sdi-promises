/**
 * Implement these functions following the node style callback pattern
 */

 var fs = require('fs');
 const https = require('https')
 const path = require('path');
 var request = require('request');

 // This function should retrieve the first line of the file at `filePath`
 var pluckFirstLineFromFile = function (filePath, callback) {
   //retrieve first line of the file
   const fileName = path.basename(filePath)
   fs.readFile(filePath, (err, data) => {
     if (err) {
       callback(err);
     } else {
       const humanData = data.toString();
       let result = '';
       for (let i = 0; i < humanData.length; i++) {
         if (humanData[i] === '\n') {
           break
         }
         result += humanData[i];
       }
       callback(null, result);
     }
   });
 };

 // This function should retrieve the status code of a GET request to `url`
 var getStatusCode = function (url, callback) {

   if (typeof url === 'string') {
     const req = https.request(url, res => {
       callback(null, res.statusCode);
     });

     req.on('data', data => {
       console.log('data ', data)
     })

     req.on('error', err => {
       err['message'] = 'Invalid URI';
       callback(err)
     })

     req.end();
   }
 };

 // Export these functions so we can test them and reuse them in later exercises
 module.exports = {
   getStatusCode: getStatusCode,
   pluckFirstLineFromFile: pluckFirstLineFromFile
 };