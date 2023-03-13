const LINE_LIMIT = 50;
const bubbleConnection = "\n    \\\n     \\\n";

function createLineArray(text){
    let lineArray = [];

    let wordsArray = text.split(" ");
    let charCounter = 0;
    let lineArrayIndex = 0;

    let wordSnippetArray = [];

    for (let i = 0; i < wordsArray.length; i++) {
        if(wordsArray[i].length > LINE_LIMIT + 5){
            let splitWord = wordsArray[i].match(/.{1,50}/g);
            wordSnippetArray = wordSnippetArray.concat(splitWord);
            continue;
        }

        wordSnippetArray.push(wordsArray[i]);
    }
    lineArray[0] = wordSnippetArray[0];

    for (let i = 1; i < wordSnippetArray.length; i++) {
        let currentWord = wordSnippetArray[i];
        if(currentWord.charAt(0) === "\n" || currentWord.length + lineArray[lineArrayIndex].length > LINE_LIMIT){
            lineArrayIndex++;
            lineArray[lineArrayIndex] = currentWord;
            charCounter = 0;
            continue;
        }
        charCounter += currentWord.length;
        lineArray[lineArrayIndex] += (" " + currentWord);
    }

    return lineArray.map(line => {
        if(line.charAt(0) === "\n"){
            return line.substring(1);
        }else{
            return line;
        }
    });
}

function oneLineBubble(line){
    let bar = createHorizontalBorder(line.length);
    return " " + bar + `\n< ${line} >\n ` + bar + bubbleConnection;
}

function multiLineBubble(lines){
    let linesClone = [...lines];
    let maxLen = linesClone.sort((a, b) => {return b.length - a.length})[0].length;

    for (let i = 0; i < lines.length; i++) {
        lines[i] = lines[i].padEnd(maxLen, " ");
    }

    let bar = createHorizontalBorder(maxLen);
    let returnString = " " + bar + `\n/ ${lines[0]} \\\n`;
    for (let i = 1; i < lines.length - 1; i++) {
        returnString += `| ${lines[i]} |\n`;
    }
    returnString += `\\ ${lines[lines.length - 1]} /\n ` + bar + bubbleConnection;
    return returnString;
}

function createHorizontalBorder(len){
    let returnString = "";
    for (let i = 0; i < len + 2; i++) {
        returnString += "⎯"
    }
    return returnString;
}

function createSpeechBubble(text){
    let lineArray = createLineArray(text);
    
    if(lineArray.length > 1) return multiLineBubble(lineArray)
    return oneLineBubble(lineArray[0]);
}

module.exports.speechBubbleCreator = createSpeechBubble;
