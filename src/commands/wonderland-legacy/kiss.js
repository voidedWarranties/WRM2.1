// kiss @<user>
// Kisses tagged user

import { Command } from "discord.js-commando";

export default class KissCommand extends Command {
    constructor(client) {
        super(client, {
            name: "kiss",
            group: "wonderland-legacy",
            memberName: "kiss",
            description: "Kisses tagged user",
            examples: [";kiss @frick#1234"],
            args: [
                {
                    key: "user",
                    prompt: "Who do you want to kiss?",
                    type: "user"
                }
            ]
        });
    }

    async run(msg, { user }) {
        msg.channel.send(`<@${msg.author.id}> kisses <@${user.id}>`);
    }
}