const jimp = require('jimp'),
      creator = '440866756702109706',
      fullacc = [creator, '544031928358273045']
const up = () => require('request')({
  url: 'https://qarbot.glitch.me',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:54.0) Gecko/20100101 Firefox/54.0'
  }
})
up()
setInterval(() => up(), 5000)
let usedCommands = 0, commandsPerHour = 0, msgs = 0, unxp = new Set();
class ErtuAPI {
  constructor() {
    const _this = this
    _this.Discord = require('discord.js')
    _this.client = new _this.Discord.Client({disableEveryone: true})
    _this.newapi = require('ertuapi')
    _this.newapi = new _this.newapi()
    _this.prefixes = require('./prefixes.json')
    _this.emojis = {
      check: '575986737608654871',
      cross: '575986756026105856',
    }
    _this.cd = []
    _this.api = require('/app/bot')
    _this.toMoscowTime = (time) => time.toLocaleString('ru-RU', {timeZone: 'Europe/Moscow', hour12: false}).replace(/\/|\./g, '-')
    _this.toTZTime = (time, tz) => time.toLocaleString('ru-RU', {timeZone: tz, hour12: false}).replace(/\/|\./g, '-')
    _this.random = (min, max) => Math.floor(Math.random() * (max + 1 - min)) + min
    _this.cS = (c, pagee, onOne, j) => c.slice(((pagee - 1) * onOne), (onOne) + ((pagee - 1) * onOne)).join(j? j:'\n')
    _this.addCommas = (int) => int.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    _this.declOfNum = (number, titles, hmm) => {
    let cases = [2, 0, 1, 1, 1, 2]
    if(!hmm || hmm!== 1) return number + ' ' + titles[(number % 100 > 4 && number % 100 < 20)? 2 : cases[(number % 10 < 5)?number % 10 : 5]]
    else { 
      let number1
    number1 = _this.addCommas(number)
    return number1 + ' ' + titles[(number % 100 > 4 && number % 100 < 20)? 2 : cases[(number % 10 < 5)?number % 10 : 5]]
}
}
    _this.err = (message, text, perms) => {
        const embed = new _this.Discord.RichEmbed()
     .setTitle('ERROR')
     .setColor('ff5555')
     if(!perms) embed.addField('Decription of error', text? text : 'Unknown error')
     else embed.addField('You haven\'t a right', perms)
        return message.channel.send(embed);
    }
    _this.err0r = (message, d, a, e) => {
     const embed = new _this.Discord.RichEmbed()
     .setTitle('ERROR')
     .addField('Decription of error', d? d : 'Unknown error')
     .setColor('ff5555')
     if(a) embed.addField('Decision', a)
     if(e) embed.addField('Example', e)
     return message.channel.send(embed);
   }
    _this.succ = (message, text) => message.channel.send(new _this.Discord.RichEmbed().setColor('55ff55').setTitle('SUCCESS').setDescription(text?`**${text}**`:''))
    _this.actMSg = (message, actType, actioner, time, reason) => {
        let act = ``, desc = ``, other = ``;
        if (actType === 'mute') {act = 'muted'; desc = `\nTime: **${time}**\n`; other = '\n\nDon\'t behave badly!'}
        if (actType === 'warn') {act = 'warned'; other = '\n\nDon\'t behave badly!'} 
        if (actType === 'ban') {act = 'banned'; other = '\n\nDon\'t behave badly!'}
        if (actType === 'unban') {act = 'unbanned';}
        if (actType === 'kick') {act = 'kicked'; other = '\n\nDon\'t behave badly!'}
        if (actType === 'unmute') {act = 'unmuted'}
        if (reason === 'autoUnmt') {actioner = _this.client.user.tag; reason = 'Automatic unmute'}
        if (reason === undefined) reason = 'Not provided'
        const embed = new _this.Discord.RichEmbed()
        .setColor("000000")
        .setTitle(`We were ${act} in ${message.guild.name}`)
            .setDescription(`\nBy user: **${actioner}**${desc}\nReason: **${reason}${other}**`)
            .setFooter(_this.client.user.tag.slice(0, -5))
            .setTimestamp()
        return embed
}
    _this.client.on('ready', () => {
      _this.commands = []
      require('fs').readdir('./cmds', (err, data) => {
        let i = 0;
        if(err) throw err
        data.forEach(command => {
          if(command.startsWith('-')) return
          i++
          const cmd = require('./cmds/' + command)
          _this.commands.push({
            name: cmd.info.name,
            regex: cmd.info.regex.toString().slice(1, -1),
            args: cmd.info.args,
            desc: cmd.info.desc,
            run: (message, args, prixix) => require('/app/cmds/' + command).run(message, args, prixix),
            private: cmd.info.private || false,
            hidden: cmd.info.hidden || false,
          })
          delete require.cache[require.resolve('/app/cmds/' + command)]
          console.log('Added ' + (i.toString().length === 1?'0' + i:i) + (parseInt(i.toString()[i.toString().length - 1]) >= 4?'\'th':(parseInt(i.toString()[i.toString().length - 1]) === 1?'\'st':(parseInt(i.toString()[i.toString().length - 1]) === 2?'\'nd':(parseInt(i.toString()[i.toString().length - 1]) === 3?'\'rd':'\'s ')))) + (cmd.info.private?' private':(cmd.info.hidden?' hidden ':'        ')) + ' command =' + cmd.info.name)
        })
      })
          _this.client.user.setActivity(`=help | ${_this.declOfNum(_this.client.guilds.size, ['сервер', 'сервера', 'серверов'])}`,{ type: 'PLAYING' });
    setInterval(() => commandsPerHour = 0, 3600000);
        if(_this.client.shard.id === 0) setInterval(() => {
        _this.client.channels.get('541863741248110592').fetchMessage('541864816197763074').then(msg => _this.api.ping(eapi => msg.edit(new _this.Discord.RichEmbed()
        .setTitle(`Bot ${_this.client.user.tag.slice(0, -5)}`)
        .setThumbnail(_this.client.user.avatarURL)
        .addField(`Ping :ping_pong:`, `Discord API: ${_this.addCommas(Math.round(_this.client.ping))} ms\nErtu API: ${_this.addCommas(Date.now() - eapi.ts)} ms`, true)
        .addField('RAM :gear:', `${_this.addCommas(Math.round(process.memoryUsage().rss / 1024 / 1024 ))} / 512 МБ`, true)
        .addField('Total commands :mouse_three_button:', 'Total: ' + _this.commands.length + '\nPublic: ' + _this.commands.filter(c => !c.private && !c.hidden).length + '\nHelp pages: ' + Math.ceil(_this.commands.filter(c => !c.private && !c.hidden).length / 15) + ' pages', true)
        .addField('Used commands :wrench:', `${_this.addCommas(usedCommands)} times`,  true)
        .addField('Commands per hour :clock11:', `${_this.addCommas(commandsPerHour)} per hour`, true)
        .addField('Messages :envelope:', `${_this.addCommas(msgs)} msgs`, true)
        .addField(`Users :bust_in_silhouette:`, `${_this.addCommas(_this.client.users.size)} users`, true)
        .addField(`Channels :keyboard:`, `${_this.addCommas(_this.client.channels.size)} channels`, true)
        .addField(`Servers :desktop:`, `${_this.addCommas(_this.client.guilds.size)} servers`, true)
        .addField(`Emojis :joy:`, `${_this.addCommas(_this.client.emojis.size)} emojis`, true)
        .addField(`Voice connections :microphone:`, `${_this.addCommas(_this.client.voiceConnections.size)} channels`, true)
        .addField(`Work time :stopwatch:`, `${_this.addCommas(Math.round(_this.client.uptime / (1000 * 60 * 60)))} hours, ${_this.addCommas(Math.round(_this.client.uptime / (1000 * 60)) % 60)} minutes`, true)
        .addField(`Ready at :on:`, _this.toMoscowTime(_this.client.readyAt) + ' MSK', true)
        .addField(`Time :clock11:`, 'Moscow: ' + _this.toMoscowTime(new Date()).toString().slice(0, -3) + '\nLos Angeles: ' + _this.toTZTime(new Date(), 'America/Los_Angeles').toString().slice(0, -3) + '\nNew York: ' + _this.toTZTime(new Date(), 'America/New_York').toString().slice(0, -3), true)
        .addField(`Version :floppy_disk:`, '2.5 Alpha', true)
        .addField(`Authorized at :key:`, _this.client.user.tag, true)
        .setColor('af00ff'))));
    }, 16000);
    })
    
    _this.client.on('guildCreate', (guild) => {
        const embed = new _this.Discord.RichEmbed()
        .setTitle(`Я пришел :inbox_tray: на сервер ${guild.name}`)
        .setColor('55ff55')
        .setDescription(`Инфа:
Акроним и ID: **${guild.nameAcronym} | ${guild.id}**
Основатель: **${guild.owner} (\`${guild.owner.user.tag}\`)**
Количество участников: **${guild.memberCount}**
Роли: **${guild.roles.size}**
Каналы: **${guild.channels.size}**
Создана: **${_this.toMoscowTime(guild.createdAt)}**
        `)
        .setThumbnail(guild.iconURL)
        .setFooter(`Нас стало ${_this.declOfNum(_this.client.guilds.size, ['сервер', 'сервера', 'серверов'])}!`)
        .setTimestamp()
        _this.client.channels.get('541863381964161024').send(embed);
        _this.client.user.setActivity(`=help | ${_this.declOfNum(_this.client.guilds.size, ['сервер', 'сервера', 'серверов'])}`,{ type: 'PLAYING' });
})
    _this.client.on('guildDelete', (guild) => {
        const embed = new _this.Discord.RichEmbed()
        .setTitle(`Я покинул :outbox_tray: сервер ${guild.name}`)
        .setColor('ff5555')
        .setDescription(`Инфа:
Акроним и ID: **${guild.nameAcronym} | ${guild.id}**
Основатель: **${guild.owner} (\`${guild.owner.user.tag}\`)**
Количество участников: **${guild.memberCount}**
Роли: **${guild.roles.size}**
Каналы: **${guild.channels.size}**
Создана: **${_this.toMoscowTime(guild.createdAt)}**
        `)
        .setThumbnail(guild.iconURL)
        .setFooter(`Справедливо... Нас осталось ${_this.declOfNum(_this.client.guilds.size, ['сервер', 'сервера', 'серверов'])}`)
        .setTimestamp()
        _this.client.channels.get('541863381964161024').send(embed);
        _this.client.user.setActivity(`=help | ${_this.declOfNum(_this.client.guilds.size, ['сервер', 'сервера', 'серверов'])}`,{ type: 'PLAYING' });
    })
    
    _this.client.onMessage = (message) => {
        if (message.author.bot) return;
        if(!message.guild){
        let att = [];
     if(message.attachments.size > 0) message.attachments.forEach(attachment => att.push(attachment.url));
        return _this.client.channels.get('551988674074771463').send(`Message by ${message.author.tag} (${message.author.id})\n` + '``` ' + message.content + '```\n' + att.join('\n'));
    }
let prixix;
if(!_this.prefixes[message.guild.id]) prixix = ['<@' + _this.client.user.id + '>', '=']
else prixix = ['<@' + _this.client.user.id + '>', _this.prefixes[message.guild.id].prefix]
const prifix = prixix.find(p => message.content.toLowerCase().startsWith(p))
    if(!prifix) {
    var xpAdd = _this.random(15, 25)
    const collector = new _this.Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 8000 })
    collector.on('collect', msg => {
        const collector = new _this.Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 4000 })
        collector.on('collect', msg2 => {
                if (!unxp.has(message.author.id)) {
                    unxp.add(message.author.id);
                    setTimeout(() => { unxp.delete(message.author.id) }, 10000)
                } 
            })
    })
      if(unxp.has(message.author.id)) var xpAdd = 0
