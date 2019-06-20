import mongoose from "mongoose";
import config from "../config.json";

module.exports = {
    init: () => {
        mongoose.connect(config.mongodb_url, {
            autoReconnect: true,
            connectTimeoutMS: 30000,
            socketTimeoutMS: 30000,
            keepAlive: 120,
            poolSize: 100,
            useNewUrlParser: true
        });
    },
    getConnection: () => {
        return mongoose.connection;
    }
}