const { SlashCommandBuilder } = require('discord.js');
const { checkKoeri } = require("../utils/checkKoeriAvailibility");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('checkKoeri')
		.setDescription('Check if Koeriwerk is open'),
	async execute(interaction) {
        if(!checkKoeri()){
            interaction.reply("[kœri]werk is open :) - the greatest happiness I've ever had");
        }else{
            interaction.reply("[kœri]werk is closed :( - my will to live is fainting");
        }
	},
};