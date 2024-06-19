import { useNavigate } from "react-router-dom";
import { Button, Modal, ModalHeader } from "reactstrap";

const UserLoggedOutModal = () => {
  const navigate = useNavigate();

  return (
    <Modal
      isOpen={true}
      toggle={() => {}}
      backdrop={"static"}
      id="staticBackdrop"
      centered
    >
      {/* <ModalHeader toggle={() => {}}></ModalHeader> */}
      <div className="modal-body text-center p-5">
        <div>
          <h2 className="mb-3 text-danger">You have been logged out!</h2>
          {/* <p className="text-muted mb-4"> You have been logged out.</p> */}
          <h5 className="text-muted mb-4">
            {" "}
            Your account has been used to log in somewhere else, login again
          </h5>
        </div>

        {/* update session */}
        <Button color="primary" onClick={() => navigate("/login")}>
          Log in Again
        </Button>
      </div>
    </Modal>
  );
};

export default UserLoggedOutModal;
