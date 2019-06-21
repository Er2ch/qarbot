module.exports.info = {
name: 'emoji-info',
regex: /e(moji)?(-)?i(nfo)?/,
desc: 'Showing information about emoji',
args: '<:emoji: | emoji (server)>',
private: false,
hidden: false
}
module.exports.run = (message, args) => {
        if (!args[0]) return ErtuAPI.err(message, 'Where emoji???')
        if (args[0].match(/<:\w+:\d+>/)) args[0] = args[0].slice(2).slice(0, -20)
        if (!message.guild.emojis.find('name', args[0])) return ErtuAPI.err(message, `I can't find emoji "${args[0]}"`);
        let emoji = message.guild.emojis.find('name', args[0]);
        emoji.fetchAuthor().then(author => {
            const embed = new ErtuAPI.Discord.RichEmbed()
            .setTitle(`Emoji ${emoji}`)
            .setColor(`af00ff`)
            .setThumbnail(emoji.url)
            .addField(`Name`, emoji.name, true)
            .addField(`Private for`, `${ErtuAPI.addCommas(emoji.roles.size)} roles`, true)
            .addField(`Added by`, author.tag, true)
            .addField(`Date of adding`, ErtuAPI.toMoscowTime(emoji.createdAt) + ' MSK', true)
            .addField(`Animated?`, (emoji.animated?`Yes`:`No`), true)
            .addField(`Image`, emoji.url, true)
            message.channel.send(embed)
        })
    }