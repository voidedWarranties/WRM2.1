// TODO: serverinfo command
// Shows server info

import { Command } from "discord.js-commando";
import { MessageEmbed } from "discord.js";

export default class ServerInfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: "serverinfo",
            group: "wonderland-legacy",
            memberName: "serverinfo",
            description: "Shows server info",
            examples: [";serverinfo"]
        });
    }

    async run(msg) {
        const guild = msg.guild;
        var embed = new MessageEmbed();
        embed.setThumbnail(guild.iconURL({ size: 64 }));
        embed.addField("Name:", guild.name);
        embed.addField("ID:", guild.id);
        embed.addField("Owner:", guild.owner.user.tag);
        embed.setFooter(`Requested by ${msg.author.tag}`, msg.author.displayAvatarURL());

        msg.channel.send({ embed });
    }
}