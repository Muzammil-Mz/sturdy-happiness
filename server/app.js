import express from "express"
import { nanoid } from "nanoid"
import path from "path"; // new line
import { fileURLToPath } from "url"; // new line

import config from "config"
import cors from "cors"
import "./utils/dbConnect.js"
import indexRouter from "./controllers/index.js"


const app = express()
const PORT = config.get("PORT") || 5011
const __filename = fileURLToPath(import.meta.url); // new line
const __dirname = path.dirname(__filename); // new line



app.use(express.static(path.join(__dirname, "build"))); // new line
app.use(cors({
    origin: ["http://localhost:5010", "https://cybsec.muzammil.xyz"], // adjust ports based on frontend
}));
app.use(express.json())

app.get("/", (req, res) => {
    try {
        res.status(200).json({ msg: "Hello world" })
    } catch (error) {
        console.log(error);
    }
})


app.use("/api/", indexRouter)


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});


app.use((req, res) => {
    res.status(404).json({ msg: "Invalid route" });
});
app.listen(PORT, () => {
    console.log("server is up and running on 5010");
})