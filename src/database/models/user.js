import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: String,
    marriedTo: String
});

export default mongoose.model("User", userSchema);