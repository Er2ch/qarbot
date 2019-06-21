module.exports.info = {
name: 'server-info',
regex: /s(erver)?(-)?i(nfo)?/,
desc: 'Показать информацию о сервере',
args: '',
private: false,
hidden: false
}
module.exports.run = (message) => {
        let afkChannel = 'Нет'
        let afkTimeout = 'Нет';
        let voiceChannels = [];
        let textChannels = [];
        let categoryChannels = [];
        let members = message.guild.members.filter(member => !member.user.bot).size;
        let total = message.guild.memberCount;
        let bots = message.guild.members.filter(member => member.user.bot).size;
        let verifLvl = message.guild.verificationLevel
        if (message.guild.afkChannel !== null) {
            afkChannel = message.guild.afkChannel.name
            afkTimeout = `${Math.round(message.guild.afkTimeout / 60)} minutes`
        }
        message.guild.region = message.guild.region[0].toUpperCase() + message.guild.region.slice(1)
        message.guild.fetchBans().then(bans => {
            message.guild.fetchInvites().then(invites => {
                message.guild.channels.forEach(channel => {
                    if (channel.type === "voice") voiceChannels.push(channel);
                    if (channel.type === "text") textChannels.push(channel);
                    if (channel.type === "category") categoryChannels.push(channel);
                })
                if (verifLvl === 0) verifLvl = 'Нет'
                if (verifLvl === 1) verifLvl = 'Низкий'
                if (verifLvl === 2) verifLvl = 'Средний'
                if (verifLvl === 3) verifLvl = '(╯°□°）╯︵ ┻━┻'
                if (verifLvl === 4) verifLvl = '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
                const embed = new ErtuAPI.Discord.RichEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL)
                .setColor('af00ff')
                .setThumbnail(message.guild.iconURL)
                .addField(`Сокращение :arrow_right: :arrow_left:`, message.guild.nameAcronym, true)
                .addField(`Создан :date:`, ErtuAPI.toMoscowTime(message.guild.createdAt) + ' MSK', true)
                .addField(`Основатель`, message.guild.owner.user.tag, true)
                .addField(`Пользователи :bust_in_silhouette:`, `${ErtuAPI.declOfNum(total, ['всех', 'всех', 'всех'], 1)} (${ErtuAPI.declOfNum(bots, ['бот', 'бота', 'ботов'], 1)}, ${ErtuAPI.declOfNum(members, ['человек', 'человека', 'человек'], 1)})`, true)
                .addField(`AFK Канал :zzz:`, afkChannel, true)
                .addField(`AFK Тайм-аут :watch:`, afkTimeout, true)
                .addField(`Регион :globe_with_meridians:`, message.guild.region, true)
                .addField(`Количество банов :hammer:`, `${ErtuAPI.declOfNum(bans.size, ['бан', 'бана', 'банов'])}`, true)
                .addField(`Каналы :mouse_three_button:`, `${ErtuAPI.declOfNum(message.guild.channels.size, ['канал', 'канала', 'каналов'], 1)} (${ErtuAPI.declOfNum(voiceChannels.length, ['голосовой', 'голосовых', 'голосовых'], 1)}, ${ErtuAPI.declOfNum(textChannels.length, ['текстовый', 'текстовых', 'текстовых'], 1)}, ${ErtuAPI.declOfNum(categoryChannels.length, ['категория', 'категории', 'категорий'], 1)})`, true)
                .addField(`Приглашения :inbox_tray:`, `${ErtuAPI.declOfNum(invites.size, ['инвайт', 'инвайта', 'инвайтов'], 1)}`, true)
                .addField(`Роли :military_medal:`, `${ErtuAPI.declOfNum(message.guild.roles.size, ['роль', 'роли', 'ролей'], 1)}`, true)
                .addField(`Эмодзи :joy:`, `${message.guild.emojis.size} эмодзи`, true)
                .addField(`Уровень верификации :gear:`, verifLvl, true)
                .addField(`Подтвержден? :white_check_mark:`, (message.guild.verified?'Да':'Нет'), true)
                message.channel.send(embed)
            })
        })
    }