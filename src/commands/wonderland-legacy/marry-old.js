import { Command } from "discord.js-commando";

export default class MarryCommandOld extends Command {
    constructor(client) {
        super(client, {
            name: "marry-old",
            group: "wonderland-legacy",
            memberName: "marry-old",
            description: "Marries tagged user",
            examples: [";marry-old @voided#6691"],
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