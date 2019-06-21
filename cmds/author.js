module.exports.info = {
name: 'author',
regex: /a(u|f(f)?)t(ary|hor(s)?)|а(в|ff)т[оа]р(ы)?/,
desc: 'Автор(ы) бота',
args: '',
private: false,
hidden: false
}
module.exports.run = (message) => {
        const embed = new ErtuAPI.Discord.RichEmbed()
                .setColor('af00ff')
                .setTitle(`Информация об авторах ${ErtuAPI.client.user.tag.slice(0, -5)}:`)
                .addField(`Автор ${ErtuAPI.client.user.tag.slice(0, -5)}'а: `, `\`Ertu#2715\``, true)
                //.addField(`Второй автор ${client.user.tag.slice(0, -5)}'а, а также создатель нового никнейма и аватарки`, `\`${client.users.get(creatort).tag}\``, true);
                return message.channel.send(embed);
        }