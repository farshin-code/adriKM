import React from "react";
import { Modal } from "@restart/ui";
import { Spinner } from "react-bootstrap";
// const MODAL = styled(Modal)`
//   position: fixed;
//   width: 400px;
//   z-index: 1040;
///   border: 1px solid #e5e5e5;
//   background-color: white;
//   box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
//   padding: 20px;
// `;
function AppSpinner({ show, hideSpinner }) {
  return (
    <Modal
      //   className="fixed z-[9999] top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white shadow-lg p-5"
      className="fixed w-400 z-100000 border border-gray-300 bg-white shadow-md p-5"
      show={show}
      aria-labelledby="modal-1-label"
      onHide={hideSpinner}
      renderBackdrop={(props) => (
        <div {...props} className="fixed inset-0 bg-black/30 z-[300]" />
      )}
    >
      <Spinner animation="border" variant="primary">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Modal>
  );
}

export default AppSpinner;
