const {speechBubbleCreator} = require("../utils/speechBubbleUtil.js");
const {readFileSync} = require("fs");


function generateSayText(asciiArtFile, text){
    let asciiArt = readFileSync(`resources/asciiart/${asciiArtFile}.txt`).toString();

    return ("\`\`\`\n" + speechBubbleCreator(text) + asciiArt + "\`\`\`");
}

module.exports.generateSayText = generateSayText;