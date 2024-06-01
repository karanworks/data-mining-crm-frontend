import { Modal, ModalBody, ModalHeader } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { updateUser } from "../../slices/Users/thunk";

function ViewUsersModal({
  users_view_modal_list,
  users_view_tog_list,
  clientUsers,
  add_users_tog_list,
}) {
  const dispatch = useDispatch();

  function handleUserStatusUpdate(user) {
    const status = user.status === 1 ? 0 : 1;

    dispatch(updateUser({ status, userId: user.id }));
  }

  return (
    <Modal
      isOpen={users_view_modal_list}
      toggle={() => {
        users_view_tog_list();
      }}
      centered
    >
      <ModalHeader
        className="bg-light p-3"
        toggle={() => {
          users_view_tog_list();
        }}
      >
        Users
      </ModalHeader>

      <ModalBody style={{ paddingTop: "0px" }}>
        <div className="table-responsive mt-2">
          <table className="table table-bordered table-nowrap align-middle mb-0">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Username</th>
                <th scope="col">Data Assigned</th>
                <th scope="col">Completed</th>
                <th scope="col">Status</th>
              </tr>
            </thead>

            <tbody>
              {clientUsers?.map((user, i) => (
                <tr key={user.id}>
                  <td>{i + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.dataAssigned}</td>
                  <td>{user.completed}</td>
                  <td>
                    {user.status === 1 ? (
                      <button
                        className="btn btn-sm btn-soft-success"
                        onClick={() => handleUserStatusUpdate(user)}
                      >
                        Active
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm btn-soft-danger"
                        onClick={() => handleUserStatusUpdate(user)}
                      >
                        Not Active
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="btn btn-sm btn-primary mt-2"
            onClick={add_users_tog_list}
            style={{ float: "right" }}
          >
            Add Users
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default ViewUsersModal;
