const {readFileSync} = require("fs");
const { generateSayText } = require("./generateSayText");

function dirkQuote(){
    const theBible = readFileSync('gods work/the_holy_bible_without_linebreaks.txt').toString();
    const holyList =  theBible.match(/\(?[A-Z][^\.\?]+[\. \? ]+\)?/g);
    const n = Math.floor(Math.random()*holyList.length);

    return generateSayText("dirksay", holyList[n]);
}
module.exports.dirkQuote = dirkQuote;