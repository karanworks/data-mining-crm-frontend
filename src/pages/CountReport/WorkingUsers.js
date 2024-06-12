import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const WorkingUsers = () => {
  const location = useLocation();
  const data = location.state?.data;

  document.title = "Working Users";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Working Users" pageTitle="Management" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Working Users</h4>
                </CardHeader>

                <CardBody>
                  <div className="listjs-table" id="userList">
                    <div className="table-responsive mt-2">
                      <table className="table table-bordered table-nowrap align-middle mb-0">
                        <thead>
                          <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">Username</th>
                            <th scope="col">Data Assigned</th>
                            <th scope="col">Completed</th>
                            {/* <th scope="col">Status</th> */}
                          </tr>
                        </thead>

                        <tbody>
                          {data?.map((user, i) => (
                            <tr key={user.id}>
                              <td>{i + 1}</td>
                              <td>{user.username}</td>
                              <td>{user.dataAssigned}</td>
                              <td>{user.completed}</td>
                              {/* <td>
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
                              </td> */}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="d-flex justify-content-end">
                      <div className="pagination-wrap hstack gap-2">
                        <Link
                          className="page-item pagination-prev disabled"
                          to="#"
                        >
                          Previous
                        </Link>
                        <ul className="pagination listjs-pagination mb-0"></ul>
                        <Link className="page-item pagination-next" to="#">
                          Next
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <ToastContainer />
      </div>
    </React.Fragment>
  );
};

export default WorkingUsers;
