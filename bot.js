const Discord = require("discord.js");
const Commando = require("discord.js-commando");
const path = require("path");

const config = require("./config.json");

const WebSocket = require("ws");
const WebSocketServer = WebSocket.Server;
const wsMessageEvent = require("./ws_events/message");

const driver = require("./database/driver");

var wss = new WebSocketServer({
    port: 8080
}, () => {
    console.log("WSS Init");
    messageReactionAdd.init(client);
});

wss.on("connection", ws => {
    ws.on("message", (message) => {
        wsMessageEvent(message);
    });
});

// Events
const messageReactionAdd = require("./events/messageReactionAdd");

const client = new Commando.Client({
    owner: config.owner_id,
    commandPrefix: config.prefix,
    unknownCommandResponse: false
});

client.on("ready", () => {
    console.log(`Ready- Logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);
    console.log(`Invite me with: https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=2146958591`);

    client.user.setPresence({
        game: {
            name: `${config.version}`,
            url: "https://twitch.tv/"
        }
    });

    driver.init();
});

client.on("messageReactionAdd", messageReactionAdd.event);

client.login(config.bot_token);