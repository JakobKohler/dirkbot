//const {speechBubbleCreator} = require("../utils/speechBubbleUtil.js");
const {readFileSync} = require("fs");
const { speech_bubble } = require("../rust-utils/pkg/rust_utils.js");


function generateSayText(asciiArtFile, text){
    let asciiArt = readFileSync(`asciiart/${asciiArtFile}.txt`).toString();

    return ("\`\`\`\n" + speech_bubble(text) + asciiArt + "\`\`\`");
}

module.exports.generateSayText = generateSayText;