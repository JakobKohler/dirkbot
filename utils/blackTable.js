const  { fetchAndParseFeed }  = require('./rss_parser.js')

let oldData = {};
async function fetchData(date) {
    let feed = {};
    let feedURL = 'https://www.iwi.hs-karlsruhe.de/iwii/REST/rssfeed/newsbulletinboard/INFB';

    //If old Data requested
    if (date) {
        if (!(date <= new Date().getFullYear() || (date - 2019)>=0)) return feed = { error: "Hääää??? Was willst du denn in "+`${date}`+"??? Bitte gib mir ein valides Datum, frühestens 2019!", feedData: undefined };
        feedURL = 'https://www.iwi.hs-karlsruhe.de/iwii/info/bulletinboard/INFB/' + `${date}`;
    }

    //Implement specific date requests

   await fetchAndParseFeed(feedURL)     //Data given should always be up-to-date data
        .then(data => {
            feed = {
                error: false,
                feedData: data
            }
        })
        .catch(err => {
            if (err.response) {
                feed = {
                    error: err.response,
                    feedData: undefined
                }
            }
            return feed;
        });

    //alte Data aus neuen Daten entfernen
    if (!(oldData = {})) {
        //If there is oldData, filter the new Data to exclude all oldData
        feed.feedData.items.filter(item => oldData.items.some(obj => obj.title === item.title && obj.isoDate === item.isoDate))
    } else {
        oldData = feed.feedData;
    }


    feed.feedData.items.forEach(item => {

        console.log("\n"+item.isoDate);
        //although not shown, it is possible to get the subItems from item, like item.title or item.isoDate!
    })


    return feed;
}

function fetchOldData() {
    oldData.items.forEach(item => {
        item.displayed = true;
    })
}
fetchData();

