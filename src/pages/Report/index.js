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

const Report = () => {
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

  document.title = "Report";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Report" pageTitle="Reports" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Report</h4>
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
                            <th scope="col" style={{ width: "50px" }}>
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
                            </th>
                            <th className="sort" data-sort="token_no">
                              Token No
                            </th>
                            <th className="sort" data-sort="client">
                              Client
                            </th>
                            <th className="sort" data-sort="client">
                              Total Users
                            </th>

                            <th className="sort" data-sort="total_forms">
                              Total Forms
                            </th>

                            <th className="sort" data-sort="checked_forms">
                              Checked Forms
                            </th>

                            <th className="sort" data-sort="action">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {reportData?.map((data, i) => (
                            <tr key={i}>
                              <th scope="row">
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
                              </th>

                              <td className="token_no">{data.token}</td>
                              <td className="client">{data.clientName}</td>
                              <td className="users">{data.totalUsers}</td>
                              <td className="type">{data.totalForms}</td>
                              <td className="type">{data.checkedFormsCount}</td>

                              <td>
                                <div className="d-flex gap-2">
                                  <div className="viewUsers">
                                    <button
                                      className="btn btn-sm btn-success edit-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#showModal"
                                      onClick={() => {
                                        // forms_view_tog_list(data.token);
                                        // setListClient(client);
                                        handleViewForms(data.token);
                                      }}
                                    >
                                      View Forms
                                    </button>
                                  </div>
                                  {/* <div className="edit">
                                    <button
                                      className="btn btn-sm btn-primary edit-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#showModal"
                                      onClick={() => {
                                        // handleEditClient(client);
                                      }}
                                    >
                                      Edit
                                    </button>
                                  </div> */}
                                  {/* <div className="remove">
                                    <button
                                      className="btn btn-sm btn-danger remove-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#deleteRecordModal"
                                      onClick={() => {
                                        // setListClient(client);
                                        setmodal_delete(true);
                                        setIsDeletingMultipleUsers(false);
                                      }}
                                    >
                                      Remove
                                    </button>
                                  </div> */}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="noresult" style={{ display: "none" }}>
                        <div className="text-center">
                          <lord-icon
                            src="https://cdn.lordicon.com/msoeawqm.json"
                            trigger="loop"
                            colors="primary:#25a0e2,secondary:#00bd9d"
                            style={{ width: "75px", height: "75px" }}
                          ></lord-icon>
                          <h5 className="mt-2">Sorry! No Result Found</h5>
                          <p className="text-muted mb-0">
                            We've searched more than 150+ Orders We did not find
                            any orders for you search.
                          </p>
                        </div>
                      </div>
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

export default Report;
