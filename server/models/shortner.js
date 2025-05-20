import mongoose from "mongoose";

const shortnerSchema = new mongoose.Schema({
    id: {
        type: Number,

    },
    longURL: {
        type: String
    }, shortURL: {
        type: String,
        index: true
    }
})

const shortnerModel = mongoose.model("shortener", shortnerSchema, "shortner")

export default shortnerModel