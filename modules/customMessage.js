// <=========> Define Variables, Modules <=========> //

// Discord Module
const Discord = require('discord.js');

// ytdl

let getMemberCount = (client) => {
    return client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
 };


// Define Variables
const defaultColor = '#0099ff'
const defaultAuthor = 'chocolatecookie'

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
        .setAuthor(defaultAuthor)
        .addFields(
            { name: '\u200B', value: '+help', inline: true },
            { name: '\u200B', value: '=>', inline: true },
            { name: '\u200B', value: 'commands overview', inline: true },
        )
        .setThumbnail("https://cdn.discordapp.com/attachments/964616970681085992/964671869116616785/unknown.png")
    },

    pannenkoek: () => {
        return new Discord.MessageEmbed()
        .setColor(defaultColor)
        .setTitle('Anouk is de enige echte pannenkoek')
        .setAuthor(defaultAuthor)
        .setThumbnail("https://cdn.discordapp.com/attachments/430655027284148225/764628105783803924/Z.png")
    },

    muntrix: () => {
        return new Discord.MessageEmbed()
        .setColor(defaultColor)
        .setTitle('"Geef me smoochie op me eikel dan!" ~ Muntrix')
        .setAuthor(defaultAuthor)
        .setThumbnail("https://cdn.discordapp.com/attachments/430655027284148225/764631803671085136/women-love-huge-balls.png")
    },
}

module.exports = { customMessage }