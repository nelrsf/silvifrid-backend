const express = require("express");
const router = express.Router();
const https = require('https');
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


router.get("/handleauth", async (req, res)=>{
    r_url = req.protocol + '://' + req.get('host') + req.originalUrl;
    var req_url = new URL(r_url);
    var code = req_url.searchParams.get('code');
    var req_body = JSON.stringify({
        "client_id": appID,
        "client_secret": appSecret,
        "grant_type": "authorization_code",
        "redirect_uri": redirect_uri,
        "code":code
    });
    const options = {
        hostname: 'https://api.instagram.com/oauth/access_token',
        path: '/',
        method: 'POST',
        header: {
            'Content-Type':'application/json'
        }
      }
      
      const request = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)
      })
      
      request.on('error', error => {
        console.error(error)
      })
      
      request.write(req_body)
      request.end()
});




module.exports = router;