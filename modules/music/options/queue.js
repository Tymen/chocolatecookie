const queue = {
    addQueue: async (message, args, ytdl, servers) => {
        if (!args[0]) {
            message.channel.send("Provide a argument");
        }
    
        if(!message.member.voice.channel) {
            message.channel.send("You must be in a voice channel to play music!");
        }
        
        if(!servers[message.guild.id]) servers[message.guild.id] = {
            queue: []
        };
        
        var server = servers[message.guild.id];
        let yt_info = await ytdl.search(args.join(" "), { source : { youtube : "video" } })
        console.log(server);
        musicCache = {
            title: `${ yt_info[0].title } (${ yt_info[0].durationRaw }) | ${ yt_info[0].channel.name }`,
            url: yt_info[0].url
        }
        server.queue.push(musicCache);
    
        await message.channel.send(`Added ${musicCache.title} to the queue`);
    }
}
module.exports = { queue };