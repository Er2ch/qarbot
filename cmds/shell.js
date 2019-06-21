module.exports.info = {
name: 'shell',
regex: /shel(l)?|шел(л)?/,
desc: '',
args: '<cmd>',
private: true,
hidden: false
}
module.exports.run = (message, args) => message.channel.send('Run this command...').then(msg => msg.edit(require('child_process').execSync(args.join(' ')).toString('utf8') + ' '))