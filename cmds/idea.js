module.exports.info = {
name: 'idea',
regex: /ide(y)?a|иде[яа]/,
desc: 'Отправить идею разработчику',
args: '<идея>',
private: false,
hidden: false
}
module.exports.run = (message, args) => {
let bai = require('./bugsandideas.json')
if (!args[0]) return message.reply('Не указана идея');
let idea = args.join(" ");
let ticket = 0
for(x in bai) ticket = ticket + 1
ticket = ticket + 1
//client.send(bugsAndIdeas, )
ErtuAPI.client.channels.get('541863470359117863').send(new ErtuAPI.Discord.RichEmbed().setTitle('IDEA').setColor('#ffff00').setAuthor(message.author.tag, message.author.avatarURL).setDescription(`Идея от \`${message.author.tag}\` (${message.author.id}):\n\n**${idea}**\n\nСтатус: обрабатывается QarBot Team`).setFooter('Ticket ' + ticket, ErtuAPI.client.user.avatarURL)).then(msg => {
bai[ticket - 1] = {id: ticket, type: 'idea', by: message.author.id, content: idea, msgid: msg.id, fixed: 0, banned: 0}
})
require('fs').writeFile('./bugsandideas.json', JSON.stringify(bai), err => err?console.log(err):'')
ErtuAPI.succ(message, 'Идея успешно отправлена.\nЕё тикет: ' + ticket);
}