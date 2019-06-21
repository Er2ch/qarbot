module.exports.info = {
name: 'update-status',
regex: /upd(ate)?-status/,
desc: '',
args: ['<ticket>', '<color>', '<status>'],
private: true,
hidden: false
}
module.exports.run = (message, args) => {
let bai = require('./bugsandideas.json')
if(isNaN(Number(args[0]))) return ErtuAPI.err(message, 'ticket must be a number')
for(x in bai) {
if(bai[x].id === Number(args[0])) {
ErtuAPI.client.channels.get('541863470359117863').fetchMessage(bai[x].msgid).then(msg => {
msg.edit(new ErtuAPI.Discord.RichEmbed().setAuthor(client.users.get(bai[x].by).tag, client.users.get(bai[x].by).avatarURL).setTitle(bai[x].type.toString().toUpperCase()).setColor(args[1] || '#000000').setDescription(`${bai[x].type === 'idea'?'Идея':'Баг'} от \`${client.users.get(bai[x].by).tag}\` (${bai[x].by}):\n\n**${bai[x].content}**\n\nСтатус:**${args.join(' ').slice(args[0].length + args[1].length + 1)}**`).setFooter('Ticket ' + args[0], ErtuAPI.client.user.avatarURL)).then(() => ErtuAPI.succ(message, 'Status changed successful'))
})
}
}
}