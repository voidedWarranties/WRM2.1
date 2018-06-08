import { Command } from "discord.js-commando";

export default class ByeCommand extends Command {
    constructor(client) {
        super(client, {
            name: "bye",
            group: "wonderland-legacy",
            memberName: "bye",
            description: "Says bye to tagged user",
            examples: [";bye @voided#6691"],
            args: [
                {
                    key: "user",
                    prompt: "Who do you want to say bye to?",
                    type: "user"
                }
            ]
        });
    }

    async run(msg, { user }) {
        msg.channel.send(`<@${msg.author.id}> says bye to ${user.username}`)
    }
}