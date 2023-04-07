const  { fetchAndParseFeed }  = require('./rss_parser.js')
const fs = require('node:fs')

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

    let oldData = {};
    //alte Data aus neuen Daten entfernen
    fs.readFile('../resources/blackTableData.bin', (err, buffer) => {
        if (err) {          //If called, file probably empty. That's ok, we take that into consideration
            console.log(err);
        } else {
            //If there is oldData, filter the new Data to exclude all oldData
            oldData = JSON.parse(buffer.toString());
            let oldFeed = feed;                 //Debugging
            feed.feedData.items.filter(item => oldData.items.some(obj => obj.title === item.title && obj.isoDate === item.isoDate))

            console.log(oldFeed.feedData);          //Debugging
            console.log("\n\n" + feed.feedData);    //Debugging
        }
    })


/*
    feed.feedData.items.forEach(item => {
        console.log("\n"+item.isoDate);
    })
*/

    return feed;
}

function saveOldData(displayedData) {
    let oldData = {};
    //Get oldData from blackTableData.bin
    fs.readFile('../resources/blacktableData.bin', (err, buffer) => {
        if (err) {          //If called, file probably empty. That's ok, we take that into consideration
            console.log(err);
            oldData = displayedData.feedData;
        } else {
            oldData = JSON.parse(buffer.toString());
            oldData.items.push(displayedData.feedData.items);
        }

        buffer = Buffer.from(JSON.stringify(oldData));
        //Save Data to blackTableData.txt
        fs.writeFile('../resources/blackTableData.bin', buffer, err => {
            if (err) {
                console.error('Error writing data to file: blackTableData.bin', err)
            }
        })

    });


}

module.exports = {fetchData, saveOldData}

async function getBlackTable() {
    await fetchData(0).then(data => {
        saveOldData(data);
    });
    return "SUCCESSFUL";
}

getBlackTable();

//although not shown, it is possible to get the subItems from item, like item.title or item.isoDate!

