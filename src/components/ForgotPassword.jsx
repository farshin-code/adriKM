import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Alert } from "react-bootstrap";
import { useAuthContext } from "../contexts/AuthContext";
import { useRef } from "react";
function ForgotPassword({ show, hide }) {
  const { resetPasswordByEmail } = useAuthContext();
  const emailRef = useRef(null);
  const hideHandler = () => {
    hide();
  };
  return (
    <>
      <Modal show={show} onHide={hideHandler}>
        {/* {ShowAlert && (
          <Alert
            show={show}
            variant="danger"
            onClose={() => setShowAlert(false)}
            dismissible
          >
            <Alert.Heading>Oh snap! Something went wrong </Alert.Heading>
            <p>check you info and connection, try again.</p>
          </Alert>
        )} */}
        <Modal.Header closeButton>
          {/* <Modal.Title>{title}</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-0">
            <Form.Control
              placeholder="type your email address to reset your password"
              type="email"
              ref={emailRef}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Stack direction="vertical" gap={2} className="pt-0">
            <Button
              variant="primary"
              onClick={() => {
                resetPasswordByEmail(emailRef.current?.value);
                hideHandler();
              }}
            >
              Send Recovery Email
            </Button>
            <p className="mb-1 text-center text-secondary">
              After pressing the button, you will receive an email with a link
              to reset your password.Follow the link.
            </p>
          </Stack>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ForgotPassword;
