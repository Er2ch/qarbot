module.exports.info = {
name: 'run',
regex: /r[ua]n/,
args: ['<type>', '<what to run>'],
private: true,
hidden: false
}
module.exports.run = (message, args, prixix) => {
if(!args[0]) return ErtuAPI.err0r(message, 'Please, provide a type to run')
if(args[0].toLowerCase() === 'code') try{let evaled = eval(args.slice(1).join(' ').replace(/client\.token/g, `'${Math.random().toString(36).substr(2)}.${Math.random().toString(36).substr(2)}_${Math.random().toString(36).substr(2)}'`)), timer = Date.now(); let eevaled = typeof evaled; if(typeof evaled!== 'string') evaled = require('util').inspect(evaled); return message.channel.send(`Successful ✅\nExecution Time: ${Date.now() - timer} ms\nType: ${eevaled[0].toUpperCase() + eevaled.slice(1)}\n\n${evaled}`, {code: 'js', split: '\n'})}catch(err){return message.channel.send(`//Error ❎\n${err}`, {code: 'js'})}
if(['cmd', 'command'].includes(args[0].toLowerCase())) try{return eval('ErtuAPI.commands.find(c => \'' + args[1].toString() + '\'.match(new RegExp(c.regex))).run(message, ' + (JSON.stringify(args.slice(2) || [])) + ', ' + JSON.stringify(prixix) + ')')}catch(err){return message.channel.send(err, {code: 'js', split: '\n'})}
ErtuAPI.err0r(message, 'Please, provide a correct type to run')
}
