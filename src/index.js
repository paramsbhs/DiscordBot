require('dotenv').config(); //get global var

const {Client, IntentsBitField} = require('discord.js'); 
//use nodemon to start

const client = new Client({
    intents:[ //bots permissions
        IntentsBitField.Flags.Guilds, //access server
        IntentsBitField.Flags.GuildMembers, //server members
        IntentsBitField.Flags.GuildMessages, //send messages
        IntentsBitField.Flags.MessageContent, //read messages
    ],
});

client.on('ready', (c) => {console.log(`✅ ${c.user.username} is started up!`)}) //sends a message in the terminal

client.on('messageCreate', (message)=> { //()=> is a callback function
    if(message.author.bot){
        return;
    }

    if(message.content === 'hello'){
        message.reply('Hey!');
    }
} ); 

client.on('interactionCreate', (interaction) => { //interactions from commands
    if(!interaction.isChatInputCommand()) return;
    
    if(interaction.commandName === 'hey'){
        interaction.reply('Hello!');
    }

    if(interaction.commandName === 'time'){
        interaction.reply('Current Time: 12:53PM');
    }

    if(interaction.commandName === 'add'){
        const first = interaction.options.get('first-number')?.value;
        const second = interaction.options.get('second-number')?.value;
        interaction.reply(`The sum is ${first + second}`)
    }
})

client.login(process.env.TOKEN); //logs the bot in