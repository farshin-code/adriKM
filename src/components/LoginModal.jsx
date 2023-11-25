import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Image, Stack } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import useLoginModal from "../hooks/loginModal";
import { Alert } from "react-bootstrap";

import ForgotPassword from "./ForgotPassword";
function LoginModal({ show, hide }) {
  const {
    title,
    setTitle,
    showPassword,
    setShowPassword,
    ShowAlert,
    setShowAlert,
    signGoogleClickHandler,
    emailForSignInRef,
    passwordForSignInRef,
    signInwithEmailHandler,
    emailForSignUpRef,
    passwordForSignUpRef,
    displayNameForSignUpRef,
    avatarLocalUrl,
    setAvatarLocalUrl,
    avatarFileSelectorChangeHandler,
    signUpWithEmailHandler,
    showSpinnerClickHandler,
    showForgotPassword,
    setShowForgotPassword,
  } = useLoginModal();

  const hideHandler = () => {
    hide();
    setShowPassword({ passOrText: false, buttonText: "Show" });
    setAvatarLocalUrl(null);
    setShowAlert(false);
    setTitle("Login");
  };
  return (
    <>
      <ForgotPassword
        show={showForgotPassword}
        hide={() => setShowForgotPassword(false)}
      />
      <Modal show={show} onHide={hideHandler}>
        {ShowAlert && (
          <Alert
            show={show}
            variant="danger"
            onClose={() => setShowAlert(false)}
            dismissible
          >
            <Alert.Heading>Oh snap! Something went wrong </Alert.Heading>
            <p>check you info and connection, try again.</p>
          </Alert>
        )}
        <Modal.Header closeButton>
          {/* <Modal.Title>{title}</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <Tabs
            id="login-tabs"
            className="mb-3"
            defaultActiveKey="login"
            justify
            onSelect={(e) => setTitle(e === "login" ? "Login" : "Sign up")}
          >
            <Tab eventKey="login" title="Login" className="tab-color">
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Email"
                  type="email"
                  ref={emailForSignInRef}
                />
              </InputGroup>
              <InputGroup className="mb-0">
                <Form.Control
                  placeholder="Password"
                  type="password"
                  ref={passwordForSignInRef}
                />
              </InputGroup>
              <Button
                variant="link"
                className="mb-0 float-end"
                onClick={() => {
                  hideHandler();
                  setShowForgotPassword(true);
                }}
              >
                forgot password?
              </Button>
            </Tab>
            <Tab eventKey="signup" title="Sign up">
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Name"
                  type="text"
                  autoFocus
                  ref={displayNameForSignUpRef}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Email"
                  type="email"
                  ref={emailForSignUpRef}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Password"
                  ref={passwordForSignUpRef}
                  type={showPassword.passOrText ? "text" : "password"}
                />

                <Button
                  variant="outline-secondary "
                  onClick={() =>
                    setShowPassword({
                      passOrText: !showPassword.passOrText,
                      buttonText:
                        showPassword.buttonText === "Show" ? "Hide" : "Show",
                    })
                  }
                >
                  {showPassword.buttonText}
                </Button>
              </InputGroup>
              <div className="row p-3 pt-4  d-flex justify-content-center align-items-center">
                <div className="border-bottom col" />

                <Form.Label className="col text-secondary text-nowrap">
                  Avatar Image [Optional]
                </Form.Label>

                <div className="border-bottom col" />
              </div>
              <Form.Group className="mb-3 d-flex flex-column justify-content-center align-items-center gap-3">
                <Image
                  src={avatarLocalUrl || "https://placehold.co/80x80"}
                  roundedCircle
                  width={80}
                  height={80}
                />
                <Form.Control
                  type="file"
                  onChange={(e) => avatarFileSelectorChangeHandler(e)}
                />
              </Form.Group>
              <p className="mb-0 text-center text-secondary">
                [You will get Activation Email to activate your account]
              </p>
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <Stack direction="vertical" gap={2} className="pt-1">
            <Button
              variant="primary"
              onClick={() => {
                if (title === "Login") signInwithEmailHandler(hideHandler);
                else signUpWithEmailHandler(hideHandler);
              }}
            >
              {title}
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() => signGoogleClickHandler(hideHandler)}
            >
              Login / Sign up with Google
            </Button>
          </Stack>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LoginModal;
