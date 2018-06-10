import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";

// Database
import mongoose from "mongoose";
import WRMUser from "../src/objects/user";

// snekfetch
import request from "snekfetch";

chai.use(chaiAsPromised);

describe("Database & Related", () => {
    it("Should connect to the MongoDB Database", done => {
        mongoose.connect("mongodb://127.0.0.1/wrmmocha", {
            autoReconnect: true,
            connectTimeoutMS: 30000,
            socketTimeoutMS: 30000,
            keepAlive: 120,
            poolSize: 100
        }, done);
    });

    it("Should create an instance of WRMUser", () =>{
        var user = new WRMUser({
            id: "12345",
            marriedTo: "67890"
        });

        expect(user).to.be.instanceof(WRMUser);
    });

    it("Should return an object", () => {
        var userObj = new WRMUser({
            id: "12345",
            marriedTo: "67890"
        }).toJSON();

        expect(userObj.id).to.exist;
        expect(userObj.marriedTo).to.exist;
    });

    it("Should set the User's partner", () => {
        var userObj = new WRMUser({
            id: "12345",
            marriedTo: null
        }).setPartner("67890").toJSON();

        expect(userObj.marriedTo).to.exist;
    });

    it("Should unset the User's partner", () => {
        var userObj = new WRMUser({
            id: "12345",
            marriedTo: "67890"
        }).setDivorced().toJSON();

        expect(userObj.marriedTo).to.not.exist;
    });

    it("Should save then get the User", async () => {
        var userObj = new WRMUser({
            id: "12345",
            marriredTo: null
        }).setPartner("67890");

        await userObj.save();

        var getUserObj = await WRMUser.get("12345");

        expect(getUserObj.marriedTo).to.equal("67890");
    });

    after(done => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done);
        });
    });
});

describe("snekfetch", () => {
    it("Should get JSON data from the fake API", done => {
        request.get("https://jsonplaceholder.typicode.com/posts/1").then(r => {
            expect(r.body).to.have.property("userId");
            done();
        });
    });
});