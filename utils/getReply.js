const {dirkQuote} = require('./bibleQuotes.js');
const { Client, Collection, Events, GatewayIntentBits} = require('discord.js');
const fs = require('fs');

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
    let sicher = Math.floor(Math.random()*100);
    console.log(sicher);
    if(sicher <= 98){
      message.reply({
		      files: [{
   	      attachment: 'gods work/sicher.png',
   	      name: 'sicher.png',
     	    description: 'SICHER'
  		  }]
	    });
    }
    else{
      message.reply({
		      files: [{
   	      attachment: 'gods work/youngsicher.png',
   	      name: 'sicher.png',
     	    description: 'SICHER'
  		  }]
	    });
    } 
  }

  if(message.content.toLowerCase().includes("rick")||message.content.toLowerCase().includes("nie")){
    message.reply({
      files: [{
      attachment: 'gods work/rickastley.gif',
      name: 'rickastley.gif',
      description: 'YOU WERE RICKROLLED'
      }]
    });
  }

}  
module.exports.getReply = getReply;
