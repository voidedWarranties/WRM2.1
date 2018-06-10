import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    message: {
        author: {
            username: String,
            discriminator: String,
            id: String
        },
        content: String,
        urls: Array,
        attachments: Array,
        id: String
    }
});

export default mongoose.model("Ticket", ticketSchema);