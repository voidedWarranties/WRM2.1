import Ticket from "../database/models/ticket";

export default id => {
    return Ticket.findOneAndRemove({
        "message.id": id
    });
}