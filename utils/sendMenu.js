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
    channel.send({ embeds: [menuEmbed] });
}
module.exports.sendMenu = sendMenu;