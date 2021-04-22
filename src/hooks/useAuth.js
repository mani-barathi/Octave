import { auth, provider } from "../firebase";

function useAuth() {
  const signUp = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const signIn = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const signOut = () => {
    auth.signOut();
  };

  const signInWithGoogle = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => console.log(`${result.user.displayName} Logged In!`))
      .catch((error) => {
        console.log("Login Error: ", error);
        alert(error.message);
      });
  };

  const updateProfile = (userAuth, name, photoURL) => {
    return userAuth.user.updateProfile({
      displayName: name,
      photoURL: photoURL || `https://ui-avatars.com/api/?name=${name}`,
    });
  };

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  return {
    signUp,
    signIn,
    signOut,
    signInWithGoogle,
    updateProfile,
    resetPassword,
  };
}

export default useAuth;
