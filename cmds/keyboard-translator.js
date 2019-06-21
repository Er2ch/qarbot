module.exports.info = {
name: 'keyboard-translator',
regex: /k(ey)?b(oard)?-tr(anslator)?/,
desc: 'Translates a Russian --> English and again',
args: '<text>',
private: false,
hidden: false
}
module.exports.run = (message, args) => {
  if(!args[0]) return ErtuAPI.err0r(message, 'Provide a text', '', 'ghbdtn')
  let replacer = {"q":"й", "w":"ц","e":"у","r":"к", "t":"е", "y":"н", "u":"г","i":"ш", "o":"щ", "p":"з" , "[":"х" , "]":"ъ", "a":"ф", "s":"ы","d":"в" , "f":"а"  , "g":"п" , "h":"р" , "j":"о", "k":"л", "l":"д",";":"ж" , "'":"э"  , "z":"я", "x":"ч", "c":"с", "v":"м", "b":"и","n":"т" , "m":"ь"  , ",":"б" , ".":"ю" , "/":"."}
let eng = Object.keys(replacer)
let rus = Object.values(replacer)
let str = args.join(' ').split('')
for(let i = 0; i < str.length; i++){
if(rus.find(x => x === str[i].toLowerCase()) || eng.find(x => x === str[i].toLowerCase())) {
let rusfind = rus.find(x => x === str[i].toLowerCase())
let engfind = eng.find(x => x === str[i].toLowerCase())
let rstr
if(rusfind) rstr = eng[rus.findIndex(x => x === str[i].toLowerCase())]
else rstr = replacer[engfind]
if(str[i] !== str[i].toLowerCase()) rstr = rstr.toString().toUpperCase()
if(rusfind || engfind) str[i] = rstr
} else if(str[i].toLowerCase() === 'ё') str[i] = (str[i] === str[i].toLowerCase()?'t':'T')
}
ErtuAPI.succ(message, str.join(''))
}