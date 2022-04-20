const express = require("express");
const router = express.Router();
const { ClientCredentials, ResourceOwnerPassword, AuthorizationCode } = require('simple-oauth2');

router.get("/", (req, res)=>{

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

    const authorizatedURI = client.authorizeURL({
       redirect_uri: "https://silvifrid-server.herokuapp.com/login/handleauth",
       scope: "user_profile"
    })

    res.redirect(authorizatedURI);
}) 


router.get("/handleauth", (req, res)=>{

  console.log("holis")

  var data = "__";
  req.on("data", (chunk)=>{
    data = data + chunk;
  });
  req.on("end", ()=>{
    console.log(data);
  })
  const tokenParams = {
    code: "",
    redirect_uri: 'https://silvifrid-server.herokuapp.com/login/handleauth',
    scope: '<scope>',
  };
})


module.exports = router;
