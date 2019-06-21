module.exports.info = {
name: 'hastebin',
regex: /(haste)?bin(-)?(gen)?/,
desc: 'Создать ссылку в hastebin',
args: ['<формат>', '<текст|код>'],
private: false,
hidden: false
}
module.exports.run = (message, args) => {
              if(!args[0]) return ErtuAPI.err(message, 'Укажите формат файла. Например js или txt...');
              if(!args[1]) return ErtuAPI.err(message, 'Не указан текст.');
              let lang = args[0];
              require('hastebin-gen')(args.join(' ').slice(lang.length), `${lang}`).then(link => message.channel.send(`Сделано. Вот --> ${link.replace(/undefined/g, lang)}`)).catch(() => ErtuAPI.err(message, 'Произошла ошибка'));
          }