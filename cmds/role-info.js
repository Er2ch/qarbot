module.exports.info = {
name: 'role-info',
regex: /r(ole)?(-)?i(nfo)?/,
desc: 'Узнать права роли',
args: '<роль(с @пингом или без)>',
private: false,
hidden: false
}
module.exports.run = (message, args) => {
        let role = message.mentions.roles.first();
        if (!role) {
            if (!message.guild.roles.find('name', args[0])) return ErtuAPI.err(message, 'Такой роли не существует');
            role = message.guild.roles.find('name', args[0])
        }
        let perms = [];
        if (role.hasPermission("ADMINISTRATOR")) perms.push('Администратор :exclamation:');
        else {
            if (role.hasPermission("VIEW_AUDIT_LOG")) perms.push('Просмотр журнала аудита :eye:');
            if (role.hasPermission("MANAGE_GUILD")) perms.push('Управление сервером :level_slider:');
            if (role.hasPermission("MANAGE_ROLES")) perms.push('Управление ролями :trophy:');
            if (role.hasPermission("MANAGE_CHANNELS")) perms.push('Управление каналами :keyboard:');
            if (role.hasPermission("KICK_MEMBERS")) perms.push('Кикать пользователей :point_right:');
            if (role.hasPermission("BAN_MEMBERS")) perms.push('Банить пользователей :hammer:');
            if (role.hasPermission("CREATE_INSTANT_INVITE")) perms.push('Создавать ссылки-приглашения :inbox_tray:');
            if (role.hasPermission("CHANGE_NICKNAME")) perms.push('Менять никнеймы :arrows_counterclockwise:');
            if (role.hasPermission("MANAGE_NICKNAMES")) perms.push('Управление никнеймами :arrows_counterclockwise: :level_slider:');
            if (role.hasPermission("MANAGE_EMOJIS")) perms.push('Управление эмодзи :joy:');
            if (role.hasPermission("MANAGE_WEBHOOKS")) perms.push('Управление вебхуками :gear:');
            if (role.hasPermission("VIEW_CHANNEL")) perms.push('Читать текстовые каналы и видеть голосовые каналы :eye_in_speech_bubble:');
            if (role.hasPermission("SEND_MESSAGES")) perms.push('Отправлять сообщения :speech_left:');
            if (role.hasPermission("SEND_TTS_MESSAGES")) perms.push('Отправлять /tts сообщения :speech_left: :loud_sound:');
            if (role.hasPermission("MANAGE_MESSAGES")) perms.push('Управление сообщениями :gear: :arrow_forward:');
            if (role.hasPermission("EMBED_LINKS")) perms.push('Встраивать ссылки :link:');
            if (role.hasPermission("ATTACH_FILES")) perms.push('Прикреплять файлы :file_folder:');
            if (role.hasPermission("READ_MESSAGE_HISTORY")) perms.push('Читать истоирию сообщений :clock3:');
            if (role.hasPermission("MENTION_EVERYONE")) perms.push('Упомянуть всех :loudspeaker:');
            if (role.hasPermission("USE_EXTERNAL_EMOJIS")) perms.push(`Использовать внешние эмодзи :thinking:`);
            if (role.hasPermission("ADD_REACTIONS")) perms.push('Добавлять реакции :grinning:');
            if (role.hasPermission("CONNECT")) perms.push('Подключиться :joystick:');
            if (role.hasPermission("SPEAK")) perms.push('Говорить :loud_sound:');
            if (role.hasPermission("MUTE_MEMBERS")) perms.push('Отключить голос другим :zipper_mouth:');
            if (role.hasPermission("DEAFEN_MEMBERS")) perms.push('Отключить звук другим :mute:');
            if (role.hasPermission("MOVE_MEMBERS")) perms.push('Перемещать пользователей :arrow_down:');
            if (role.hasPermission("USE_VAD")) perms.push('Использовать режим активации по голосу :lips:');
            if (role.hasPermission("PRIORITY_SPEAKER")) perms.push('Главный говорящий :microphone2:');
        }
        if (perms.length === 0) perms = ['Нет']
            const embed = new ErtuAPI.Discord.RichEmbed()
            .setTitle(`Права ${role.name}`)
            .setColor('af00ff')
            .addField(`Mention :regional_indicator_m:`, role, true)
            .addField(`Цвет :art:`, `${role.hexColor}`, true)
            .addField(`Создана :gear:`, ErtuAPI.toMoscowTime(role.createdAt) + ' MSK', true)
            .addField(`Отображается отдельно? :desktop:`, (role.hoist?'Да':'Нет'), true)
            .addField(`Упоминаемая? :bulb:`, (role.mentionable?'Да':'Нет'), true)
            .setDescription(`**${perms.join('**\n**')}**`)
            message.channel.send(embed)
}