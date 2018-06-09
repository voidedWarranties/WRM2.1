import { Command } from "discord.js-commando";

import WRMUser from "../../objects/user";

export default class DivorceCommand extends Command {
    constructor(client) {
        super(client, {
            name: "divorce",
            group: "wonderland-legacy",
            memberName: "divorce",
            description: "Divorces tagged user",
            examples: [";divorce @voided#6691"]
        });
    }

    async run(msg) {
        var authorYouser = await WRMUser.get(msg.author.id);
        var authorMaritialStatus = authorYouser ? authorYouser.marriedTo : null;

        if(!authorMaritialStatus) {
            msg.channel.send(`<@${msg.author.id}> - You aren't married!`);
            return;
        }

        var youser = new WRMUser({
            id: msg.author.id
        }).setDivorced();
        await youser.save();

        var youser2 = new WRMUser({
            id: authorMaritialStatus
        }).setDivorced();
        await youser2.save();

        msg.channel.send(`<@${msg.author.id}> has divorced <@${authorMaritialStatus}>`);
    }
}