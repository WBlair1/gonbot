const Discord = require('discord.js');
const bot = new Discord.Client();

//const commands = require(`./commands/${file}`)

const token = 'NzkwNjk5NTk2NDE0MDU4NTA2.X-EaYg.T0U0aH2Oxe42-whJLxWwC0DWhR8';

const prefix = '!';

const fs = require('fs');

bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    bot.commands.set(command.name, command);
}


bot.on('ready', () =>{
    console.log('gon online');
})

bot.on('message', msg=>{
    if(!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'p'){
        bot.commands.get('play').execute(msg, args);
    } else if (command === 's'){
        bot.commands.get('leave').execute(msg, args);
    }
});

bot.login(token);