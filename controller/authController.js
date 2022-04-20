var express = require("express");
var router = express.Router();
var app = express();
var api = require('instagram-node').instagram();

api.use({
  client_id: "1383539172068627",
  client_secret: "0a14749bb5673a79961efc5486510719"
});

var redirect_uri = "https://silvifrid-server.herokuapp.com/login/handleauth";

router.get("/", function(req, res){
  res.redirect(
    api.get_authorization_url(redirect_uri, {
                                              scope: ['user_profile'],
                                              state: ['a state']
                                            })
  );
});


router.get("/handleauth",function(req, res){
  api.authorize_user(req.query.code, redirect_uri, function(err, result){
    if(err){
      console.log(err.body);
      res.send("error");
    }else{
      //console.log("ok, token = ", result.access_token);
      api.user('user_id', function(err, result, remaining, limit) {
        console.log("error: ", err.error_message);
        console.log(result);
        res.send(err.body)
      })
    }
  })
})

module.exports = router;

/*const express = require("express");
const router = express.Router();
const { ClientCredentials, ResourceOwnerPassword, AuthorizationCode } = require('simple-oauth2');

const config = {
  client: {
    id: '1383539172068627',
    secret: '0a14749bb5673a79961efc5486510719'
  },
  auth: {
    tokenHost: 'https://api.instagram.com/oauth/authorize'
  }
};

const client = new AuthorizationCode(config);


router.get("/", (req, res)=>{

    const authorizatedURI = client.authorizeURL({
       redirect_uri: "https://silvifrid-server.herokuapp.com/login/handleauth",
       scope: "user_profile"
    })

    res.redirect(authorizatedURI);
}) 


router.get("/handleauth", (req, res)=>{

  const tokenParams = {
    tokenHost: "api.instagram.com",
    tokenPath: "/oauth/authorize",
    Headers: {
      "type": "x-wwww-urlencode/app"
    },
    code: req.query.code,
    redirect_uri: 'https://silvifrid-server.herokuapp.com/login/handleauth',
    scope: 'user_profile',
  };

  try{
      const accessToken = client.getToken(tokenParams)
                          .then((Token)=>{
                            console.log("El token de acceso es = ",Token);
                          }).catch((error)=>{
                            console.log(error.message)
                          });
      res.send("ok");
  }catch(error){


    res.send(error.message);
  }
})


module.exports = router;*/
