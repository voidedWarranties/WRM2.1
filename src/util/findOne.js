import Ticket from "../database/models/ticket";

export default id => {
    return Ticket.findOne({
        "message.id": id
    });
}