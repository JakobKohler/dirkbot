const { parse } = require('rss-to-json');
//async await

async function jsonfier(feedURL) {
    var rss = await parse(feedURL);

    return rss;
}
// Promise

parse('https://www.iwi.hs-karlsruhe.de/iwii/REST/rssfeed/newsbulletinboard/INFB').then(rss => {
    var jFeed = JSON.stringify(rss, null, 3);
    return jFeed;
});
