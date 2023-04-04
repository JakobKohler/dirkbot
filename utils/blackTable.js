const  { fetchAndParseFeed }  = require('./rss_parser.js')

const RSS_URL = 'https://www.iwi.hs-karlsruhe.de/iwii/REST/rssfeed/newsbulletinboard/INFB';

let data = [];
let newData = [];

async function getFeed(feedURL) {
    let feed = await fetchAndParseFeed(feedURL);
    feed.items.forEach(item => {
        console.log("\n"+item.isoDate);
        //although not shown, it is possible to get the subItems from item, like item.title or item.isoDate!
    })
    //Check if Items already in data
    //Fill newData with feedData
/*
    let i = 0;
    feed.items.forEach(item => {
        newData[i] = item;
        i++
    })
*/

    newData = feed.items;

    newData.forEach(item => {
        //Find what items are old and delete them
        data.forEach(Item => {
            if (!(item.title === Item.title && item.isoDate === Item.isoDate)) {
                data.push(item);
            }

        })
    })


}



getFeed(RSS_URL);