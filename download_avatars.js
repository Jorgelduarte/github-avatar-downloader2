var request = require('request');
var secrets = require("./secrets");
var fs = require('fs');
var repositoryOwner = process.argv[2]; 
var repositoryName = process.argv[3];

if (!repositoryName || !repositoryOwner){
    return console.log ("error message: you need insert both arguments") 
}

function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
            'User-Agent': 'jorgelduarte',
            'Authorization': 'token ' + secrets.GITHUB_TOKEN
        }
    };

    request(options, function(err, res, body) {
        cb(err, body);
    });
   
}


getRepoContributors(repositoryOwner, repositoryName, function(err, result) {
    console.log("Errors:", err);
    var resultJSON = JSON.parse(result);

    if (fs.existsSync("avatars")) {
        console.log ("The folder 'avatars' alredy exist")
    } else {
        console.log ("The folder 'avatars' was created")
        fs.mkdir('avatars',function(result){
        })
    }
    
    for (var i = 0; i < resultJSON.length; i++){
        var newUrl = resultJSON[i].avatar_url;
        var login = resultJSON[i].login

        function downloadImageByURL(onlyUrl, filePath) {
            request.get(onlyUrl)              
            .on('error', function (err) {                                   
                throw err; 
            })
            .on('response', function (response) {
                console.log('Download concluded with StatusCode: ', response.statusCode);
            })
            .pipe(fs.createWriteStream(filePath));
                       
        }
        downloadImageByURL(newUrl, "avatars/" + login + ".jpg");
    }
});

