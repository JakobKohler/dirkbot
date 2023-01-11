const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('checkbloat')
		.setDescription('Shows how many times we have said "bloat" this year'),
	async execute(interaction) {
        let jsonObj = JSON.parse(fs.readFileSync("databank/bloatcount.json"));
        return interaction.reply('This year, we have said "bloat" ' + jsonObj["bloatCount"] + ' times.');
	},
};