module.exports.info = {
name: 'weather',
regex: /weather|п[оа]года/,
desc: 'Примерная погода на сегодня',
args: '[местоположение]',
private: false,
hidden: false
}
module.exports.run = (message, args) => {
        let qu = args.join(' '), wdata = require('/app/weather-data.json')
        if(!qu && wdata[message.author.id]) qu = wdata[message.author.id].q
      require('weather-js').find({search: qu, degreeType: 'C', lang: 'ru-RU'}, function(error, result) {
      if (result === undefined || result.length === 0) {
          ErtuAPI.err(message, 'Я не знаю такого местоположения :thinking:');
          return;
      }
if(!wdata[message.author.id]) wdata[message.author.id] = {q: qu}
        if(wdata[message.author.id].q !== qu) wdata[message.author.id].q = qu
require('fs').writeFile("/app/weather-data.json", JSON.stringify(wdata), (err) => { 
if(err) console.log(err)
});
          
  var current = result[0].current;
      var location = result[0].location;
      const embed = new ErtuAPI.Discord.RichEmbed()
          .setDescription(`**${current.skytext}**`)
          .setAuthor(`Погода в ${current.observationpoint}`)
          .setThumbnail(current.imageUrl)
          .setColor('af00ff')
          .addField('Временная зона',`UTC${location.timezone}`, true)
          //.addField('Тип температуры',location.degreetype, true)
          .addField('Температура',`${Math.sign(current.temperature) < 0? '-' + ErtuAPI.declOfNum(current.temperature.toString().slice(1), ['градус', 'градуса', 'градусов']):ErtuAPI.declOfNum(current.temperature, ['градус', 'градуса', 'градусов'])}°${location.degreetype}`, true)
          .addField('Ощущается как', `${Math.sign(current.feelslike) < 0? '-' + ErtuAPI.declOfNum(current.feelslike.toString().slice(1), ['градус', 'градуса', 'градусов']):ErtuAPI.declOfNum(current.feelslike, ['градус', 'градуса', 'градусов'])}°${location.degreetype}`, true)
          .addField('Ветер', current.winddisplay, true)
          .addField('Влажность', `${current.humidity}%`, true)
          .setFooter(`${ErtuAPI.client.user.tag.slice(0, -5)} 2018-2019. Все права защищены.`);
          message.channel.send(embed);
  })
        }