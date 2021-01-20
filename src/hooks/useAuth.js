import { auth } from '../firebase'

function useAuth() {

    const signUp = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    const signIn = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }

    const signOut = () => {
        auth.signOut()
    }

    const updateProfile = (userAuth, name, photoURL) => {
        return userAuth.user.updateProfile({
            displayName: name,
            photoURL: photoURL || `https://ui-avatars.com/api/?name=${name}`
        })
    }

    const resetPassword = (email) => {
        return auth.sendPasswordResetEmail(email)
    }


    return { signUp, signIn, signOut, updateProfile, resetPassword }
}

export default useAuth
