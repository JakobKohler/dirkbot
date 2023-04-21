const  { fetchAndParseFeed }  = require('./rss_parser.js')
const { format } = require('./feedFormatter.js')
const fs = require('node:fs')
const path = require('path');


async function fetchData(date) {
    let feed = {};
    let feedURL = 'https://www.iwi.hs-karlsruhe.de/iwii/REST/rssfeed/newsbulletinboard/INFB';

    //If old Data requested
    if (date) {
        if (!(date <= new Date().getFullYear() || (date - 2019)>=0)) return feed = { error: "Hääää??? Was willst du denn in "+`${date}`+"??? Bitte gib mir ein valides Datum, frühestens 2019!", feedData: undefined };
        feedURL = 'https://www.iwi.hs-karlsruhe.de/iwii/info/bulletinboard/INFB/' + `${date}`;
    }

    //Implement specific date requests

   await fetchAndParseFeed(feedURL)                                 //Data given should always be up-to-date data
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
    console.log(feed.error);
    feed.feedData = format(feed.feedData);                                      //Format the feedData

    let oldData = {};
    //alte Data aus neuen Daten entfernen
    fs.readFile('../resources/blackTableData.txt', (err, data) => {
        if (err) {                                                              //If called, file probably empty. That's ok, we take that into consideration
            console.log(`Error reading blackTableData.txt, ${err.code}`);
        } else {
            oldData = JSON.parse(data);
            feed.feedData.items.filter(item => oldData.items.some(obj => obj.title === item.title && obj.isoDate === item.isoDate));
        }

    })                                                                          //Works GUUD!
    return feed;
}

function saveOldData(displayedData) {
    //console.log("SAVING");
    let oldData = {};
    console.log(__dirname);
    const filePath = path.join(__dirname,'..','resources','blackTableData.txt');
    console.log(filePath);
    //Get oldData from blackTableData.txt
    fs.readFile(filePath, (err, buffer) => {
        if (err) {                                                              //If called, file probably empty. That's ok, we take that into consideration
            console.log("Error reading blackTableData.txt, probably empty.");
            oldData = displayedData.feedData;                                   //Works!
        } else {
            oldData = JSON.parse(buffer);
            oldData.items.push(displayedData.feedData.items);
        }

        let data = JSON.stringify(oldData);
        //Save Data back to blackTableData.txt
        fs.writeFile(filePath, data, err => {
            if(err) {
                console.log("Error writing File.")
                console.log(err);
            }
        })

    });

    //console.log("DONE SAVING");
}

fetchData(0).then(data => {saveOldData(data)});

//although not shown, it is possible to get the subItems from item, like item.title or item.isoDate!
module.exports = {fetchData, saveOldData}