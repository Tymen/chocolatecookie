// <=========> Stop command <=========> //
const { getVoiceConnection } = require('@discordjs/voice');

const stop = (message) => {
    connection = getVoiceConnection(message.guild.id);
    if(connection) connection.destroy();
}
module.exports = { stop };