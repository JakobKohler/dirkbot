const { SlashCommandBuilder } = require('discord.js');
const koeri = [0,1,2,3,4,5];
const outputs = ['today I can recommend you ', 'the best kœri is ', 'how about ', 'why not try the very special ', 'you shall choose '];
const koeriIDs = ['<:koeri1:1062484320108957801>', '<:koeri2:1062484325276336218>', '<:koeri3:1062484329806176276>', '<:koeri4:1062484331882348585>', '<:koeri5:1062484336013738034>', '<:koeri6:1062484339402756127>'];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('koeri')
		.setDescription('Dirk is going to recommend you an excellent choice of kœri. Give it a try!')
		.addStringOption(option =>
            option.setName('name')
                .setDescription('Enter a name, who should get a kœri recommendation')),
	async execute(interaction) {
		let nametext = interaction.options.getString('name');

		//read servername of the user who sent the command
		const interactionUser = await interaction.guild.members.fetch(interaction.user.id);
		const nickname = interactionUser.nickname;
		const username = interactionUser.user.username;

		//random generation of the koeri combination and output message
		let i = Math.floor(Math.random() * 6);
		let j = Math.floor(Math.random() * (outputs.length));
		const shuffledKoeri = koeri.sort((a, b) => 0.5 - Math.random());
		const first = shuffledKoeri.slice(0, i + 1);
		first.sort();
		let output = first;
		for (let k = 0; k < output.length; k++) {
			output[k] = koeriIDs[output[k]];
			}

		//nickname only used, when normal Discord Username overwritten
		if(nametext === null && nickname === null){
			nametext = username;
		} else if(nametext === null && nickname != null) {
			nametext = nickname;
		}

		if (first.length == koeri.length){
			return interaction.reply(nametext + ', ' + outputs[j] + '<:infinity1:1062613571751661628><:infinity2:1062613573928505364><:infinity3:1062613576956792862><:infinity4:1062613580215754782> kœri!');
		} else {
			return interaction.reply(nametext + ', ' + outputs[j] + output + ' kœri!');
		}
	},
};