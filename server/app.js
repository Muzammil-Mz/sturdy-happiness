import express from "express"
import { nanoid } from "nanoid"
import config from "config"
import "./utils/dbConnect.js"
import indexRouter from "./controllers/index.js"
const PORT = config.get("PORT") || 5011
const app = express()


app.use(express.json())

app.get("/", (req, res) => {
    try {
        res.status(200).json({ msg: "Hello world" })
    } catch (error) {
        console.log(error);
    }
})


app.use("/api/", indexRouter)



app.listen(PORT, () => {
    console.log("server is up and running on 5010");
})