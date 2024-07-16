import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Col,
  Container,
  FormFeedback,
  Input,
  Label,
  Row,
} from "reactstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import Select from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getAssignedWorkData,
  createAssignedWorkData,
} from "../../slices/AddWorkData/thunk";
import {
  statusOptions,
  businessTypeOptions,
} from "../../common/data/addWorkData";
import TermsAndConditions from "./TermsAndCondition";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
const AddWorkData = () => {
  const [selectedSingleWebsiteStatus, setSelectedSingleWebsiteStatus] =
    useState(null);

  const [selectedSingleBusinessType, setSelectedSingleBusinessType] =
    useState(null);

  const [showTermsAndConditions, setShowTermsAndConditions] = useState(true);

  const { assignedWorkData } = useSelector((state) => state.AddWorkData);

  const dispatch = useDispatch();

  function handleSelectSingleWebsiteStatus(status) {
    setSelectedSingleWebsiteStatus(status);
  }
  function handleSelectSingleBusinessType(businessType) {
    setSelectedSingleBusinessType(businessType);
  }

  useEffect(() => {
    dispatch(getAssignedWorkData());
  }, [dispatch]);

  const addWorkDataValidation = useFormik({
    initialValues: {
      websiteStatus: "",
      companyName: "",
      contactNo1: "",
      contactNo2: "",
      emailId1: "",
      emailId2: "",
      faxNo: "",
      businessType: "",
      address: "",
      companyProfile: "",
      city: "",
      state: "",
      pinCode: "",
      country: "",
    },
    validationSchema: Yup.object({
      websiteStatus: Yup.string().required("Select website status"),
      companyName: Yup.string().required("Enter company name"),
      contactNo1: Yup.string(),
      contactNo2: Yup.string(),
      emailId1: Yup.string(),
      emailId2: Yup.string(),
      faxNo: Yup.string(),
      businessType: Yup.string().required("Select business type"),
      address: Yup.string(),
      companyProfile: Yup.string(),
      city: Yup.string(),
      state: Yup.string(),
      pinCode: Yup.string(),
      country: Yup.string(),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(
        createAssignedWorkData({
          ...values,
          urlId: assignedWorkData.id,
          url: assignedWorkData.url,
        })
      );
      dispatch(getAssignedWorkData());
      resetForm();
      setSelectedSingleWebsiteStatus(null);
      setSelectedSingleBusinessType(null);
    },
  });

  function addWorkDataFormHandleSubmit(e) {
    e.preventDefault();

    addWorkDataValidation.handleSubmit();

    return false;
  }

  document.title = "Add Work Data";
  return showTermsAndConditions ? (
    <TermsAndConditions setShowTermsAndConditions={setShowTermsAndConditions} />
  ) : (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Add Work Data" pageTitle="Work" />
          <Row>
            <Col xs={12}>
              <Card>
                <CardHeader className="align-items-center d-flex">
                  <h4 className="card-title mb-0 flex-grow-1">
                    Add Website's Data
                  </h4>
                </CardHeader>
                <div className="card-body">
                  <div className="live-preview">
                    {assignedWorkData ? (
                      <form
                        action="#"
                        className="row g-3"
                        onSubmit={(e) => addWorkDataFormHandleSubmit(e)}
                      >
                        <Col md={6} className="d-flex" style={{ gap: "10px" }}>
                          <Label htmlFor="websiteURL" className="form-label">
                            Webiste URL
                          </Label>

                          {/* Issue is how would we know that if the website is on http or https or do we need to add it while adding the data for the user */}

                          <a href={assignedWorkData?.url} target="_blank">
                            {assignedWorkData?.url}
                          </a>
                        </Col>

                        <Col md={6}>
                          <Label htmlFor="companyLogo" className="form-label">
                            Company Logo
                          </Label>

                          <div>
                            <input
                              type="file"
                              id="companyLogo"
                              name="companyLogo"
                            />
                          </div>
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
                              addWorkDataValidation.setFieldValue(
                                "websiteStatus",
                                status.value
                              );
                            }}
                            options={statusOptions}
                            placeholder="Select Website Status"
                          />
                          {addWorkDataValidation.errors.websiteStatus ? (
                            <span
                              style={{ fontSize: "12.25px", color: "#f06548" }}
                            >
                              {addWorkDataValidation.errors.websiteStatus}
                            </span>
                          ) : null}
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
                              addWorkDataValidation.setFieldValue(
                                "businessType",
                                businessType.value
                              );
                            }}
                            options={businessTypeOptions}
                            placeholder="Select Business Type"
                          />

                          {addWorkDataValidation.errors.businessType ? (
                            <span
                              style={{ fontSize: "12.25px", color: "#f06548" }}
                            >
                              {addWorkDataValidation.errors.businessType}
                            </span>
                          ) : null}
                        </Col>

                        <Col md={6}>
                          <Label htmlFor="companyName" className="form-label">
                            Company Name
                          </Label>
                          <Input
                            id="companyName"
                            name="companyName"
                            className="form-control"
                            placeholder="Enter Company Name"
                            type="text"
                            onChange={addWorkDataValidation.handleChange}
                            onBlur={addWorkDataValidation.handleBlur}
                            value={
                              addWorkDataValidation.values.companyName || ""
                            }
                            invalid={
                              addWorkDataValidation.touched.companyName &&
                              addWorkDataValidation.errors.companyName
                                ? true
                                : false
                            }
                          />
                          {addWorkDataValidation.touched.companyName &&
                          addWorkDataValidation.errors.companyName ? (
                            <FormFeedback type="invalid">
                              {addWorkDataValidation.errors.companyName}
                            </FormFeedback>
                          ) : null}
                        </Col>
                        <Col md={6}>
                          <Label htmlFor="contactNo1" className="form-label">
                            Contact No 1
                          </Label>
                          <Input
                            id="contactNo1"
                            name="contactNo1"
                            className="form-control"
                            placeholder="Enter contact no 1"
                            type="text"
                            onChange={addWorkDataValidation.handleChange}
                            onBlur={addWorkDataValidation.handleBlur}
                            value={
                              addWorkDataValidation.values.contactNo1 || ""
                            }
                            invalid={
                              addWorkDataValidation.touched.contactNo1 &&
                              addWorkDataValidation.errors.contactNo1
                                ? true
                                : false
                            }
                          />
                          {addWorkDataValidation.touched.contactNo1 &&
                          addWorkDataValidation.errors.contactNo1 ? (
                            <FormFeedback type="invalid">
                              {addWorkDataValidation.errors.contactNo1}
                            </FormFeedback>
                          ) : null}
                        </Col>
                        <Col md={6}>
                          <Label htmlFor="contactNo2" className="form-label">
                            Contact No 2
                          </Label>
                          <Input
                            id="contactNo2"
                            name="contactNo2"
                            className="form-control"
                            placeholder="Enter contact no 2"
                            type="text"
                            onChange={addWorkDataValidation.handleChange}
                            onBlur={addWorkDataValidation.handleBlur}
                            value={
                              addWorkDataValidation.values.contactNo2 || ""
                            }
                            invalid={
                              addWorkDataValidation.touched.contactNo2 &&
                              addWorkDataValidation.errors.contactNo2
                                ? true
                                : false
                            }
                          />
                          {addWorkDataValidation.touched.contactNo2 &&
                          addWorkDataValidation.errors.contactNo2 ? (
                            <FormFeedback type="invalid">
                              {addWorkDataValidation.errors.contactNo2}
                            </FormFeedback>
                          ) : null}
                        </Col>

                        <Col xs={6}>
                          <Label htmlFor="emailId1" className="form-label">
                            Email Id 1
                          </Label>
                          <Input
                            id="emailId1"
                            name="emailId1"
                            className="form-control"
                            placeholder="example@gmail.com"
                            type="email"
                            onChange={addWorkDataValidation.handleChange}
                            onBlur={addWorkDataValidation.handleBlur}
                            value={addWorkDataValidation.values.emailId1 || ""}
                            invalid={
                              addWorkDataValidation.touched.emailId1 &&
                              addWorkDataValidation.errors.emailId1
                                ? true
                                : false
                            }
                          />
                          {addWorkDataValidation.touched.emailId1 &&
                          addWorkDataValidation.errors.emailId1 ? (
                            <FormFeedback type="invalid">
                              {addWorkDataValidation.errors.emailId1}
                            </FormFeedback>
                          ) : null}
                        </Col>
                        <Col xs={6}>
                          <Label htmlFor="emailId2" className="form-label">
                            Email Id 2
                          </Label>
                          <Input
                            id="emailId2"
                            name="emailId2"
                            className="form-control"
                            placeholder="example@gmail.com"
                            type="email"
                            onChange={addWorkDataValidation.handleChange}
                            onBlur={addWorkDataValidation.handleBlur}
                            value={addWorkDataValidation.values.emailId2 || ""}
                            invalid={
                              addWorkDataValidation.touched.emailId2 &&
                              addWorkDataValidation.errors.emailId2
                                ? true
                                : false
                            }
                          />

                          {addWorkDataValidation.touched.emailId2 &&
                          addWorkDataValidation.errors.emailId2 ? (
                            <FormFeedback type="invalid">
                              {addWorkDataValidation.errors.emailId2}
                            </FormFeedback>
                          ) : null}
                        </Col>
                        <Col xs={6}>
                          <Label htmlFor="faxNo" className="form-label">
                            Fax No
                          </Label>

                          <Input
                            id="faxNo"
                            name="faxNo"
                            className="form-control"
                            placeholder="(123) 456-7890"
                            type="text"
                            onChange={addWorkDataValidation.handleChange}
                            onBlur={addWorkDataValidation.handleBlur}
                            value={addWorkDataValidation.values.faxNo || ""}
                            invalid={
                              addWorkDataValidation.touched.faxNo &&
                              addWorkDataValidation.errors.faxNo
                                ? true
                                : false
                            }
                          />
                          {addWorkDataValidation.touched.faxNo &&
                          addWorkDataValidation.errors.faxNo ? (
                            <FormFeedback type="invalid">
                              {addWorkDataValidation.errors.faxNo}
                            </FormFeedback>
                          ) : null}
                        </Col>

                        <Col md={6}>
                          <Label for="address">Address</Label>
                          <Input
                            id="address"
                            name="address"
                            className="form-control"
                            placeholder="Company's Address"
                            type="textarea"
                            onChange={addWorkDataValidation.handleChange}
                            onBlur={addWorkDataValidation.handleBlur}
                            value={addWorkDataValidation.values.address || ""}
                            invalid={
                              addWorkDataValidation.touched.address &&
                              addWorkDataValidation.errors.address
                                ? true
                                : false
                            }
                          />
                          {addWorkDataValidation.touched.address &&
                          addWorkDataValidation.errors.address ? (
                            <FormFeedback type="invalid">
                              {addWorkDataValidation.errors.address}
                            </FormFeedback>
                          ) : null}
                        </Col>
                        <Col md={6}>
                          <Label for="companyProfile">Company Profile</Label>
                          <Input
                            id="companyProfile"
                            name="companyProfile"
                            className="form-control"
                            placeholder="Company profile"
                            type="textarea"
                            onChange={addWorkDataValidation.handleChange}
                            onBlur={addWorkDataValidation.handleBlur}
                            value={
                              addWorkDataValidation.values.companyProfile || ""
                            }
                            invalid={
                              addWorkDataValidation.touched.companyProfile &&
                              addWorkDataValidation.errors.companyProfile
                                ? true
                                : false
                            }
                          />

                          {addWorkDataValidation.touched.companyProfile &&
                          addWorkDataValidation.errors.companyProfile ? (
                            <FormFeedback type="invalid">
                              {addWorkDataValidation.errors.companyProfile}
                            </FormFeedback>
                          ) : null}
                        </Col>

                        <Col md={3}>
                          <Label htmlFor="city" className="form-label">
                            City
                          </Label>
                          <Input
                            id="city"
                            name="city"
                            className="form-control"
                            placeholder="Enter city"
                            type="text"
                            onChange={addWorkDataValidation.handleChange}
                            onBlur={addWorkDataValidation.handleBlur}
                            value={addWorkDataValidation.values.city || ""}
                            invalid={
                              addWorkDataValidation.touched.city &&
                              addWorkDataValidation.errors.city
                                ? true
                                : false
                            }
                          />
                          {addWorkDataValidation.touched.city &&
                          addWorkDataValidation.errors.city ? (
                            <FormFeedback type="invalid">
                              {addWorkDataValidation.errors.city}
                            </FormFeedback>
                          ) : null}
                        </Col>

                        <Col md={3}>
                          <Label htmlFor="state" className="form-label">
                            State
                          </Label>
                          <Input
                            id="state"
                            name="state"
                            className="form-control"
                            placeholder="Enter state"
                            type="text"
                            onChange={addWorkDataValidation.handleChange}
                            onBlur={addWorkDataValidation.handleBlur}
                            value={addWorkDataValidation.values.state || ""}
                            invalid={
                              addWorkDataValidation.touched.state &&
                              addWorkDataValidation.errors.state
                                ? true
                                : false
                            }
                          />
                          {addWorkDataValidation.touched.state &&
                          addWorkDataValidation.errors.state ? (
                            <FormFeedback type="invalid">
                              {addWorkDataValidation.errors.state}
                            </FormFeedback>
                          ) : null}
                        </Col>
                        <Col md={3}>
                          <Label htmlFor="pinCode" className="form-label">
                            Pin Code
                          </Label>
                          <Input
                            id="pinCode"
                            name="pinCode"
                            className="form-control"
                            placeholder="Enter pin code"
                            type="text"
                            onChange={addWorkDataValidation.handleChange}
                            onBlur={addWorkDataValidation.handleBlur}
                            value={addWorkDataValidation.values.pinCode || ""}
                            invalid={
                              addWorkDataValidation.touched.pinCode &&
                              addWorkDataValidation.errors.pinCode
                                ? true
                                : false
                            }
                          />
                          {addWorkDataValidation.touched.pinCode &&
                          addWorkDataValidation.errors.pinCode ? (
                            <FormFeedback type="invalid">
                              {addWorkDataValidation.errors.pinCode}
                            </FormFeedback>
                          ) : null}
                        </Col>
                        <Col md={3}>
                          <Label htmlFor="country" className="form-label">
                            Country
                          </Label>
                          <Input
                            id="country"
                            name="country"
                            className="form-control"
                            placeholder="Enter country"
                            type="text"
                            onChange={addWorkDataValidation.handleChange}
                            onBlur={addWorkDataValidation.handleBlur}
                            value={addWorkDataValidation.values.country || ""}
                            invalid={
                              addWorkDataValidation.touched.country &&
                              addWorkDataValidation.errors.country
                                ? true
                                : false
                            }
                          />
                          {addWorkDataValidation.touched.country &&
                          addWorkDataValidation.errors.country ? (
                            <FormFeedback type="invalid">
                              {addWorkDataValidation.errors.country}
                            </FormFeedback>
                          ) : null}
                        </Col>

                        <Col xs={6}>
                          <div className="text-end">
                            <button type="submit" className="btn btn-primary">
                              Submit Data
                            </button>
                          </div>
                        </Col>
                      </form>
                    ) : (
                      <div>
                        <span className="fs-24 text-muted ">
                          No data to work with!
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default AddWorkData;
