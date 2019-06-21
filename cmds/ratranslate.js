module.exports.info = {
name: 'translate',
regex: /translate/,
desc: 'Translator',
args: ['<lang>', '<text>'],
private: false,
hidden: false
}
module.exports.run = (message, args) => {
                     var lng = args[0];
//if(['russian', 'русский', 'rus'].includes(lng)) lng = 'ru';
//if(['ukraine', 'uk', 'украинский', 'ук', 'ukr'].includes(lng)) lng = 'uk';
//if(['english', 'английский', 'eng', 'English', 'Английский'].includes(lng)) lng = 'en';
if(['langs', 'languages', 'языки'].includes(args[0])) return message.channel.send(`Посмотреть список языков можно тут --> https://snipp.ru/view/137`);
let txt = args.join(" ").replace(`${lng}`, "");
require('request')(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20181202T195027Z.a57565d4a85d089a.c0204f150bbaf72674ee2dbdd5d2faa8114b5c47&text=${encodeURIComponent(txt)}&lang=${lng}`, (err, res, body) => {

let arr = JSON.parse((body));
if(arr.message === "The specified translation direction is not supported" || arr.message === "Invalid parameter: lang") return message.reply('укажите верный язык. Например en, ru, uk...');
if(!arr.text) return ErtuAPI.err(message, 'Укажите текст')

let trEmb = new ErtuAPI.Discord.RichEmbed()
.setTitle(`From ${arr.lang.split('-')[0]} to ${arr.lang.split('-')[1]}`)
.addField("До перевода", txt)
.addField("После перевода", arr.text)
.setFooter('ндекс переводчик', 'https://yastatic.net/iconostasis/_/8lFaTHLDzmsEZz-5XaQg9iTWZGE.png')
.setColor('00ff00')
message.channel.send(trEmb);
})}