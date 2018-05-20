const Ticket = require("../database/models/ticket");

const findOneAndRemove = require("../util/findOneAndRemove");

const config = require("../config.json");

module.exports = async (client, message, wss) => {

    message = JSON.parse(message);

    const guild = client.guilds.get(config.server_id);
    const channel = guild.channels.find(channel => channel.name === config.wrm_ticketchannel);

    const normalHandling = async (message, moji, messageToSend) => {
        findOneAndRemove(message.id).exec();
        message.reply(messageToSend);
        await message.clearReactions();
        await message.react(moji);

        // Broadcast to all clients that the message is being removed
        wss.broadcast({
            type: "remove",
            id: message.id
        });
    }

    if(message.type === "remove") {
        channel.fetchMessage(message.id).then(async mmessage => {
            switch(message.action) {
                case "resolve":
                    normalHandling(mmessage, "✅", `*Update*: Your ticket has been marked as \`solved\` by ${mmessage.author.tag}`)
                    break;
                case "falsify":
                    normalHandling(mmessage, "❎", `*Update*: Your ticket has been marked as \`invalid\` by ${mmessage.author.tag}`);
                    break;
                case "move":
                    normalHandling(mmessage, "⛔", `Please do not chat in the reports channel! -${mmessage.author.tag}`);
                    break;
                case "delete":
                    findOneAndRemove(mmessage.id).exec();
                    await mmessage.clearReactions();
                    wss.broadcast({
                        type: "remove",
                        id: message.id
                    });
            }
        });
    }

    if(message.type === "update") {
        if(message.action === "investigate") {
            channel.fetchMessage(message.id).then(async mmessage => {
                mmessage.reply(`*Update*: Your ticket is currently \`under investigation\`, please be patient! -${mmessage.author.tag}`);
            });
        }
    }
}