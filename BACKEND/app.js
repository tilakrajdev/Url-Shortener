import express from "express";
const app = express();
import connectDB from "./src/config/mongo.config.js"
import dotenv from 'dotenv';
import short_url from './src/routes/shortUrl.route.js';
import { redirectFromShortUrl } from "./src/controller/shortUrl.controller.js";
import cors from 'cors'

app.use(cors())

dotenv.config("./.env")
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/create', short_url)

app.get('/:id', redirectFromShortUrl)

app.listen(3000, () => {
    connectDB();
    console.log("Server is running on port 3000")
})

// GET - Redirection
// POST - Create short url