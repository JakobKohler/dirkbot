const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bloat')
		.setDescription('Counts how many times we have said "bloat" this year')
        .addIntegerOption(option =>
            option.setName('int')
                .setDescription('How many "bloats" were bloated')),
	async execute(interaction) {
        const interactionUser = await interaction.guild.members.fetch(interaction.user.id);
		const nickname = interactionUser.nickname;
        let bloatNumber = interaction.options.getInteger('int');
        let jsonObj = JSON.parse(fs.readFileSync("databank/bloatcount.json"));
        if(bloatNumber === null){
            jsonObj["bloatCount"]++;
		}else{
            jsonObj["bloatCount"] += bloatNumber;
        }
        fs.writeFileSync("databank/bloatcount.json", JSON.stringify(jsonObj));
        return interaction.reply(nickname + ' bloated again. Together we have said "bloat" ' + jsonObj["bloatCount"] + ' times.');
	},
};