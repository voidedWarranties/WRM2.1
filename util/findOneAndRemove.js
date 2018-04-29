const Ticket = require("../database/models/ticket");

module.exports = (id) => {
    return Ticket.findOneAndRemove({
        "message.id": id
    });
}