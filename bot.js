var twit = require(’twit’);
var config = require(’./config.js’);
var Twitter = new twit(config);

var retweet = function () {
  var params = {
    q: '#lindyhop, #Lindyhop, #LindyHop',
    result_type: 'recent',
    lang: 'en'
  }
}
