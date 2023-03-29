const {dirkQuote} = require('./bibleQuotes.js');
const { Client, Collection, Events, GatewayIntentBits} = require('discord.js');
const fs = require('node:fs');
const { generateSayText } = require("./generateSayText");
var quiz = false;

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
  if (Math.floor(Math.random() * 2)) {	
  if(message.content.toLowerCase().includes("richtig")||message.content.toLowerCase().includes("korrekt")||message.content.toLowerCase().includes("Martin")){
     message.reply({
	     files: [{
		     attachment: 'gods work/richtig.png',
		     name: 'richtig.png',
		     description: 'RICHTIG'
	     }]
     });
  }
  }
  if(message.content.toLowerCase().includes("rick")||message.content.toLowerCase().includes(" nie ")){
    message.reply({
      files: [{
      attachment: 'gods work/rickastley.gif',
      name: 'rickastley.gif',
      description: 'YOU WERE RICKROLLED'
      }]
    });
  }

  if(quiz) {
		if(message.content.toLowerCase().includes("forum")||(message.content.toLowerCase().includes("gegeben")&&message.content.toLowerCase().includes("gesucht"))||message.content.toLowerCase().includes("spickzettel")) {
			message.reply("richtig");
		} else {
			message.reply("falsch");
		}
		quiz = false;
	} else if(message.content.toLowerCase().includes("-quiz")) {
		var questions = fs.readFileSync('./gods work/quiz.txt').toString().split("\r");
    let number = Math.floor(Math.random() * questions.length);
		let question = questions[number];
		message.reply(generateSayText("rolle", question));
		quiz = true;
	}

  if(message.content.length >= 242){
    message.reply("HALT STOP! Jetzt reicht es auch mal! Fass dich mal bitte kürzer... *sigh*");
  }

}  
module.exports.getReply = getReply;
