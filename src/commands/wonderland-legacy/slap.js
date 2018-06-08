import { Command } from "discord.js-commando";

export default class SlapCommand extends Command {
    constructor(client) {
        super(client, {
            name: "slap",
            group: "wonderland-legacy",
            memberName: "slap",
            description: "Slaps tagged user",
            examples: [";slap @voided#6691"],
            args: [
                {
                    key: "user",
                    prompt: "Who do you want to slap?",
                    type: "user"
                }
            ]
        });
    }

    async run(msg, { user }) {
        msg.channel.send(`<@${msg.author.id}> slapped <@${user.id}>`);
    }
}