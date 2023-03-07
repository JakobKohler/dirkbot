const { SlashCommandBuilder } = require('discord.js');
const {MongoClient, ServerApiVersion} = require('mongodb');
const { dataBaseURI } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bloat')
		.setDescription('Counts how many times we have said "bloat" this year')
        .addIntegerOption(option =>
            option.setName('int')
                .setDescription('How many "bloats" were bloated')
                .setRequired(false)),
	async execute(interaction) {
        const interactionUser = await interaction.guild.members.fetch(interaction.user.id);
        const client = new MongoClient(dataBaseURI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

		let nickname = interactionUser.nickname;
        let username = interactionUser.user.username;
        if(!nickname){
			nickname = username;
        }
        let bloatNumber = interaction.options.getInteger('int');
        

        await client.connect();
    
        if(!bloatNumber) {
            const count = await readBloatCount(client);
            return interaction.reply(`Together we have said bloat ${count} times.`)
        } else {
            const updateSuccess = await updateBloatCount(client, bloatNumber);
            if(updateSuccess){
                const newCount = await readBloatCount(client);
                return interaction.reply(`${nickname} bloated again. Together we have said bloat ${newCount} times.`);
            }else{
                return interaction.reply('There was an error updating the database');
            }
        }
	},
};

async function readBloatCount(client){
    const bloatCounter = await client.db("dirkbase").collection("generalData").findOne({ name: "bloatCounter" });
    return bloatCounter.value;
}
async function updateBloatCount(client, increment){
    const updateResult = await client.db("dirkbase").collection("generalData")
        .updateOne({name: "bloatCounter"}, {$inc : {value: increment}});
    return updateResult.acknowledged;
}
