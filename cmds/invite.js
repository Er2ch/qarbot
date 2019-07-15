module.exports.info = {
name: 'invite',
regex: /inv(a)?i[td]|инвай[тд]/,
desc: 'Invite this bot to your server',
args: '',
private: false,
hidden: false
}
module.exports.run = (message) => message.channel.send(`Пригласить бота ${ErtuAPI.client.user.username}:\nhttps://discordapp.com/api/oauth2/authorize?client_id=${ErtuAPI.client.user.id}&permissions=8&scope=bot`)