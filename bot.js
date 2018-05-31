var twit = require('twit');
var config = require('./config.js');
var Twitter = new twit(config);

var queryCount = 0;

var retweet = function () {
  var params = {
    q: '#lindyhop, #Lindyhop, #LindyHop, #swingdance, #SwingDance, lindy\x20hop, Lindy\x20Hop, Lindy\x20hop',
    result_type: 'recent'
  }

  Twitter.get('search/tweets', params, function(err, data) {
      // if there no errors
        if (!err) {
          // grab ID of tweet to retweet
            var statuses = data.statuses;
            console.log(`${statuses.length} Tweets returned`);
            var status = statuses[queryCount] || statuses[0];
            var retweetId = status.id_str;
            // Tell TWITTER to retweet
            Twitter.post('statuses/retweet/:id', {
                id: retweetId
            }, function(err, response) {
                if (response) {
                    console.log('Retweeted!!!');
                    console.log(`queryCount is ${queryCount}`);
                }
                // if there was an error while tweeting
                if (err) {
                    console.log(`${err.stack}`);
                    if (queryCount < statuses.length) {
                      retweet();
                    } else {
                      console.log(`Attempt number ${statuses.length}. Will try next time.`);
                      queryCount = 0;
                      return
                    }
                    queryCount += 1;
                } else {
                  console.log('Retweet was a success!!!');
                  queryCount = 0;
                }
            });
        }
        // if unable to Search a tweet
        else {
          console.log('Something went wrong while SEARCHING...');
          console.log(`${err.stack}`);
        }
    });

}

retweet();

setInterval(retweet, 60000);
