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
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import AddClientFormModal from "./AddClientFormModal";
import AddClientRemoveModal from "./AddClientRemoveModal";

import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../slices/Users/thunk";

import {
  getClients,
  createClient,
  updateClient,
  removeClient,
  getClientUsers,
} from "../../slices/AddClient/thunk";

import { searchClients } from "../../slices/AddClient/reducer";

import ViewUsersModal from "./ViewUsersModal";
import AddUsersFormModal from "./AddUsersFormModal";
import Loader from "../../Components/Common/Loader";

const AddClient = () => {
  const [modal_list, setmodal_list] = useState(false);

  const [isEditingClient, setIsEditingClient] = useState(false);

  const [modal_delete, setmodal_delete] = useState(false);

  const [listClient, setListClient] = useState(null);

  const [users_view_modal_list, setUsers_view_modal_list] = useState(false);

  const [add_users_modal_list, setAdd_users_modal_list] = useState(false);

  const [selectedClients, setSelectedClients] = useState([]);

  const [isDeletingMultipleUsers, setIsDeletingMultipleUsers] = useState(false);

  const [roles, setRoles] = useState([]);

  const [loading, setLoading] = useState(false);

  const { alreadyRegisteredError } = useSelector((state) => state.Users);
  const { clients, filteredClients, clientUsers } = useSelector(
    (state) => state.Client
  );

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

  function users_view_tog_list(clientEmail) {
    setUsers_view_modal_list(!users_view_modal_list);
    dispatch(getClientUsers(clientEmail));
  }

  function add_users_tog_list() {
    setAdd_users_modal_list(!add_users_modal_list);
  }

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

  function handleSelectedClients(clientId) {
    const alreadySelected = selectedClients.includes(clientId);

    if (alreadySelected) {
      const filteredClients = selectedClients?.filter((id) => {
        return id !== clientId;
      });

      setSelectedClients([...filteredClients]);
    } else {
      setSelectedClients([...selectedClients, clientId]);
    }
  }

  function handleSelectedDelete() {
    tog_delete();
    setIsDeletingMultipleUsers(true);
  }

  function handleDelete() {
    if (isDeletingMultipleUsers) {
      dispatch(removeClient({ clientId: selectedClients }));
    } else {
      dispatch(removeClient({ clientId: listClient.id }));
    }

    setmodal_delete(false);
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
    setLoading(true);
    dispatch(getClients()).finally(() => setLoading(false));
  }, [dispatch]);

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
      userIdDemo: Yup.string(),
      userIdLive: Yup.string(),
      password: Yup.string().required("Enter password"),
      image: Yup.string(),
      agreementTalk: Yup.string(),
    }),
    onSubmit: (values) => {
      if (isEditingClient) {
        dispatch(updateClient({ values, clientId: listClient.id }));
      } else {
        dispatch(createClient(values));
        dispatch(
          createUser({
            email: values.email,
            noOfUsers: values.noOfUsers,
            userIdDemo: values.userIdDemo,
            userIdLive: values.userIdLive,
            password: values.password,
          })
        );
      }
    },
  });
  const addUserValidation = useFormik({
    initialValues: {
      noOfUsers: "",
    },
    validationSchema: Yup.object({
      noOfUsers: Yup.number().required("Enter no of users"),
    }),
    onSubmit: (values) => {
      const { noOfUsers } = values;

      dispatch(
        createUser({
          email: listClient.email,
          noOfUsers,
          userIdDemo: listClient.userIdDemo,
          userIdLive: listClient.userIdLive,
          password: listClient.password,
        })
      );
    },
  });

  function addUserFormHandleSubmit(e) {
    e.preventDefault();

    addUserValidation.handleSubmit();

    setAdd_users_modal_list(false);
    return false;
  }

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
    setListClient(clientData);

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

  function handleFilterData(e) {
    dispatch(searchClients(e.target.value));
  }

  function handleClientStatusUpdate(client) {
    const status = client.status === 1 ? 0 : 1;

    dispatch(updateClient({ status, clientId: client.id }));
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
                      <Col className="col-sm-auto ">
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
                            <th className="sort" data-sort="username">
                              Company Name
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
                            <th className="sort" data-sort="password">
                              Password
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
                                colSpan={7}
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
                            (filteredClients?.length > 0
                              ? filteredClients
                              : clients
                            )?.map((client) => (
                              <tr key={client.id}>
                                <th scope="row">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      checked={selectedClients.includes(
                                        client.id
                                      )}
                                      type="checkbox"
                                      name="checkbox"
                                      onChange={() => {
                                        handleSelectedClients(client.id);
                                      }}
                                    />
                                  </div>
                                </th>

                                <td className="companyName">
                                  {client.companyName}
                                </td>
                                <td className="type">{client.type}</td>
                                <td className="contact">{client.contactNo}</td>
                                <td className="email">{client.email} </td>
                                <td className="password">{client.password}</td>

                                <td className="status">
                                  {client.status === 1 ? (
                                    <button
                                      className="btn btn-sm btn-soft-success"
                                      onClick={() =>
                                        handleClientStatusUpdate(client)
                                      }
                                    >
                                      Active
                                    </button>
                                  ) : (
                                    <button
                                      className="btn btn-sm btn-soft-danger"
                                      onClick={() =>
                                        handleClientStatusUpdate(client)
                                      }
                                    >
                                      Not Active
                                    </button>
                                  )}
                                </td>

                                <td>
                                  <div className="d-flex gap-2">
                                    <div className="viewUsers">
                                      <button
                                        className="btn btn-sm btn-success edit-item-btn"
                                        data-bs-toggle="modal"
                                        data-bs-target="#showModal"
                                        onClick={() => {
                                          users_view_tog_list(client.email);
                                          setListClient(client);
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
                                          setListClient(client);
                                          setmodal_delete(true);
                                          setIsDeletingMultipleUsers(false);
                                        }}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
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
        handleDeleteUser={handleDelete}
      />

      <AddUsersFormModal
        add_users_modal_list={add_users_modal_list}
        add_users_tog_list={add_users_tog_list}
        addUserValidation={addUserValidation}
        addUserFormHandleSubmit={addUserFormHandleSubmit}
      />

      <ViewUsersModal
        users_view_modal_list={users_view_modal_list}
        users_view_tog_list={users_view_tog_list}
        clientUsers={clientUsers}
        add_users_tog_list={add_users_tog_list}
        listClient={listClient}
      />
    </React.Fragment>
  );
};

export default AddClient;
