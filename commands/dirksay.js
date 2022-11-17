const { SlashCommandBuilder } = require('discord.js');
const fs = require("fs");
const {readFileSync} = require("fs");
const {speechBubbleCreator} = require("../utils/speechBubbleUtil.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dirksay')
		.setDescription('Convey your message by putting it in the mouth of the one and only Dirk W Hoffmann')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('What should Dirk say?')
                .setRequired(true))
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Channel to let dirk speak in')),
	async execute(interaction) {
        await createDirkSay(interaction);
	},
};

async function createDirkSay(interaction) {
    const textToSay = interaction.options.getString('input')
    let speechBubble = speechBubbleCreator(textToSay);
    let asciiArt = readFileSync("dirksay.txt").toString();

    interaction.reply("\`\`\`\n" + speechBubble + asciiArt + "\`\`\`")
}