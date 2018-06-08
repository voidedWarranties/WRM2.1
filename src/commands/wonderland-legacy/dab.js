import { Command } from "discord.js-commando"

export default class DabCommand extends Command {
    constructor(client) {
        super(client, {
            name: "dab",
            group: "wonderland-legacy",
            memberName: "dab",
            description: "Basically dabs, what else ._.",
            examples: [";dab"]
        });
    }

    async run(msg) {
        msg.channel.send("<o/ \\o/ \\o>");
    }
}