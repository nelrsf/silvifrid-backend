const express = require("express");
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

  console.log(req.query.code)

  const tokenParams = {
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


module.exports = router;
