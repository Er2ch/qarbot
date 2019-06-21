module.exports.info = {
name: 'kick',
regex: /кик(нуть)?|kick/,
desc: 'Kick a member',
args: ['<@member>', '[reason]'],
private: false,
hidden: false
}
module.exports.run = (message, args, prixix) => {
        let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        let ogs = args[0];
        if (!message.member.hasPermission("KICK_MEMBERS")) return ErtuAPI.err(message, 0, 'Kick a members')
        if(!message.guild.member(ErtuAPI.client.user).hasPermission('KICK_MEMBERS')) return ErtuAPI.err(message, 'I havent enough rights');
        if (!user) return ErtuAPI.err0r(message, 'You not provide a user or user is wrong', 'Provide a right member', `${prixix[1]}kick ${message.guild.members.random()}`);
        if (user.id === message.author.id) return message.channel.send('Why are you trying to kick yourself?');
        if (user.highestRole.position >= message.guild.member(message.author).highestRole.position) return ErtuAPI.err(message, 'Your role low or on equal terms with the user');
        let reason = args.join(" ").slice(ogs.length);
        if (!user.kickable) return ErtuAPI.err(message, 'I can\'t kick this user');
        //if (!reason) return client.err0r(message, 'Кикать без причины нельзя', 'Укажите причину', `${prixix[1]}kick ${message.guild.members.random()} тест`);
        message.channel.send(new ErtuAPI.Discord.RichEmbed().setTitle('WAITING...').setDescription('**React a <:check:' + ErtuAPI.emojis.check + '> or <:cross:' + ErtuAPI.emojis.cross + '>**').setColor('#ffff00')).then(async msg => {
        await msg.react(ErtuAPI.emojis.check)
        await msg.react(ErtuAPI.emojis.cross)
        const collector = msg.createReactionCollector((r, u) => u.id === message.author.id, { time: 120000 })
        collector.on('collect', r => {
        if(![ErtuAPI.emojis.check, ErtuAPI.emojis.cross].includes(r.emoji.id)) r.remove(message.author.id)
          if(r.emoji.id === ErtuAPI.emojis.check) {
        user.send(ErtuAPI.actMSg(message, 'kick', message.author, 0, reason || 'Reason is not provided')).catch();
        msg.edit(new ErtuAPI.Discord.RichEmbed().setTitle('SUCCESS').addField('Kicked a member', user + ' (' + user.user.tag + ', ID: ' + user.user.id + ')').addField('Reason', reason?reason:'Reason is not provided').setColor('#ff0000')).then(() => user.kick(reason || 'Reason is not provided'))
        collector.stop()
          } else if(r.emoji.id === ErtuAPI.emojis.cross) {
            msg.edit(new ErtuAPI.Discord.RichEmbed().setTitle('Oops...').setDescription(`**Moderator (${message.author}) canceled to kick a member (${user})**`).setColor('#000000'))
            collector.stop()
          }
        })})
    }