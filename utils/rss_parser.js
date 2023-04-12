let Parser = require('rss-parser');
let parser = new Parser();

/** Call the function whenever you want to fetch and parse the feed
 *
 * @param feedURL
 * @returns {Promise<{[p: string]: any} & Parser.Output<{[p: string]: any}>>}
 */
async function fetchAndParseFeed(feedURL) {
  let feed = await parser.parseURL(feedURL);

  return feed;
}

module.exports = { fetchAndParseFeed };


