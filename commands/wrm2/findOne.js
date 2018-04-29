const { Command } = require("discord.js-commando");

const findOne = require("./../../util/findOne");

module.exports = class FindOneCommand extends Command {
    constructor(client) {
        super(client, {
            name: "findone",
            group: "wrm2",
            memberName: "findone",
            description: "Finds a ticket with the given message ID.",
            examples: [";findone 12345"],
            args: [
                {
                    key: "message",
                    prompt: "What ticket do you want to find?",
                    type: "message"
                }
            ]
        });
    }

    run(msg, { message }) {
        findOne(message.id).exec((err, ticket) => {
            msg.reply(ticket);
        });
    }
}