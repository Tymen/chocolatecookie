// <=========> Define Variables, Modules <=========> //

// Module imports
const ytdl = require('ytdl-core');
require('dotenv').config();
const { customMessage } = require('./customMessage')
// Define Variable
const prefix = process.env.COMMAND_PREFIX;
const reply = (message, value) => {
    return message.channel.send(value)
}
var servers = {};
// <=========> Message Handler <=========> //
const EventResponse = (message, client) => {
    if (!message.author.bot && message.content.startsWith(prefix)){
        const args = message.content.slice(prefix.length).trim().split(' ');
        const command = args.shift().toLowerCase();
        console.log(args);
        switch(command) {
            case 'welcome':
                reply(message, customMessage.welcomeMessage(message.author, client));
                break;
            case 'help':
                reply(message, customMessage.help())
                break;
            case 'play':
                
                let play = () => {
                    let server = severs[message.guild.id];
                    
                    server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}))

                    server.queue.shift();

                    server.dispatcher.on("end", function() {
                        if(server.queue[0]){
                            play(connection, message);
                        }else {
                            connection.disconnect();
                        }
                    })
                }

                if (!args[0]) {
                    message.channel.send("Provide a link!");
                }

                if(!message.member.voiceChannel) {
                    message.channel.send("You must be in a voice channel to play music!");
                }
                
                if(!servers[message.guild.id]) servers[message.guild.id] = {
                    queue: []
                };
                var server = servers[message.guild.id];

                if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(client){
                    play(connection, message);
                })
                break;


        }
    }
    console.log(message.author.username + ": " + message.content)
}

// <=========> Export Module <=========> //
module.exports = { EventResponse }