// <=========> Define Variables, Modules <=========> //

// Module imports
require('dotenv').config();
const { customMessage } = require('./customMessage')
const { music } = require('./music/main')

// Define Variable
const prefix = process.env.COMMAND_PREFIX;
const reply = (message, value) => {
    return message.channel.send(value)
}
const replyEmbed = (message, value) => {
    return message.channel.send({ embeds: [value] })
}
// <=========> Command Handler <=========> //
const EventResponse = (message, client, servers) => {
    if (!message.author.bot && message.content.startsWith(prefix)){

        const args = message.content.slice(prefix.length).trim().split(' ');
        const command = args.shift().toLowerCase();

        switch(command) {
            case 'welcome':
                replyEmbed(message, customMessage.welcomeMessage(message.author, client));
                break;
            case 'help':
                replyEmbed(message, customMessage.help())
                break;
            case 'play':
                music.playMusic(message, args, servers);
                break;
            case 'pause':
                music.pause();
                break;
            case 'unpause':
                music.unpause();
                break;
            case 'stop':
                music.stop(message);
                break;

        }
    }

    // <=========> Console message monitor <=========> //
    console.log(message.author.username + ": " + message.content)
}

module.exports = { EventResponse }