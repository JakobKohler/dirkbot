const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('koeri')
		.setDescription('What ist the best koeri?'),
	async execute(interaction) {
		return interaction.reply('The best koeri is 0er koeri!');
	},
};