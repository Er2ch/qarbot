module.exports.info = {
name: 'support',
regex: /s[ua]p(p)?or[td]|с[ао]п(п)?о(г|р[тд])/,
desc: 'Official support server',
args: '',
private: false,
hidden: false
}
module.exports.run = (message) => message.author.send('My official support server:\n\nhttps:/' + '/disc' + 'ord.gg' + '/yP2AVtv')