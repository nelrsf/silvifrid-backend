const express = require("express")
const router = express.Router();
const apiIG = require("instagram-node").instagram();

apiIG.use({ access_token: 'IGQVJYdXRmbFl2bFhsNDZAXSmJnVWZAtdzlOdGgtaUVmYUU1Ml95MHJFYXl1MnEzTnF4TWd5RlpKaWJlbWVpOWJBSW4wbllvQTFfa3BJWjlBM0ItS0RaUDc2c3NnUGh4UnBQTzZA3V25FS1RudWtIQ29rZAQZDZD' });
apiIG.use({
    client_id: "1067590140841251",
    client_secret: "24673a3f0325b2492d62a4273588c270"
});

var redirect_uri = 'http://localhost:3000/login/handleauth';


router.get("/instagram", async (req, res)=>{
    //res.redirect(apiIG.get_authorization_url(redirect_uri,{ scope: ['basic']}));
});

router.get("/handleauth", async (req, res)=>{
    console.log(res);
    res.send("ok");
})

/*router.exports.handleauth = function(req, res){
    apiIG.authorize_user(req.query.code, redirect_uri, function(err, result){
        if(err){
            console.log(err.body);
            res.send("error en login");
        }else{
            console.log("acces token "+ result.access_token);
            res.send("ok");
        }
    })
}*/

module.exports = router;