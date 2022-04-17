// <=========> Module imports <=========> //
const ytdl = require('play-dl')
const { createAudioPlayer, NoSubscriberBehavior } = require('@discordjs/voice');
// <=========> Command imports <=========> //
const { play } = require('./options/play');
const { stop } = require('./options/stop');
const { pause } = require('./options/pause');
const { unpause } = require('./options/unpause');
const { queue } = require('./options/queue');
const { skip } = require('./options/skip');

const player = createAudioPlayer({
    behaviors: {
        noSubscriber: NoSubscriberBehavior.Pause,
    },
});

// <=========> Music Commands <=========> //
const music = {
    playMusic: async (message, args, servers) => {
        await queue.addQueue(message, args, ytdl, servers)
        play(message, ytdl, servers, player, false);
    },
    pause: () => {
        pause(player);
    },
    unpause: () => {
        unpause(player);
    },
    stop: (message) => {
        stop(message);
    },
    skip: (message, servers) => {
        servers[message.guild.id].queue.shift();
        play(message, ytdl, servers, player, true);
    }
}

module.exports = { music }