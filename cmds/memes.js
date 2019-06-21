module.exports.info = {
name: 'memes',
regex: /meme(s(ы)?)?|мем(асов|чиков|ов)?/,
desc: 'Показывает рандомный мем',
args: '',
private: false,
hidden: false
}
module.exports.run = (message) => ErtuAPI.api.meme(process.env.ErtuAPIkey, r => r.url?message.channel.send(new ErtuAPI.Discord.RichEmbed().setTitle('Очень смищно').setURL(r.url).setColor('55ff55').setImage(r.url)):ErtuAPI.err(message, 'В ErtuAPI произошли неполадки. Сообщите разработчику\n\nSTATUS: ' + r.status + '\nMESSAGE: ' + r.message))