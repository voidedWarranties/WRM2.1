import Ticket from "../database/models/ticket";

export default ws => {
    Ticket.find({}, (err, tickets) => {
        ws.send(JSON.stringify({
            tickets: tickets,
            type: "connect"
        }));
    });
}