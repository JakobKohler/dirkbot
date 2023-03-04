const {dirkQuote} = require('./bibleQuotes.js');
const { Client, Collection, Events, GatewayIntentBits} = require('discord.js');

function getReply(message) {
  
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

  if(message.content.toLowerCase().includes("assani")||message.content.toLowerCase().includes("mathe")||message.content.toLowerCase().includes("sicher")){
	  message.reply({
		  files: [{
   	  attachment: 'gods work/sicher.png',
   	  name: 'sicher.png',
     	description: 'SICHER'
  		}]
	  });
  }

}
module.exports.getReply = getReply;
