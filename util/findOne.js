const Ticket = require("./../database/models/ticket");

module.exports = (id) => {
    return Ticket.findOne({
        "message.id": id
    });
}