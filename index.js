const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, TextChannel } = require('discord.js');
const { token } = require('./config.json');
const {dirkQuote} = require('./utils/bibleQuotes.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

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
    if(message.content.toLowerCase().includes("dirk")){
        message.reply(dirkQuote());
    }

	if(message.content.toLowerCase().includes("rolf")||message.content.toLowerCase().includes("betz")){
        message.reply("Diese Information finden Sie im FORUM!\n (https://ilias.h-ka.de/ilias.php?ref_id=726140&cmd=showThreads&cmdClass=ilrepositorygui&cmdNode=xm&baseClass=ilrepositorygui)");
    }

	if(message.content.toLowerCase().includes("rolle")||message.content.toLowerCase().includes("wolle")){
		message.reply({
			files: [{
    	attachment: 'gods work/AROUSINGANDEDUCATIONAL2.png',
    	name: 'AROUSINGANDEDUCATIONAL2.png',
    	description: 'NOT SAFE FOR WORK'
			}]
		});
	}
	if(message.content.toLowerCase().includes("pasta")){
        var pastaDB = fs.readFileSync(`resources/PastaDB.txt`).toString().split("\n");
		message.reply(pastaDB[Math.floor(Math.random()*pastaDB.length)])
    }
	if(message.content.toLowerCase().includes("assani")||message.content.toLowerCase().includes("mathe")){
		message.reply({
			files: [{
    	attachment: 'gods work/sicher.png',
    	name: 'sicher.png',
    	description: 'SICHER'
			}]
		});
	}
});

client.login(token);
