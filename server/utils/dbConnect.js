import mongoose from "mongoose"
import config from "config"

const DB_URL=config.get("DB_URL")

async function dbConnect  (){
    try {
        let db=mongoose.connect(DB_URL)
        console.log("db connected successfully");
    } catch (error) {
        console.log(error);
    }
}

dbConnect()