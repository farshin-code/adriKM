import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Stack } from "react-bootstrap";
// import { useAuthContext } from "../contexts/AuthContext";
import { auth } from "../configs/firebase.config";
import { applyActionCode } from "firebase/auth";
function Verified() {
  const location = useLocation().search;
  const [verified, setVerified] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("im running!");
    const params = new URLSearchParams(location);
    const oobCode = params.get("oobCode");
    console.log(oobCode);
    applyActionCode(auth, oobCode)
      .then(() => {
        console.log("verified!");

        setVerified(true);
      })
      .catch((e) => {
        console.log(e);
        setVerified(false);
      });
  }, [location]);

  if (verified === null) {
    return <>Louding ... </>;
  }
  return (
    <div className="text-center">
      <Stack
        gap={2}
        direction="vertical"
        className="mt-2 p-3 m-auto border border-gray-300 d-inline-block"
      >
        <h4 className="text-center">
          {verified ? "Congratulations" : "Sorry"}!
        </h4>
        <p className="text-center text-secondary">
          Your account is {verified ? "" : "not"} verified.
        </p>
        <p className="text-center text-secondary">
          {verified
            ? "Now,you can login By going back to the main page."
            : "Please verify your account or create one."}
        </p>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/", { replace: true })}
        >
          Go to Main Page
        </button>
      </Stack>
    </div>
  );
}

export default Verified;
