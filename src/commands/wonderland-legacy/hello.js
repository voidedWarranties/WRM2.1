import { Command } from "discord.js-commando";

export default class HelloCommand extends Command {
    constructor(client) {
        super(client, {
            name: "hello",
            aliases: ["hi"],
            group: "wonderland-legacy",
            memberName: "hello",
            description: "Says hello to the bot",
            examples: [";hello", ";hi"]
        });
    }

    async run(msg) {
        msg.channel.send(`Hi, <@${msg.author.id}>! I'm ${this.client.user.username}`);
    }
}