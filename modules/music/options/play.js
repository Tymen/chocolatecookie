// <=========> Play command <=========> //
const { joinVoiceChannel, getVoiceConnection, createAudioResource } = require('@discordjs/voice');
const { customMessage } = require('../../customMessage')

const play = async (message, ytdl, servers, player, skip) => {
    let playMusic = async (voiceConnection, message) => {

        let connection = voiceConnection(message.guild.id);
        let server = servers[message.guild.id];
        
        let stream = await ytdl.stream(server.queue[0].url)
        let resource = createAudioResource(stream.stream, {
            inputType: stream.type
        })
        player.play(resource)

        connection.subscribe(player)
        player.play(resource);
        server.dispatcher = connection.subscribe(player);

        player.on("idle", function() {
            if(server.queue[0]?.url && server.queue > 0){
                server.queue.shift();
                playMusic(getVoiceConnection, message);
            }else {
                connection.destroy();
            }
        })
    }
    if(!getVoiceConnection(message.guild.id) && !skip) {
        joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator
        })
        playMusic(getVoiceConnection, message);
    }
    if (skip) {
        if (getVoiceConnection(message.guild.id)) {
            if(servers[message.guild.id]?.queue?.length > 0) {
                getQueue = servers[message.guild.id].queue;
                getQueue.shift();
                if (getQueue.length > 0) {
                    customMessage.tempMessage(message, "Now playing: " + getQueue[0].title, 5)
                    playMusic(getVoiceConnection, message);
                } else {
                    customMessage.tempMessage(message, "The queue is empty!", 5)
                    message.channel.send("The queue is empty!")
                    getVoiceConnection(message.guild.id).destroy();
                }
            }else {
                customMessage.tempMessage(message, "The queue is empty!", 5)
                getVoiceConnection(message.guild.id).destroy();
            }
        } else {
            message.channel.send("chocolatecookie is not in a voice channel!")
        }
    }
}

module.exports = { play }