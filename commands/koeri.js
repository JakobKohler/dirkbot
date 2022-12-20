const { SlashCommandBuilder } = require('discord.js');
const koeri = [1,2,3,4,5,6];
const outputs = ['Today, I can recommend ', 'The best kœri is ', 'How about ', 'Why not try the very special ', 'You shall choose '];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kœri')
		.setDescription('Dirk is going to recommend you an excellent choice of kœri. Give it a try!'),
	async execute(interaction) {
		let i = Math.floor(Math.random() * 7) + 1;
		let j = Math.floor(Math.random() * (outputs.length));
		const shuffledKoeri = koeri.sort((a, b) => 0.5 - Math.random());
		const first = shuffledKoeri.slice(0, i);
		first.sort();
		if (first.length == koeri.length) {
			return interaction.reply(outputs[j] + 'infinity kœri!');
		} else {
			return interaction.reply(outputs[j] + first + 'er kœri');
		}
	},
};