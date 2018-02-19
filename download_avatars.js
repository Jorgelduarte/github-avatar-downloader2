var request = require('request');
var secrets = require("./secrets");

function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
        'User-Agent': 'Jorgelduarte',
        "Authorization": 'token ' + secrets.GITHUB_TOKEN
      }
    };
  
    request(options, function(err, res, body) {
      cb(err, body);
    });
  }
  

  getRepoContributors("jquery", "jquery", function(err, result) {
    console.log("Errors:", err);
    var resultJSON = JSON.parse(result);
    for (var i = 0; i < resultJSON.length; i++){
        console.log("Result:", resultJSON[i].avatar_url);
    }
  });