
const { format } = require('./feedFormatter.js')

let Parser = require('rss-parser');
let parser = new Parser();

/** Call the function whenever you want to fetch and parse the feed
 *
 * @param feedURL
 * @returns {Promise<{[p: string]: any} & Parser.Output<{[p: string]: any}>>}
 */
async function fetchAndParseFeed(feedURL) {
  let feed = await parser.parseURL(feedURL);

  //Sort items via Date
  feed.items.sort((a, b) => {
    return 'desc' === 'asc'
        ? new Date(a.isoDate) - new Date(b.isoDate) // Oldest first
        : new Date(b.isoDate) - new Date(a.isoDate); // Newest first
  });

  //Format the Items
  feed.items.forEach(item => {
    for (let itemKey in item) {
      item[itemKey] = format(item[itemKey]);
    }
  })

  return feed;
}

module.exports = { fetchAndParseFeed };


