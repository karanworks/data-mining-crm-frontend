import {
  Label,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormFeedback,
  Button,
} from "reactstrap";
import "react-toastify/dist/ReactToastify.css";

function AddUsersFormModal({
  add_users_modal_list,
  add_users_tog_list,
  addUserValidation,
  addUserFormHandleSubmit,
}) {
  return (
    <Modal
      isOpen={add_users_modal_list}
      toggle={() => {
        add_users_tog_list();
      }}
      centered
      style={{ width: "15%" }}
    >
      <ModalHeader
        className="bg-light p-3"
        toggle={() => {
          add_users_tog_list();
        }}
      >
        {" "}
        Add Users
      </ModalHeader>
      <Form
        className="tablelist-form"
        onSubmit={(e) => addUserFormHandleSubmit(e)}
      >
        <ModalBody style={{ paddingTop: "0px" }}>
          <div className="mb-2">
            <Label htmlFor="noOfUsers" className="form-label">
              No of users
            </Label>

            <Input
              id="noOfUsers"
              name="noOfUsers"
              className="form-control"
              placeholder="i,e - 1, 2, 3.."
              type="number"
              onChange={addUserValidation.handleChange}
              onBlur={addUserValidation.handleBlur}
              value={addUserValidation.values.noOfUsers || ""}
              invalid={
                addUserValidation.touched.noOfUsers &&
                addUserValidation.errors.noOfUsers
                  ? true
                  : false
              }
            />

            {addUserValidation.touched.noOfUsers &&
            addUserValidation.errors.noOfUsers ? (
              <FormFeedback type="invalid">
                {addUserValidation.errors.noOfUsers}
              </FormFeedback>
            ) : null}
          </div>

          <Button
            type="submit"
            className="btn btn-success"
            style={{ float: "right" }}
          >
            Add
          </Button>
        </ModalBody>
      </Form>
    </Modal>
  );
}

export default AddUsersFormModal;
