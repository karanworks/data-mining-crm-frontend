import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Input,
  Button,
  Form,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  ButtonGroup,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Flatpickr from "react-flatpickr";
import { getClients, getClientUsers } from "../../slices/AddClient/thunk";
import { getReportData } from "../../slices/Report/thunk";
import { useNavigate } from "react-router-dom";
import { searchCompletedData } from "../../slices/CompletedData/reducer";
import { searchData } from "../../slices/CountReport/reducer";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  getCompletedWorkData,
  filterCompletedWorkData,
} from "../../slices/CompletedData/thunk";
import {
  getCountReportData,
  filterReportData,
} from "../../slices/CountReport/thunk";
import Select from "react-select";

const CountReport = () => {
  const [selectedSingleClient, setSelectedSingleClient] = useState(null);

  const [selectedUsers, setSelectedUsers] = useState([]);

  const { clients, clientUsers } = useSelector((state) => state.Client);
  const { countReportData, searchedData } = useSelector(
    (state) => state.CountReport
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("SELECTED USERS ->", selectedUsers);

  const { userData } = useSelector((state) => state.CompletedData);

  const filterValidation = useFormik({
    initialValues: {
      startDate: "",
      endDate: "",
    },
    validationSchema: Yup.object({
      startDate: Yup.string(),
      endDate: Yup.string(),
    }),
    onSubmit: (values) => {
      dispatch(filterReportData({ ...values, users: selectedUsers }));
    },
  });

  function filterHandleSubmit(e) {
    e.preventDefault();
    filterValidation.handleSubmit();
    return false;
  }

  function handleSelectSingleClient(client) {
    setSelectedSingleClient(client);
    dispatch(getClientUsers(client.email));
  }

  function handleSelectUser(user) {
    const alreadyIncluded = selectedUsers?.includes(user.username);

    if (alreadyIncluded) {
      setSelectedUsers(
        selectedUsers?.filter((username) => username !== user.username)
      );
    } else {
      setSelectedUsers((prev) => {
        return [...prev, user.username];
      });
    }
  }

  const clientOptions = clients?.map((client) => {
    return {
      value: client.id,
      label: client.companyName,
      email: client.email,
    };
  });

  function handleFilterData(e) {
    // dispatch(searchCompletedData(e.target.value));
    dispatch(searchData(e.target.value));
  }

  useEffect(() => {
    dispatch(getReportData());
    dispatch(getCompletedWorkData());
    dispatch(getClients());
    dispatch(getCountReportData());
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
                      <Col
                        className="col-sm-auto w-100 d-flex"
                        style={{ gap: "5px" }}
                      >
                        <div>
                          <Input
                            id="searchKeyword"
                            name="searchKeyword"
                            className="form-control"
                            type="text"
                            placeholder="Search Keyword"
                            onChange={handleFilterData}
                          />
                        </div>

                        <div className="d-flex">
                          <Form onSubmit={(e) => filterHandleSubmit(e)}>
                            <div
                              className="d-flex"
                              style={{ gap: "5px", flexWrap: "wrap" }}
                            >
                              {userData?.roleId == 1 ? (
                                <div>
                                  <Select
                                    id="client"
                                    name="client"
                                    value={selectedSingleClient}
                                    onChange={(client) => {
                                      handleSelectSingleClient(client);
                                      // addDataValidation.setFieldValue(
                                      //   "clientId",
                                      //   client.value
                                      // );
                                    }}
                                    options={clientOptions}
                                    placeholder="Select Client"
                                  />
                                </div>
                              ) : null}

                              {userData?.roleId == 1 ? (
                                <ButtonGroup type="button">
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      tag="button"
                                      className="btn btn-light"
                                    >
                                      Select Users{" "}
                                      <i className="mdi mdi-chevron-down"></i>
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-menu-sm p-2">
                                      {clientUsers?.map((userOption) => (
                                        <div
                                          className="mb-2"
                                          key={userOption.id}
                                        >
                                          <div className="form-check custom-checkbox">
                                            <Input
                                              type="checkbox"
                                              checked={selectedUsers?.includes(
                                                userOption.username
                                              )}
                                              className="form-check-input"
                                              id={userOption.username}
                                              name={userOption.username}
                                              onChange={() => {
                                                handleSelectUser(userOption);
                                              }}
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor={userOption.username}
                                            >
                                              {userOption.username}
                                            </label>
                                          </div>
                                        </div>
                                      ))}
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </ButtonGroup>
                              ) : null}

                              <div>
                                <Flatpickr
                                  className="form-control border dash-filter-picker"
                                  options={{
                                    mode: "range",
                                    dateFormat: "d M, Y",
                                  }}
                                  onChange={(d) => {
                                    const formattedStartDate = new Date(
                                      d[0]
                                    ).toLocaleDateString("en-GB");
                                    const formattedEndDate = new Date(
                                      d[1]
                                    ).toLocaleDateString("en-GB");

                                    filterValidation.setFieldValue(
                                      "startDate",
                                      formattedStartDate
                                    );
                                    filterValidation.setFieldValue(
                                      "endDate",
                                      formattedEndDate
                                    );
                                  }}
                                  placeholder="Date range"
                                />
                              </div>

                              <div>
                                <Button
                                  color="primary"
                                  className="add-btn me-1"
                                  id="filter-btn"
                                  type="submit"
                                >
                                  <i className="ri-equalizer-line"></i> Apply
                                </Button>
                              </div>
                            </div>
                          </Form>
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
                              Correct Fields
                            </th>
                            <th className="sort" data-sort="incorrect">
                              Incorrect Fields
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {(searchedData?.length > 0
                            ? searchedData
                            : countReportData
                          )?.map((data) => (
                            <tr key={data.id}>
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

                              <td className="client">{data.companyName}</td>
                              <td className="wokring-users">
                                {data.totalUsers.length}
                              </td>
                              <td className="assigned-data">
                                {data.totalAssignedData.length}
                              </td>
                              <td className="completed-data">
                                {data.totalCompletedData.length}
                              </td>
                              <td className="for-checking">
                                {data.forChecking.length}
                              </td>
                              <td className="verified-data">
                                {data.verifiedData.length}
                              </td>
                              <td className="correct">{data.correct.length}</td>
                              <td className="incorrect">
                                {data.incorrect.length}
                              </td>
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

export default CountReport;
