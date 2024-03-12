import type { PlasmoMessaging } from "@plasmohq/messaging";
import {
  GoogleAuthProvider,
  browserLocalPersistence,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithCredential,
} from "firebase/auth";

import { firebaseApp } from "../../util/firebase_config";

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  //   const message = await querySomeApi(req.body.id);
  const message = "Hello World123";
  console.log("ext id >>> ", chrome.runtime.id);

  const auth = getAuth(firebaseApp);
  setPersistence(auth, browserLocalPersistence);

  function startAuth(interactive) {
    console.log("Auth trying");
    chrome.identity.getAuthToken({ interactive: true }, function (token) {
      //Token:  This requests an OAuth token from the Chrome Identity API.
      if (chrome.runtime.lastError && !interactive) {
        console.log("It was not possible to get a token programmatically.");
      } else if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else if (token) {
        // Follows: https://firebase.google.com/docs/auth/web/google-signin
        // Authorize Firebase with the OAuth Access Token.
        // console.log("TOKEN:")
        // console.log(token)
        // Builds Firebase credential with the Google ID token.
        const credential = GoogleAuthProvider.credential(null, token);
        signInWithCredential(auth, credential)
          .then((result) => {
            console.log("Success!!!");
            console.log(result);
          })
          .catch((error) => {
            // You can handle errors here
            console.log(error);
          });
      } else {
        console.error("The OAuth token was null");
      }
    });
  }

  function startSignIn() {
    console.log("started SignIn");
    //https://firebase.google.com/docs/auth/web/manage-users
    const user = auth.currentUser;
    if (user) {
      console.log("current");
      console.log(user);
      auth.signOut();
    } else {
      console.log("proceed");
      startAuth(true);
    }
  }

  const initFirebaseApp = () => {
    console.log("initFirebaseApp");
    onAuthStateChanged(auth, (user) => {
      if (user != null) {
        console.log("logged in!");
        console.log("current");
        console.log(user);
        console.log(user.token);
        res.send({ user });
      } else {
        console.log("No user");
        startSignIn();
      }
    });
  };

  initFirebaseApp();
};

export default handler;
