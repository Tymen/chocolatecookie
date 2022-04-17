// <=========> Define Variables, Modules <=========> //

// Discord Module
const Discord = require('discord.js');

let getMemberCount = (client) => {
    return client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
 };

// Define Variables
const defaultColor = '#0099ff'
const defaultAuthor = { name: 'Some name' };

// Custom messages
const customMessage = {
    welcomeMessage: (Author, client) => {
        return new Discord.MessageEmbed()
        .setColor(defaultColor)
        .setTitle(Author.username + ", chocolatecookie")
        .setAuthor(defaultAuthor)
        .setDescription("Don't forget to read the rules")
        .setDescription("You're member: " + getMemberCount(client))
        .setThumbnail(Author.avatarURL())
    },
    leaveMessage: (Author, client) => {
        return new Discord.MessageEmbed()
        .setColor(defaultColor)
        .setTitle(Author.username + ' left the server')
        .setAuthor(defaultAuthor)
        .setDescription("homies has " + getMemberCount(client) + " members")
        .setThumbnail(Author.avatarURL())
    },
    help: () => {
        return new Discord.MessageEmbed()
        .setColor(defaultColor)
        .setTitle('chocolatecookie command list')
        .setAuthor('\u200B')
        .addFields(
            { name: '\u200B', value: '\u200B', inline: false },
            { name: '**-> +help**', value: "shows a list of all available commands", inline: false},
            { name: '**-> +play**', value: "Play music from youtube! use links or search arguments", inline: false},
            { name: '**-> +stop**', value: "Stop playing music and disconnect the bot from the voice channel", inline: false},
            { name: '**-> +pause**', value: "Pause the music", inline: false},
            { name: '**-> +unpause**', value: "unpause the music", inline: false}
        )
        
        .setThumbnail("https://cdn.discordapp.com/attachments/964616970681085992/964671869116616785/unknown.png")
    },
}

module.exports = { customMessage }