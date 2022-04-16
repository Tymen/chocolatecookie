// <=========> Module imports <=========> //
const ytdl = require('ytdl-core');

// <=========> Command imports <=========> //
const { play } = require('./options/play');
const { stop } = require('./options/stop');

// <=========> Music Commands <=========> //
const music = {
    playMusic: (message, args) => {
        play(message, args, ytdl);
    },
    stop: (message) => {
        stop(message);
    }
}

module.exports = { music }