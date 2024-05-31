import { Modal, ModalBody, ModalHeader } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";

function ViewUsersModal({
  users_view_modal_list,
  users_view_tog_list,
  clientUsers,
}) {
  const tempUsersData = [
    {
      id: 1,
      username: "KRN_1",
      status: 1,
    },
    {
      id: 2,
      username: "KRN_2",
      status: 1,
    },
    {
      id: 3,
      username: "KRN_3",
      status: 0,
    },
  ];

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
                <th scope="col">Status</th>
              </tr>
            </thead>

            <tbody>
              {clientUsers?.map((user, i) => (
                <tr key={user.id}>
                  <td>{i + 1}</td>
                  <td>{user.username}</td>
                  <td>
                    {user.status === 1 ? (
                      <button
                        className="btn btn-sm btn-soft-danger"
                        onClick={() => {}}
                      >
                        Deactivate
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm btn-soft-success"
                        onClick={() => {}}
                      >
                        Activate
                      </button>
                    )}
                  </td>
                  {/* <td>
                    <button
                      className="btn btn-sm btn-soft-danger remove-list"
                      onClick={() => {}}
                    >
                      Deactivate
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default ViewUsersModal;
