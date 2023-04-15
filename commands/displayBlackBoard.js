const config = require('../config.json');
const { SlashCommandBuilder} = require('discord.js');
const {fetchData, saveOldData} = require('../utils/blackTable.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('blackboard')
        .setDescription('View newest blackBoard Information or use [date] to see specific old data'),
    async execute(interaction) {
        fetchData(0).then(data => {
            const channel = interaction.channel;
            let diagram = createBlackBoardDiagram(data);
            let replies = [];

            replies = splitRepliesRec(diagram, replies);
            //replies = splitRepliesIt(diagram);

            interaction.reply(`Sending Black Board for: Today!`)
            for (let i=0;i<replies.length;i++) {
                channel.send(replies[i]);
            }

            saveOldData(data);
        })
    },
};

function createBlackBoardDiagram(data) {
    let diagram = [];
    let i = 0;

    data.feedData.items.forEach(item => {
        diagram[i] += `\> \*\*${item.title}\*\*\n\n`
        diagram[i] += `\> ${item.content}\n`
        diagram[i] += `\> \*Posted on: ${item.pubDate}\*\n`
        diagram[i] += `\> \*${item.author}\*\n`
        diagram[i] += `\n\n\n`
        i++;
    });
    return diagram;
}

/**Iteriert über alle Diagram Elemente, überprüft sie auf ihre Größe und teilt sie, falls nötig, auf.
 * Iterativ
 * @param diagram
 * @returns {*[]}
 */
function splitRepliesIt(diagram) {
    let toCheck = [diagram];
    let replies = [];
    let start = []
    let end = [];

    for (let i=0;i<toCheck.length;i++) {
        const length = toCheck[i].length;
        let reply = "";
        start = [];
        end = [];

        for (let j=0;j<(length/2)-1;j++) {
            reply += toCheck[i][j];
            start[j] = toCheck[i][j];
        }
        for (let j=length/2, k=0;j<length;j++,k++) {
            reply += toCheck[i][j];
            end[k] = toCheck[i][j];
        }

        if (reply.length<2000) {
            replies.push(reply);
        }
        else {
            toCheck.push(start,end);
        }
    }
    return replies;
}

/**
 * Iteriert rekursiv über alle Diagram Elemente, überprüft sie auf ihre Größe und teilt sie, falls nötig, auf.
 * Rekursiv
 * @param diagram
 * @param replies
 */
//Verfahren könnte ziemlich langsam werden, bei großen Ausgaben, wenn verfügbar sollte überarbeitet werden
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
