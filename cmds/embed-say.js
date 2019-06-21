module.exports.info = {
name: 'embed-say',
regex: /embed-say/,
desc: 'Embed say :thinking:',
args: '<params>',
private: false,
hidden: false
}
module.exports.run = (message, args) => {try{
            let text = args.join(' ').replace(/\n/g, "\\n")
            let embed = new ErtuAPI.Discord.RichEmbed();
            let datas = text.match(/<(.*?)>/gi)
            if (datas !== null) {
              datas.forEach(i => {
                /*if(i.match(/<(author|user)_ava(tar)?>/))*/ text = text.replace(/<(user|author)_ava(tar)?>/, message.author.avatarURL)
                text = text.replace(/<(user|author)_(user)?name>/, message.author.username)
                text = text.replace(/<(user|author)_(tag|full(_)?name)>/, message.author.tag)
                text = text.replace(/<(server|guild)_(ava(tar)?|icon)>/, message.guild.iconURL)
                text = text.replace(/<(server|guild)_name>/, message.guild.name)
                //text = text.replace(/<(.*?)_ava(tar)?>/, message.guild.member(client.users.get(i.slice(1, -5))).user.avatarURL || message.guild.members.find(m => m.user.username.match(new RegExp(i.slice(1, -5)))).user.avatarURL)
              })
            }
            let footer = text.match(/{footer:(.*?)( \| icon: ?(.*?))?}/i);
            if (footer !== null) {
                embed.setFooter(footer[1], footer[3])
            }
            let image = text.match(/{image: ?(.*?)}/i);
            if (message.attachments.size > 0 && message.attachments.first().height) {embed.setImage(message.attachments.first().url); image = null;}
            if (image !== null) {
                embed.setImage(image[1]/*.substring(image[1].lastIndexOf('/') + 1)*/);
            }
            let thumb = text.match(/{thumbnail: ?(.*?)}/i);
            if (thumb !== null) {
               /* embed.attachFile({
                    attachment: thumb[1],
                    file: thumb[1].substring(thumb[1].lastIndexOf('/') + 1)
                }).setThumbnail('attachment://'+thumb[1].substring(thumb[1].lastIndexOf('/') + 1));*/
              embed.setThumbnail(thumb[1])
            }
            let author = text.match(/{author: (.*?)( \| icon: ?(.*?))?( \| url: ?(.*?))?}/i);
            if (author !== null) {
                embed.setAuthor(author[1], author[3], author[5])
            }
            let title = text.match(/{title:(.*?)}/i);
            if (title !== null) {
                embed.setTitle(title[1])
            }
            let url = text.match(/{url: ?(.*?)}/i);
            if (url !== null) {
                embed.setURL(url[1])
            }
            let description = text.match(/{description:(.*?)}/i);
            if (description !== null) {
                embed.setDescription(description[1].replace(/\\n/g, '\n'))
            }
            let color = text.match(/{colou?r: ?(.*?)}/i);
            if (color !== null) {
                embed.setColor(color[1].toUpperCase())
            }
            let timestamp = text.match(/{timestamp(: ?(.*?))?}/i);
            if (timestamp !== null) {
                if (timestamp[2] === undefined || timestamp[2] === null)
                embed.setTimestamp(new Date());
                else
                embed.setTimestamp(new Date(timestamp[2]));
            }
            let fields = text.match(/{field: ?(.*?) \| value: ?(.*?)( \| inline)?}/gi);
            if (fields !== null) {
                fields.forEach((item) => {
                if (item[1] == null || item[2] == null || typeof item[1] === "undefined" || typeof item[2] === "undefined") return;
                let matches = item.match(/{field: ?(.*?) \| value: ?(.*?)( \| inline)?}/i);
                embed.addField(matches[1], matches[2], (matches[3] != null));
            });}
            message.channel.send({embed}).catch()
            //message.delete();
            //message.author.send(args.join(' '));
        } catch(e) {
            message.channel.send('Ошибка отправки эмбэда').then(msg => msg.delete(3000));
            console.error(e);
        }
}