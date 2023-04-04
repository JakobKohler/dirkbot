let Parser = require('rss-parser');
let parser = new Parser();

async function fetchAndParseFeed() {
  let feed = await parser.parseURL('https://www.iwi.hs-karlsruhe.de/iwii/REST/rssfeed/newsbulletinboard/INFB');
  console.log(feed);
/*
  feed.items.forEach(item => {
    console.log(item.title + ':' + item.link)
  });
  */
 return feed;
}

// Call the function whenever you want to fetch and parse the feed
fetchAndParseFeed();


