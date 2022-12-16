const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kœri')
		.setDescription('What ist the best kœri?'),
	async execute(interaction) {
		return interaction.reply('The best kœri is ' + Math.floor(Math.random() * 7) + 'er kœri!');
	},
};