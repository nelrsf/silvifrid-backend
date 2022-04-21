var express = require("express");
var router = express.Router();
var app = express();
var api = require('instagram-node').instagram();

api.use({
  client_id: "1383539172068627",
  client_secret: "0a14749bb5673a79961efc5486510719"
});

var redirect_uri = "https://silvifrid-server.herokuapp.com/login/handleauth";

router.get("/instagram", function(req, res){
  res.redirect(
    api.get_authorization_url(redirect_uri, {
                                              scope: ['user_profile','user_media'],
                                              state: ['a state']
                                            })
  );
});


router.get("/handleauth",function(req, res){
  api.authorize_user(req.query.code, redirect_uri, function(err, result){
    if(err){
      console.log(err.body);
      res.send("Error")      
    }else{
      console.log("ok, token = ", result);
      res.redirect("https://graph.instagram.com/v13.0/"+result.user_id+"?fields=id,username,email&access_token="+result.access_token)
    }
  })
})

module.exports = router;

