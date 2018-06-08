import { Command } from "discord.js-commando";

export default class KillCommand extends Command {
    constructor(client) {
        super(client, {
            name: "kill",
            group: "wonderland-legacy",
            memberName: "kill",
            description: "Kills the tagged user",
            examples: [";kill @voided#6691"],
            args: [
                {
                    key: "user",
                    prompt: "Who do you want to kill?",
                    type: "user"
                }
            ]
        });
    }

    async run(msg, { user }) {
        msg.channel.send(`<@${msg.author.id}> has killed <@${user.id}>`);            
    }
}