const { SlashCommandBuilder} = require('discord.js');
const {fetchData, saveOldData} = require('../utils/blackTable.js');
const fs = require("node:fs");
const path = require('path');

const spacerField = {
    name: '\u200b',
    value: '',
    inline: false,
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('blackboard')
        .setDescription('View newest blackBoard Information or use [date] to see specific old data'),
    async execute(interaction) {
        fetchData(0).then(data => {
            const channel = interaction.channel;
            if (data.error===false) {
                const replies = splitRepliesIt(createBlackBoardDiagram(data.feedData));
                interaction.reply(`Sending Black Board for: Today!`)
                for (let i = 0; i < replies.length; i++) {
                    channel.send(replies[i]);
                }

                saveOldData(data);
            } else {
                interaction.reply(`An Error has occurred: ${data.error}`);
            }

        })
    },
};

function createBlackBoardDiagram(data) {
    let menuEmbedObject = {
        title: `${data.title}`,
        description: ``,
        fields: [spacerField],
        color: 0xb089ff,
        //thumbnail:
    }

    let i = 0;
    data.items.forEach(item => {
        let totalField = {
            inline: true,
            name: `⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ ${item.title} ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯`,
            value: []
        };
        totalField.value.push(item.content);
        totalField.value.push(item.pubDate);
        totalField.value.push(item.author);
        totalField.value.push('');

        menuEmbedObject.fields.push(totalField);
        /*
        diagram[i] += `\> \*Posted on: ${item.pubDate}\*\n`
        diagram[i] += `\> \*${item.author}\*\n`
        diagram[i] += `\> \n \> \n`
        */

        i++;
    });
    return menuEmbedObject;
}

/**Iteriert über alle Diagram Elemente, überprüft sie auf ihre Größe und teilt sie, falls nötig, auf.
 * Iterativ
 * @param menuEmbedObject
 * @returns {*[]}
 */
function splitRepliesIt(menuEmbedObject) {
    let toCheck = [menuEmbedObject.fields];
    let replies = [];
    let firstPart = []
    let secondPart = [];

    for (let i=0;i<toCheck.length;i++) {
        length = toCheck[i].length;

        reply = toCheck[i].slice(0,length/2);
        firstPart = reply;
        reply = reply.concat(toCheck[i].slice(length/2,length));
        secondPart = reply;

        if (2000 < ((JSON.stringify(reply).length) - (10+4+reply.length*(5+6+10)))) {       //Ungefähre Berechnung der Länge
            replies.push(reply);
        }
        else {
            toCheck[i].splice(i,1,firstPart,secondPart);
            i-=1;
        }
    }
    //diagram.fields
    return replies;
}

fs.readFile('../resources/blackTableData.txt', (err, data) => {
    if (err) {                                                              //If called, file probably empty. That's ok, we take that into consideration
        console.log("Error reading blackTableData.txt, probably Empty.");
    } else {
        oldData = splitRepliesIt(createBlackBoardDiagram(JSON.parse(data)));
    }

})


/**
 * Rekursivt über alle Diagram Elemente, überprüft sie auf ihre Größe und teilt sie, falls nötig, auf.
 * Rekursiv
 * @param diagram
 * @param replies
 */
//Verfahren könnte ziemlich langsam werden, bei großen Ausgaben, wenn verfügbar sollte überarbeitet werden
/*
function splitRepliesRec(diagram, replies) {
    const length = diagram.length;
    let reply = "";
    let start = [];
    let end = [];

    for (let i=0;i<length/2;i++) {
        start[i] = diagram[i];
        reply += diagram[i];
    }
    for (let i=length/2, j=0;i<length;i++,j++) {
        end[i] = diagram[i];
        reply += diagram[i];
    }
    if (reply.length<2000) {
        replies.push(reply);
    } else {
        replies = splitRepliesRec(start, replies);
        replies = splitRepliesRec(end, replies);
    }
    return replies;

}
*/
