module.exports.info = {
name: 'safe-eval',
regex: /safe-e[vb]al/,
desc: 'Safe mode of eval',
args: '<code>',
private: false,
hidden: false
}
module.exports.run = (message, args) => {try{let evaled = require('safe-eval')(args.join(' ').replace(/eval\((.*?)\)/g, ''), {client: {token: 'IdI_NaHuI.A_Ne_To_BaNaNaN'}}); let eevaled = typeof evaled; if(typeof evaled!== 'string') evaled = require('util').inspect(evaled); message.channel.send(`//Successful ✅\n//Type: ${eevaled}\n${evaled.replace(/(http:\/\/|https:\/\/)?discord(app\.com\/invite|.\w{2}\/\w{3,})/gi, '[INVITE]')}`, {code: 'js', split: '\n'})}catch(err){message.channel.send(`//Error ❎\n${err}`, {code: 'js'})}}