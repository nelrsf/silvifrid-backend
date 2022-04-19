import { getAuth, signInWithCredential, FacebookAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAuLrWBJx-yk-L988tmvCT_oSQ0P5LtXnE",
    authDomain: "silvifrid-organic-auth.firebaseapp.com",
    projectId: "silvifrid-organic-auth",
    storageBucket: "silvifrid-organic-auth.appspot.com",
    messagingSenderId: "504873124448",
    appId: "1:504873124448:web:26cff9c174e593f9d5b905"
}

initializeApp(firebaseConfig);




// Sign in with the credential from the Facebook user.
const auth = getAuth();
signInWithCredential(auth, credential)
  .then((result) => {
    // Signed in 
    const credential = FacebookAuthProvider.credentialFromResult(result);
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);
    // ...
  });