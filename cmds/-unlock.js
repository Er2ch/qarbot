module.exports.info = {
name: 'unlock',
regex: /un(b)?lock/,
desc: '',
args: '<ID>',
private: true,
hidden: false
}
module.exports.run = (message, args) => {
        client.blockedOnOff ('off', args[0]);
        client.succ(message, `${client.users.get(args[0]).tag} успешно разблокирован`)
    }