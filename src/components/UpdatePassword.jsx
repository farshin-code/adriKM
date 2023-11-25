import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Stack } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useAuthContext } from "../contexts/AuthContext";
import { auth } from "../configs/firebase.config";
import { applyActionCode } from "firebase/auth";
function UpdatePassword() {
  const location = useLocation().search;
  const navigate = useNavigate();
  const pass1Ref = useRef(null);
  const pass2Ref = useRef(null);
  const { continueResetPassProcess } = useAuthContext();
  //to see if the user try to play with address bar!
  const [code, setCode] = useState(null);
  useEffect(() => {
    console.log("im running!");
    const params = new URLSearchParams(location);
    const oobCode = params.get("oobCode");
    console.log(oobCode);
    if (oobCode) {
      setCode(oobCode);
    } else {
      setCode(0);
    }
  }, [location]);

  if (code === null) {
    return <>Louding ... </>;
  }
  return (
    <>
      <div className="container-fluid row">
        <div className="col-12 col-lg-4 p-3 mt-2  mx-auto border border-gray-300 ">
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Password"
              type="password"
              ref={pass1Ref}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Repeat Password"
              type="password"
              ref={pass2Ref}
            />
          </InputGroup>
          <InputGroup className="mb-0">
            <Button
              variant="primary"
              onClick={() => {
                continueResetPassProcess(pass1Ref.current?.value, code)
                  .then((result) => {
                    console.log(result);
                    navigate("/", { replace: true });
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
              disabled={code === null || code === 0}
              className="w-100"
            >
              {code ? "Update Password" : "Invalid link"}
            </Button>
          </InputGroup>
        </div>
      </div>
    </>
  );
}

export default UpdatePassword;
