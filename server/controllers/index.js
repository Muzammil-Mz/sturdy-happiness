import express from "express"
import shortnerModel from "../models/shortner.js"
import config from "config"
import { nanoid } from "nanoid"

const router = express.Router()

router.post("/create", async (req, res) => {
    try {
        let { longURL } = req.body
        if (!/^https?:\/\//i.test(longURL)) {
            longURL = "https://" + longURL;
        }
        const shortlink = nanoid(7)
        const newURL = new shortnerModel({
            shortURL: shortlink,
            longURL: longURL,
        })
        await newURL.save()
        console.log("saved ");
        res.status(201).json({ msg: "short link created", shortURL: shortlink })


    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.get("/get/:id", async (req, res) => {
    try {
        let { id } = req.params;
        let find = await shortnerModel.findOne({ shortURL: id });
        if (find) {
            res.redirect(find.longURL); // <--- correct
        } else {
            res.status(404).send("not found");
        }
    } catch (error) {
        console.error("Redirection error:", error);
        res.status(500).send("Server error");
    }
});



export default router