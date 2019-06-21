module.exports.info = {
name: 'poll',
regex: /pol(l)?|г[оа]л[оа]с[оа]ва(лка|ние)/,
desc: 'Голосование',
args: ['<вопрос>;', '<вариант1>;', '<вариант2>...'],
private: false,
hidden: false
}
module.exports.run = (message, args) => {
const poll = message.content.slice(1).split(/;/g)
const nums = {
0: `0⃣`, 1: `1⃣`, 2: `2⃣`, 3: `3⃣`, 4: `4⃣`, 5: `5⃣`, 6: `6⃣`, 7: `7⃣`, 8: `8⃣`, 9: `9⃣`, 10: `🔟`,
}
async function multipleReact(i, msg){
Promise.delay = d => new Promise(resolve=>setTimeout(resolve,d));
if (i.length == 0) return;
let emoji = nums[i];
let self = msg;
self.react(emoji).then(async function () {
await Promise.delay(100);
if(i!==poll.length - 1){
i++;
}
multipleReact(i, msg);
});
}
 if (!poll[1]) return ErtuAPI.err(message, 'Нельзя создавать пустые голосования');
if(!poll[2]) return ErtuAPI.err(message, 'Ну зачем делать голосование с одним ответом?');
const question = args.join(' ').match(/(.*?);/g)[0].slice(0, -1);
//if (!message.member.hasPermission("MANAGE_MESSAGES")) return err(0, 'Управление сообщениями')
if (poll[11]) return ErtuAPI.err(message, 'Голосование нельзя делать более чем с 10-тью вариантами')
let variants = ''
for (let i = 1; i < poll.length; i++) variants += nums[i] + ' — ' + poll[i] + '\n'
message.channel.send(':bar_chart: **' + question + '**');
const embed = new ErtuAPI.Discord.RichEmbed()
.setDescription(variants)
.setColor("af00ff")
.setFooter(`${ErtuAPI.client.user.tag.slice(0, -5)} 2018-2019. Все права защищены.`)
.setTimestamp();
message.delete();
message.channel.send({embed}).then(msg => {let i = 1; multipleReact(i, msg);})}