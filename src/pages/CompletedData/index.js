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
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import { useFormik } from "formik";
import * as Yup from "yup";
import AddUserFormModal from "./AddUserFormModal";
import AddUserRemoveModal from "./AddUserRemoveModal";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  createUser,
  removeUser,
  updateUser,
} from "../../slices/Users/thunk";

import {
  getCenterUsers,
  createCenterUser,
  removeCenterUser,
  updateCenterUser,
} from "../../slices/AddUsers/thunk";
import { useNavigate } from "react-router-dom";
// import { getCenters } from "../../slices/Centers/thunk";

const CompletedData = () => {
  // register / edit user modal state whether modal is open or not
  const [modal_list, setmodal_list] = useState(false);
  // this state triggers when editing the user
  const [isEditingUser, setIsEditingUser] = useState(false);
  // delete user confirmation modal state
  const [modal_delete, setmodal_delete] = useState(false);
  // when we click on edit / delete user button this state stores that user's id, had to make this state because I needed to have that user's id to make changes to it
  const [listUserId, setListUserId] = useState(null);
  // fetching all the roles
  const [roles, setRoles] = useState([]);

  const { users, alreadyRegisteredError } = useSelector((state) => state.Users);
  const { centers } = useSelector((state) => state.Centers);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // toggles register / edit user modal
  function tog_list() {
    setmodal_list(!modal_list);
    setIsEditingUser(false);
  }

  // toggles delete user confirmation modal
  function tog_delete() {
    setmodal_delete(!modal_delete);
  }

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/roles`, {
        withCredentials: true,
      })
      .then((res) => {
        setRoles(res.data);
      })
      .catch((error) => {
        console.log("error while fetching roles ->", error);
      });
  }, []);

  useEffect(() => {
    if (alreadyRegisteredError) {
      setmodal_list(!modal_list);
    }
  }, [alreadyRegisteredError]);

  useEffect(() => {
    dispatch(getUsers());
    // dispatch(getCenters());
  }, [dispatch]);

  // formik setup
  const validation = useFormik({
    initialValues: {
      role: "",
      companyName: "",
      address: "",
      agreementDate: "",
      email: "",
      contactNo: "",
      noOfUsers: "",
      timing: "",
      userIdDemo: "",
      userIdLive: "",
      password: "",
      image: "",
      agreementTalk: "",
    },
    validationSchema: Yup.object({
      role: Yup.string().required("Please Select Role"),
      companyName: Yup.string().required("Enter company name"),
      address: Yup.string().required("Enter Address"),
      agreementDate: Yup.string().required("Enter agreement date"),
      email: Yup.string().required("Enter email"),
      contactNo: Yup.string().required("Enter contact no"),
      noOfUsers: Yup.string().required("Enter no of user"),
      startTiming: Yup.string().required("Enter start timining"),
      endTiming: Yup.string().required("Enter end timining"),
      userIdDemo: Yup.string().required("Enter user id demo"),
      userIdLive: Yup.string().required("Enter user id live"),
      password: Yup.string().required("Enter password"),
      image: Yup.string(),
      agreementTalk: Yup.string().required("Enter agreement talk"),
    }),
    onSubmit: (values) => {
      isEditingUser
        ? dispatch(updateCenterUser({ values, userId: listUserId }))
        : dispatch(createCenterUser(values));
      // isEditingUser
      //   ? dispatch(updateUser({ values, userId: listUserId }))
      //   : dispatch(createUser(values));
    },
  });

  // this function also gets triggered (with onSubmit method of formik) when submitting the register / edit user from
  function formHandleSubmit(e) {
    e.preventDefault();

    validation.handleSubmit();

    setmodal_list(false);
    return false;
  }

  function handleRoleChange(e) {
    validation.setFieldValue("roleId", e.target.value);
  }

  // to update the values of register form when editing the user
  function handleEditUser(userData) {
    setIsEditingUser(true);
    setmodal_list(!modal_list);
    setListUserId(userData.id);

    // setting the value of role according to roleId because in select element roleId is used as value
    const roleName = roles.find((role) => role.id === userData.roleId);

    validation.setValues({
      name: userData.username,
      email: userData.email,
      password: userData.password,
      roleId: roleName.id,
    });
  }

  const tempCompanyData = [
    {
      id: 1,
      username: "demoavs_1",
      dateAndTime: "2024-02-12 06:23:39",
      companyInfo: "Company info",
      businessType: "Manufacturer",
      status: "Inactive",
      verified: "Yes",
    },
    {
      id: 2,
      username: "demoavs_2",
      dateAndTime: "2024-02-12 06:23:39",
      companyInfo: "Company info",
      businessType: "Trader",
      status: "Actove",
      verified: "No",
    },
  ];

  const tempUserData = [
    {
      id: 1,
      name: "User 1",
    },
    {
      id: 2,
      name: "User 2",
    },
    {
      id: 3,
      name: "User 3",
    },
  ];

  const tempBusinessTypeData = [
    { id: 1, businessType: "Agriculture" },
    { id: 2, businessType: "Apparel & Fashion" },
    { id: 3, businessType: "Automotive Auto Parts" },
    { id: 4, businessType: "Chemicals" },
    { id: 5, businessType: "Construction" },
    { id: 6, businessType: "Food Product" },
    { id: 7, businessType: "Furniture" },
    { id: 8, businessType: "Handcrafts & Gifts" },
    { id: 9, businessType: "Health & Beauty" },
    { id: 10, businessType: "Industrial Supplies" },
    { id: 11, businessType: "Jewellery" },
    { id: 12, businessType: "Machines & Equipment" },
    { id: 13, businessType: "Jute & Jute Products" },
    { id: 14, businessType: "Manufacturer" },
    { id: 15, businessType: "Industrial Services" },
    { id: 16, businessType: "Exporter" },
    { id: 17, businessType: "Importer" },
    { id: 18, businessType: "Trader" },
    { id: 19, businessType: "Distributer" },
    { id: 20, businessType: "Supplier" },
  ];

  const stateData = [
    { id: 1, state: "Andhra Pradesh" },
    { id: 2, state: "Arunachal Pradesh" },
    { id: 3, state: "Assam" },
    { id: 4, state: "Bihar" },
    { id: 5, state: "Chhattisgarh" },
    { id: 6, state: "Goa" },
    { id: 7, state: "Gujarat" },
    { id: 8, state: "Haryana" },
    { id: 9, state: "Himachal Pradesh" },
    { id: 10, state: "Jharkhand" },
    { id: 11, state: "Karnataka" },
    { id: 12, state: "Kerala" },
    { id: 13, state: "Madhya Pradesh" },
    { id: 14, state: "Maharashtra" },
    { id: 15, state: "Manipur" },
    { id: 16, state: "Meghalaya" },
    { id: 17, state: "Mizoram" },
    { id: 18, state: "Nagaland" },
    { id: 19, state: "Odisha" },
    { id: 20, state: "Punjab" },
    { id: 21, state: "Rajasthan" },
    { id: 22, state: "Sikkim" },
    { id: 23, state: "Tamil Nadu" },
    { id: 24, state: "Telangana" },
    { id: 25, state: "Tripura" },
    { id: 26, state: "Uttar Pradesh" },
    { id: 27, state: "Uttarakhand" },
    { id: 28, state: "West Bengal" },
    { id: 29, state: "Andaman and Nicobar Islands" },
    { id: 30, state: "Chandigarh" },
    { id: 31, state: "Dadra and Nagar Haveli and Daman and Diu" },
    { id: 32, state: "Lakshadweep" },
    { id: 33, state: "Delhi" },
    { id: 34, state: "Puducherry" },
    { id: 35, state: "Ladakh" },
    { id: 36, state: "Jammu and Kashmir" },
  ];

  function handleViewData() {
    navigate("/view-data");
  }

  document.title = "Add Client";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Add Client" pageTitle="Client" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Add Client</h4>
                </CardHeader>

                <CardBody>
                  <div className="listjs-table" id="userList">
                    <Row className="g-4 mb-3 d-flex justify-content-between">
                      <Col
                        className="col-sm-auto d-flex"
                        style={{ gap: "5px" }}
                      >
                        {/* <div className="search-box">
                          <input
                            type="text"
                            className="form-control bg-light border-light"
                            autoComplete="off"
                            id="searchList"
                            onChange={() => {}}
                            placeholder="Search User"
                          />
                          <i className="ri-search-line search-icon"></i>
                        </div> */}

                        <Form>
                          <div
                            className="d-flex"
                            style={{ gap: "5px", flexWrap: "wrap" }}
                          >
                            <div>
                              <Input
                                id="url"
                                name="url"
                                className="form-control"
                                type="text"
                                placeholder="Webiste URL"
                              />
                            </div>

                            <div>
                              <Input
                                id="web_status"
                                name="web_status"
                                className="form-control"
                                type="select"
                                placeholder="Select web status"

                                // onChange={validation.handleChange}
                                // onBlur={validation.handleBlur}
                                // value={validation.values.role || ""}
                                // invalid={
                                //   validation.touched.role &&
                                //   validation.errors.role
                                //     ? true
                                //     : false
                                // }
                              >
                                <option value="">Select Web Status</option>

                                <option value="Valid">Valid URL</option>
                                <option value="Invalid URL">Invalid URL</option>
                                <option value="Flash Website">
                                  Flash Website
                                </option>
                              </Input>
                            </div>
                            <div>
                              <Input
                                id="verified"
                                name="verified"
                                className="form-control"
                                type="select"
                                placeholder="Select Verified"

                                // onChange={validation.handleChange}
                                // onBlur={validation.handleBlur}
                                // value={validation.values.role || ""}
                                // invalid={
                                //   validation.touched.role &&
                                //   validation.errors.role
                                //     ? true
                                //     : false
                                // }
                              >
                                <option value="">Select Verified</option>

                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </Input>
                            </div>
                            <div>
                              <Input
                                id="verified"
                                name="verified"
                                className="form-control"
                                type="select"
                                placeholder="Select Verified"

                                // onChange={validation.handleChange}
                                // onBlur={validation.handleBlur}
                                // value={validation.values.role || ""}
                                // invalid={
                                //   validation.touched.role &&
                                //   validation.errors.role
                                //     ? true
                                //     : false
                                // }
                              >
                                <option value="">Select User</option>

                                {tempUserData?.map((user) => (
                                  <option value={user.name}>{user.name}</option>
                                ))}
                              </Input>
                            </div>
                            <div>
                              <Input
                                id="verified"
                                name="verified"
                                className="form-control"
                                type="select"
                                placeholder="Select Verified"

                                // onChange={validation.handleChange}
                                // onBlur={validation.handleBlur}
                                // value={validation.values.role || ""}
                                // invalid={
                                //   validation.touched.role &&
                                //   validation.errors.role
                                //     ? true
                                //     : false
                                // }
                              >
                                <option value="">Select Business Type</option>

                                {tempBusinessTypeData?.map((business) => (
                                  <option value={business.businessType}>
                                    {business.businessType}
                                  </option>
                                ))}
                              </Input>
                            </div>
                            <div>
                              <Input
                                id="state"
                                name="state"
                                className="form-control"
                                type="select"
                                placeholder="Select State"

                                // onChange={validation.handleChange}
                                // onBlur={validation.handleBlur}
                                // value={validation.values.role || ""}
                                // invalid={
                                //   validation.touched.role &&
                                //   validation.errors.role
                                //     ? true
                                //     : false
                                // }
                              >
                                <option value="">Select State</option>

                                {stateData?.map((state) => (
                                  <option value={state.state}>
                                    {state.state}
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
                                placeholder="Date range"
                              />
                            </div>

                            <div>
                              <Button
                                color="primary"
                                className="add-btn me-1"
                                id="filter-btn"
                              >
                                <i className="ri-equalizer-line"></i> Apply
                              </Button>
                            </div>
                          </div>
                        </Form>
                      </Col>

                      <Col className="col-sm-auto">
                        <div>
                          <Button
                            color="primary"
                            className="add-btn me-1"
                            // onClick={() => tog_list()}
                            id="create-btn"
                          >
                            <i class="ri-download-fill align-bottom me-1"></i>{" "}
                            Export Data
                          </Button>
                          <Button
                            color="primary"
                            className="delete-btn me-1"
                            // onClick={() => tog_list()}
                            id="create-btn"
                          >
                            <i className="ri-add-line align-bottom me-1"></i>{" "}
                            Delete Selected Id
                          </Button>
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
                                  value="option"
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

                            <th className="sort" data-sort="contact">
                              Verified
                            </th>

                            <th className="sort" data-sort="action">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {tempCompanyData?.map((user) => (
                            <tr key={user.id}>
                              <th scope="row">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="checkAll"
                                    value="option1"
                                  />
                                </div>
                              </th>

                              <td className="username">{user.username}</td>
                              <td className="dateAndTime">
                                <span class="badge border border-primary text-primary fs-12">
                                  {user.dateAndTime}
                                </span>
                              </td>
                              <td className="companyInfo">
                                {user.companyInfo}
                              </td>
                              <td className="businessType">
                                {user.businessType}
                              </td>
                              <td className="status">{user.status}</td>
                              <td className="verified">{user.verified} </td>

                              <td>
                                <div className="d-flex gap-2">
                                  <div className="edit">
                                    <button
                                      className="btn btn-sm btn-primary edit-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#showModal"
                                      onClick={() => {}}
                                    >
                                      Edit
                                    </button>
                                  </div>
                                  <div className="remove">
                                    <button
                                      className="btn btn-sm btn-danger remove-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#deleteRecordModal"
                                      onClick={() => {
                                        // setListUserId(user.id);
                                        // setmodal_delete(true);
                                      }}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                  <div className="remove">
                                    <button
                                      className="btn btn-sm btn-success remove-item-btn"
                                      data-bs-toggle="modal"
                                      onClick={handleViewData}
                                    >
                                      View
                                    </button>
                                  </div>
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

      {/* Add Modal */}
      <AddUserFormModal
        modal_list={modal_list}
        tog_list={tog_list}
        formHandleSubmit={formHandleSubmit}
        validation={validation}
        isEditingUser={isEditingUser}
        alreadyRegisteredError={alreadyRegisteredError}
        handleRoleChange={handleRoleChange}
        roles={roles}
        centers={centers}
      />

      {/* Remove Modal */}
      <AddUserRemoveModal
        modal_delete={modal_delete}
        tog_delete={tog_delete}
        setmodal_delete={setmodal_delete}
        handleDeleteUser={() => {
          dispatch(removeUser({ userId: listUserId }));
          setmodal_delete(false);
        }}
      />
    </React.Fragment>
  );
};

export default CompletedData;
