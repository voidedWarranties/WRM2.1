import User from "../database/models/user";

export default class WRMUser {
    constructor({
        id,
        marriedTo
    }) {
        this.id = id;
        this.marriedTo = marriedTo;
    }

    toJSON() {
        return {
            id: this.id,
            marriedTo: this.marriedTo
        };
    }

    save() {
        User.findOneAndUpdate({ id: this.id }, this.toJSON(), { upsert: true }, (err, user) => {
            console.log(user);
        });
    }

    static async get(id) {
        var youser;
        await User.findOne({ id }, (err, user) => {
            youser = user;
        });

        return youser;
    }

    setPartner(id) {
        this.marriedTo = id;
        return this;
    }

    getPartner() {
        return this.marriedTo;
    }

    setDivorced() {
        this.marriedTo = undefined;
        return this;
    }
}