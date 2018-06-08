import Discord from "discord.js";
import Commando from "discord.js-commando";
import path from "path";

import config from "./config.json";

import WebSocket, { Server as WebSocketServer } from "ws";

import wsConnectionEvent from "./ws_events/connection";
import wsMessageEvent from "./ws_events/message";

import driver from "./database/driver";

import webServer from "./web/index";

// Events
import messageReactionAdd from "./events/messageReactionAdd";

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

    client.registry
    .registerDefaultTypes()
    .registerGroups([
        ["wrm2", "Wonderland Report Manager Reloaded"]
    ])
    .registerCommandsIn(path.join(__dirname, "commands"));

    driver.init();

    webServer.start(client, server => {
        console.log("WSS Callback");
        var wss = new WebSocketServer({ server });

        wss.broadcast = data => {
            wss.clients.forEach(client => {
                if(client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(data));
                }
            });
        }

        console.log("WSS Init");
        client.on("messageReactionAdd", (messageReaction, user) => {
            messageReactionAdd(client, wss, messageReaction, user);
        });
        
        wss.on("connection", ws => {
            // console.log("[ws] New connection");
            wsConnectionEvent(ws);
            ws.on("message", message => {
                wsMessageEvent(client, message, wss);
            });
        });
    });
});

client.login(config.bot_token);