const { SlashCommandBuilder } = require('discord.js');
const { generateSayText } = require("../utils/generateSayText");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nilssay')
		.setDescription('Convey your message by putting it in the mouth of the one and only Nils')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('What should Nils say?')
                .setRequired(true)),
	async execute(interaction) {
        const textToSay = interaction.options.getString('input') + " \nI use Gentoo BTW";
        interaction.reply(generateSayText("nilssay", textToSay))
	},
};