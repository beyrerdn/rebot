var twit = require('twit');
var config = require('./config.js');
var Twitter = new twit(config);

var queryCount = 0;

var retweet = function () {
  var params = {
    q: '#lindyhop, #Lindyhop, #LindyHop, #swingdance, #SwingDance',
    result_type: 'recent'
  }

  Twitter.get('search/tweets', params, function(err, data) {
      // if there no errors
        if (!err) {
          // grab ID of tweet to retweet
            var statuses = data.statuses
            var status = statuses[queryCount]
            var retweetId = status.id_str;
            // Tell TWITTER to retweet
            Twitter.post('statuses/retweet/:id', {
                id: retweetId
            }, function(err, response) {
                if (response) {
                    console.log('Retweeted!!!');
                }
                // if there was an error while tweeting
                if (err) {
                    console.log('Something went wrong while RETWEETING... Duplication maybe...');
                    if (queryCount < 5) {
                      retweet();
                    } else {
                      console.log('5th attempt. Will try next time.');
                      queryCount = 0
                    }
                    queryCount += 1
                }
            });
        }
        // if unable to Search a tweet
        else {
          console.log('Something went wrong while SEARCHING...');
        }
    });

}

retweet();

setInterval(retweet, 36000000);
