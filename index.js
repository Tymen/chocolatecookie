// <=========> Define Variables, Modules <=========> //

// Discord imports
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MEMBERS, 
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
]});

// Module imports
require('dotenv').config();
const { EventResponse } = require('./modules/commands')

// Define Variable
const { customMessage } = require('./modules/customMessage')
const welcome = client.channels.cache.get('764855446938189836')
var servers = {};
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

client.on('messageCreate', message => {
    EventResponse(message, client, servers);
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