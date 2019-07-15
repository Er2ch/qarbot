module.exports.info = {
name: 'block',
regex: /block/,
desc: '',
args: '<ID>',
private: true,
hidden: false
}
module.exports.run = (message, args) => {
        client.blockedOnOff ('on', args[0]);
        client.succ(message, `${client.users.get(args[0]).tag} успешно заблокирован`)
}