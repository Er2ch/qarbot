module.exports.info = {
name: 'bug',
regex: /bu[gk]|ба[гк]/,
desc: 'Отправить баг(ошибку) разработчику',
args: '<баг(ошибка)>',
private: false,
hidden: false
}
module.exports.run = (message, args) => {
let bai = require('./bugsandideas.json')
if (!args[0]) return message.reply('Не указан баг');
let bug = args.join(" ");
let ticket = 0
for(x in bai) ticket = ticket + 1
ticket = ticket + 1
//client.send(bugsAndIdeas, new Discord.RichEmbed().setTitle('STATUS').setColor('#ffff00').setDescription('Разраб будет решать данный баг\n\n✓✓✓'))
ErtuAPI.client.channels.get('541863470359117863').send(new ErtuAPI.Discord.RichEmbed().setTitle('BUG').setColor('#ffff00').setAuthor(message.author.tag, message.author.avatarURL).setDescription(`Баг от \`${message.author.tag}\` (${message.author.id}):\n\n**${bug}**\n\nСтатус: обрабатывается QarBot Team`).setFooter('Ticket ' + ticket, ErtuAPI.client.user.avatarURL)).then(msg => {
bai[ticket - 1] = {id: ticket, type: 'bug', by: message.author.id, content: bug, msgid: msg.id, fixed: 0, banned: 0}
})
require('fs').writeFile('./bugsandideas.json', JSON.stringify(bai), err => err?console.log(err):'')
ErtuAPI.succ(message, 'Баг успешно отправлен\nЕго тикет: ' + ticket + '\nВнимание! Если вы написали несуществующий баг, то вам безвозвратно отключат все команды бота!');
    }