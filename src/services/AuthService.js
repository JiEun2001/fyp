import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import { Alert } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_APP } from "../../FirebaseConfig";
import * as RootNavigation from "./RootNavigation";
import { getDatabase, ref, set } from "firebase/database";
import  UserService from "./UserService"

class AuthService {

    db = getDatabase(FIREBASE_APP);
    //firebase register
    signUp(name, email, password) {
        console.log(FIREBASE_AUTH);
        console.log(email + "================== " + password);
        createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
            .then((userCredential) => {
                // Signed up 
                console.log("signUp")
                const user = userCredential.user;
                // ...
                console.log(user)
                set(ref(this.db, 'user/' + user.uid), {
                    Name: name,
                    email: email,
                    uid: user.uid,
                    password: password
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("help please = " + errorCode);

            });
    }
    //firebase login
    async signIn(email, password) {
        console.log(email + "================== " + password);
        // const auth = getAuth();
        await signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
            .then(async (userCredential) => {
                // Signed in 
                console.log("signIn suceess")
                const user = userCredential.user;
                uid= user.uid;
                await UserService.getUserData(uid);
                RootNavigation.navigate('Dashboard', {});
            })
            .catch((error) => {
                console.log("signIn failed")
                console.log(error.code)
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === 'auth/invalid-credential' || errorCode === 'auth/user-not-found') {
                    console.log("testing errorCode")
                    Alert.alert("Invalid Credential", "Check email and password", [{ text: "OK" }], {
                        cancelable: true,
                    });
                } else {
                    // Handle other errors
                    Alert.alert('Error', errorMessage);
                }
                console.log("alert pass")
                RootNavigation.navigate('LoginScreen', {});

            });
    }

    passswordReset(email) {
        sendPasswordResetEmail(FIREBASE_AUTH, email)
            .then(() => {
                // Password reset email sent!
                Alert.alert("Email password reset has been sent.", "Check email to reset password", [{ text: "OK" }], {
                    cancelable: true,
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }

    logOut(){
        signOut(FIREBASE_AUTH).then(() => {
            Alert.alert("Log Out Succesfully!", "Please come again!", [{ text: "OK" }], {
                cancelable: true,
            });
          }).catch((error) => {
            // An error happened.
          });
    }
}
const singleton = new AuthService()
export default singleton;