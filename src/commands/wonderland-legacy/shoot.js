import { Command } from "discord.js-commando";

export default class ShootCommand extends Command {
    constructor(client) {
        super(client, {
            name: "shoot",
            group: "wonderland-legacy",
            memberName: "shoot",
            description: "Shoots tagged user",
            examples: [";shoot @voided#6691"],
            args: [
                {
                    key: "user",
                    prompt: "Who do you want to shoot?",
                    type: "user"
                }
            ]
        });
    }

    async run(msg, { user }) {
        msg.channel.send(`<@${msg.author.id}> ▄︻̷̿┻̿═━一 <@${user.id}>`);
    }
}