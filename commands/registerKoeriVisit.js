const { SlashCommandBuilder } = require('discord.js');
const {MongoClient, ServerApiVersion} = require('mongodb');
const { dataBaseURI } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('visitkoeri')
		.setDescription('Registers your visit to the [kœri]werk'),
	async execute(interaction) {
        const connoisseurID = interaction.user.id;

        const client = new MongoClient(dataBaseURI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

        await client.connect();
        
        const registered = await isIDRegistered(client, connoisseurID);
        if(registered){
            const updated = await addKoeriVisit(client, connoisseurID);
            const reply = updated ? "Thank you for your visit to the [kœri]werk" : "Database error"

            interaction.reply(reply);
        }else{
            const interactionUser = await interaction.guild.members.fetch(interaction.user.id);
            const connoisseurName = interactionUser.nickname ?? interactionUser.user.username;
            const registerdSuccessfully = await registerNewConnoisseur(client, connoisseurID, connoisseurName);
            if(registerdSuccessfully){
                return interaction.reply(`It seems like this is your first time registering a visit to the [kœri]werk. A new database entry was created for ${connoisseurName} and 1 visit was added`);
            }else{
                "Database error"
            }
        }

	},
};

async function isIDRegistered(client, connoisseurID){
    const results = await client.db("dirkbase").collection("koeriData").findOne({ discordID: connoisseurID });
    return !!results;
}
async function registerNewConnoisseur(client, connoisseurID, name){
    const newConnoisseurObject = {
        discordID: connoisseurID,
        name: name,
        koeriCount: 1,
        koeriVisits: [new Date()]
    }

    const insertResult = await client.db("dirkbase").collection("koeriData").insertOne(newConnoisseurObject);
    return insertResult.acknowledged;
}

async function addKoeriVisit(client, connoisseurID){
    const updateObject = {
        $inc : {
            koeriCount: 1
        },
        $push: {
            koeriVisits: new Date()
        }
    }

    const updateResult = await client.db("dirkbase").collection("koeriData")
    .updateOne({discordID: connoisseurID}, updateObject);

    return updateResult.acknowledged;
}