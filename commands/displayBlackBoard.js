const { SlashCommandBuilder} = require('discord.js');
const {fetchData, saveOldData} = require('../utils/blackTable.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('blackboard')
        .setDescription('View newest blackBoard Information or use [date] to see specific old data'),
    async execute(interaction) {
        fetchData(0).then(data => {

            const diagram = createBlackBoardDiagram(data);
            let toCheck = [diagram];
            let replies = [];
            let start = []
            let end = [];

            //Iteriert über alle Diagram Elemente, überprüft sie auf ihre Größe und teilt sie, falls nötig auf.
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
            for (let i=0;i<replies.length;i++) {
                interaction.reply(replies[i]);                           //Send all reply Messages
            }



            //displayReply(diagram);

            saveOldData(data);
        })
    },
};

function createBlackBoardDiagram(data) {
    let diagram = [Object.keys(data.feedData.items).length];
    let i = 0;
    data.feedData.items.forEach(item => {
        diagram[i] += ` \`\`\`${item.title}\`\`\``
        diagram[i] += `\*\*Inhalt:\*\*\n`
        diagram[i] += `\`\`\`${item.content}\`\`\` \n`
        diagram[i] += `\*Posted on: ${item.pubDate}\*\n`
        diagram[i] += `\*${item.author}\*\n`
        i++;
    });
    return diagram;
}

/**
 * Displayed die Replys Recursiv. Mein erster Versuch, macht aber problemen mit interaction.reply in einer ausgelagerten Funktion.
 * Daher Iterativ ungesetzt.
 * @param diagram
 */
/*
function displayReply(diagram) {                                                    //Verfahren könnte ziemlich langsam werden, bei großen Ausgaben, wenn verfügbar sollte überarbeitet werden
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
    if (!reply.length>2000) {
        interaction.reply(reply);
    } else {
        displayReply(start);
        displayReply(end);
    }
}
*/