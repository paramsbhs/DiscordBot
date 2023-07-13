require('dotenv').config(); //get global var

const {Client, IntentsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js'); 
//use nodemon to start

const client = new Client({
    intents:[ //bots permissions
        IntentsBitField.Flags.Guilds, //access server
        IntentsBitField.Flags.GuildMembers, //server members
        IntentsBitField.Flags.GuildMessages, //send messages
        IntentsBitField.Flags.MessageContent, //read messages
    ],
});

const roles = [
    {
        id: '1126152557547499530',
        label: 'RL'
    },
    {
        id: '1126152702456508448',
        label: 'LOL'
    },
    {
        id: '1126152861986856980',
        label: 'R6'
    },
    {
        id: '1126152936280555520',
        label: 'CS'
    },
]


client.on('ready', async (c) => {
    try{
        const channel = await client.channels.cache.get('1128776191680184402')
        if(!channel) return;

        const row = new ActionRowBuilder();
        roles.forEach((role) => {
            row.components.push(
                new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Primary)
            );
        });

        await channel.send({
            content: 'Claim or remove a role below.',
            components: [row],
        });
        process.exit();

    }catch(e){
        console.log(e);
    }
});

client.login(process.env.TOKEN); //logs the bot in