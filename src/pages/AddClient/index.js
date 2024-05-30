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
import { getCenters } from "../../slices/Centers/thunk";

const AddClient = () => {
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

  const [selectedSingleUserStatus, setSelectedSingleUserStatus] =
    useState(null);

  const { users, alreadyRegisteredError } = useSelector((state) => state.Users);
  const { centers } = useSelector((state) => state.Centers);

  const dispatch = useDispatch();

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
    dispatch(getCenters());
  }, [dispatch]);

  function handleSelectSingleUserStatus(status) {
    setSelectedSingleUserStatus(status);
  }

  const userStatusOptions = [
    {
      value: "Active",
      label: "Active",
    },
    {
      value: "Inactive",
      label: "Inactive",
    },
  ];

  // formik setup
  const validation = useFormik({
    initialValues: {
      centerName: "",
      userType: "",
      name: "",
      mobileNumber: "",
      email: "",
      location: "",
      age: "",
      aadharNumber: "",
      panNo: "",
      password: "",
    },
    validationSchema: Yup.object({
      centerName: Yup.string().required("Please center name"),
      userType: Yup.string().required("Please select user role"),
      name: Yup.string().required("Please enter Name"),
      mobileNumber: Yup.string().required("Please enter mobile number"),
      email: Yup.string().required("Please enter email"),
      location: Yup.string().required("Please enter select location"),
      age: Yup.string().required("Please enter age"),
      aadharNumber: Yup.string().required("Please enter aadhar card"),
      panNo: Yup.string().required("Please enter pan card"),
      password: Yup.string().required("Please enter Password"),
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

  const tempUserData = [
    {
      id: 1,
      username: "demoavs_1",
      password: "12345",
      type: "User",
      email: "arvindsarawa@gmail.com",
      contact: "9999999999",
      dataType: "L2 User",
      status: "Inactive",
    },
    {
      id: 2,
      username: "demoavs_2",
      password: "12345",
      type: "User",
      email: "arvindsarawa@gmail.com",
      contact: "9999999999",
      dataType: "L1 User",
      status: "Active",
    },
  ];

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
                          <div className="d-flex" style={{ gap: "5px" }}>
                            <div>
                              <Input
                                id="userId"
                                name="userId"
                                className="form-control"
                                type="text"
                                placeholder="User Id"
                                size="sm"
                              />
                            </div>

                            <div>
                              <Input
                                id="contactNo"
                                name="contactNo"
                                className="form-control"
                                type="text"
                                placeholder="Contact No"
                                size="sm"
                              />
                            </div>
                            <div>
                              <Input
                                id="emailId"
                                name="emailId"
                                className="form-control"
                                type="text"
                                placeholder="Email Id"
                                size="sm"
                              />
                            </div>
                            <div>
                              <select className="form-select form-select-sm mb-3">
                                <option>User Status </option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                              </select>
                            </div>
                            <div>
                              <select className="form-select form-select-sm mb-3">
                                <option>Data Type </option>
                                <option value="L1 User">L1 User</option>
                                <option value="L2 User">L2 User</option>
                              </select>
                            </div>

                            <div>
                              <Button
                                color="primary"
                                className="add-btn btn-sm me-1"
                                onClick={() => tog_list()}
                                id="create-btn"
                              >
                                <i class="ri-equalizer-line"></i> Apply filters
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
                            onClick={() => tog_list()}
                            id="create-btn"
                          >
                            <i className="ri-add-line align-bottom me-1"></i>{" "}
                            Add New User
                          </Button>
                          <Button
                            color="primary"
                            className="delete-btn me-1"
                            onClick={() => tog_list()}
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
                            <th className="sort" data-sort="password">
                              Password
                            </th>
                            <th className="sort" data-sort="type">
                              Type
                            </th>

                            <th className="sort" data-sort="contact">
                              Contact
                            </th>

                            <th className="sort" data-sort="email">
                              Email
                            </th>

                            <th className="sort" data-sort="data_type">
                              Data Type
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
                          {tempUserData?.map((user) => (
                            <tr>
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
                              <td className="password">{user.password}</td>
                              <td className="type">{user.type}</td>
                              <td className="contact">{user.contact}</td>
                              <td className="email">{user.email} </td>
                              <td className="data_type">{user.dataType}</td>
                              <td className="status">{user.status}</td>

                              <td>
                                <div className="d-flex gap-2">
                                  <div className="edit">
                                    <button
                                      className="btn btn-sm btn-primary edit-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#showModal"
                                      onClick={() => {
                                        // handleEditUser(user);
                                      }}
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

export default AddClient;
