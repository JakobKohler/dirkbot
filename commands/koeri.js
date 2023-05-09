const { SlashCommandBuilder } = require('discord.js');
const koeriIDs = ['<:koeri1:1062484320108957801>', '<:koeri2:1062484325276336218>', '<:koeri3:1062484329806176276>', '<:koeri4:1062484331882348585>', '<:koeri5:1062484336013738034>', '<:koeri6:1062484339402756127>'];
const notKoeriIDs = ['<:notKoeri1:1085944488515608676>','<:notKoeri2:1085944490583392428>','<:notKoeri3:1085944493309706251>','<:notKoeri4:1085944496304423042>','<:notKoeri5:1085944497944412201>','<:notKoeri6:1085944501043990639>'];
const messages = ['today I can recommend you ', 'the best kœri is ', 'how about ', 'why not try the very special ', 'you shall choose '];
const randomArray = [1,2,2,3,3,3,3,3,4,4,5];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('koeri')
		.setDescription('description')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('option description')),
	async execute(interaction) {
        /* store optional insert string */
        let name = interaction.options.getString('name');
        var output;
        var outputMessage;

        /* get name of user who triggered the command */
		const userInfo = await interaction.guild.members.fetch(interaction.user.id);
		const nickname = userInfo.nickname;
		const username = userInfo.user.username;

        /* assignment of correct name for output message */
		if(name === null && nickname === null){
			name = username;
		} else if(name === null && nickname != null) {
			name = nickname;
		} //else case uses optional insert string from above

        /* random index for message array */
        var randomMessage = Math.floor(Math.random() * (messages.length));
		
        /* koeri random generator */
        let koeriChance = Math.floor(Math.random()*200);
        let specialCase = false;

        /* special case: salt */
        if(koeriChance == 0){
            specialCase = true;
            outputMessage = name + ', ' + messages[randomMessage] + '<:0erKoeri:1084759157296615434> kœri';
        }
        /* special case: infinity */
        else if(koeriChance == 199){
            specialCase = true;
            outputMessage = name + ', ' + messages[randomMessage] + '<:infinity1:1062613571751661628><:infinity2:1062613573928505364><:infinity3:1062613576956792862><:infinity4:1062613580215754782> kœri';
        }
        else{
            let randomIndex = Math.floor(Math.random() * randomArray.length);   //generate random index for koeri weighting
            let koeriNumber = randomArray[randomIndex];                         //get correct number of koeri variations

            /* if more than 3 koeris recommended, the inverse koeri varations are listed */
            if(koeriNumber <= 3){
                var shuffledKoeri = koeriIDs.sort((a, b) => 0.5 - Math.random());       //shuffle koeriID array
                var slicedKoeri = shuffledKoeri.slice(0, randomArray[randomIndex]);     //slice at correct index
            } else{
                var shuffledKoeri = notKoeriIDs.sort((a, b) => 0.5 - Math.random());
                var slicedKoeri = shuffledKoeri.slice(randomArray[randomIndex], koeriIDs.length);
            }
            slicedKoeri.sort();
			output = slicedKoeri;
        }

        /* return statement */
        if(specialCase == false){
            outputMessage = name + ', ' + messages[randomMessage] + output + ' kœri';
        }
        
        /* fondorisation */
        let fondorChance = Math.floor(Math.random()*100);
        if(fondorChance < 15){
            outputMessage = outputMessage + ', aber<:7erKoeri:1100706835473907762>verfeinert den Geschmack';
        } else if(fondorChance >= 15 && fondorChance < 30){
            outputMessage = outputMessage + ', doch durch<:7erKoeri:1100706835473907762>wird der Geschmack vollendet';
        }

        return interaction.reply(outputMessage + '!');
	},
};