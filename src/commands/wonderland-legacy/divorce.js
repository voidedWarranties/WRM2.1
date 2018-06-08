import { Command } from "discord.js-commando";

export default class DivorceCommand extends Command {
    constructor(client) {
        super(client, {
            name: "divorce",
            group: "wonderland-legacy",
            memberName: "divorce",
            description: "Divorces tagged user",
            examples: [";divorce @voided#6691"],
            args: [
                {
                    key: "user",
                    prompt: "Who do you want to divorce?",
                    type: "user"
                }
            ]
        });
    }

    async run(msg, { user }) {
        msg.channel.send(`<@${msg.author.id}> has divorced <@${user.id}>`);
    }
}