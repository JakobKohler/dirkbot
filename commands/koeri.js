const { SlashCommandBuilder } = require('discord.js');
const koeri = [1,2,3,4,5,6];
const outputs = ['today I can recommend you ', 'the best kœri is ', 'how about ', 'why not try the very special ', 'you shall choose '];

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

		//random generation of the koeri combination and output message
		let i = Math.floor(Math.random() * 7) + 1;
		let j = Math.floor(Math.random() * (outputs.length));
		const shuffledKoeri = koeri.sort((a, b) => 0.5 - Math.random());
		const first = shuffledKoeri.slice(0, i);
		first.sort();

		if(nametext === null){
			nametext = nickname;
		}

		if (first.length == koeri.length){
			return interaction.reply(nametext + ', ' + outputs[j] + 'infinity kœri!');
		} else {
			return interaction.reply(nametext + ', ' + outputs[j] + first + 'er kœri');
		}
	},
};