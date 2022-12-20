const { SlashCommandBuilder } = require('discord.js');
const { checkFood } = require("../utils/checkFoodAvailibility");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('checkfood')
		.setDescription('Check what food is sold'),
	async execute(interaction) {
        if(!checkFood()){
            interaction.reply("[kœri]werk is open :) - the greatest happiness I've ever had");
        }else{
            interaction.reply("[kœri]werk is closed :( - my will to live is fainting");
        }
	},
};