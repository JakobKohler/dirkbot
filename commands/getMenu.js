const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const { getMenu } = require("../utils/fetchMensaMenu.js");
const { createMenuEmbed } = require('../utils/buildMenuEmbed');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('mensa')
		.setDescription('Get the menu of Mensa Moltke on a given day')
        .addStringOption(option =>
            option.setName('date')
                .setDescription('Enter date like: dd.mm.yyyy or dd.mm')
                .setRequired(false)),
	async execute(inter) {
        let interaction = inter;
        let date = "";
        if(interaction.options.getString('date')){
            date = parseDate(interaction.options.getString('date'));

            if(!date) return interaction.reply("Dieses Datum ist nicht Teil der formalen Sprache aller validen Daten");
        }

        let fetchResults = await getMenu(date)

        if(fetchResults.error) return interaction.reply("There was an error regarding the communication with the Mensa API Server");

        if(!fetchResults.menuData || fetchResults.menuData.length == 0){
            const dayOfRequest = date ? new Date(date) : new Date();
            return interaction.reply(`Mensa Moltke seems to be closed on ${printDate(dayOfRequest)}`);
        }
        const menuEmbed = createMenuEmbed(fetchResults.menuData);
        interaction.reply({ embeds: [menuEmbed] })
        
	},
};

function parseDate(givenDate){
    const dateRegex = /^[0-9]{2}.[0-9]{2}.[0-9]{4}|^[0-9]{2}.[0-9]{2}/g
    if (!givenDate.match(dateRegex)) return "";

    let [day, month, year] = givenDate.split('.');
    if(!year) {
        year = new Date().getFullYear()
    }

    let dateToTest = new Date(year, month, day);
    if(month < 1 || month > 12 || dateToTest.getDate() != day){
        return "";
    }

    console.log(`${year}-${month}-${day}`);
    return `${year}-${("0" + month).slice(-2)}-${("0" + day).slice(-2)}`;
}

function printDate(date){
    return date.toISOString().split("T")[0].split("-").reverse().join(".");
}