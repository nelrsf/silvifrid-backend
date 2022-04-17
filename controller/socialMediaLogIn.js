const express = require("express");
const { join } = require("path");
const router = express.Router();
const apiIG = require("instagram-node").instagram();
const url = require('url');


var redirect_uri = 'https://silvifrid-server.herokuapp.com/login/handleauth';
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
    var req_url = new url(r_url);
    res.send(req_url.searchParams.get('code'));
})

module.exports = router;