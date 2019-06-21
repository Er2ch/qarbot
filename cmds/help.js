module.exports.info = {
name: 'help',
regex: /hel[pb]|пом[оа]щ(ь)?|х[еэ]л[пб]/,
desc: 'Help menu',
args: '[n page|cmd]',
private: false,
hidden: false
}
module.exports.run = (message, args, prixix) => {
        const arr = ErtuAPI.commands.filter(c => !c.hidden && !c.private).map(c => `◽ **${prixix[1]}${c.name} ${c.args?(typeof c.args === 'object'?c.args.map(i => '`' + i + '`').join(' '):`\`${c.args}\``):''} -** ${c.desc? c.desc:'command without description'}`)
        let page = parseInt(args[0]) || 1
        const cmd = ErtuAPI.commands.filter(x => !x.hidden && !x.private).find(c => (args[0] || '').match(new RegExp(c.regex))); 
        if(cmd) return message.channel.send(new ErtuAPI.Discord.RichEmbed().setColor('00fff0').addField('Command **' + prixix[1] + cmd.name + '**', cmd.desc || 'command without description').addField('Usage:', `\`${prixix[1]}${cmd.name}${cmd.args?' ' + (typeof cmd.args === 'object'?cmd.args.map(i => i).join(' '):cmd.args):''}\``))
        const cmdsOnPage = 15;
        const totalPages = Math.ceil(arr.length / cmdsOnPage);
        if (page > totalPages || page < 1) page = 1;
 
        const embed = new ErtuAPI.Discord.RichEmbed().setColor('af00ff').setAuthor('Help', message.author.avatarURL || message.author.defaultAvatarURL).setFooter(`Page ${page} of ${totalPages}`)
        const desc = `**Read this description:\n
\`<...>\` - Require parameter
\`[...]\` - Unrequire parameter
\`&\` - AND
\`|\` - OR
\`n\` - Number**\n\n`;

const updConHelp = (pagee) => arr.slice(((pagee - 1) * cmdsOnPage), (cmdsOnPage) + ((pagee - 1) * cmdsOnPage)).join('\n');

embed.setDescription(desc + updConHelp(page))
message.channel.send(embed).then(msg => {
async function hArrs() {
await msg.react('◀');
await msg.react('⏹');
await msg.react('▶');
}
hArrs();
const collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id, {time: 300000})
collector.on('collect', async r => {
if(!['◀', '⏹', '▶'].includes(r.emoji.name)) return;
r.remove(message.author.id);
if(r.emoji.name === '⏹') { collector.stop(); msg.delete(); }
if(r.emoji.name === '◀') {if(page === 1) page = totalPages; else page = page - 1;if (page > totalPages || page < 1) page = 1;msg.edit(new ErtuAPI.Discord.RichEmbed().setColor('af00ff').setAuthor('Help', message.author.avatarURL || message.author.defaultAvatarURL).setFooter(`Page ${page} of ${totalPages}`).setDescription(desc + updConHelp(page)));}
if(r.emoji.name === '▶') {page = page + 1; if (page > totalPages || page < 1) page = 1; msg.edit(new ErtuAPI.Discord.RichEmbed().setColor('af00ff').setAuthor('Help', message.author.avatarURL || message.author.defaultAvatarURL).setFooter(`Page ${page} of ${totalPages}`).setDescription(desc + updConHelp(page)));}})})}