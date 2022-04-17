// <=========> Module imports <=========> //
const ytdl = require('ytdl-core');
const { createAudioPlayer, NoSubscriberBehavior } = require('@discordjs/voice');
// <=========> Command imports <=========> //
const { play } = require('./options/play');
const { stop } = require('./options/stop');
const { pause } = require('./options/pause');
const { unpause } = require('./options/unpause');

const player = createAudioPlayer({
    behaviors: {
        noSubscriber: NoSubscriberBehavior.Pause,
    },
});

// <=========> Music Commands <=========> //
const music = {
    playMusic: (message, args, servers) => {
        play(message, args, ytdl, servers, player);
    },
    pause: () => {
        pause(player);
    },
    unpause: () => {
        unpause(player);
    },
    stop: (message) => {
        stop(message);
    }
}

module.exports = { music }