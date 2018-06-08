import { Command } from "discord.js-commando";

export default class KMSCommand extends Command {
    constructor(client) {
        super(client, {
            name: "kms",
            group: "wonderland-legacy",
            memberName: "kms",
            description: "Attempts to, well, uh Kill yourself",
            examples: [";kms"]
        });
    }

    async run(msg) {
        var authorTag = `<@${msg.author.id}>`;
        var responses = [
            " has killed themself, RIP!",
            " no, not today",
            " tried to kill themself, and respawned. Stay alive lil' soul, there's no such thing as dying online x')",
            " Why ?",
            " Suicide is stupid."
        ];

        var randNum = Math.floor(Math.random() * responses.length);

        msg.channel.send(authorTag + responses[randNum]);
    }
}