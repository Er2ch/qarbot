module.exports.info = {
name: 'used',
regex: /us[ei][dt]/,
desc: 'Показать, сколько использовали команд',
args: '',
private: false,
hidden: false
}
module.exports.run = (message, x, prixix) => {
const arr = [];
ErtuAPI.commands.forEach(c => {
if(c.used && !c.private && !c.hidden) arr.push(c)
})
arr.sort((c1, c2) => c2.used - c1.used);
message.channel.send(arr.map(c => `${prixix[1]}${c.name} - ${ErtuAPI.addCommas(c.used)} ${c.used < 2?'use':'uses'}`).join('\n'))
}