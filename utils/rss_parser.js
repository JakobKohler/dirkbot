let Parser = require('rss-parser');
let parser = new Parser();

async function fetchAndParseFeed(feedURL) {
  let feed = await parser.parseURL(feedURL);
  console.log(feed.title);
  console.log(feed);
/*
  feed.items.forEach(item => {
    console.log(item.title + ':' + item.link)
  });
  */
 return feed;
}

// Call the function whenever you want to fetch and parse the feed
/*
fetchAndParseFeed();
 */


