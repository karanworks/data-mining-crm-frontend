import { useRef, useState } from "react";
import { Button, Modal, ModalHeader } from "reactstrap";
import alertIcon from "./alert.png";
import { updateSession } from "./helpers/fakebackend_helper";

const UpdateActiveTimeModal = ({ modalVisible, tog_modal }) => {
  return (
    <Modal
      isOpen={modalVisible}
      toggle={tog_modal}
      backdrop={"static"}
      id="staticBackdrop"
      centered
    >
      <ModalHeader toggle={tog_modal}></ModalHeader>
      <div className="modal-body text-center p-5">
        <div>
          <img src={alertIcon} style={{ height: "100px", width: "100px" }} />
          <h1 className="mb-1 text-danger">Inactive Warning!</h1>
          <p className="text-muted mb-4"> You have been logged out.</p>
          <h5 className="text-muted mb-4">
            {" "}
            It seems like your account have been used to log in somewhere else,
            click on logout button to login again
          </h5>
        </div>

        {/* update session */}
        <Button color="primary">Log out!</Button>
      </div>
    </Modal>
  );
};

export default UpdateActiveTimeModal;
