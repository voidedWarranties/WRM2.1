import { Command } from "discord.js-commando";
import { MessageEmbed } from "discord.js";

export default class BotInfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: "botinfo",
            group: "wonderland-legacy",
            memberName: "botinfo",
            description: "Shows information on the bot",
            examples: [";botinfo"]
        });
    }

    async run(msg) {
        const my = this.client.user;
        var embed = new MessageEmbed();
        embed.setThumbnail(my.displayAvatarURL({ size: 64 }));
        embed.addField("Username:", my.username);
        embed.addField("Discriminator:", my.discriminator);
        embed.addField("ID:", my.id);
        embed.addField("Uptime:", `${this.client.uptime / 1000 / 60} minutes`);
        embed.setFooter(`Requested by ${msg.author.tag}`, msg.author.displayAvatarURL());

        msg.channel.send({ embed });
    }
}