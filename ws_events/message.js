const Ticket = require("../database/models/ticket");

module.exports = (message) => {
    var JSONMessage = JSON.parse(message);
    if(JSONMessage.type === "new") {
        console.log(JSONMessage);

        const ticket = new Ticket({
            message: {
                author: {
                    username: JSONMessage.message.author.username,
                    discriminator: JSONMessage.message.author.discriminator,
                    id: JSONMessage.message.author.id,
                    avatar: JSONMessage.message.author.avatar
                },
                content: JSONMessage.message.content,
                urls: JSONMessage.message.urls,
                attachments: JSONMessage.message.attachments,
                id: JSONMessage.message.id
            }
        });
        ticket.save((err, newTicket) => {
            if(err) {
                console.error(err);
            }

            console.log("New ticket!");
        });
    }
}