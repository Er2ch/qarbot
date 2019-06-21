module.exports.info = {
name: 'prefix',
regex: /prefix/,
desc: 'Устанавливает|сбрасывает префикс',
args: '<prefix|clear>',
private: false,
hidden: false
}
module.exports.run = (message, args) => {
let prefixes = require('/app/prefixes.json')
if(!message.member.hasPermission('MANAGE_GUILD')) return ErtuAPI.err(message, 0, 'Управление сервером')
if(!args[0]) return ErtuAPI.err(message, 'Укажите префикс')
if(args[0].match(/cl[ei](a)?r/) && prefixes[message.guild.id]) delete prefixes[message.guild.id];
else {
if(!prefixes[message.guild.id]) prefixes[message.guild.id] = {prefix: args.join('')}
else prefixes[message.guild.id].prefix = args.join('')
}
prefixes[message.guild.id]?ErtuAPI.succ(message, 'Префикс установлен на: `' + args.join('') + '`'):ErtuAPI.succ(message, 'Префикс очищен')
require('fs').writeFile('/app/prefixes.json', JSON.stringify(prefixes), (err) => err?console.log(err):'')
}