import { useEffect } from "react";
import NavBar from "./NavBar";
import { Alert } from "react-bootstrap";
import { useAuthContext, tokenSaver } from "../contexts/AuthContext";
import { auth } from "../configs/firebase.config";
import { useAppContext } from "../contexts/AppContext";
function Layout({ children }) {
  const { currentUser, setCurrentUser, manageStates } = useAuthContext();
  const { setTitleOfNavbarButton, mediaAccess, setMediaAccess } =
    useAppContext();
  useEffect(() => {
    //user part:
    manageStates().then((user) => {
      if (user && !currentUser) {
        setCurrentUser({
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
          verified: user.emailVerified,
        });
        setTitleOfNavbarButton("Logout");
        tokenSaver(user.uid);
      }
      if (!user && currentUser) {
        setCurrentUser(null);
        setTitleOfNavbarButton("Login");
      }
    });
  }, [auth.currentUser]);
  return (
    <>
      <NavBar />
      {currentUser && currentUser.verified === false && (
        <Alert
          show={true}
          variant="secondary"
          // onClose={() => setShowAlert(false)}
          //dismissible
        >
          You Need To <b>Activate</b> Your Account.we Already Sent You An
          Email.Check your inbox or spam folder.
        </Alert>
      )}
      {children}
    </>
  );
}

export default Layout;
