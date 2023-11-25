import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useAppContext } from "../contexts/AppContext";
const useNavBar = () => {
  const { currentUser, signOutUser } = useAuthContext();
  const { titleOfNavbarButton, setTitleOfNavbarButton } = useAppContext();
  const [show, setShow] = useState(false);
  const clickHandler = () => {
    if (currentUser) {
      console.log("you clicked on logout");
      signOutUser()
        .then(() => {
          setTitleOfNavbarButton("Login");
        })
        .catch((error) => {
          //global context to show error
        });
    } else {
      setShow(true);
    }
  };
  return {
    show,
    setShow,
    clickHandler,
    titleOfNavbarButton,
    setTitleOfNavbarButton,
  };
};

export default useNavBar;
