import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    type: { type: String, default: "user" },
    googleId: { type: String, default: null }
})

const User = mongoose.model("User", userSchema, "users");

export default User;