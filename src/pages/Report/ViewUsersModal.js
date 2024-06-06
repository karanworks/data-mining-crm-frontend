import { Modal, ModalBody, ModalHeader } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { updateUser } from "../../slices/Users/thunk";

function ViewUsersModal({
  users_view_modal_list,
  users_view_tog_list,
  clientUsers,
  add_users_tog_list,
  reportDataForms,
  handleCheckForm,
}) {
  const dispatch = useDispatch();

  function handleUserStatusUpdate(user) {
    const status = user.status === 1 ? 0 : 1;

    dispatch(updateUser({ status, userId: user.id }));
  }

  console.log("REPORT FORMS IN VIEW MODAL ->", reportDataForms);

  return (
    <Modal
      isOpen={users_view_modal_list}
      toggle={() => {
        users_view_tog_list();
      }}
      className="modal-xl"
      centered
    >
      <ModalHeader
        className="bg-light p-3"
        toggle={() => {
          users_view_tog_list();
        }}
      >
        Submitted Forms
      </ModalHeader>

      <ModalBody style={{ paddingTop: "0px" }}>
        <div className="table-responsive mt-2">
          <table className="table table-bordered table-nowrap align-middle mb-0">
            <thead>
              <tr>
                <th scope="col">Username</th>
                <th scope="col">Company Info</th>
                <th scope="col">Business Type</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              {reportDataForms?.map((form) => (
                <tr key={form.id}>
                  <td>{form.username}</td>
                  <td className="companyInfo">
                    <div>
                      <div>URL - {form.url}</div>
                      <div>Name - {form.companyName}</div>
                    </div>
                  </td>
                  <td>{form.businessType}</td>
                  <td>
                    {form.websiteStatus === "Valid URL" ? (
                      <span className="badge border border-success text-success">
                        {form.websiteStatus}
                      </span>
                    ) : (
                      <span className="badge border border-danger text-danger">
                        {form.websiteStatus}
                      </span>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-success edit-item-btn"
                      data-bs-toggle="modal"
                      data-bs-target="#showModal"
                      onClick={() => {
                        handleCheckForm(form);
                      }}
                    >
                      Check
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <button
            className="btn btn-sm btn-primary mt-2"
            onClick={add_users_tog_list}
            style={{ float: "right" }}
          >
            Add Users
          </button> */}
        </div>
      </ModalBody>
    </Modal>
  );
}

export default ViewUsersModal;
