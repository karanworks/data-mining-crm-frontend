import React, { useEffect, useState } from "react";
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

import { useDispatch, useSelector } from "react-redux";

import { getClients } from "../../slices/AddClient/thunk";
import { getReportData } from "../../slices/Report/thunk";
import { useNavigate } from "react-router-dom";

const CountReport = () => {
  const [selectedClients, setSelectedClients] = useState([]);

  const { clients } = useSelector((state) => state.Client);
  const { reportData } = useSelector((state) => state.Report);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSelectAll() {
    const allClientIds = clients?.map((client) => {
      return client.id;
    });

    if (clients?.length === selectedClients.length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(allClientIds);
    }
  }

  function handleSelectedDelete() {
    tog_delete();
    setIsDeletingMultipleUsers(true);
  }

  function handleViewForms(token) {
    navigate("/report/view-form-data", {
      state: { data: token },
    });
  }

  useEffect(() => {
    dispatch(getReportData());
    dispatch(getClients());
  }, [dispatch]);

  document.title = "Count Report";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Count Report" pageTitle="Management" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Count Report</h4>
                </CardHeader>

                <CardBody>
                  <div className="listjs-table" id="userList">
                    <Row className="g-4 mb-3 d-flex justify-content-between">
                      {/* <Col className="col-sm-auto ">
                        <div className="search-box">
                          <input
                            type="text"
                            className="form-control bg-light border-light"
                            autoComplete="off"
                            id="searchList"
                            onChange={handleFilterData}
                            placeholder="Search Keyword"
                          />
                          <i className="ri-search-line search-icon"></i>
                        </div>
                      </Col> */}

                      <Col className="col-sm-auto">
                        <div>
                          {/* <Button
                            color="primary"
                            className="add-btn me-1"
                            onClick={() => tog_list()}
                            id="create-btn"
                          >
                            <i className="ri-add-line align-bottom me-1"></i>{" "}
                            Add New Client
                          </Button> */}

                          {selectedClients.length > 0 ? (
                            <Button
                              color="primary"
                              className="delete-btn me-1"
                              onClick={handleSelectedDelete}
                              id="create-btn"
                            >
                              <i className="ri-add-line align-bottom me-1"></i>{" "}
                              Delete Selected Id
                            </Button>
                          ) : null}
                        </div>
                      </Col>
                    </Row>

                    <div className="table-responsive table-card mt-3 mb-1">
                      <table
                        className="table align-middle table-nowrap"
                        id="userTable"
                      >
                        <thead className="table-light">
                          <tr>
                            {/* <th scope="col" style={{ width: "50px" }}>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="checkAll"
                                  checked={
                                    clients?.length > 0 &&
                                    clients?.length === selectedClients.length
                                  }
                                  onChange={handleSelectAll}
                                />
                              </div>
                            </th> */}
                            <th className="sort" data-sort="client">
                              Client
                            </th>
                            <th className="sort" data-sort="working-users">
                              Working Users
                            </th>
                            <th className="sort" data-sort="assigned-data">
                              Assigned Data
                            </th>
                            <th className="sort" data-sort="completed-data">
                              Completed Data
                            </th>

                            <th className="sort" data-sort="for-checking">
                              For Checking
                            </th>

                            <th className="sort" data-sort="verified-data">
                              Verified Data
                            </th>

                            <th className="sort" data-sort="correct">
                              Correct
                            </th>
                            <th className="sort" data-sort="errors">
                              Errors
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          <tr>
                            {/* <th scope="row">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  // checked={selectedClients.includes(client.id)}
                                  type="checkbox"
                                  name="checkbox"
                                  onChange={() => {
                                    // handleSelectedClients(client.id);
                                  }}
                                />
                              </div>
                            </th> */}

                            <td className="client">Client Name</td>
                            <td className="wokring-users">8</td>
                            <td className="assigned-data">10</td>
                            <td className="completed-data">8</td>
                            <td className="for-checking">2</td>
                            <td className="verified-data">1</td>
                            <td className="error">1</td>
                            <td className="correct">1</td>
                          </tr>
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

export default CountReport;
