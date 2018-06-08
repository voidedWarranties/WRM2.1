import { Command } from "discord.js-commando";

export default class HateCommand extends Command {
    constructor(client) {
        super(client, {
            name: "hate",
            group: "wonderland-legacy",
            memberName: "hate",
            description: "Broadcast that you hate the tagged user",
            examples: [";hate @voided#6691"],
            args: [
                {
                    key: "user",
                    prompt: "Who do you want to hate?",
                    type: "user"
                }
            ]
        });
    }

    async run(msg, { user }) {
        msg.channel.send(`<@${msg.author.id}> hates <@${user.id}>`);
    }
}