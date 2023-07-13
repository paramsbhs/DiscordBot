require('dotenv').config(); //get global var

const {Client, IntentsBitField, EmbedBuilder} = require('discord.js'); 
//use nodemon to start

const client = new Client({
    intents:[ //bots permissions
        IntentsBitField.Flags.Guilds, //access server
        IntentsBitField.Flags.GuildMembers, //server members
        IntentsBitField.Flags.GuildMessages, //send messages
        IntentsBitField.Flags.MessageContent, //read messages
    ],
});

//eventHandler(client);
client.on('ready', (c) => {
    console.log(`✅ ${c.user.tag} is online.`);
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