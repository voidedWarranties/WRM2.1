import { Command } from "discord.js-commando";

export default class PunchCommand extends Command {
    constructor(client) {
        super(client, {
            name: "punch",
            group: "wonderland-legacy",
            memberName: "punch",
            description: "Punches tagged user",
            examples: [";punch @voided#6691"],
            args: [
                {
                    key: "user",
                    prompt: "Who do you want to punch?",
                    type: "user"
                }
            ]
        });
    }

    async run(msg, { user }) {
        msg.channel.send(`<@${msg.author.id}> punched <@${user.id}>`);
    }
}