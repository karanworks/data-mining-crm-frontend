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
import AddClientFormModal from "./AddClientFormModal";
import AddClientRemoveModal from "./AddClientRemoveModal";

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

import {
  getClients,
  createClient,
  updateClient,
  removeClient,
} from "../../slices/AddClient/thunk";

import { useNavigate } from "react-router-dom";
// import { getCenters } from "../../slices/Centers/thunk";

const AddClient = () => {
  // register / edit user modal state whether modal is open or not
  const [modal_list, setmodal_list] = useState(false);
  // this state triggers when editing the user
  const [isEditingClient, setIsEditingClient] = useState(false);
  // delete user confirmation modal state
  const [modal_delete, setmodal_delete] = useState(false);
  // when we click on edit / delete user button this state stores that user's id, had to make this state because I needed to have that user's id to make changes to it
  const [listClientId, setListClientId] = useState(null);
  // fetching all the roles
  const [roles, setRoles] = useState([]);

  const [selectedSingleUserStatus, setSelectedSingleUserStatus] =
    useState(null);

  const { users, alreadyRegisteredError } = useSelector((state) => state.Users);
  const { clients } = useSelector((state) => state.Client);

  const dispatch = useDispatch();

  // toggles register / edit user modal
  function tog_list() {
    setmodal_list(!modal_list);
    setIsEditingClient(false);
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
    dispatch(getClients());
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
      roleId: "",
      companyName: "",
      address: "",
      agreementDate: "",
      email: "",
      contactNo: "",
      noOfUsers: "",
      userIdDemo: "",
      userIdLive: "",
      startTime: "",
      endTime: "",
      password: "",
      image: "",
      agreementTalk: "",
    },
    validationSchema: Yup.object({
      roleId: Yup.string().required("Please Select Role"),
      companyName: Yup.string().required("Enter company name"),
      address: Yup.string().required("Enter Address"),
      agreementDate: Yup.string().required("Enter agreement date"),
      email: Yup.string().required("Enter email"),
      contactNo: Yup.string().required("Enter contact no"),
      noOfUsers: Yup.string().required("Enter no of user"),
      startTime: Yup.string().required("Enter start timining"),
      endTime: Yup.string().required("Enter end timining"),
      userIdDemo: Yup.string().required("Enter user id demo"),
      userIdLive: Yup.string().required("Enter user id live"),
      password: Yup.string().required("Enter password"),
      image: Yup.string(),
      agreementTalk: Yup.string(),
    }),
    onSubmit: (values) => {
      console.log("CLIENT ADD FORM CALLED ->", values);
      isEditingClient
        ? dispatch(updateClient({ values, clientId: listClientId }))
        : dispatch(createClient(values));
      // isEditingUser
      //   ? dispatch(updateUser({ values, userId: listUserId }))
      //   : dispatch(createUser(values));
    },
  });

  console.log("CLIENT ADD FORM VALUES ->", validation.values);

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
  function handleEditClient(clientData) {
    setIsEditingClient(true);
    setmodal_list(!modal_list);
    setListClientId(clientData.id);

    // setting the value of role according to roleId because in select element roleId is used as value
    const roleName = roles.find((role) => role.id === clientData.roleId);

    validation.setValues({
      companyName: clientData.companyName,
      address: clientData.address,
      agreementDate: clientData.agreementDate,
      email: clientData.email,
      contactNo: clientData.contactNo,
      noOfUsers: clientData.noOfUsers,
      userIdDemo: clientData.userIdDemo,
      userIdLive: clientData.userIdLive,
      startTime: clientData.startTime,
      endTime: clientData.endTime,
      password: clientData.password,
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
                          <div
                            className="d-flex"
                            style={{ gap: "5px", flexWrap: "wrap" }}
                          >
                            <div>
                              <Input
                                id="userIdFilter"
                                name="userIdFilter"
                                className="form-control"
                                type="text"
                                placeholder="User Id"
                              />
                            </div>

                            <div>
                              <Input
                                id="contactNoFilter"
                                name="contactNoFilter"
                                className="form-control"
                                type="text"
                                placeholder="Contact No"
                              />
                            </div>
                            <div>
                              <Input
                                id="emailIdFilter"
                                name="emailIdFilter"
                                className="form-control"
                                type="text"
                                placeholder="Email Id"
                              />
                            </div>
                            <div>
                              <select className="form-select mb-3">
                                <option>User Status </option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                              </select>
                            </div>
                            <div>
                              <select className="form-select mb-3">
                                <option>Data Type </option>
                                <option value="L1 User">L1 User</option>
                                <option value="L2 User">L2 User</option>
                              </select>
                            </div>

                            <div>
                              <Button
                                color="primary"
                                className="add-btn me-1"
                                id="filter-btn"
                              >
                                <i className="ri-equalizer-line"></i> Apply
                                filters
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
                            Add New Client
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
                              Company Name
                            </th>
                            <th className="sort" data-sort="password">
                              Password
                            </th>
                            <th className="sort" data-sort="type">
                              Type
                            </th>

                            <th className="sort" data-sort="contact">
                              Contact No
                            </th>

                            <th className="sort" data-sort="email">
                              Email
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
                          {clients?.map((client) => (
                            <tr key={client.id}>
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

                              <td className="companyName">
                                {client.companyName}
                              </td>
                              <td className="password">{client.password}</td>
                              <td className="type">{client.type}</td>
                              <td className="contact">{client.contactNo}</td>
                              <td className="email">{client.email} </td>
                              <td className="status">
                                {client.status === 1 ? "Active" : "Inactive"}
                              </td>

                              <td>
                                <div className="d-flex gap-2">
                                  <div className="viewUsers">
                                    <button
                                      className="btn btn-sm btn-success edit-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#showModal"
                                      onClick={() => {
                                        // handleEditUser(user);
                                      }}
                                    >
                                      View Users
                                    </button>
                                  </div>
                                  <div className="edit">
                                    <button
                                      className="btn btn-sm btn-primary edit-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#showModal"
                                      onClick={() => {
                                        handleEditClient(client);
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
                                        setListClientId(client.id);
                                        setmodal_delete(true);
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
      <AddClientFormModal
        modal_list={modal_list}
        tog_list={tog_list}
        formHandleSubmit={formHandleSubmit}
        validation={validation}
        isEditingClient={isEditingClient}
        alreadyRegisteredError={alreadyRegisteredError}
        handleRoleChange={handleRoleChange}
        roles={roles}
        clients={clients}
      />

      {/* Remove Modal */}
      <AddClientRemoveModal
        modal_delete={modal_delete}
        tog_delete={tog_delete}
        setmodal_delete={setmodal_delete}
        handleDeleteUser={() => {
          dispatch(removeClient({ clientId: listClientId }));
          setmodal_delete(false);
        }}
      />
    </React.Fragment>
  );
};

export default AddClient;
