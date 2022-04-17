const express = require("express");
const { join } = require("path");
const router = express.Router();
const apiIG = require("instagram-node").instagram();
const url = require('url');
var bodyParser = require('body-parser');


var redirect_uri = 'https://silvifrid-server.herokuapp.com/login/handleauth';
var appID = "1383539172068627";
var appSecret = "0a14749bb5673a79961efc5486510719";


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get("/instagram", async (req, res)=>{
    var url_ig ="https://api.instagram.com/oauth/authorize?client_id="
    + appID
    +"&redirect_uri="
    + redirect_uri
    +"&scope=user_profile,user_media&response_type=code";
    res.redirect(url_ig);
});


var new_req_body = {
    "client_id": appID,
    "client_secret": appSecret,
    "grant_type": "authorization_code",
    "redirect_uri": redirect_uri,
    "code":""
};

router.get("/handleauth", async (req, res)=>{
    r_url = req.protocol + '://' + req.get('host') + req.originalUrl;
    var req_url = new URL(r_url);
    var code = req_url.searchParams.get('code');
    new_req_body.code = code;
    res.redirect("https://api.instagram.com/oauth/access_token")
})

router.post("https://api.instagram.com/oauth/access_token", async (req,res)=>{
    req.body = new_req_body;
    res.send("post function");
    console.log(res.body);
})

module.exports = router;