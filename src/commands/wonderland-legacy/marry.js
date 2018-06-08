import { Command } from "discord.js-commando";

export default class MarryCommand extends Command {
    constructor(client) {
        super(client, {
            name: "marry",
            group: "wonderland-legacy",
            memberName: "marry",
            description: "Marries tagged user",
            examples: [";marry @voided#6691"],
            args: [
                {
                    key: "user",
                    prompt: "Who do you want to marry?",
                    type: "user"
                }
            ]
        });
    }

    async run(msg, { user }) {
        msg.channel.send(`<@${msg.author.id}> has married <@${user.id}>`);
    }
}