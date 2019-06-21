module.exports.info = {
name: 'ping',
regex: /p[ie]n[gг]|п[ие]нг/,
desc: 'Ping',
args: ''
}
module.exports.run = (message) => message.channel.send('Ping...').then(msg => ErtuAPI.api.ping(eapi => msg.edit(new ErtuAPI.Discord.RichEmbed().setColor('ff0000').setTitle('PONG').setDescription(`Discord API: ${ErtuAPI.addCommas(Math.round(ErtuAPI.client.ping))} ms\nErtu API: ${Date.now() - eapi.ts} ms\nBot: ${Date.now() - msg.createdAt} ms`))))