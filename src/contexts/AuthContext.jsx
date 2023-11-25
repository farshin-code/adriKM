import { createContext, useContext, useState } from "react";
import AUTH from "../handlers/auth";
import { auth } from "../configs/firebase.config";
const {
  signInWithGoogle,
  signOut,
  signUpWithEmail,
  signInWithEmail,
  updateAvatarOrName,
  verifyEmail,
  resetPassword,
  verifyAndResetPassword,
  stateManager,
  getTokenFromNodeServer,
} = AUTH;

const context = createContext();

export const tokenSaver = (userID) => {
  getTokenFromNodeServer(userID)
    .then((token) => {
      console.log("token got from node server and saved:", token);
    })
    .catch((error) => {
      console.log("error in tokenSaver:", error);
    });
};
const AuthContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const signGoogle = () => {
    return new Promise((resolve, reject) => {
      signInWithGoogle()
        .then((user) => {
          // console.log("current user before setting state:", user);

          setCurrentUser({
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            verified: true,
          });
          tokenSaver(user.uid);
          resolve(currentUser);
        })
        .catch((error) => {
          reject(error); // need to handle
        });
    });
  };
  const signOutUser = () => {
    return new Promise((resolve, reject) => {
      signOut()
        .then(() => {
          setCurrentUser(null);
          resolve("Signed Out successfully");
        })
        .catch((error) => {
          console.log(error.code); // need to handle
          reject(error.code);
        });
    });
  };
  const signUpEMAIL = (email, password) => {
    return new Promise((resolve, reject) => {
      signUpWithEmail(email, password)
        .then((user) => {
          console.log(
            "in authcontext i set user.uid and verified false",
            user.uid
          );
          setCurrentUser({
            uid: user.uid,
            verified: false,
          });
          console.log("i resolved user from authcontext:", user);
          resolve(user);
          tokenSaver(user.uid);
        })
        .catch((error) => {
          reject(error.code); // need to handle
        });
    });
  };

  const signInEMAIL = (email, password) => {
    return new Promise((resolve, reject) => {
      signInWithEmail(email, password)
        .then((user) => {
          // console.log("current user signed in with email:", user);
          setCurrentUser({
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            verified: user.emailVerified,
          });
          resolve(currentUser);
          tokenSaver(user.uid);
        })
        .catch((error) => {
          reject(error.code);
        });
    });
  };

  const updateProfileAVTorNAME = (photoURL, displayName) => {
    return new Promise((resolve, reject) => {
      updateAvatarOrName(photoURL, displayName)
        .then((user) => {
          console.log(
            "in authcontext i got user to update photoURL and displayName in context",
            user.photoURL,
            user.displayName,
            "and CurrentUser is",
            currentUser
          );
          setCurrentUser((prev) => ({
            ...prev,
            photoURL: user.photoURL,
            displayName: user.displayName,
          }));
          resolve(currentUser);
        })
        .catch((error) => {
          reject(error.code);
        });
    });
  };

  const verifyUserByEmail = (oobCode) => {
    return new Promise((resolve, reject) => {
      verifyEmail(oobCode)
        .then(() => {
          setCurrentUser({
            ...currentUser,
            verified: true,
          });
          resolve(currentUser);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const resetPasswordByEmail = (email) => {
    return new Promise((resolve, reject) => {
      resetPassword(email)
        .then((email) => {
          resolve(email);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const continueResetPassProcess = (password, code) => {
    return new Promise((resolve, reject) => {
      verifyAndResetPassword(password, code)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  const manageStates = () => {
    return new Promise((resolve, reject) => {
      stateManager()
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  return (
    <context.Provider
      value={{
        currentUser,
        signGoogle,
        signOutUser,
        signUpEMAIL,
        signInEMAIL,
        updateProfileAVTorNAME,
        verifyUserByEmail,
        resetPasswordByEmail,
        continueResetPassProcess,
        manageStates,
        setCurrentUser,
      }}
    >
      {children}
    </context.Provider>
  );
};

export const useAuthContext = () => useContext(context);
export default AuthContext;
