const { SlashCommandBuilder } = require('discord.js');
const { generateSayText } = require("../utils/generateSayText");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('dirksay')
		.setDescription('Convey your message by putting it in the mouth of the one and only Dirk W Hoffmann')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('What should Dirk say?')
                .setRequired(true)),
	async execute(interaction) {
        const textToSay = interaction.options.getString('input')
        interaction.reply(generateSayText("dirksay", textToSay))
	},
};