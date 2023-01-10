const { SlashCommandBuilder } = require('discord.js');
const { checkKoeri } = require("../utils/checkKoeriAvailibility");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('checkoeri')
		.setDescription('Check if [kœri]werk is open'),
	async execute(inter) {
        let interaction = inter;
        let bool = await checkKoeri();
        if(bool){
            interaction.reply("[kœri]werk is open :) - the greatest happiness I've ever had");
        }else{
            interaction.reply("[kœri]werk is closed :( - my will to live is fainting");
        }
	},
};