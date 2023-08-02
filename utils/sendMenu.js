const config = require('../config.json');
const { getMenu } = require("../utils/fetchMensaMenu.js");
const { createMenuEmbed } = require('../utils/buildMenuEmbed.js');

async function sendMenu(client) {
    const guild = client.guilds.cache.get(config.guildId);
    const channel = guild.channels.cache.get(config.mensaChannelId);
    
    let fetchResults = await getMenu();
    if(!fetchResults.menuData || fetchResults.menuData.length == 0){
        return channel.send(`Mensa Moltke seems to be closed today.`);
    }

    const menuEmbed = createMenuEmbed(fetchResults.menuData);
    if(validDate()){
        channel.send({ embeds: [menuEmbed] });
    }
}

function validDate() {
    //THIS FUNCTION WORKS UNTIL FEBRUARY 2024
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    
    //Semesterferien 23
    if(year = 2023 && (month < 9 || (month === 9 && day < 25))){
        return false;
    }
    //Weihnachten 23-24
    if(year = 2023 && month === 12 && day >= 22){
        return false;
    }
    if(year = 2024 && month === 1 && day <= 7){
        return false;
    }
    //Semesterferien 24
    if(year = 2024 && (month > 2 || (month === 2 && day > 9))){
        return false;
    }
    return true;

}

module.exports.sendMenu = sendMenu;