_this.api.profile(process.env.ErtuAPIkey, message.author.id, r => {
let lvl = r.profile.level
if(r.profile.xp + xpAdd >= (5 * (lvl ^ 2) + 50 * lvl + 100)) _this.api.profile.set(process.env.ErtuAPIkey, message.author.id, 0, r.profile.level + 1, r.profile.money, () => 1)
else _this.api.profile.add(process.env.ErtuAPIkey, message.author.id, xpAdd, 0, 0, () => 1)
})
msgs++;
}
if(!prifix) return;
      if (!message.guild || message.author.bot) return;
      const args = message.content.slice(prifix.length).trim().split(/ +/g)
      const command = args.shift().toLowerCase()
      const cmd = _this.commands.find(c => command.match(new RegExp(c.regex)));
      const authorAvatar = message.author.avatarURL || message.author.defaultAvatarURL;
  
if(!command && prifix === prifix[0]) return message.channel.send('Hello! My prefix in this guild is `' + prixix[1] + '`\nFor starting typing `' + prixix[1] + 'help`')
  //if(!cmd && command) {msgs++; message.reply('команды `' + command + '` не существует.\n' + (!prefixes[message.guild.id]?'Если это вышло по ошибке - смените префикс.':''), {disableEveryone: true})}
     if(cmd) {
       const cdsecs = 5
       if(_this.cd[message.author.id]) {
         if(Math.ceil(_this.cd[message.author.id].ts - Date.now()) / 1000 <= 0) delete _this.cd[message.author.id]
         else return message.reply('Cool! Wait a ' + Math.ceil((_this.cd[message.author.id].ts - Date.now()) / 1000) + ' second' + (Math.ceil((_this.cd[message.author.id].ts - Date.now()) / 1000) === 1?'':'s'))
       }
       if(!_this.cd[message.author.id] && message.author.id !== creator) _this.cd[message.author.id] = {ts: Date.now() + cdsecs * 1000}
if (cmd.private && !fullacc.includes(message.author.id)) return message.reply(':no_entry: `Bot Owner Only`');
if (message.author.id === '435123275975360516' /*пикачу*/) return message.reply(':no_entry: `You get a ban in bot`')
        commandsPerHour++;
        usedCommands++;
       
        if (!cmd.used) cmd.used = 0;
        cmd.used++;
        jimp.read(authorAvatar).then(avatar => {
            avatar.resize(50, 50)
            jimp.read('https://cdn.discordapp.com/attachments/492028926919573506/540953553523703808/circle.png').then(mask => {
                avatar.mask(mask, 0, 0)
                jimp.read('https://cdn.discordapp.com/attachments/492028926919573506/540957076508114944/background.png').then(bg => {
                    bg.composite(avatar, 10, 15);
                    jimp.loadFont(jimp.FONT_SANS_16_WHITE).then(font => {
                        bg.print(font, 80, 20, message.author.username);
                       const cargs = args//.replace(/<@(\d+)>/, client.users.get(args.join(' ').match(/<@(\d+)>/)[1]).tag)
                        const tts = cargs.join(' ')
                        bg
                          .print(font, 80, 43, prixix[1] + command + ' ' + cargs.join(' '))
                          .getBuffer(jimp.MIME_PNG, (err, buffer) => {
                            const screenshot = new _this.Discord.Attachment(buffer, 'screenshot.png');
                            const embed = new _this.Discord.RichEmbed().setAuthor(message.author.tag, authorAvatar).setDescription(`\`${message.author.tag}\` использовал команду **${prixix[1]}${command}** ${args[0]? `\`${tts}\`` : ''} на сервере \`${message.guild.name}\`\nОпределена как \`${cmd.name}\``).attachFile(screenshot).setColor('GREEN');
                            if(!cmd.private && !cmd.hidden) _this.client.channels.get('575704885736243220').send(embed);
})})})})})
if(cmd.run) cmd.run(message, args, prixix)
     }
    }
    _this.client
    .on('message', message => _this.client.onMessage(message))
    .on('messageUpdate', (x, message) => x.content === message.content?'':_this.client.onMessage(message))
    .login(process.env.BOT_TOKEN).then(() => delete process.env.BOT_TOKEN)
  }
}
global.ErtuAPI = new ErtuAPI()

