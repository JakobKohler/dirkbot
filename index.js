#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { useTestBot } = require('./tokenSelection.json');
const config = require('./config.json');
const {dirkQuote} = require('./utils/bibleQuotes.js');
const {getReply} = require('./utils/getReply.js')
const { generateSayText } = require("utils/generateSayText");

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
var quiz = false;

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, () => {
	console.log('Ready!');
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on('messageCreate', async (message) =>{
	if(message.author.bot) return;
	if(quiz) {
		if(message.content.toLowerCase().includes("forum")||(message.content.toLowerCase().includes("gegeben")&&message.content.toLowerCase().includes("gesucht"))||message.content.toLowerCase().includes("spickzettel")) {
			message.reply("richtig");
		} else {
			message.reply("falsch");
		}
		quiz = false;
	} else if(message.content.toLowerCase().includes("-quiz")) {
		var questions = fs.readFileSync('gods work/quiz.txt').toString().split("\r");
		let question = questions[Math.floor(Math.random()*questions.length)];
		message.reply(generateSayText("rolle", question));
		quiz = true;
	} else {
		getReply(message);
	}
});

client.login(useTestBot ? config.tokenTest : config.token);
