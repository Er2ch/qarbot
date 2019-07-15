module.exports.info = {
name: 'sa',
regex: /s(-)?a/,
desc: 'Вычисляет среднее арифметическое',
args: '<n>',
private: false,
hidden: false
}
module.exports.run = (message, args) => {if(!args[0]) return ErtuAPI.err0r(message, 'Не указаны числа', 'Укажите их', '=sa 5 2 3 1'); let i = 0; args.filter(a => !isNaN(a)).forEach(n => i = i + Number(n)); i > 0?ErtuAPI.succ(message, i / args.filter(a => !isNaN(a)).length):message.channel.send(new ErtuAPI.Discord.RichEmbed().setTitle('ERROR').setDescription('**Число не получилось**').setColor('ff5555'))}