//API
const fetch = require('node-fetch')
const baseURL = 'https://ertu-datacenter.glitch.me/api/'
const runapi = async (token, api, callback, withoutToken, addVars) => {
if (typeof token !== 'string') throw new Error('[ErtuAPI] Token must be a string');
if(typeof callback !== 'function') throw new Error('[ErtuAPI] Callback must be a function')
fetch(baseURL + api + (withoutToken?'':'?token=' + token) + (addVars?addVars:''))
  .then(r => r.json())
  .then(json => callback(json))
}
module.exports.meme = (token, callback) => runapi(token, 'meme', callback)
module.exports.meme.add = (token, url, callback) => runapi(token, 'memeadd', callback, 0, '&url=' + url)
module.exports.keyCheck = (key, callback) => runapi('0', 'keycheck', callback, 1, '?key=' + key)
module.exports.profile = (token, id, callback) => runapi(token, 'profile', callback, 0, 'bot&method=check&user=' + id)
module.exports.profile.add = (token, id, xp, level, money, callback) => runapi(token, 'profile', callback, 0, 'bot&method=add&user=' + id + '&money=' + money + '&level=' + level + '&xp=' + xp)
module.exports.profile.remove = (token, id, xp, level, money, callback) => runapi(token, 'profile', callback, 0, 'bot&method=remove&user=' + id + '&money=' + money + '&level=' + level + '&xp=' + xp)
module.exports.profile.set = (token, id, xp, level, money, callback) => runapi(token, 'profile', callback, 0, 'bot&method=set&user=' + id + '&money=' + money + '&level=' + level + '&xp=' + xp)
module.exports.profile.reset = (token, callback) => runapi(token, 'profile', callback, 0, 'bot&method=reset')
module.exports.daily = (token, id, callback) => runapi(token, 'daily', callback, 0, '&method=info&user=' + id)
module.exports.daily.set = (token, id, time, callback) => runapi(token, 'daily', callback, 0, '&method=set&user=' + id + (time?'&time=' + time:''))
module.exports.ping = (callback) => runapi('0', 'ping', callback, 1)