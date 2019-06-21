module.exports.info = {
name: 'warn',
regex: /warn|варн/,
desc: 'Give a warning to the user',
args: ['<@member>', '<reason>'],
private: false,
hidden: false
}
module.exports.run = (message, args, prixix) => {
        let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        let ogs = args[0];
        if (!message.member.hasPermission("KICK_MEMBERS")) return ErtuAPI.err(message, 0, 'Kick a members')
        if(!message.guild.member(ErtuAPI.client.user).hasPermission('KICK_MEMBERS')) return ErtuAPI.err(message, 'I havent enough rights');
        if (!user) return ErtuAPI.err0r(message, 'You not provide a user or user is wrong', 'Provide a right member', `${prixix[1]}warn ${message.guild.members.random()} test`);
        if (user.id === message.author.id) return message.channel.send('Why are you trying to give warning yourself?');
        let reason = args.join(" ").slice(ogs.length);
        if (!reason) return ErtuAPI.err0r(message, 'You cannot issue a warning without any reason', 'Provide a reason', `${prixix[1]}warn ${message.guild.members.random()} test`);
        message.channel.send(new ErtuAPI.Discord.RichEmbed().setTitle('WAITING...').setDescription('**React a <:check:' + ErtuAPI.emojis.check + '> or <:cross:' + ErtuAPI.emojis.cross + '>**').setColor('#ffff00')).then(async msg => {
        await msg.react(ErtuAPI.emojis.check)
        await msg.react(ErtuAPI.emojis.cross)
        const collector = msg.createReactionCollector((r, u) => u.id === message.author.id, { time: 120000 })
        collector.on('collect', r => {
        if(![ErtuAPI.emojis.check, ErtuAPI.emojis.cross].includes(r.emoji.id)) r.remove(message.author.id)
        if(r.emoji.id === ErtuAPI.emojis.check) {
        user.send(ErtuAPI.actMSg(message, 'warn', message.author, 0, reason || 'Reason is not provided')).catch();
        msg.edit(new ErtuAPI.Discord.RichEmbed().setTitle('SUCCESS').addField('Warning a member', user + ' (' + user.user.tag + ', ID: ' + user.user.id + ')').addField('Reason', reason?reason:'Reason is not provided').setColor('#ff0000'))
        collector.stop()
          } else if(r.emoji.id === ErtuAPI.emojis.cross) {
            msg.edit(new ErtuAPI.Discord.RichEmbed().setTitle('Oops...').setDescription(`**Moderator (${message.author}) canceled to warn a member (${user})**`).setColor('#000000'))
            collector.stop()
          }
        })})
    }