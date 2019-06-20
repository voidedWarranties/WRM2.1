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
import voiceStateUpdate from "./events/voiceStateUpdate";

const client = new Commando.Client({
    owner: config.owner_id,
    commandPrefix: config.prefix,
    unknownCommandResponse: false
});

client.on("ready", () => {
    console.log(`Ready- Logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);
    console.log(`Invite me with: https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=2146958591`);

    client.user.setPresence({
        status: "online",
        activity: {
            name: `Finally version ${config.version}`,
            type: "PLAYING"
        }
    }).then(console.error);

    client.registry
    .registerDefaultTypes()
    .registerGroups([
        ["wrm2", "Wonderland Report Manager Reloaded"],
        ["wonderland-legacy", "Wonderland's features in JS"]
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

        const events = {
            MESSAGE_REACTION_ADD: 'messageReactionAdd',
            MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
        };

        // https://gist.github.com/Danktuary/27b3cef7ef6c42e2d3f5aff4779db8ba
        
        client.on('raw', async event => {
            if (!events.hasOwnProperty(event.t)) return;
            
            const { d: data } = event;
            const user = client.users.get(data.user_id);
            const channel = client.channels.get(data.channel_id) || await user.createDM();
            
            if (channel.messages.has(data.message_id)) return;
            
            const message = await channel.messages.fetch(data.message_id);

            const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
            const reaction = message.reactions.get(emojiKey);
        
            client.emit(events[event.t], reaction, user);
        });

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

if(config.egg_enabled) {
    client.on("voiceStateUpdate", voiceStateUpdate);
}

client.login(config.bot_token);