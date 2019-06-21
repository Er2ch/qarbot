module.exports.info = {
name: 'avatar',
regex: /ava(tar)?|ава(тар|тарка)?/,
desc: 'An avatar command',
args: '[@member]',
private: false,
hidden: false
}
module.exports.run = (message, args) => {
            let uuser = message.guild.member(message.mentions.users.first() || ErtuAPI.client.users.get(args[0]));
            if (!uuser) uuser = message.member        
const uAva = (uuser, p, tp) => new ErtuAPI.Discord.RichEmbed().setTitle('Avatar').setColor('af00ff').setDescription(uuser.user.tag + '\'s (' + uuser + ')').setImage(uuser.user.avatarURL).setTimestamp().setFooter(`Page ${p} of ${tp}`);
message.channel.send('Please, waiting...').then(msg => {
async function aArrs() {
await msg.react('◀');
await msg.react('⏹');
await msg.react('▶');
}
if(args.length < 2) msg.edit(uAva(uuser, 1, 1));
if(args.length > 1) {
let t = [];
for(let i = 0; i < args.length; i++) { if(message.guild.member(ErtuAPI.client.users.get(args[i].toString().slice(2, -1)) || ErtuAPI.client.users.get(args[i]))) t.push({user: message.guild.member(ErtuAPI.client.users.get(args[i].toString().slice(2, -1)) || ErtuAPI.client.users.get(args[i]))}); }
if(t.length < 1) return msg.edit(uAva(uuser, 1, 1));
msg.edit(uAva(t[0].user, 1, t.length));
aArrs();
let page = 1;
let totalPages = t.length
const collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id, {time: 300000})
collector.on('collect', async r => {
if(!['◀', '⏹', '▶'].includes(r.emoji.name)) return;
r.remove(message.author.id);
if(r.emoji.name === '⏹') { collector.stop(); msg.delete(); }
if(r.emoji.name === '◀') {
if(page === 1) page = totalPages
else page = page - 1;
if (page > totalPages || page < 1) page = 1;
msg.edit(uAva(t[page - 1].user, page, totalPages));
}
if(r.emoji.name === '▶') {
page = page + 1;
if (page > totalPages || page < 1) page = 1;
msg.edit(uAva(t[page - 1].user, page, totalPages));
}
})}})}