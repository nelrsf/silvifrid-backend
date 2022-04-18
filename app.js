const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const https = require("https");
const path  = require("path");
const fs = require("fs");
const cors = require("cors");


const port = 3000;

app.use(cors())

mongoose.connect(process.env.DB_CONNECTION, 
    ()=>{
           console.log("connected to db");
        }
    )


const apiProducts = require("./controller/getProducts");
app.use("/getproducts", apiProducts)

const apiAssets = require("./controller/getAssets");
app.use("/getassets", apiAssets)

const auth = require("./controller/socialMediaLogIn");
const { on } = require("events");
app.use("/login", auth);


app.use("/testpost", (req, res)=>{
    console.log("request");
    res.send("ok si");
    var data = "";
    req.on('data', chunk=>{
        data+=chunk;
    })
    req.on('end', ()=>{
        console.log(data);
    })
})

app.listen(process.env.PORT||port)