const { fetchAndParseFeed } = require ('./rss_parser.js')


const RSS_URL = 'https://www.iwi.hs-karlsruhe.de/iwii/REST/rssfeed/newsbulletinboard/INFB';

function getFeed(feedURL) {
    var data = fetchAndParseFeed(feedURL);

    console.log(data);

    const item = data.querySelectorAll("item");


}
getFeed(RSS_URL);