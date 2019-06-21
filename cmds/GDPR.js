module.exports.info = {
name: 'GDPR',
regex: /gdpr/,
desc: 'GDPR archive :thinking:',
args: '',
private: false,
hidden: false
}
module.exports.run = (message) => {
const JSzip = require('jszip')
const zip = new JSzip()
const guilds = ErtuAPI.client.guilds.filter(g => g.members.get(message.author.id)).map(g => '=>' + g.name + '<=')
zip.file('README.txt', 'This is GDPR archive by QarBot\nWARNING! This information must be in secret\n©QarBot 2018-2019')
zip.folder('data').file('weather-q.txt', `Last request in =weather\n${require('/app/weather-data.json ')[message.author.id]?require('/app/weather-data.json')[message.author.id].q:'Sorry, you not have information about last request in =weather :('}`).file('data.json', `{\n${require('util').inspect(message.author)}\n}`).file('lastMessages.txt', `IN CHANNEL ${message.channel.name}. 5 LAST MESSAGES BEFORE RESTART\n${ErtuAPI.cS(message.channel.messages.filter(m => m.author.id === message.author.id).map(m => m.content), 1, 5)}`).file('servers.txt', `FOUND IN FOLLOWING SERVERS:\n${guilds.join('\n')}`)
message.author.sendFile(zip.generateAsync({type:'nodebuffer',compression:'DEFLATE'}), 'gdpr.zip')}