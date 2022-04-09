const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const https = require("https");
const path  = require("path");
const fs = require("fs");


const port = 3000;

mongoose.connect(process.env.DB_CONNECTION, 
    ()=>{
           console.log("connected to db");
        }
    )


const apiProducts = require("./controller/getProducts");
app.use("/getproducts", apiProducts)

const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname,'cert','key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert','cert.pem'))}

,app)


sslServer.listen(process.env.PORT||port)