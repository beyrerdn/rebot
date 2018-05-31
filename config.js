//config.js
/** TWITTER APP CONFIGURATION
 * consumer_key
 * consumer_secret
 * access_token
 * access_token_secret
 */
module.exports = {
  consumer_key: ENV['CONSUMER_KEY'] || process.env.CONSUMER_KEY,
  consumer_secret: ENV['CONSUMER_SECRET'] || process.env.CONSUMER_SECRET,
  access_token: ENV['ACCESS_TOKEN'] || process.env.ACCESS_TOKEN,
  access_token_secret: ENV['ACCESS_TOKEN_SECRET'] || process.env.ACCESS_TOKEN_SECRET
}
