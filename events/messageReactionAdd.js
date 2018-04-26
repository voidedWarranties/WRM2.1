const WebSocket = require("ws");
const getUrls = require("get-urls");

var ws;
var client;
exports.init = (client) => {
    this.client = client;
    ws = new WebSocket("ws://localhost:8080");
}

exports.event = (messageReaction, user) => {
    var message = messageReaction.message;
    var emoji = messageReaction.emoji;
    if(user === this.client.user) {
        return;
    }
    if(!(user === message.author)) {
        return;
    }
    if(emoji.name === "🎫") {
        message.react("🎫");
        ws.send(JSON.stringify({
            message: {
                author: {
                    username: message.author.username,
                    discriminator: message.author.discriminator,
                    id: message.author.id,
                    avatar: message.author.displayAvatarURL
                },
                content: message.content,
                urls: Array.from(getUrls(message.content)).length ? Array.from(getUrls(message.content)): null,
                attachments: message.attachments.array().length ? message.attachments.array().map(a => a.url) : null,
                id: message.id
            }
        }));
    }
}