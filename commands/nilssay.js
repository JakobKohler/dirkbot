const { SlashCommandBuilder } = require('discord.js');
const fs = require("fs");
const {readFileSync} = require("fs");
const {speechBubbleCreator} = require("../utils/speechBubbleUtil.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nilssay')
		.setDescription('Convey your message by putting it in the mouth of the one and only Nils')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('What should Nils say?')
                .setRequired(true))
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Channel to let Nils speak in')),
	async execute(interaction) {
        await createDirkSay(interaction);
	},
};

async function createDirkSay(interaction) {
    let textToSay = interaction.options.getString('input')
    textToSay = textToSay + " I use Gentoo BTW.";
    let speechBubble = speechBubbleCreator(textToSay);
    let asciiArt = readFileSync("asciiart/nilssay.txt").toString();

    interaction.reply("\`\`\`\n" + speechBubble + asciiArt + "\`\`\`")
}