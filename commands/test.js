const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Checks if Prof. Sinz would approve of this bot'),
	async execute(interaction) {
		return interaction.reply('Bot is Sinz approved <:sinz_approved:1042760945052692571>');
	},
};