import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Label,
  Row,
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

const AddData = () => {
  const [selectedSingleCenter, setSelectedSingleCenter] = useState(null);
  const [selectedSingleUser, setSelectedSingleUser] = useState(null);
  const [files, setFiles] = useState([]);

  function handleSelectSingleCenter(center) {
    setSelectedSingleCenter(center);
  }
  function handleSelectSingleUser(user) {
    setSelectedSingleUser(user);
  }
  const centerOptions = [
    {
      value: "First Center",
      label: "First Center",
    },
    {
      value: "Second Center",
      label: "Second Center",
    },
    {
      value: "Third Center",
      label: "Third Center",
    },
  ];
  const userOptions = [
    {
      value: "First User",
      label: "First User",
    },
    {
      value: "Second User",
      label: "Second User",
    },
    {
      value: "Third User",
      label: "Third User",
    },
  ];
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

                <CardBody>
                  <div className="listjs-table" id="userList">
                    <div className="mb-2">
                      <Label className="form-label">Select Center</Label>
                      <Select
                        id="center"
                        name="center"
                        value={selectedSingleCenter}
                        onChange={(center) => {
                          handleSelectSingleCenter(center);
                          // validation.setFieldValue(
                          //   "centerName",
                          //   centerName.value
                          // );
                        }}
                        options={centerOptions}
                        placeholder="Choose Center"
                      />
                    </div>
                    <div className="mb-2">
                      <Label className="form-label">Select User</Label>
                      <Select
                        id="user"
                        name="user"
                        value={selectedSingleUser}
                        onChange={(user) => {
                          handleSelectSingleUser(user);
                          // validation.setFieldValue(
                          //   "centerName",
                          //   centerName.value
                          // );
                        }}
                        options={userOptions}
                        placeholder="Choose User"
                      />
                    </div>
                    <div className="mb-2">
                      <Label className="form-label">Choose File</Label>
                      <FilePond
                        files={files}
                        onupdatefiles={setFiles}
                        maxFiles={1}
                        name="files"
                        className="filepond"
                      />
                    </div>
                  </div>
                  <div
                    className="d-flex justify-content-end"
                    style={{ gap: "5px" }}
                  >
                    <button className="btn btn-primary ">
                      {" "}
                      <i
                        className="ri-file-upload-line"
                        style={{ marginRight: "5px" }}
                      ></i>
                      Upload Data
                    </button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AddData;
