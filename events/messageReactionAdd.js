const WebSocket = require("ws");
const getUrls = require("get-urls");

const config = require("../config.json")

const findOne = require("../util/findOne");
const findOneAndRemove = require("./../util/findOneAndRemove");

var ws;
var client;
exports.init = (client) => {
    this.client = client;
    ws = new WebSocket("ws://localhost:8080");
}

exports.event = async (messageReaction, user) => {
    var message = messageReaction.message;
    var emoji = messageReaction.emoji;
    var author = message.author;
    var guild = message.guild;

    var member = guild.members.find("id", user.id);

    if(user === this.client.user) {
        return;
    }
    if(!(user === message.author) && !(member.roles.find("name", config.wrm_rolename))) {
        return;
    }

    if(emoji.name === "🎫" && !messageReaction.me) {
        message.react("🎫");
        ws.send(JSON.stringify({
            message: {
                author: {
                    username: author.username,
                    discriminator: author.discriminator,
                    id: author.id,
                    avatar: author.displayAvatarURL
                },
                content: message.content,
                urls: Array.from(getUrls(message.content)).length ? Array.from(getUrls(message.content)): null,
                attachments: message.attachments.array().length ? message.attachments.array().map(a => a.url) : null,
                id: message.id
            },
            type: "new"
        }));

        // Resolve
        await message.react("✅");

        // Falsify
        await message.react("❎");

        // Move to #general
        await message.react("⛔");

        // Under Investigation
        await message.react("🔎");

        // Delete
        await message.react("❌");
        return;
    }

    const normalHandling = async (moji, messageToSend) => {
        findOneAndRemove(message.id).exec();
        message.reply(messageToSend);
        await message.clearReactions();
        await message.react(moji);
    }

    if(member.roles.find("name", config.wrm_rolename) && message.reactions.find(reaction => reaction.emoji.name === "🎫") && messageReaction.me) {
        switch(emoji.name) {
            case "✅":
                normalHandling("✅", `*Update*: Your ticket has been marked as \`solved\` by ${user.tag}`);
                break;
            case "❎":
                normalHandling("❎", `*Update*: Your ticket has been marked as \`invalid\` by ${user.tag}`);
                break;
            case "⛔":
                normalHandling("⛔", `Please do not chat in the reports channel! -${user.tag}`);
                break;
            case "🔎":
                message.reply(`*Update*: Your ticket is currently \`under investigation\`, please be patient! -${user.tag}`);
                await messageReaction.remove(user);
                break;
            case "❌":
                findOneAndRemove(message.id).exec();
                await message.clearReactions();
        }
    }
}