var request = require('request');
var fs = require('fs');

function downloadImageByURL(url, filePath) {
  request.get(url)              
       .on('error', function (err) {                                   
         throw err; 
       })
       .on('response', function (response) {
        console.log('Download concluded with StatusCode: ', response.statusCode);
      })
       .pipe(fs.createWriteStream(filePath));               

}


downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")