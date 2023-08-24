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
    const currentDate = new Date();
    const semesterStart = new Date('2023-09-25');
    const semesterEnd = new Date('2024-02-09');
    const christmasVacationStart = new Date('2023-12-22');
    const christmasVacationEnd = new Date('2024-01-07');
    
    //Semesterferien 23
    if(currentDate < semesterStart){
      return false;
    }
  
    //Weihnachten 23-24
    if(christmasVacationStart <= currentDate && christmasVacationEnd >= currentDate){
      return false;
    }
  
    //Semesterferien 24
    if(currentDate > semesterEnd){
     return false;
    }
    
    return true;
}

module.exports.sendMenu = sendMenu;
