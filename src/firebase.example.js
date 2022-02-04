import firebase from "firebase/compat/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// Replace project keys here
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore();
export const storage = firebase.storage();
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const getServerTimeStamp = firebase.firestore.FieldValue.serverTimestamp;
