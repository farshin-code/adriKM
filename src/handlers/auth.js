import { auth } from "../configs/firebase.config";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  applyActionCode,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  confirmPasswordReset,
  onAuthStateChanged,
} from "firebase/auth";
import STORAGE from "./storage";
const { Upload } = STORAGE;
const provider = new GoogleAuthProvider();

const AUTH = {
  signUpWithEmail(email, password) {
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              console.log("email sent");
            })
            .catch((error) => {
              console.log(error);
            });
          console.log(
            "in auth.js i passed user.user to authcontext",
            user.user
          );
          resolve(user.user);
        })
        .catch((error) => {
          reject(error.code);
        });
    });
  },
  signInWithEmail(email, password) {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
          // console.log("user from auth.js:", user);
          resolve(user.user);
        })
        .catch((error) => {
          reject(error.code);
        });
    });
  },
  signInWithGoogle() {
    return new Promise((resolve, reject) => {
      provider.setCustomParameters({
        prompt: "select_account",
      });
      signInWithPopup(auth, provider)
        .then((result) => {
          resolve(result.user);
        })
        .catch((error) => {
          reject(error.code);
        });
    });
  },
  signOut() {
    return new Promise((resolve, reject) => {
      signOut(auth)
        .then(() => {
          resolve("Signed Out successfully");
        })
        .catch((error) => {
          reject(error.code);
        });
    });
  },
  updateAvatarOrName(photoURL, displayName) {
    return new Promise((resolve, reject) => {
      if (!photoURL) photoURL = "https://placehold.co/80x80";
      updateProfile(auth.currentUser, { photoURL, displayName })
        .then(() => {
          console.log(
            "here in auth.js i sent currentuser of auth:",
            auth.currentUser
          );
          resolve(auth.currentUser);
        })
        .catch((error) => {
          reject(error.code);
        });
    });
  },
  verifyEmail(oobCode) {
    return new Promise((resolve, reject) => {
      applyActionCode(auth, oobCode)
        .then(() => {
          resolve("Verified successfully");
        })
        .catch((error) => {
          reject(error.code);
        });
    });
  },
  resetPassword(email) {
    return new Promise((resolve, reject) => {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          resolve(email);
        })
        .catch((error) => {
          reject(error.code);
        });
    });
  },
  verifyAndResetPassword(password, code) {
    return new Promise((resolve, reject) => {
      verifyPasswordResetCode(auth, code)
        .then((email) => {
          console.log("email to reset:", email);
          confirmPasswordReset(auth, code, password)
            .then((resp) => {
              console.log("resp:", resp);
              resolve(resp);
            })
            .catch((error) => {
              reject(error.code);
            });
        })
        .catch((error) => {
          reject(error.code);
        });
    });
  },
  stateManager() {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged(resolve);
    });
  },
  getTokenFromNodeServer(username) {
    return new Promise((resolve, reject) => {
      /////
      fetch("http://127.0.0.1:4211/getToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("adrikmtoken", data.token);
          resolve(data.token);
        })
        .catch((error) => {
          console.log("error in getTokenFromNodeServer:", error);
          reject(error);
        });

      ////
    });
  },
};

export default AUTH;
