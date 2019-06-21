module.exports.info = {
name: 'ship',
regex: /ship|[шщ]ип|любо[вф]ь|lo[vf](e)?/,
desc: 'Проверка на любовь',
args: ['[1 человек|предмет]', '[2 человек|предмет]'],
private: false,
hidden: false
}
module.exports.run = (message, args) => {
        if (!args[0]) args[0] = message.guild.members.random();
        if (!args[1]) args[1] = message.author
        const loveTexts = ['Хуже некуда :poop:', 'Ужасно :sob:', 'Очень плохо :disappointed_relieved:', 'Плохо :frowning2:', 'Средне :thinking:', 'Неплохо :confused:', 'Дружески :+1:', 'Ууу ( ͡° ͜ʖ ͡°)', 'Превосходно! :heartpulse:', 'Невероятно!!! :heart_eyes:', 'ИДЕАЛЬНО!!! :heart_exclamation:'];
        const percents = ErtuAPI.random(0, 100);
        const loveText = loveTexts[Math.floor(percents / 10)];
        let line = ''
        let whiteLine = ''
        for (let i = 0; i <= percents; i = i + 10) line += '■'
        for (let i = 0; i < 100 - percents; i = i + 10) whiteLine += '□'
        const embed = new ErtuAPI.Discord.RichEmbed()
            .setTitle(":heart:МАТЧМЕЙКИНГ:heart:")
            .setColor("ff00b0")
            .setDescription('▼***' + args[0] + '***\n▲***' + args[1] + '***\n\n:revolving_hearts:Любовь в проценатах: **' + percents + '%** `[' + line + whiteLine + ']`' + '\n\nВердикт: **' + loveText + '**')
            .setFooter(`${ErtuAPI.client.user.tag.slice(0, -5)} 2018-2019 | Все права защищены`)
            .setTimestamp();
        message.channel.send(embed);
}