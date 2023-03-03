const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pasta')
		.setDescription('Generates a funny and original commit message 🍝🍝🍝'),
	async execute(interaction) {
    var pastaDB = fs.readFileSync(`resources/PastaDB.txt`).toString().split("\n");
    var funnyDB = fs.readFileSync('resources/commits.txt').toString().split("\n");
    
    let pasta = pastaDB[Math.floor(Math.random()*pastaDB.length)];
    let funny = funnyDB[Math.floor(Math.random()*funnyDB.length)];
    let message = funny.replace("[pasta]",pasta.replace(" ",""));
    
		return interaction.reply(message);
	},
};
