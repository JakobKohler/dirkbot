const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('koeriget')
		.setDescription('Shows how many times one of us had a [kœri]wurst this year')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('Who is the one having a [kœri]wurst?')
                .setRequired(true)),
	async execute(interaction) {
        let person = interaction.options.getString('name');
        let jsonObject = JSON.parse(fs.readFileSync("databank/koeristats.json"));
        return interaction.reply('This year ' + person + ' had ' + jsonObject[person] + ' times a [kœri]wurst.');
	},
};