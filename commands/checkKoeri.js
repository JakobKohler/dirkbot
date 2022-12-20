const { SlashCommandBuilder } = require('discord.js');
const { checkKoeri } = require("../utils/checkKoeriAvailibility");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('mensa')
		.setDescription('Check if Koeriwerk is open'),
	async execute(interaction) {
        if(!checkKoeri()){
            interaction.reply("[kœri]werk is open");
        }else{
            interaction.reply("[kœri]werk is closed :( My will to live is fainting");
        }
	},
};