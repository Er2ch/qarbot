module.exports.info = {
name: 'profile',
regex: /профайл|профиль|prof(ai|i)?l(e)?/,
desc: 'Показать ваш или чужой профиль',
args: '[@человек]',
private: false,
hidden: false
}
module.exports.run = (message, args) => {
        let user = message.mentions.members.first();
        if (!user) user = message.member;
  let stat = user.user.presence.status
  stat = stat[0].toUpperCase() + stat.slice(1)
        let voiceChannel
        let voiceChannelGuild = ''
        if (!user.voiceChannel) {
            voiceChannel = 'No'
        }
        else {
            voiceChannel = user.voiceChannel.name
            voiceChannelGuild = `on **${user.voiceChannel.guild.name}**`
        }
        const guilds = ErtuAPI.client.guilds.filter(g => g.members.has(user.user.id)).map(g => `◽${g.name}`)
        let page = 1;
        const servsOnPage = 20;
        const totalPages = Math.ceil(guilds.length / servsOnPage);
        if (page > totalPages || page < 1) page = 1;

        const updServs = (pagee) => guilds.slice(((pagee - 1) * servsOnPage), (servsOnPage) + ((pagee - 1) * servsOnPage)).join('\n');
      
        require('/app/bot').profile(process.env.ErtuAPIkey, user.user.id, r => {
        const embed1 = new ErtuAPI.Discord.RichEmbed()
        .setTitle(`${user.user.bot?'Bot':'User'} ${user.user.tag}`)
        //if(user.user.presence.game.name) embed.setDescription()
        .setColor(`af00ff`)
        .setThumbnail(user.user.avatarURL)
        .addField(`XP`, r.profile.xp + ' XP', true).addField(`Level`, r.profile.level + ' lvl', true).addField(`Money :yen:`, '$' + r.profile.money, true)
        .addField(`Authorized at :key:`, `${user.user}\n${user.user.tag}`, true)
        .addField(`Joined :inbox_tray:`, `To server: ${ErtuAPI.toMoscowTime(user.joinedAt)} MSK\nTo Discord: ${ErtuAPI.toMoscowTime(user.user.createdAt)} MSK`, true)
        .addField(`Status :bulb:`, stat, true)
        .addField(`In voice channel? :microphone2:`, `**${voiceChannel}** ${voiceChannelGuild}`, true)
        .addField(`Color role :paintbrush:`, (user.colorRole || '**No**'), true)
        .addField(`Highest role :first_place:`, (user.highestRole || '**No**'), true)
        .addField(`Detected in ${ErtuAPI.addCommas(guilds.length)} ${guilds.length < 2?'server':'servers'}:`, updServs(page))
        .setFooter(`Page ${page} of ${totalPages}`)
        message.channel.send(embed1).then(msg => {
async function pArrs() {
await msg.react('◀');
await msg.react('⏹');
await msg.react('▶');
}
pArrs();
const collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id, {time: 300000})
collector.on('collect', async r => {
if(!['◀', '⏹', '▶'].includes(r.emoji.name)) return;
r.remove(message.author.id);
if(r.emoji.name === '⏹') { collector.stop(); msg.delete(); }
if(r.emoji.name === '◀') {if(page === 1) page = totalPages; else page = page - 1; if (page > totalPages || page < 1) page = 1; if(page === 1) msg.edit(embed1); else msg.edit(new ErtuAPI.Discord.RichEmbed().setColor('af00ff').setTitle(`${user.user.bot?'Bot':'User'} ${user.user.tag}`).setThumbnail(user.user.avatarURL).setFooter(`Page ${page} of ${totalPages}`).setDescription(updServs(page)));}
if(r.emoji.name === '▶') {page = page + 1; if (page > totalPages || page < 1) page = 1; if(page === 1) msg.edit(embed1); else msg.edit(new ErtuAPI.Discord.RichEmbed().setColor('af00ff').setTitle(`${user.user.bot?'Bot':'User'} ${user.user.tag}`).setThumbnail(user.user.avatarURL).setFooter(`Page ${page} of ${totalPages}`).setDescription(updServs(page)));}})})})}