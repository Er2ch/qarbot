module.exports.info = {
name: 'daily',
regex: /d[ae][ie]l[yie]/,
desc: 'Daily reward :thinking:',
args: '',
private: false,
hidden: false
}
module.exports.run = (message) => {
const EertuAPI = require('/app/bot')
EertuAPI.daily.set(process.env.ErtuAPIkey, message.author.id, '24h', r => {
const t = require('moment-timezone')(r.endTime).locale('ru').format('LT')
if(r.left && r.status === 401) return ErtuAPI.err0r(message, 'New Daily reward coming in ' + (Math.ceil(r.left / 1000 / 60 / 60 / 24) < 1?'Today at ':'Tomorrow at ') + ((parseInt(t.split(':')[0]) + 2) + ':' + (t.split(':')[1])) + ' MSK')
const mon = ErtuAPI.random(10, 100)
EertuAPI.profile.add(process.env.ErtuAPIkey, message.author.id, 0, 0, mon, l => ErtuAPI.succ(message, 'You got a $' + mon + '\nComing in Tomorrow at ' + ((parseInt(t.split(':')[0]) + 4) + ':' + (t.split(':')[1])) + ' MSK'))
})}