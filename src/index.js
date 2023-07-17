require('dotenv').config(); //get global var

const {Client, IntentsBitField, EmbedBuilder, ActivityType, InviteTargetType} = require('discord.js'); 
const { Configuration, OpenAIApi } = require('openai');
//use nodemon to start

const client = new Client({
    intents:[ //bots permissions
        IntentsBitField.Flags.Guilds, //access server
        IntentsBitField.Flags.GuildMembers, //server members
        IntentsBitField.Flags.GuildMessages, //send messages
        IntentsBitField.Flags.MessageContent, //read messages
    ],
});

let status = [
    {
        name: "your every move",
        type: ActivityType.Streaming,
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
    {
        name: "your every move",
        type: ActivityType.Streaming,
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
    {
        name: "your every move",
        type: ActivityType.Streaming,
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
    {
        name: "your every move",
        type: ActivityType.Streaming,
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
]

//eventHandler(client);
client.on('ready', (c) => {
    console.log(`✅ ${c.user.tag} is online.`);

    setInterval(() => {
        let random = Math.floor(Math.random() * status.length);
        client.user.setActivity(status[random]);
    }, 10000);
});

client.on('interactionCreate', async (interaction) => {
    try{
        if(!interaction.isButton());
        await interaction.deferReply({ephemeral: true});
    
        const role = interaction.guild.roles.cache.get(interaction.customId);
        if(!role){
            interaction.editReply({
                content: "Role not found!",
            })
            return;
        }
        const hasRole = interaction.member.roles.cache.has(role.id)
        if(hasRole){
            await interaction.member.roles.remove(role);
            await interaction.editReply(`Removed ${role} from your roles`);
            return;
        }
        await interaction.member.roles.add(role);
        await interaction.editReply(`Added ${role} to your roles`);
    }catch(e){
        console.log(e);
    }
})

const configuration = new Configuration({
    apiKey: process.env.OPENAI_TOKEN,
})
const openai = new OpenAIApi(configuration);

client.on('messageCreate', async (message)=> { //()=> is a callback function
    if(message.author.bot){
        return;
    }
    if(message.channelId !== "1130590867233718282"){
        return;
    }
    if(message.content.startsWith("!")){
        return;
    }

    try{
        await message.channel.sendTyping();

        let prevMsg = await message.channel.messages.fetch({limit: 25});
        prevMsg.sort((a, b) => a - b);
        
        let conversationLog = '';

        prevMsg.forEach((msg) => {
            if(msg.content.startsWith('!')) return;

            conversationLog += `\n${msg.author.username}: ${msg.content}`
        });

        const result = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `${client.user.username} is a chatbot

            ${client.user.username}: Hey! What can I do for you?
            ${conversationLog}
            ${client.user.username}:
            `,
        });

        message.reply(result.data.choices[0].text);
    }catch(e){
        console.log(`There was an error: ${error}`);
    }


    if(message.content === 'hello'){
        message.reply('Hey!');
    }
} ); 

client.on('interactionCreate', async (interaction) => { //interactions from commands
    if(!interaction.isChatInputCommand()) return;
    
    if(interaction.commandName === 'hey'){
        interaction.reply('Hello!');
    }

    if(interaction.commandName === 'time'){
        await interaction.deferReply();
        const moment = require('moment');
        const now = moment();
        const nowString = now.format('YYYY-MM-DD HH:mm:ss');
        interaction.editReply(`The current date and time is ${nowString}`);
    }

    if(interaction.commandName === 'ping'){
        const ping = interaction.options.get('ping')?.value;
        interaction.reply(`Ping is ${ping}`);
    }

    if(interaction.commandName === 'add'){
        const first = interaction.options.get('first-number')?.value;
        const second = interaction.options.get('second-number')?.value;
        interaction.reply(`The sum is ${first + second}`)
    }

    if(interaction.commandName === 'goat'){
        const embed = new EmbedBuilder().setTitle('Goat').setColor('Random').setImage('https://i.natgeofe.com/n/e9023026-7589-45ac-9e71-e510730329f3/Goat-portrait_4x3.jpg');
        interaction.reply({ embeds: [embed]});
    }
});

client.on('messageCreate', (message) => {
    if(message.content === 'embed'){
        const embed = new EmbedBuilder().setTitle('Goat').setColor('Random').setImage('https://i.natgeofe.com/n/e9023026-7589-45ac-9e71-e510730329f3/Goat-portrait_4x3.jpg');
        message.channel.send({embeds:[embed]});
    }
});

client.login(process.env.TOKEN); //logs the bot in