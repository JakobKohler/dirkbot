const { SlashCommandBuilder } = require('discord.js');
const {MongoClient, ServerApiVersion} = require('mongodb');
const {fetchData, saveOldData} = require('../utils/blackTable.js');
const { execute } = require('./displayKoeriStats.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('blackboard')
        .setDescription('View newest blackBoard Information or use [date] to see specific old data'),
    async execute(interaction) {
        fetchData(0).then(data => {
            
            const diagram = createBlackBoardDiagram(data);


            interaction.reply(diagram);
            saveOldData(data);
        })
    },
};

function createBlackBoardDiagram(data) {
    let diagram = "";
    
    data.feedData.items.forEach(item => {
        diagram += `${item.title}  \n`
    });
    return diagram;
}