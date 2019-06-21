module.exports.info = {
name: 'top',
regex: /top|тор/,
desc: 'Показывает топ человек по уровням',
args: '',
private: false,
hidden: false
}
module.exports.run = (message) => {
message.reply('команда была отключена из-за багов')
/*let d = []
for(i in xp) {
if(!client.users.get(i)) break; //delete xp[i]
d.push({id: i, data: xp[i]})
}
  //d.forEach(i => client.users.get(i.id)?'':delete d[i.id])
d = d.sort((a, b) => b.data.xp - a.data.xp && b.data.level - a.data.level)
for(let o = 0; o < d.length; o++) d[o].position = o + 1
message.channel.send(new Discord.RichEmbed().setAuthor('Leadboard (first 15 members)').setDescription(client.cS(d.map(i => i.position + '. ' + client.users.get(i.id).tag + ' - **' + i.data.level + ' lvl ' + i.data.xp + ' xp**'), 1, 15)).setFooter('Your leadboard rank: ' + d.find(i => i.id === message.author.id).position, message.author.avatarURL))
*/
}