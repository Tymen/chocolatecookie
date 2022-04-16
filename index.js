// <=========> Define Variables, Modules <=========> //

// Discord imports
const Discord = require('discord.js');
const client = new Discord.Client();

// Module imports
require('dotenv').config();
const { EventResponse } = require('./modules/commands')

// Define Variable
const { customMessage } = require('./modules/customMessage')
const welcome = client.channels.cache.get('764855446938189836')

// <=========> Status Message <=========> //

client.once('ready', () => {
    console.log("Bot is online!");
    // client.user?.setPresence({
    //     status: "online",  // You can show online, idle... Do not disturb is dnd
    //     activities: [{
    //         name: "!help",
    //         type: "PLAYING"  // The message shown
    //     }]
    // });
    client.user.setActivity("+help", {type: "WATCHING"});
})

// <=========> Listen for messages <=========> //

client.on('message', message => {
    EventResponse(message, client);
})

client.on('guildMemberAdd', member => {
    console.log("Test");
    member.guild.channels.cache.find(channel => channel.name === 'infos').send(customMessage.welcomeMessage(member.user, client))
})

// client.on('guildMemberRemove', member => {
//     member.guild.channels.cache.find(channel => channel.name === 'infos').send(customMessage.leaveMessage(member.user, client))
// })

// <=========> Login to the discord bot client <=========> //

client.login(process.env.BOT_TOKEN)