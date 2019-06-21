module.exports.info = {
name: '8ball',
regex: /8ball|ball|8/,
desc: 'Crystal Ball',
args: '<question>',
private: false,
hidden: false
}
module.exports.run = (message, args, prixix) => {
        const answers = ['Without a doubt!', 'Yes, of course', 'Yes', 'It seems yes', 'Maybe', 'Absolutely not!', 'No, no', 'No', 'Nope', 'I doubt', 'I don\'t know, ask later']
        const numOfAnswer = ErtuAPI.random(0, answers.length - 1);
        if (!args[0]) return ErtuAPI.err0r(message, 'Ask a question', '', `${prixix[1]}8ball You live in London?`);
        message.reply(answers[numOfAnswer]);
    }