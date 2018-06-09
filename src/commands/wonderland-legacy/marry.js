import { Command } from "discord.js-commando";

import WRMUser from "../../objects/user";

export default class MarryCommand extends Command {
    constructor(client) {
        super(client, {
            name: "marry",
            group: "wonderland-legacy",
            memberName: "marry",
            description: "Marries tagged user",
            examples: [";marry @voided#6691"],
            args: [
                {
                    key: "user",
                    prompt: "Who do you want to marry?",
                    type: "user"
                }
            ]
        });
    }

    async run(msg, { user }) {
        var authorYouser = await WRMUser.get(msg.author.id);
        var targetYouser = await WRMUser.get(user.id);

        var authorMaritialStatus = authorYouser ? authorYouser.marriedTo : null;
        var targetMaritialStatus = targetYouser ? targetYouser.marriedTo : null;
        console.log(`${authorYouser}: ${authorMaritialStatus}`);
        console.log(`${targetYouser}: ${targetMaritialStatus}`);

        if(authorMaritialStatus === user.id)  {
            msg.channel.send(`<@${msg.author.id}> - You can't marry the same person twice!`);
            return;
        } else if(authorMaritialStatus || targetMaritialStatus) {
            msg.channel.send(`<@${msg.author.id}> - People can't marry twice at once!`);
            return;
        } else if(msg.author.id === user.id) {
            msg.channel.send(`<@${msg.author.id}> - You can't marry yourself!`);
            return;
        }

        var youser = new WRMUser({
            id: msg.author.id
        }).setPartner(user.id);
        await youser.save();

        var youser2 = new WRMUser({
            id: user.id
        }).setPartner(msg.author.id);
        await youser2.save();

        msg.channel.send(`<@${msg.author.id}> has married <@${user.id}>`);
    }
}