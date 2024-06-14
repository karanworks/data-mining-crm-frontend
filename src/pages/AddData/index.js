import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Label,
  Row,
  Form,
  FormFeedback,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import Flatpickr from "react-flatpickr";
import Select from "react-select";
import { Link } from "react-router-dom";
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useSelector, useDispatch } from "react-redux";
import { getClients, getClientUsers } from "../../slices/AddClient/thunk";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addDataUpload } from "../../slices/AddData/thunk";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const AddData = () => {
  const [selectedSingleCenter, setSelectedSingleCenter] = useState(null);
  const [selectedSingleUser, setSelectedSingleUser] = useState(null);
  const [file, setFile] = useState([]);

  const { clients, clientUsers } = useSelector((state) => state.Client);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  function handleSelectSingleCenter(center) {
    setSelectedSingleCenter(center);
    dispatch(getClientUsers(center.email));
  }
  function handleSelectSingleUser(user) {
    setSelectedSingleUser(user);
  }
  const centerOptions = clients?.map((client) => {
    return {
      value: client.id,
      label: client.companyName,
      email: client.email,
    };
  });
  const userOptions = clientUsers?.map((user) => {
    return {
      value: user.id,
      label: user.username,
    };
  });

  const addDataValidation = useFormik({
    initialValues: {
      clientId: "",
      clientUserId: "",
      // data: "",
    },
    validationSchema: Yup.object({
      clientId: Yup.string().required("Select a center"),
      clientUserId: Yup.string().required("Select a user"),
    }),
    onSubmit: (values) => {
      dispatch(addDataUpload({ ...values, data: file.file }));
    },
  });

  function addDataFormHandleSubmit(e) {
    e.preventDefault();

    addDataValidation.handleSubmit();

    return false;
  }

  document.title = "Add Data";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Add Data" pageTitle="Client" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Add Data</h4>
                </CardHeader>

                <Form onSubmit={(e) => addDataFormHandleSubmit(e)}>
                  <CardBody>
                    <div className="listjs-table" id="userList">
                      <div className="mb-2">
                        <Label className="form-label">Select Client</Label>
                        <Select
                          id="clientId"
                          name="clientId"
                          value={selectedSingleCenter}
                          onChange={(client) => {
                            handleSelectSingleCenter(client);
                            addDataValidation.setFieldValue(
                              "clientId",
                              client.value
                            );
                          }}
                          options={centerOptions}
                          placeholder="Choose Center"
                        />

                        {addDataValidation.touched.clientId &&
                        addDataValidation.errors.clientId ? (
                          <FormFeedback type="invalid">
                            {addDataValidation.errors.clientId}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-2">
                        <Label className="form-label">Select User</Label>
                        <Select
                          id="clientUserId"
                          name="clientUserId"
                          value={selectedSingleUser}
                          onChange={(clientUser) => {
                            handleSelectSingleUser(clientUser);
                            addDataValidation.setFieldValue(
                              "clientUserId",
                              clientUser.value
                            );
                          }}
                          options={userOptions}
                          placeholder="Choose User"
                        />

                        {addDataValidation.touched.clientUserId &&
                        addDataValidation.errors.clientUserId ? (
                          <FormFeedback type="invalid">
                            {addDataValidation.errors.clientUserId}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-2">
                        <Label className="form-label">Choose File</Label>
                        <FilePond
                          files={file}
                          onupdatefiles={(file) => {
                            setFile(file[0]);
                          }}
                          maxFiles={1}
                          name="data"
                          className="filepond"
                          required={true}
                        />
                      </div>
                    </div>
                    <div
                      className="d-flex justify-content-end"
                      style={{ gap: "5px" }}
                    >
                      <button type="submit" className="btn btn-primary">
                        {" "}
                        <i
                          className="ri-file-upload-line"
                          style={{ marginRight: "5px" }}
                        ></i>
                        Upload Data
                      </button>
                    </div>
                  </CardBody>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AddData;
