import express from "express";
import {nanoid} from 'nanoid'
const app = express();
import connectDB from "./src/config/mongo.config.js"
import dotenv from 'dotenv';
import urlSchema from "./src/models/shorturl.model.js"


dotenv.config("./.env")
app.use(express.json())
// This middleware parses incoming req with application/x-www-form-urlencoded payloads like form submission from HTML
app.use(express.urlencoded({extended: true}))

app.post('/api/create', (req, res) => {
    const {url} = req.body;
    const shortUrl = nanoid(7)
    const newUrl = new urlSchema({
        full_url: url,
        short_url: shortUrl
    })
    newUrl.save();
    res.send(nanoid(7))
})

app.get('/:id', async (req, res) => {
    const {id} = req.params
    const url = await urlSchema.findOne({short_url:id})
    if(url){
        res.redirect(url.full_url)
    }
    else{
        res.status(404).send("Not Found")
    }
})

app.listen(3000, () => {
    connectDB();
    console.log("Server is running on port 3000")
})

// GET - Redirection
// POST - Create short url