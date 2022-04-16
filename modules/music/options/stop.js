// <=========> Stop command <=========> //
const stop = (message) => {
    if(!message.guild.voiceConnection) message.member.voice.channel.leave();
}
module.exports = { stop };