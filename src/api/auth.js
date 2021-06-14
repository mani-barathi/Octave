import { auth, provider } from "../firebase";

export const signUp = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

export const signIn = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const signOut = () => {
  auth.signOut();
};

export const signInWithGoogle = () => {
  auth
    .signInWithPopup(provider)
    .then((result) => console.log(`${result.user.displayName} Logged In!`))
    .catch((error) => {
      console.log("Login Error: ", error);
      alert(error.message);
    });
};

export const updateProfile = (userAuth, name, photoURL) => {
  return userAuth.user.updateProfile({
    displayName: name,
    photoURL: photoURL || `https://ui-avatars.com/api/?name=${name}`,
  });
};

export const resetPassword = (email) => {
  return auth.sendPasswordResetEmail(email);
};
