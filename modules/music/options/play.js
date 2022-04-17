// <=========> Play command <=========> //
const { joinVoiceChannel, getVoiceConnection, createAudioResource } = require('@discordjs/voice');

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
        // console.log(server.queue)
        player.on("idle", function() {
            if(server.queue[0]?.url){
                server.queue.shift();
                playMusic(getVoiceConnection, message);
            }else {
                connection.destroy();
            }
        })
    }
    if(!getVoiceConnection(message.guild.id)) {
        joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator
        })
    }
    if (skip || (getVoiceConnection(message.guild.id) && skip == false)) {
        playMusic(getVoiceConnection, message);
    }
}

module.exports = { play }