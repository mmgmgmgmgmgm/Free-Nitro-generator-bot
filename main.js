const keepAlive = require("./server.js")
const Discord = require('discord.js');
const client = new Discord.Client();
const randomstring = require("randomstring");

const prefix = 'n!';  //You can change token there

client.on('message', msg => {

    let args = msg.content.slice(prefix.length).trim().split(' ');

    if (msg.content.startsWith(`${prefix}setup`)) {

        if (!msg.guild.member(client.user).hasPermission(["MANAGE_CHANNELS", "ADMINISTRATOR"])) return;
        msg.guild.channels.create(`wumpus`, 'clyde').catch(e => { }); //If want change channel name

    }

    if (msg.content.startsWith(`${prefix}gen`)) {

        msg.delete()

        msg.channel.send("https://discord.gift/" + randomstring.generate(16));

    }


    if (msg.content.startsWith(`${prefix}start`)) {
        if (!msg.guild.member(client.user).hasPermission(["ADMINISTRATOR"])) return;

        msg.delete()

        var interval = setInterval(function () {

            msg.channel.send("https://discord.gift/" + randomstring.generate(16));

        }, 2000);

    }

});

keepAlive()
client.on('ready', async () => {
    console.log('gl')

    let statuses = [
        `n!setup > n!gen`,// Here u can change status
    ]

    setInterval(function () {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        client.user.setActivity(status, {
            type: "PLAYING",
            url: "https://discord.gg/YpEWbqWTsq" //Can be changed but please give credits ;D
        })
    }, 4000)
})

client.login('TOKEN') //put bot token