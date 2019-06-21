const jimp = require('jimp')
module.exports.info = {
    name: 'ttt',
    regex: /t(ic)?-?t(ac)?-?t(oe)?-?|к(рестики)?-?н(олики)?/,
    args: '[user]',
    desc: 'Tic Tac Toe',
}
module.exports.run = (message, args) => {
/*
  FIELD
[0][1][2]
[3][4][5]
[6][7][8]
*/
const field = new Array(9)
const poss = {
0: [14,  14], 1: [144,  14], 2: [272,  14],
3: [14, 140], 4: [144, 140], 5: [272, 140],
6: [14, 271], 7: [144, 271], 8: [272, 271]
}
let opponent = message.mentions.users.first() || null
const checkWin = (type) => {
  //Horisontal
  for(let i = 0; i < 3; i = i++) if(field[i] === type && field[i + 3] === type && field[i + 6] === type) return true
  //Vertical
  for(let i = 0; i < 9; i += 3) if(field[i] === type && field[i + 1] === type && field[i + 2] === type) return true
  //Diagonal
  for(let i = 0; i < 9; i += 2) {if(i === 4) continue; if(field[4] === type && field[i] === type && field[Math.abs(i - 8)]) return true}
return false
}
const checkingDoubleMoves = (position, type) => {
  for (let i = 0; i < 3; i++) if (field[i] === type && field[i + 3] === type && !field[i + 6]) return position = i + 6
  for (let i = 0; i < 3; i++) if (field[i + 6] === type && field[i + 3] === type && !field[i]) return position = i
  for (let i = 0; i < 9; i = i + 3) if (field[i] === type && field[i + 1] === type && !field[i + 2]) return position = i + 2
  for (let i = 0; i < 9; i = i + 3) if (field[i + 2] === type && field[i + 1] === type && !field[i]) return position = i
  for (let i = 0; i < 3; i++) if (field[i] === type && field[i + 6] === type && !field[i + 3]) return position = i + 3
  for (let i = 0; i < 9; i = i + 3) if (field[i] === type && field[i + 2] === type && !field[i + 1]) return position = i + 1
  for (let i = 0; i < 9; i = i + 2) {if (i === 4) continue; if (field[4] === type && field[i] === type && !field[Math.abs(i - 8)]) return position = Math.abs(i - 8)}
  for (let i = 0; i < 3; i = i + 2) if (field[i] === type && field[Math.abs(i - 8)] === type && !field[4]) return position = 4
  return null}
    const checkFinal = (aifirst) => {
      let coll = []
      for(let i = 0; i < 9; i++) {if(field[i]) coll[coll.length - 1] = 1}
      if((coll.length === 9) || (checkWin((aifirst?'X':'O')) && checkWin((aifirst?'O':'X')))) {
        console.log('draw')
        return 'draw'
      }
      if(checkWin((aifirst?'X':'O'))) {
      console.log('lose')
      return 'lose'
    }
    if(checkWin((aifirst?'O':'X'))) {
      console.log('win')
      return 'win'
    }
    return false}
const AImove = (messag, img, position, moves, aifirst, aimove) => {
  jimp.read('https://media.discordapp.net/attachments/556868793855377408/589811171977199635/tttbg.png', async (err, f) => {
    if(img) f = img
    if(aimove === true) {
      moves++
    if (checkingDoubleMoves(position, (aifirst?'X':'O'))) position = checkingDoubleMoves(position, (aifirst?'X':'O')) + 1
      console.log(position)
    field[position - 1] = (aifirst?'X':'O')
      position = poss[position - 1]
    if(aifirst === true) await jimp.read('https://media.discordapp.net/attachments/556868793855377408/589828058735968286/tttcross.png').then(async cross => await f.composite(cross, position[0], position[1]))
      else await jimp.read('https://media.discordapp.net/attachments/556868793855377408/589828043254661130/tttcircle.png').then(async circle => await f.composite(circle, position[0], position[1]))
      f.getBuffer(jimp.MIME_PNG, async (err, buff) => {if(checkFinal(aifirst)){messag.delete(); messag.channel.send('You ' + checkFinal(aifirst) + '.\nMoves: ' + (moves - 1) + '\nTry again?', {files: [new ErtuAPI.Discord.Attachment(buff, 'field.png')]})}else{messag.delete(); messag = await messag.channel.send('You ' + (aifirst?'O':'X') + '. Type a number from 1 to 9 or end to end the game.', {files: [new ErtuAPI.Discord.Attachment(buff, 'field.png')]})}})
        const choosing = () => {const collector = new ErtuAPI.Discord.MessageCollector(message.channel, i => i.author.id === message.author.id, { time: 120000 })
        collector.on('collect', msg => {
          if(msg.content.match(/en[dt]|законч[еи](ть)?/)) {messag.delete(); msg.delete(); return message.reply('game stopped successfully').then(l => l.delete(1500))}
          const number = parseInt(msg.content)
          if(isNaN(number)) {ErtuAPI.err(message, 'Provide a normal number...'); return choosing()}
          if(number > 9 || number < 1) {ErtuAPI.err(message, 'Game field has a 9 cell, idiot'); return choosing()}
          if(field[number - 1]) {ErtuAPI.err(message, 'Cell is busy, not seen?'); return choosing()}
          collector.stop()
          return AImove(messag, f, number, moves++, aifirst, (aimove === true?false:true))
        })}
      if(!checkFinal()) choosing()
    } else {
    field[position - 1] = (aifirst?'O':'X')
    position = poss[position - 1]
    if(aifirst === false) await jimp.read('https://media.discordapp.net/attachments/556868793855377408/589828058735968286/tttcross.png').then(async cross => await f.composite(cross, position[0], position[1]))
      else await jimp.read('https://media.discordapp.net/attachments/556868793855377408/589828043254661130/tttcircle.png').then(async circle => await f.composite(circle, position[0], position[1]))
      let newPos = ErtuAPI.random(1, 9)
      if(field[newPos - 1]) newPos = ErtuAPI.random(1, 9)
    return AImove(messag, f, newPos, moves++, aifirst, (aimove === true?false:true))
    }
  })
}
if(opponent) {
  if(opponent === message.author) return ErtuAPI.err(message, 'You not have a friends?')
  if(opponent.bot) return ErtuAPI.err(message, 'Bots can\'t play with you')
  if(opponent.presence.status === 'offline') return ErtuAPI.err(message, 'Opponent in offline')
message.channel.send(opponent + ', you can to play with ' + message.author + '?').then(() => {
  const collector = new ErtuAPI.Discord.MessageCollector(message.channel, m => m.author.id === opponent.id, { time: 120000 })
  collector.on('collect', msg => {
    collector.stop()
    if(msg.content.toLowerCase().match(/yes|да|[ий]ес|\+|-|no|ноу|не[ть]/)) {
      if(msg.content.toLowerCase().match(/yes|да|[ий]ес|\+/)) {
        message.channel.send(new ErtuAPI.Discord.RichEmbed().setColor('ffff00').setDescription('Choose a first player:\n1. ' + opponent + '\n2. ' + message.author)).then(async m => {await m.react('1⃣'); await m.react('2⃣');
        const collector2 = m.createReactionCollector((r, u) => [opponent.id, message.author.id].includes(u.id), { time: 120000 })
        collector2.on('collect', r => {
          if(r.emoji.name === '1⃣') {
            collector2.stop()
            m.edit(new ErtuAPI.Discord.RichEmbed().setColor('00ff00').setDescription('OK\nX - ' + opponent + '\nO - ' + message.author))
          }
          else if(r.emoji.name === '2⃣') {
            collector2.stop()
            m.edit(new ErtuAPI.Discord.RichEmbed().setColor('00ff00').setDescription('OK\nX - ' + message.author + '\nO - ' + opponent))
          }
        })})
      } else message.reply('opponent not want to play with you')
    }
  })
})
} else {
        message.channel.send(new ErtuAPI.Discord.RichEmbed().setColor('ffff00').setDescription('Choose a first player:\n1. ' + ErtuAPI.client.user + '\n2. ' + message.author)).then(async m => {await m.react('1⃣'); await m.react('2⃣');
        const collector2 = m.createReactionCollector((r, u) => u.id === message.author.id, { time: 120000 })
        collector2.on('collect', async r => {
          if(r.emoji.name === '1⃣') {
          m.edit(new ErtuAPI.Discord.RichEmbed().setColor('00ff00').setDescription('OK\nX - ' + ErtuAPI.client.user + '\nO - ' + message.author)).then(() => m.delete(1500))
          collector2.stop()
          return AImove(await message.channel.send('Waiting...'), null, [1, 5, 9][ErtuAPI.random(0, 2)], 0, true, true)
          }
          else if(r.emoji.name === '2⃣') {
          m.edit(new ErtuAPI.Discord.RichEmbed().setColor('00ff00').setDescription('OK\nX - ' + message.author + '\nO - ' + ErtuAPI.client.user)).then(() => m.delete(1500))
          collector2.stop()
          //return AImove(await message.channel.send('Waiting...'), null, [1, 5, 9][ErtuAPI.random(0, 2)], 0, false, false)
          //}
        message.channel.send('You X. Type a number from 1 to 9 or end to end the game.').then(messag => {
        const choosing = () => {const collector = new ErtuAPI.Discord.MessageCollector(message.channel, i => i.author.id === message.author.id, { time: 120000 })
        collector.on('collect', async msg => {
          if(msg.content.match(/en[dt]|законч[еи](ть)?/)) {messag.delete(); msg.delete(); return message.reply('game stopped successfully').then(l => l.delete(1500))}
          const number = parseInt(msg.content)
          if(isNaN(number)) {ErtuAPI.err(message, 'Provide a normal number...'); return choosing()}
          if(number > 9 || number < 1) {ErtuAPI.err(message, 'Game field has a 9 cell, idiot'); return choosing()}
          if(field[number - 1]) {ErtuAPI.err(message, 'Cell is busy, not seen?'); return choosing()}
          collector.stop()
          return AImove(messag, null, number, 0, false, false)
      choosing()})}})}})})}}