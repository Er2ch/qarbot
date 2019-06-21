const jimp = require('jimp')
module.exports.info = {
name: 'rank',
regex: /ran[kg]|ран[кг]/,
desc: 'Showing your XP, money and level',
args: '[@member]',
private: false,
hidden: false
}
module.exports.run = async (message, args) => {
  const EertuAPI = require('/app/bot')
let user = message.mentions.users.first() || message.author;
if(user.bot) return message.reply('bots not have any XP');
await message.channel.startTyping();
const rcard = (rpr, rlvl, rxp, length, timer) => {
const {Canvas} = require('canvas-constructor');
jimp.read(user.avatarURL).then(async avatar => {
await jimp.read('https://media.discordapp.net/attachments/556868793855377408/587618312125677568/avatarmask.png').then(async mask => {
await avatar.resize(200, 200).mask(mask, 0, 0);
await jimp.read('https://media.discordapp.net/attachments/556868793855377408/587601530346143744/bgmask.png').then(async bgmask => {
await jimp.read(rpr.bg).then(async bg => {
await bg.resize(934, 282).blur(5).mask(bgmask);
await jimp.read(new Canvas(700, 20).setColor('#' + bg.getPixelColor(96, 100).toString(16).slice(0, -2)).addRect(0, 0, Math.ceil(length), 20).toBuffer()).then(async bar => {
await jimp.read('https://media.discordapp.net/attachments/556868793855377408/587604793720045609/xpmask.png').then(async xpmask => await bar.mask(xpmask.resize(700, 20), 0, 0));
await bar.resize(634, 40); if(user.id === '') await jimp.read('https://media.discordapp.net/attachments/556868793855377408/583641792466124810/staff.png').then(async sicon => await bg.composite(sicon, 55, 5));
if(user.presence.status === 'online') await jimp.read('https://media.discordapp.net/attachments/556868793855377408/587598608971333632/online.png').then(async online => await avatar.composite(online, 141, 151)); if(user.presence.status === 'idle') await jimp.read('https://media.discordapp.net/attachments/556868793855377408/587598642785812480/idle.png').then(async idle => await avatar.composite(idle, 141, 151)); if(user.presence.status === 'offline') await jimp.read('https://media.discordapp.net/attachments/556868793855377408/587598696003141642/invisible.png').then(async offline => await avatar.composite(offline, 141, 151)); if(user.presence.status === 'dnd') await jimp.read('https://media.discordapp.net/attachments/556868793855377408/587598670359166977/dnd.png').then(async dnd => await avatar.composite(dnd, 141, 151));
await jimp.loadFont('./fonts/uni-sans-heavy-64-white.fnt').then(async fnt => {
await bg
.composite(avatar, 50, 50)
.composite(bar, 255, 210)
.print(fnt, 255, 146, user.tag)
.print(fnt, 655, 0, 'lvl: ' + rlvl)
.print(fnt, 350, 50, rxp + '/' + (5 * (rlvl ^ 2) + 50 * rlvl + 100) + ' xp')
.print(fnt, 245, 0, 'money:$' + (rpr.money.toString().length > 3?rpr.money.toString().slice(0, -(rpr.money.toString().length - 3)) + 'K':rpr.money))
.getBuffer(jimp.MIME_PNG, async(err, buff) => {
await message.channel.stopTyping();
message.channel.send('Made for ' + Math.ceil((Date.now() - timer) / 1000) + ' seconds ', {files: [await new ErtuAPI.Discord.Attachment(buff, 'rank.png')]})})})})})})})})};
if(!['prev', 'preview'].includes(args[0])) EertuAPI.profile(process.env.ErtuAPIkey, user.id, r => {let rpr = r.profile; rcard(rpr, rpr.level, rpr.xp, (rpr.xp / ((5 * (rpr.level ^ 2) + 50 * rpr.level + 100) / 100)) * 7, Date.now())});
else rcard({bg: 'https://cdn.mee6.xyz/plugins/levels/cards/backgrounds/4cc81b4c-c779-4999-9be0-8a3a0a64cbaa.jpg', money: 228000}, 12, /*429*/769, ((769 / ((5 * (12 ^ 2) + 50 * 12 + 100) / 100)) * 7), Date.now())}