module.exports.info = {
name: 'color',
regex: /co[lo]or|к[оа]л[оа]р|цве[тд]/,
desc: 'Показывает информацию о цвете',
args: '<цвет>',
private: false,
hidden: false
}
module.exports.run = (message, args) => {const c = args.join('');
if(!c) return ErtuAPI.err0r(message, 'Укажите цвет', '', '=color #123123')
const color = require('rgbcolor');
const col = new color(c);
message.channel.send(new ErtuAPI.Discord.RichEmbed()
.setTitle(`${col.ok?'Color':'Not color'} ${c.toString().toUpperCase()}`)
.setThumbnail(`http://singlecolorimage.com/get/${col.ok?col.toHex().toString().slice(1):'2C2F33'}/100x100`)
.addField('HEX', col.ok?col.toHex():'This is not color')
.addField('RGB', col.ok?col.toRGB():'This is not color')
.setColor(col.ok?col.toHex():''))}