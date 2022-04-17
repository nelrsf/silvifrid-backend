const express = require("express");
const { path } = require("node-openssl-cert/name_mappings");
const { join } = require("path");
const router = express.Router();
const apiIG = require("instagram-node").instagram();
const url = require('url');

apiIG.use({ access_token: 'IGQVJYdXRmbFl2bFhsNDZAXSmJnVWZAtdzlOdGgtaUVmYUU1Ml95MHJFYXl1MnEzTnF4TWd5RlpKaWJlbWVpOWJBSW4wbllvQTFfa3BJWjlBM0ItS0RaUDc2c3NnUGh4UnBQTzZA3V25FS1RudWtIQ29rZAQZDZD' });
apiIG.use({
    client_id: "1067590140841251",
    client_secret: "24673a3f0325b2492d62a4273588c270"
});

var redirect_uri = 'https://silvifrid-backend.herokuapp.com/login/handleauth';
var appID = "1383539172068627";


router.get("/instagram", async (req, res)=>{
    var url_ig ="https://api.instagram.com/oauth/authorize?client_id="
    + appID
    +"&redirect_uri="
    + redirect_uri
    +"&scope=user_profile,user_media&response_type=code";
    res.redirect(url_ig);
});

router.get("/handleauth", async (req, res)=>{
    r_url = req.protocol + '://' + req.get('host') + req.originalUrl;
    var req_url = new URL(r_url);
    
    res.send(req_url.searchParams.get('code'));
})

module.exports = router;