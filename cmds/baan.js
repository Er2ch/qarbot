module.exports.info = {
name: 'unban',
regex: /unban|анбан|забрать-банан/,
desc: 'Unban a member',
args: ['<member (ID)>', '[reason]'],
private: false,
hidden: false
}
module.exports.run = (message, args, prixix) => {
        let userid = args[0];
        if (!message.member.hasPermission("BAN_MEMBERS")) return ErtuAPI.err(message, 0, 'Ban a members')
        if(!message.guild.member(ErtuAPI.client.user).hasPermission('BAN_MEMBERS')) return ErtuAPI.err(message, 'I havent enough rights');
        if (!userid) return ErtuAPI.err0r(message, 'You not provide a user ID', 'Provide a user ID', `${prixix[1]}unban ${message.guild.members.random().user.id}`);
        if (userid === message.author.id) return message.channel.send('Unban yourself? Smart, smart...');
        if(!ErtuAPI.client.users.get(userid)) return ErtuAPI.err0r(message, 'This ID I not detected', 'Provide a right user ID', `${prixix[1]}unban ${message.guild.members.random().user.id}`);
        let reason = args.join(" ").slice(userid.length);
        //if(!reason) return client.err0r(message, 'Разбанивать без причины нельзя', 'Укажите причину', `${prefix}unban ${creator} тест`);
        message.channel.send(new ErtuAPI.Discord.RichEmbed().setTitle('WAITING...').setDescription('**React a <:check:' + ErtuAPI.emojis.check + '> or <:cross:' + ErtuAPI.emojis.cross + '>**').setColor('#ffff00')).then(async msg => {
        await msg.react(ErtuAPI.emojis.check)
        await msg.react(ErtuAPI.emojis.cross)
        const collector = msg.createEmojiCollector((r, u) => u.id === message.author.id, { time: 120000 })
        collector.on('collect', r => {
        if(![ErtuAPI.emojis.check, ErtuAPI.emojis.cross].includes(r.emoji.id)) r.remove(message.author.id)
          if(r.emoji.id === ErtuAPI.emojis.check) {
          message.guild.unban(userid, reason || 'Reason is not provided').catch(() => {return msg.edit(new ErtuAPI.Discord.RichEmbed().setTitle('Oops...').setDescription(`**${userid} hasn't in ban list (Detected as: ${ErtuAPI.client.users.get(userid)})**`).setColor('#000000'))})
        ErtuAPI.client.fetchUser(userid).then(u => msg.edit(new ErtuAPI.Discord.RichEmbed().setTitle('SUCCESS').addField('Unbanned a member', userid + ' (Detected as: ' + u + ')').addField('Reason', reason?reason:'Reason is not provided').setColor('#ff0000')))
        collector.stop()
          } else if(r.emoji.id === ErtuAPI.emojis.cross) {
            msg.edit(new ErtuAPI.Discord.RichEmbed().setTitle('Oops...').setDescription(`**Moderator (${message.author}) canceled to unban a member (${userid})**`).setColor('#000000'))
            collector.stop()
          }
        })})
    }