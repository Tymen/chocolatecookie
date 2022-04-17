// <=========> Play command <=========> //
const { joinVoiceChannel, getVoiceConnection, createAudioResource } = require('@discordjs/voice');

const play = (message, args, ytdl, servers, player) => {
    let playMusic = (voiceConnection, message) => {


        let connection = voiceConnection(message.guild.id);
        let server = servers[message.guild.id];

        const resource = createAudioResource(ytdl(server.queue[0], {filter: "audioonly"}));
        player.play(resource);
        server.dispatcher = connection.subscribe(player);
        console.log(server.queue)
        server.queue.shift();
        player.on("idle", function() {
            if(server.queue[0]){
                playMusic(getVoiceConnection, message);
            }else {
                connection.destroy();
            }
        })
    }

    if (!args[0]) {
        message.channel.send("Provide a link!");
    }

    if(!message.member.voice.channel) {
        message.channel.send("You must be in a voice channel to play music!");
    }
    
    if(!servers[message.guild.id]) servers[message.guild.id] = {
        queue: []
    };
    
    var server = servers[message.guild.id];
    server.queue.push(args[0]);

    message.reply("Added song to queue!");

    if(!getVoiceConnection(message.guild.id)) {
        joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator
        })
        playMusic(getVoiceConnection, message);
    }
    
}

module.exports = { play }