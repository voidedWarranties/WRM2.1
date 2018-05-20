const Ticket = require("../database/models/ticket");

module.exports = (ws) => {
    Ticket.find({}, (err, tickets) => {
        ws.send(JSON.stringify({
            tickets: tickets,
            type: "connect"
        }));
    });
}