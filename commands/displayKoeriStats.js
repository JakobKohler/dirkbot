const { SlashCommandBuilder } = require('discord.js');
const {MongoClient, ServerApiVersion} = require('mongodb');
const { dataBaseURI } = require('../config.json');

const maxLength = 100;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('koeristats')
		.setDescription('View current koeri stats'),
	async execute(interaction) {
        const client = new MongoClient(dataBaseURI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

        await client.connect();
        
        const cursor = await client.db("dirkbase").collection("koeriData").find({}).sort({koeriCount: -1});
        const koeriData = await cursor.toArray();

        if(!koeriData || koeriData.length == 0){
            return  interaction.reply("```No koeri data available. Go eat a [kœri]-Wurst```");
        }

        const diagram = createKoeriDiagram(koeriData);
        
        interaction.reply(diagram);
	},
};


function createKoeriDiagram(data){
    const maxValue = data[0].koeriCount;
    let longestName = data[0].name.length;

    for (let i = 1; i < data.length; i++) {
        if(data[i].name.length > longestName){
            longestName = data[i].name.length;
        }
        
    }

    let returnString = "";

    if(maxValue < maxLength){
        for(let i = 0; i < data.length; i++){
            let barLength = data[i].koeriCount;
            returnString += `${data[i].name}:${" ".repeat((longestName + 2) - data[i].name.length)} (${data[i].koeriCount}) ${"#".repeat(barLength)}\n`
        }
    }else{
        returnString = "you ate too much koeri, length mapping not implemented yet"
    }

    return "```" + returnString + "```"
}