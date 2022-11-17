const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const bubbleConnection = "\n    \\\n     \\\n";

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
        createDirkSay(interaction);
		//return interaction.reply('Bot is Sinz approved <:sinz_approved:1042760945052692571>');
	},
};

async function createDirkSay(interaction) {
    const textToSay = interaction.options.getString('input')
    const dirk = ""
    let speechBubble = buildSpeechBubble(textToSay);
    interaction.reply(speechBubble)
}

function buildSpeechBubble(text){
    const bubblePadding = 2;

    let returnString = " ";
    for (let i = 0; i < text.length + bubblePadding; i++) {
        returnString += "⎯"
    }

    returnString += `\n< ${text} >\n `

    for (let i = 0; i < text.length + bubblePadding; i++) {
        returnString += "⎯"
    }
    returnString = "\`\`\`\n" + returnString + bubbleConnection + "\`\`\`";
    return returnString;
}