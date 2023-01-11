const {readFileSync} = require("fs");
const { generateSayText } = require("./generateSayText");

function dirkQuote(){
    const theBible = readFileSync('gods work/the_holy_bible.txt').toString();
    const holyList = theBible.split('\n');
    const n = Math.floor(Math.random()*holyList.length);

    return generateSayText("dirksay", holyList[n]);
}
module.exports.dirkQuote = dirkQuote;