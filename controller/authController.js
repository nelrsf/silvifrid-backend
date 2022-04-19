const express = require("express");
const admin = require("firebase-admin");
const router = express.Router();
var serviceAccount = require("./../google_service_account/silvifrid-organic-auth-firebase-adminsdk-mbjpn-c7502c89ba.json");


/*const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

app.auth().createUser({
    email: 'user@example.com',
    emailVerified: false,
    phoneNumber: '+11234567890',
    password: 'secretPassword',
    displayName: 'John Doe',
    photoURL: 'http://www.example.com/12345678/photo.png',
    disabled: false,
  })
  .then((userRecord)=>{console.log('Successfully created new user:', userRecord.uid);})
  .catch((error)=>console.log('Error creating new user:', error));





/*router.post("/email", (req,res)=>{
    auth.createUserWithEmailAndPassword("aaa@aaa.com","129jdsjoadsksla").catch(function(error){
        res.send("Error en la autorizacion");
        console.log(error);
    })
})*/

module.exports = router;
