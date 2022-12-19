const { SlashCommandBuilder } = require('discord.js');
const koeri = [1,2,3,4,5,6];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kœri')
		.setDescription('Dirk is going to recommend you an excellent kœri combination. Give it a try!'),
	async execute(interaction) {
		i = Math.floor(Math.random() * 7);
		const shuffledKoeri = koeri.sort((a, b) => 0.5 - Math.random());
		const first = shuffledKoeri.slice(0, i);
		first.sort();
		if (first == koeri) {
			return interaction.reply('Today, I can recommend infinity kœri!');
		} else {
			return interaction.reply('Today, I can recommend ' + first + 'er kœri!');
		}
	},
};