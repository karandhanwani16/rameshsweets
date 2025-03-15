import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String },
    active: { type: Boolean, default: true }
})

const Category = mongoose.model("Category", categorySchema, "categories");

export default Category;