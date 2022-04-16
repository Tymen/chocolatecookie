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

// <=========> Command Handler <=========> //
const EventResponse = (message, client) => {
    if (!message.author.bot && message.content.startsWith(prefix)){

        const args = message.content.slice(prefix.length).trim().split(' ');
        const command = args.shift().toLowerCase();

        switch(command) {
            case 'welcome':
                reply(message, customMessage.welcomeMessage(message.author, client));
                break;
            case 'help':
                reply(message, customMessage.help())
                break;
            case 'play':
                music.playMusic(message, args);
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