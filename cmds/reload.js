module.exports.info = {
  name: 'reload',
  regex: /r[ei]load/,
  private: 'true'
}
module.exports.run = (message, args) => {
      if(message.author.id !== "440866756702109706") return //message.channel.send("Ты не создатель!"); 
    try { 
        delete require.cache[require.resolve(`/app/cmds/${args[0]}.js`)]; 
    } catch (e) { 
        return message.channel.send(`Укажи нормальный файл для перезапуска..`); 
    } 
    message.channel.send(`Перезагружена команда ${args[0]}.js`);
}