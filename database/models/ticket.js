const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    message: {
        author: {
            username: String,
            discriminator: String,
            id: String,
            avatar: String
        },
        content: String,
        urls: Array,
        attachments: Array,
        id: String
    }
});

module.exports = mongoose.model("Ticket", ticketSchema);