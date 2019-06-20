import { Command } from "discord.js-commando";
import { RichEmbed } from "discord.js";

import findOne from "../../util/findOne";

import config from "../../config.json";

export default class FindOneCommand extends Command {
    constructor(client) {
        super(client, {
            name: "findone",
            group: "wrm2",
            memberName: "findone",
            description: "Finds a ticket with the given message ID.",
            examples: [";findone 12345"],
            args: [
                {
                    key: "message",
                    prompt: "What ticket do you want to find?",
                    type: "message"
                }
            ]
        });
    }

    async run(msg, { message }) {
        var msgg = await msg.reply("Please wait...");
        findOne(message.id).exec((err, ticket) => {
            if(ticket) {
                var embed = new RichEmbed();
                var author = ticket.message.author;
                var authorAvatar = this.client.guilds.get(config.server_id).members.get(author.id).user.displayAvatarURL();
                embed.setAuthor(`${author.username}#${author.discriminator} (${author.id})`, authorAvatar);
                embed.setDescription(ticket.message.content);
                embed.addField("Attachments", ticket.message.attachments ? ticket.message.attachments.join(", ") : "None");
                embed.addField("URLS", ticket.message.urls ? ticket.message.urls.join(", ") : "None");
                msgg.edit({embed});
            } else {
                msgg.edit("No ticket found.");
            }
        });
    }
};