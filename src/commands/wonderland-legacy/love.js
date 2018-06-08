import { Command } from "discord.js-commando";

export default class LoveCommand extends Command {
    constructor(client) {
        super(client, {
            name: "love",
            group: "wonderland-legacy",
            memberName: "love",
            description: "Broadcast that you love the tagged user",
            examples: [";love @voided#6691"],
            args: [
                {
                    key: "user",
                    prompt: "Who do you want to love?",
                    type: "user"
                }
            ]
        });
    }

    async run(msg, { user }) {
        msg.channel.send(`<@${msg.author.id}> l o v e s <@${user.id}>`);
    }
}