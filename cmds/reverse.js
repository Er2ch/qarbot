module.exports.info = {
name: 'reverse',
regex: /rev(erse)?/,
desc: 'Поворачивает текст',
args: '<текст>',
private: false,
hidden: false
}
module.exports.run = (message, args) => {
if(!args[0]) ErtuAPI.err0r(message, 'Не указан текст', 'Укажите его', '=reverse лето');
else message.channel.send(args.join(' ').split('').reverse().join('') || 'Была произведена ошибка', {disableEveryone: true})
}