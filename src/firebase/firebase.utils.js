import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
    apiKey: "sdfsfwer12q3eweefsdf",
    authDomain: "crwn-db-a52c9.firebaseapp.com",
    databaseURL: "32423r3rwerwer",
    projectId: "3wer233rwer",
    storageBucket: "crwn-db-a52c9.appspot.com",
    messagingSenderId: "944602953804",
    appId: "1:944602953804:web:c2a64c4bbbcc2d11b5dce9"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
