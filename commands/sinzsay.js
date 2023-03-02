const { SlashCommandBuilder } = require('discord.js');
const { generateSayText } = require("../utils/generateSayText");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sinzsay')
		.setDescription('Convey your message by putting it in the mouth of the one and only Carsten Sinz')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('What should Carsten say?')
                .setRequired(true)),
	async execute(interaction) {
        const textToSay = interaction.options.getString('input')
        interaction.reply(generateSayText("sinzsay", textToSay))
	},
};