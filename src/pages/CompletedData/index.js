import React, { useEffect, useState } from "react";
import axios from "axios";
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
  Input,
  Form,
  ButtonGroup,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import Loader from "../../Components/Common/Loader";
import Select from "react-select";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import CompletedDataRemoveModal from "./CompletedDataRemoveModal";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../slices/Users/thunk";
import * as Yup from "yup";
import {
  getCompletedWorkData,
  removeCompletedWorkData,
  filterCompletedWorkData,
  submitCompletedWorkData,
} from "../../slices/CompletedData/thunk";
import { getClients, getClientUsers } from "../../slices/AddClient/thunk";
import { searchCompletedData } from "../../slices/CompletedData/reducer";
import { useNavigate } from "react-router-dom";
import { tempBusinessTypeData } from "../../common/data/completedData";
import { exportCompletedWorkData } from "../../helpers/fakebackend_helper";
import { useFormik } from "formik";
import { getLoggedinUser } from "../../helpers/api_helper";
import UserLoggedOutModal from "../../UserLoggedOutModal";
import { label } from "yet-another-react-lightbox";

const CompletedData = () => {
  const [selectedSingleClient, setSelectedSingleClient] = useState(null);

  const [selectedUsers, setSelectedUsers] = useState([]);

  const [modal_delete, setmodal_delete] = useState(false);

  const [selectedCompletedData, setSelectedCompletedData] = useState([]);

  const [isDeletingMultipleData, setIsDeletingMultipleData] = useState(false);

  const [listData, setListData] = useState(null);

  const [loading, setLoading] = useState(true);

  const { userData, searchedData, logoutError } = useSelector(
    (state) => state.CompletedData
  );

  const { clients, clientUsers } = useSelector((state) => state.Client);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = getLoggedinUser();

  function handleSelectSingleClient(client) {
    setSelectedSingleClient(client);
    dispatch(getClientUsers(client.email));
  }

  const clientOptions = clients?.map((client) => {
    return {
      value: client.id,
      label: client.companyName,
      email: client.email,
    };
  });

  useEffect(() => {
    setLoading(true);
    // dispatch(getUsers());
    dispatch(getCompletedWorkData()).finally(() => setLoading(false));

    dispatch(getClients());
  }, [dispatch]);

  const filterValidation = useFormik({
    initialValues: {
      startDate: "",
      endDate: "",
      businessType: "",
    },
    validationSchema: Yup.object({
      startDate: Yup.string(),
      endDate: Yup.string(),
      businessType: Yup.string(),
    }),
    onSubmit: (values) => {
      dispatch(filterCompletedWorkData({ ...values, users: selectedUsers }));
    },
  });

  function filterHandleSubmit(e) {
    e.preventDefault();

    filterValidation.handleSubmit();

    return false;
  }

  // toggles delete user confirmation modal
  function tog_delete() {
    setmodal_delete(!modal_delete);
  }

  function handleSelectedDelete() {
    tog_delete();
    setIsDeletingMultipleData(true);
  }

  function handleFilterData(e) {
    dispatch(searchCompletedData(e.target.value));
  }

  function handleSelectAll() {
    const allCompletedDataIds = (
      searchedData?.length > 0 ? searchedData : userData?.completedWorkData
    )?.map((data) => {
      return data.id;
    });

    if (
      (searchedData?.length > 0 ? searchedData : userData?.completedWorkData)
        ?.length === selectedCompletedData.length
    ) {
      setSelectedCompletedData([]);
    } else {
      setSelectedCompletedData(allCompletedDataIds);
    }
  }

  function handleSelectedCompletedData(dataId) {
    const alreadySelected = selectedCompletedData.includes(dataId);

    if (alreadySelected) {
      const filteredCompletedWorkData = selectedCompletedData?.filter((id) => {
        return id !== dataId;
      });

      setSelectedCompletedData([...filteredCompletedWorkData]);
    } else {
      setSelectedCompletedData([...selectedCompletedData, dataId]);
    }
  }

  function handleDelete() {
    if (isDeletingMultipleData) {
      dispatch(removeCompletedWorkData({ dataId: selectedCompletedData }));
    } else {
      dispatch(removeCompletedWorkData({ dataId: listData.id }));
    }

    setmodal_delete(false);
  }

  async function handleExportData() {
    const response = await exportCompletedWorkData();
    const url = window.URL.createObjectURL(
      new Blob([response], {
        type: "text/csv",
      })
    );

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function handleSubmitFormData() {
    const forms = userData?.completedWorkData?.filter((form) => {
      return selectedCompletedData.includes(form.id);
    });
    dispatch(submitCompletedWorkData({ forms }));
  }

  function handleViewData(data) {
    navigate("/completed-data/view-data", { state: { data } });
  }

  function handleEditData(data) {
    navigate("/completed-data/edit", { state: { data } });
  }

  function handleISTTimeZone(utcTimestamp) {
    // Timestamp in UTC

    // Create a new Date object from the UTC timestamp
    const utcDate = new Date(utcTimestamp);

    // Get the offset in minutes between UTC and IST
    const istOffsetInMinutes = utcDate.getTimezoneOffset() + 330;

    // Create a new Date object with the IST offset
    const istDate = new Date(
      utcDate.getTime() + istOffsetInMinutes * 60 * 1000
    );

    // Get the IST day and time components
    const istYear = istDate.getFullYear();
    const istMonth = String(istDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const istDay = String(istDate.getDate()).padStart(2, "0");
    const istHours = String(istDate.getHours()).padStart(2, "0");
    const istMinutes = String(istDate.getMinutes()).padStart(2, "0");
    const istSeconds = String(istDate.getSeconds()).padStart(2, "0");
    // const istMilliseconds = String(istDate.getMilliseconds()).padStart(3, "0");

    // Format the IST day and time
    const istDayAndTime = `${istDay}-${istMonth}-${istYear} ${istHours}:${istMinutes}:${istSeconds}`;

    return istDayAndTime;
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

  document.title = "Completed Data";
  return logoutError ? (
    <UserLoggedOutModal />
  ) : (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Completed Data" pageTitle="Work" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Completed Data</h4>
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

                        <div className="d-flex" style={{ flexWrap: "wrap" }}>
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
                                    options={[
                                      {
                                        value: "",
                                        label: "Choose All",
                                        email: "",
                                      },
                                      ...clientOptions,
                                    ]}
                                    placeholder="Select Client"
                                  />
                                </div>
                              ) : null}

                              {userData?.roleId == 1 ? (
                                <ButtonGroup>
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      tag="button"
                                      className="btn btn-light text-muted fw-normal"
                                      style={{
                                        backgroundColor: "white",
                                        borderColor: "#ced4da",
                                      }}
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
                                <Input
                                  id="businessType"
                                  name="businessType"
                                  className="form-control"
                                  type="select"
                                  placeholder="Select Business Type"
                                  onChange={(e) => {
                                    filterValidation.setFieldValue(
                                      "businessType",
                                      e.target.value
                                    );
                                  }}
                                >
                                  <option value="">Select Business Type</option>

                                  {tempBusinessTypeData?.map((business, i) => (
                                    <option
                                      value={business.businessType}
                                      key={i}
                                    >
                                      {business.businessType}
                                    </option>
                                  ))}
                                </Input>
                              </div>

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
                              <Button
                                color="primary"
                                className="add-btn me-1"
                                onClick={handleExportData}
                                id="create-btn"
                              >
                                <i className="ri-download-fill align-bottom me-1"></i>{" "}
                                Export Data
                              </Button>
                              {selectedCompletedData.length > 0 ? (
                                <>
                                  <Button
                                    color="primary"
                                    className="delete-btn me-1"
                                    onClick={handleSelectedDelete}
                                    id="create-btn"
                                  >
                                    <i className="ri-add-line align-bottom me-1"></i>{" "}
                                    Delete Selected Id
                                  </Button>
                                  <Button
                                    color="primary"
                                    className="submit-data-btn me-1"
                                    onClick={handleSubmitFormData}
                                    id="create-btn"
                                  >
                                    <i className="ri-add-line align-bottom me-1"></i>{" "}
                                    Submit Data
                                  </Button>
                                </>
                              ) : null}
                            </div>
                          </Form>
                        </div>
                      </Col>
                    </Row>

                    <div className="table-responsive table-card mt-3 mb-1">
                      <table className="table table-nowrap" id="userTable">
                        <thead className="table-light">
                          <tr>
                            <th scope="col" style={{ width: "50px" }}>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="checkAll"
                                  value="option"
                                  checked={
                                    (searchedData?.length > 0
                                      ? searchedData
                                      : userData?.completedWorkData
                                    )?.length > 0 &&
                                    (searchedData?.length > 0
                                      ? searchedData
                                      : userData?.completedWorkData
                                    )?.length === selectedCompletedData.length
                                  }
                                  onChange={handleSelectAll}
                                />
                              </div>
                            </th>
                            <th className="sort" data-sort="username">
                              Username
                            </th>
                            <th className="sort" data-sort="dateAndTime">
                              Date & Time
                            </th>
                            <th className="sort" data-sort="companyInfo">
                              Company Info
                            </th>
                            <th className="sort" data-sort="type">
                              Business Type
                            </th>

                            <th className="sort" data-sort="status">
                              Status
                            </th>

                            <th className="sort" data-sort="action">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {loading ? (
                            <tr>
                              <td
                                colSpan={6}
                                style={{
                                  border: "none",
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                }}
                              >
                                <Loader />
                              </td>
                            </tr>
                          ) : (
                            (searchedData?.length > 0
                              ? searchedData
                              : userData?.completedWorkData
                            )?.map((data) => (
                              <tr key={data.id}>
                                <th scope="row">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      name="checkbox"
                                      checked={selectedCompletedData.includes(
                                        data.id
                                      )}
                                      onChange={() => {
                                        handleSelectedCompletedData(data.id);
                                      }}
                                    />
                                  </div>
                                </th>

                                <td className="username">{data.username}</td>
                                <td className="dateAndTime">
                                  <span className="badge border border-primary text-primary fs-12">
                                    {handleISTTimeZone(data.createdAt)}
                                  </span>
                                </td>
                                <td className="companyInfo">
                                  <div>
                                    <div>URL - {data.url}</div>
                                    <div>Name - {data.companyName}</div>
                                  </div>
                                </td>
                                <td className="businessType">
                                  {data.businessType}
                                </td>
                                <td className="status">
                                  {data.websiteStatus === "Valid URL" ? (
                                    <span className="badge border border-success text-success">
                                      {data.websiteStatus}
                                    </span>
                                  ) : (
                                    <span className="badge border border-danger text-danger">
                                      {data.websiteStatus}
                                    </span>
                                  )}
                                </td>

                                <td>
                                  <div className="d-flex gap-2">
                                    {loggedInUser.data.isPremiumMember ? (
                                      <div className="edit">
                                        <button
                                          className="btn btn-sm btn-primary edit-item-btn"
                                          data-bs-toggle="modal"
                                          data-bs-target="#showModal"
                                          onClick={() => {
                                            handleEditData(data);
                                          }}
                                        >
                                          Edit
                                        </button>
                                      </div>
                                    ) : null}
                                    <div className="remove">
                                      <button
                                        className="btn btn-sm btn-danger remove-item-btn"
                                        data-bs-toggle="modal"
                                        data-bs-target="#deleteRecordModal"
                                        onClick={() => {
                                          setListData(data);
                                          setmodal_delete(true);
                                        }}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                    <div className="remove">
                                      <button
                                        className="btn btn-sm btn-success remove-item-btn"
                                        data-bs-toggle="modal"
                                        onClick={() => handleViewData(data)}
                                      >
                                        View
                                      </button>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>

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

      {/* Add Modal */}
      {/* <AddUserFormModal
        modal_list={modal_list}
        tog_list={tog_list}
        formHandleSubmit={formHandleSubmit}
        validation={validation}
        isEditingUser={isEditingUser}
        alreadyRegisteredError={alreadyRegisteredError}
        handleRoleChange={handleRoleChange}
        roles={roles}
      /> */}

      {/* Remove Modal */}
      <CompletedDataRemoveModal
        modal_delete={modal_delete}
        tog_delete={tog_delete}
        setmodal_delete={setmodal_delete}
        handleDeleteData={handleDelete}
      />
    </React.Fragment>
  );
};

export default CompletedData;
