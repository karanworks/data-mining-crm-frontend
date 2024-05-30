import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  Label,
  Row,
} from "reactstrap";

import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
import Select from "react-select";

import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
const AddWorkData = () => {
  const [selectedSingleWebsiteStatus, setSelectedSingleWebsiteStatus] =
    useState(null);

  const [selectedSingleBusinessType, setSelectedSingleBusinessType] =
    useState(null);

  const [files, setFiles] = useState([]);

  function handleSelectSingleWebsiteStatus(status) {
    setSelectedSingleWebsiteStatus(status);
  }
  function handleSelectSingleBusinessType(businessType) {
    setSelectedSingleBusinessType(businessType);
  }

  const statusOptions = [
    {
      value: "Valid URL",
      label: "Valid URL",
    },
    {
      value: "Invalid URL",
      label: "Invalid URL",
    },
  ];
  const businessTypeOptions = [
    {
      value: "Agriculture",
      label: "Agriculture",
    },
    {
      value: "Apparel & Fashion",
      label: "Apparel & Fashion",
    },
    {
      value: "Automotive Auto Parts",
      label: "Automotive Auto Parts",
    },
    {
      value: "Chemicals",
      label: "Chemicals",
    },
    {
      value: "Construction",
      label: "Construction",
    },
    {
      value: "Food Product",
      label: "Food Product",
    },
    {
      value: "Furniture",
      label: "Furniture",
    },
    {
      value: "Handcrafts & Gifts",
      label: "Handcrafts & Gifts",
    },
    {
      value: "Health & Beauty",
      label: "Health & Beauty",
    },
    {
      value: "Industrial Supplies",
      label: "Industrial Supplies",
    },
    {
      value: "Jewellery",
      label: "Jewellery",
    },

    {
      value: "Machines & Equipment",
      label: "Machines & Equipment",
    },
    {
      value: "Jute & Jute Products",
      label: "Jute & Jute Products",
    },
    {
      value: "Manufacturer",
      label: "Manufacturer",
    },

    {
      value: "Industrial Services",
      label: "Industrial Services",
    },
    {
      value: "Exporter",
      label: "Exporter",
    },
    {
      value: "Importer",
      label: "Importer",
    },

    {
      value: "Trader",
      label: "Trader",
    },

    {
      value: "Distributer",
      label: "Distributer",
    },
    {
      value: "Supplier",
      label: "Supplier",
    },
  ];

  document.title = "Add Work Data";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Add Work Data" pageTitle="Work" />
          <Row>
            <Col xs={12}>
              <Card>
                <CardHeader className="align-items-center d-flex">
                  <h4 className="card-title mb-0 flex-grow-1">
                    Add Webisite's Data
                  </h4>
                </CardHeader>
                <div className="card-body">
                  <div className="live-preview">
                    <form action="#" className="row g-3">
                      <Col md={6} className="d-flex" style={{ gap: "10px" }}>
                        <Label htmlFor="websiteURL" className="form-label">
                          Webiste URL
                        </Label>
                        {/* <Input
                          type="text"
                          className="form-control"
                          id="fullnameInput"
                          placeholder="Enter your name"
                        /> */}

                        <a href="#">ascenthaat.com</a>
                      </Col>

                      <Col md={6}>
                        <Label htmlFor="companyLogo" className="form-label">
                          Company Logo
                        </Label>
                        <FilePond
                          files={files}
                          onupdatefiles={setFiles}
                          allowMultiple={false}
                          maxFiles={1}
                          name="files"
                          className="filepond"
                        />
                      </Col>

                      <Col md={6}>
                        <Label htmlFor="websiteStatus" className="form-label">
                          Website Status
                        </Label>
                        <Select
                          id="websiteStatus"
                          name="wesisteStatus"
                          value={selectedSingleWebsiteStatus}
                          onChange={(status) => {
                            handleSelectSingleWebsiteStatus(status);
                            // validation.setFieldValue(
                            //   "centerName",
                            //   centerName.value
                            // );
                          }}
                          options={statusOptions}
                          placeholder="Select Website Statuss"
                        />
                      </Col>

                      <Col md={6}>
                        <Label htmlFor="companyName" className="form-label">
                          Company Name
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="companyName"
                          placeholder="Enter company's name"
                        />
                      </Col>
                      <Col md={6}>
                        <Label htmlFor="contantNo1" className="form-label">
                          Contact No 1
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="contantNo1"
                          placeholder="Enter contact no"
                        />
                      </Col>
                      <Col md={6}>
                        <Label htmlFor="contactNo2" className="form-label">
                          Contact No 2
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="contactNo2"
                          placeholder="Enter contact no"
                        />
                      </Col>

                      <Col xs={6}>
                        <Label htmlFor="emailId1" className="form-label">
                          Email Id 1
                        </Label>
                        <Input
                          type="email"
                          className="form-control"
                          id="emailId1"
                          placeholder="example@gmail.com"
                        />
                      </Col>
                      <Col xs={6}>
                        <Label htmlFor="emailId2" className="form-label">
                          Email Id 2
                        </Label>
                        <Input
                          type="email"
                          className="form-control"
                          id="emailId2"
                          placeholder="example@gmail.com"
                        />
                      </Col>
                      <Col xs={6}>
                        <Label htmlFor="faxNo" className="form-label">
                          Fax No
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="inputAddress"
                          placeholder="(123) 456-7890"
                        />
                      </Col>
                      <Col md={6}>
                        <Label htmlFor="businessType" className="form-label">
                          Business Type
                        </Label>
                        <Select
                          id="businessType"
                          name="businessType"
                          value={selectedSingleBusinessType}
                          onChange={(businessType) => {
                            handleSelectSingleBusinessType(businessType);
                            // validation.setFieldValue(
                            //   "centerName",
                            //   centerName.value
                            // );
                          }}
                          options={businessTypeOptions}
                          placeholder="Select Business Types"
                        />
                      </Col>

                      <Col md={6}>
                        <Label for="companyAddress">Address</Label>
                        <Input
                          type="textarea"
                          className="form-control"
                          id="companyAddress"
                          rows="3"
                          placeholder="Company address"
                        />
                      </Col>
                      <Col md={6}>
                        <Label for="companyProfile">Company Profile</Label>
                        <Input
                          type="textarea"
                          className="form-control"
                          id="companyProfile"
                          rows="3"
                          placeholder="Company profile"
                        />
                      </Col>

                      <Col md={3}>
                        <Label htmlFor="inputCity" className="form-label">
                          City
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="inputCity"
                          placeholder="Enter city"
                        />
                      </Col>

                      <Col md={3}>
                        <Label htmlFor="state" className="form-label">
                          State
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="state"
                          placeholder="Enter state"
                        />
                      </Col>
                      <Col md={3}>
                        <Label htmlFor="pinCode" className="form-label">
                          Pin Code
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="pinCode"
                          placeholder="Enter Pin code"
                        />
                      </Col>
                      <Col md={3}>
                        <Label htmlFor="inputCountry" className="form-label">
                          Country
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="inputCountry"
                          placeholder="Enter country"
                        />
                      </Col>

                      <Col xs={6}>
                        <div className="text-end">
                          <button type="submit" className="btn btn-primary">
                            Submit Data
                          </button>
                        </div>
                      </Col>
                    </form>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AddWorkData;
