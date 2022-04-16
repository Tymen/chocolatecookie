// <=========> Play command <=========> //

var servers = {};

const play = (message, args, ytdl) => {

    let playMusic = (connection) => {
        let server = servers[message.guild.id];
        
        server.dispatcher = connection.play(ytdl(server.queue[0], {filter: "audioonly"}))

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

    if(!message.member.voice.channel) {
        message.channel.send("You must be in a voice channel to play music!");
    }
    
    if(!servers[message.guild.id]) servers[message.guild.id] = {
        queue: []
    };
    
    var server = servers[message.guild.id];

    server.queue.push(args[0]);

    if(!message.guild.voiceConnection) message.member.voice.channel.join().then(function(connection){
        playMusic(connection, message);
    })
}

module.exports = { play }