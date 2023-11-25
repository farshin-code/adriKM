import { useState, useRef } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useAppContext } from "../contexts/AppContext";
const useLoginModal = () => {
  const {
    currentUser,
    signGoogle,
    signOutUser,
    signUpEMAIL,
    signInEMAIL,
    updateProfileAVTorNAME,
  } = useAuthContext();
  const { setTitleOfNavbarButton, UploadAvatar, setShowSpinner } =
    useAppContext();
  const [title, setTitle] = useState("Login");
  const [ShowAlert, setShowAlert] = useState(false);
  const emailForSignInRef = useRef(null);
  const passwordForSignInRef = useRef(null);
  const emailForSignUpRef = useRef(null);
  const passwordForSignUpRef = useRef(null);
  const displayNameForSignUpRef = useRef(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarLocalUrl, setAvatarLocalUrl] = useState(null);
  const [showPassword, setShowPassword] = useState({
    passOrText: false, //true => text false => password
    buttonText: "Show",
  });
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const avatarFileSelectorChangeHandler = (e) => {
    setAvatarFile(e.target.files[0]);
    setAvatarLocalUrl(URL.createObjectURL(e.target.files[0]));
  };
  const showSpinnerClickHandler = () => {
    setShowSpinner(true);
  };
  const signGoogleClickHandler = (hide) => {
    signGoogle()
      .then(() => {
        // console.log("current user signed in with google:", currentUser); // for testing purposes
        setTitleOfNavbarButton("Logout");
        hide();
      })
      .catch((error) => {
        console.log(error);
        setShowAlert(true);
      });
  };
  const signInwithEmailHandler = (hide) => {
    signInEMAIL(
      emailForSignInRef.current?.value,
      passwordForSignInRef.current?.value
    )
      .then((user) => {
        // console.log("current user signed in with email:", user);
        setTitleOfNavbarButton("Logout");
        hide();
      })
      .catch((error) => {
        console.log(error);
        setShowAlert(true);
      });
  };
  const signUpWithEmailHandler = (hide) => {
    signUpEMAIL(
      emailForSignUpRef.current?.value,
      passwordForSignUpRef.current?.value
    )
      .then((user) => {
        console.log(
          "i got user from authcontext and try to use user.uid to upload avatar",
          user.uid
        );
        if (avatarFile) {
          UploadAvatar(avatarFile, user.uid).then((url) => {
            updateProfileAVTorNAME(url, displayNameForSignUpRef.current?.value)
              .then((user) => {
                console.log(
                  "here in updateprofileavatar i got user we have to have currentUser in this part of code:",
                  user
                );
                setTitleOfNavbarButton("Logout");
                hide();
              })
              .catch((error) => {
                console.log(error);
                setShowAlert(true);
              });
          });
        } else {
          updateProfileAVTorNAME(null, displayNameForSignUpRef.current?.value)
            .then((user) => {
              console.log(
                "here in updateprofileavatar i got user we have to have currentUser in this part of code:",
                user
              );
              setTitleOfNavbarButton("Logout");
              hide();
            })
            .catch((error) => {
              console.log(error);
              setShowAlert(true);
            });
        }
      })
      .catch((error) => {
        console.log(error);
        setShowAlert(true);
      });
  };
  return {
    title,
    setTitle,
    showPassword,
    setShowPassword,
    ShowAlert,
    setShowAlert,
    signGoogleClickHandler,
    signInwithEmailHandler,
    emailForSignInRef,
    passwordForSignInRef,
    emailForSignUpRef,
    passwordForSignUpRef,
    displayNameForSignUpRef,
    avatarFile,
    setAvatarFile,
    avatarLocalUrl,
    setAvatarLocalUrl,
    signUpWithEmailHandler,
    avatarFileSelectorChangeHandler,
    showSpinnerClickHandler,
    showForgotPassword,
    setShowForgotPassword,
  };
};

export default useLoginModal;
