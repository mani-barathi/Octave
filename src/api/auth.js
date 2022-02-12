import { auth, provider } from "../firebase";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut as logout,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";

export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOut = async () => {
  await logout(auth);
};

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => console.log(`${result.user.displayName} Logged In!`))
    .catch((error) => {
      console.log("Login Error: ", error);
      alert(error.message);
    });
};

export const handleAuthStateChanged = (cb) => {
  return onAuthStateChanged(auth, cb);
};

export const updateUserDetails = (userAuth, name, photoURL) => {
  return updateProfile(userAuth.user, {
    displayName: name,
    photoURL: photoURL || `https://ui-avatars.com/api/?name=${name}`,
  });
};

export const resetPassword = (email) => {
  console.log("email is", email);
  return sendPasswordResetEmail(auth, email);
};
