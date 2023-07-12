require('dotenv').config();
const{REST, Routes, ApplicationCommandOptionType} = require('discord.js');

const commands = [
    {
        name: 'goat',
        description: 'Sends a goat',
    },
    {
        name: 'hey',
        description: 'Replies with hey!',
    },
    {
        name: 'time',
        description: 'Gives the current timezones',
    },
    {
        name: 'add',
        description: 'Adds two numbers',
        options: [
            {
                name: 'first-number',
                description: 'The first number.',
                type: ApplicationCommandOptionType.Number,
                /*choices:[
                    {
                        name: 'one',
                        value: 1,
                    },
                    {
                        name: 'two',
                        value: 2,
                    },
                    {
                        name: 'three',
                        value: 3,
                    },
                ],*/
                required: true,
            },
            {
                name: 'second-number',
                description: 'The second number.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
        ]
    },
    {
        name: 'ping',
        description: 'Sends the ping',
    },
];

const rest = new REST({version: '10'}).setToken(process.env.TOKEN);

(async ()=>{
    try{
        console.log('Registering commands');

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        )

        console.log('Commands were registered');
    }catch (e){
        console.log(`Error Occurred! ${e}`)
    }
})();