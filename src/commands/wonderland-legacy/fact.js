// TODO: fact command
// Random fun facts about Wonderland
import { Command } from "discord.js-commando";

export default class FactCommand extends Command {
    constructor(client) {
        super(client, {
            name: "fact",
            group: "wonderland-legacy",
            memberName: "fact",
            description: "Random fun facts about Wonderland",
            examples: ["$fact"]
        });
    }

    async run(msg) {
        var prefix = "**[Random Facts about Wonderland!]** , ";
        var responses = [
            "The only reason why WRM is version 2 is that nobody used version 1",
            "Wonderland was originally coded in C#, but WRM is in NodeJS/ES6",
            "Originally, WRM was not going to include any Wonderland features",
            "5 out of 6 of voided's featured repositories on GitHub are Discord bots"
        ];

        var randNum = Math.floor(Math.random() * responses.length);
        
        msg.channel.send(prefix + responses[randNum]);
    }
}