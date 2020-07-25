const mineflayer = require('mineflayer');
const Discord = require('discord.js');
const navigatePlugin = require('mineflayer-navigate')(mineflayer);
var tpsPlugin = require('mineflayer-tps')(mineflayer);

const client = new Discord.Client();
const prefix = `!`
var options = {
    host:'server you want it to be on',
    port:25565, //change this if the port isnt 25565
    username : 'minecraft credentials' ,
    password:'minecraft credentials'

}
function createBot () {
  const bot = mineflayer.createBot(options)
  bot.loadPlugin(tpsPlugin)
  navigatePlugin(bot);
  const tellme = () => {
    console.log(`bot is ingame`)
}
bot.on(`login`,tellme)
bot.on('chat', (username, message) => {
    const args = message.split(' ')
    const cmd = message.split(' ')[0]
       if (cmd === `${prefix}help`){
        bot.chat(`/w ${username} a github repo is coming soon when development is finished`)
       }
       if (cmd === `${prefix}a`){
           bot.chat(`/w ${username} accepting`)
           bot.chat(`/tpy ${username}`)

       }
       
        if (cmd === `!tpa`){
        bot.chat(`/tpa(admin username)`)
        }
        if (cmd === `!uuid`) {
           bot.chat(`, Your uuid is ${bot.players[username].uuid}!`,)
        }
        if (cmd === '!ping') {
            bot.chat(`Your ping is ${bot.players[username].ping}!`)
        }
        if (cmd === `${prefix}tps`){
        bot.chat(`the current tps is\t` + bot.getTps)
        }
        if (cmd === `${prefix}coords`){
            bot.chat(`my current coords are ${bot.entity.position}`)
        }
       
    });

bot.on(`spawn`, function () {
    bot.chatAddPattern(/^([a-zA-Z0-9_]{3,16}) wants to teleport to you\.$/,
 "tpa",
  "recieved tpa ");

});
bot.on('tpa', function (username) {
       bot.chat(`/tpy ${username}`)
      });
bot.on(`chat`, (username,message) => {
  let channel = client.channels.cache.get('channel id of your bridge (note this bridge is one way)')
  channel.send(`<${username}> ${message}`)
}); 
  bot.on('error', (err) => console.log(err))

  bot.on('end',() => {
      console.log(`bot disconnected, reconnecting`)
     setTimeout(createBot,10000)
    })
    bot.on(`kick`,() => {
setTimeout(createBot,1000)
    });

    
}
client.login('put your discord bot token here')

createBot();