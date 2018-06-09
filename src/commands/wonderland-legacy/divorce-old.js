import { Command } from "discord.js-commando";

export default class DivorceCommandOld extends Command {
    constructor(client) {
        super(client, {
            name: "divorce-old",
            group: "wonderland-legacy",
            memberName: "divorce-old",
            description: "Divorces tagged user",
            examples: [";divorce-old @voided#6691"],
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