import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { useLocation } from "react-router-dom";
import {
  checkFormData,
  recheckFormData,
} from "../../helpers/fakebackend_helper";

const CheckFormData = () => {
  const location = useLocation();
  const { data, token } = location?.state;

  const initialFormFieldsCheck = {
    websiteStatus: null,
    contactNo1: null,
    contactNo2: null,
    emailId1: null,
    emailId2: null,
    faxNo: null,
    businessType: null,
    address: null,
    companyProfile: null,
    city: null,
    state: null,
    pinCode: null,
    country: null,
  };

  console.log("DATA INSIDE CHECK FORM ->", data);
  console.log("TOKEN INSIDE CHECK FORM ->", token);

  const [recheckFields, setRecheckFields] = useState(null);
  const [formFieldsCheck, setFormFieldsCheck] = useState(
    initialFormFieldsCheck
  );

  useEffect(() => {
    async function fetchRecheckForms() {
      const response = await recheckFormData({
        userId: data?.userId,
        formId: data?.id,
        token,
      });

      setRecheckFields(response.data.recheckFormData);
    }
    fetchRecheckForms();
  }, [data]);

  useEffect(() => {
    if (recheckFields) {
      const recheckFormFieldValues = {};
      recheckFields.forEach((form) => {
        recheckFormFieldValues[form.fieldName] = form.status;
      });
      setFormFieldsCheck(recheckFormFieldValues);
    }
  }, [recheckFields]);

  const handleCorrectField = (fieldName) => {
    setFormFieldsCheck((prevFields) => ({
      ...prevFields,
      [fieldName]: prevFields[fieldName] === 1 ? null : 1,
    }));
  };

  const handleWrongField = (fieldName) => {
    setFormFieldsCheck((prevFields) => ({
      ...prevFields,
      [fieldName]: prevFields[fieldName] === 0 ? null : 0,
    }));
  };

  const renderButtons = (fieldValue, fieldName) => {
    const fieldStatus = formFieldsCheck[fieldName];

    const correctButtonStyle = {
      backgroundColor: fieldStatus === 1 ? "#00BD9D" : "transparent",
      color: fieldStatus === 1 ? "#fff" : "#00BD9D",
      border: "1px solid #00BD9D",
    };

    const wrongButtonStyle = {
      backgroundColor: fieldStatus === 0 ? "#F06548" : "transparent",
      color: fieldStatus === 0 ? "#fff" : "#F06548",
      border: "1px solid #F06548",
    };

    return fieldValue ? (
      <div className="d-flex gap-2">
        <button
          type="button"
          className="btn"
          onClick={() => handleCorrectField(fieldName)}
          style={correctButtonStyle}
        >
          <i className="ri-check-fill"></i>
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => handleWrongField(fieldName)}
          style={wrongButtonStyle}
        >
          <i className="ri-close-fill"></i>
        </button>
      </div>
    ) : null;
  };

  async function handleSubmit() {
    const response = await checkFormData({
      formFields: formFieldsCheck,
      formId: data.id,
      token,
      userId: data.userId,
    });
    console.log("RESPONSE AFTER FORM CHECK API CALL ->", response);
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Row className="justify-content-center">
          <Col lg={10}>
            <Card>
              <div className="bg-primary-subtle position-relative">
                <div className="card-body p-5">
                  <div className="text-center">
                    <h3 className="fw-semibold">Filled Data</h3>
                  </div>
                </div>
                <div className="shape">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    width="1440"
                    height="60"
                    preserveAspectRatio="none"
                    viewBox="0 0 1440 60"
                  >
                    <g mask='url("#SvgjsMask1001")' fill="none">
                      <path
                        d="M 0,4 C 144,13 432,48 720,49 C 1008,50 1296,17 1440,9L1440 60L0 60z"
                        style={{ fill: "var(--vz-secondary-bg)" }}
                      ></path>
                    </g>
                    <defs>
                      <mask id="SvgjsMask1001">
                        <rect width="1440" height="60" fill="#ffffff"></rect>
                      </mask>
                    </defs>
                  </svg>
                </div>
              </div>

              <CardBody className="p-4">
                <div>
                  <h5>Details</h5>
                  <div className="table-responsive table-card mt-3 mb-1">
                    <table
                      className="table align-middle table-nowrap"
                      id="userTable"
                    >
                      <thead className="table-light">
                        <tr>
                          <th className="sort" data-sort="field_name">
                            Field Name
                          </th>
                          <th className="sort" data-sort="entered">
                            Entered
                          </th>
                          <th className="sort" data-sort="entered">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="list form-check-all">
                        <tr>
                          <td className="fieldName fw-bold">Website Url</td>
                          <td className="fieldValue">{data.url}</td>
                          <td className="fieldAction"></td>
                        </tr>
                        <tr>
                          <td className="fieldName fw-bold">Company Name</td>
                          <td className="fieldValue">{data.companyName}</td>
                          <td className="fieldAction">
                            {renderButtons(data.companyName, "companyName")}
                          </td>
                        </tr>
                        <tr>
                          <td className="fieldName fw-bold">Company Profile</td>
                          <td className="fieldValue">{data.companyProfile}</td>
                          <td className="fieldAction">
                            {renderButtons(
                              data.companyProfile,
                              "companyProfile"
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td className="fieldName fw-bold">Address</td>
                          <td className="fieldValue">{data.address}</td>
                          <td className="fieldAction">
                            {renderButtons(data.address, "address")}
                          </td>
                        </tr>
                        <tr>
                          <td className="fieldName fw-bold">Website Status</td>
                          <td className="fieldValue">{data.websiteStatus}</td>
                          <td className="fieldAction">
                            {renderButtons(data.websiteStatus, "websiteStatus")}
                          </td>
                        </tr>
                        <tr>
                          <td className="fieldName fw-bold">Business Type</td>
                          <td className="fieldValue">{data.businessType}</td>
                          <td className="fieldAction">
                            {renderButtons(data.businessType, "businessType")}
                          </td>
                        </tr>
                        <tr>
                          <td className="fieldName fw-bold">Contact No 1</td>
                          <td className="fieldValue">{data.contactNo1}</td>
                          <td className="fieldAction">
                            {renderButtons(data.contactNo1, "contactNo1")}
                          </td>
                        </tr>
                        <tr>
                          <td className="fieldName fw-bold">Contact No 2</td>
                          <td className="fieldValue">{data.contactNo2}</td>
                          <td className="fieldAction">
                            {renderButtons(data.contactNo2, "contactNo2")}
                          </td>
                        </tr>
                        <tr>
                          <td className="fieldName fw-bold">Email Id 1</td>
                          <td className="fieldValue">{data.emailId1}</td>
                          <td className="fieldAction">
                            {renderButtons(data.emailId1, "emailId1")}
                          </td>
                        </tr>
                        <tr>
                          <td className="fieldName fw-bold">Email Id 2</td>
                          <td className="fieldValue">{data.emailId2}</td>
                          <td className="fieldAction">
                            {renderButtons(data.emailId2, "emailId2")}
                          </td>
                        </tr>
                        <tr>
                          <td className="fieldName fw-bold">Fax No</td>
                          <td className="fieldValue">{data.faxNo}</td>
                          <td className="fieldAction">
                            {renderButtons(data.faxNo, "faxNo")}
                          </td>
                        </tr>
                        <tr>
                          <td className="fieldName fw-bold">State</td>
                          <td className="fieldValue">{data.state}</td>
                          <td className="fieldAction">
                            {renderButtons(data.state, "state")}
                          </td>
                        </tr>
                        <tr>
                          <td className="fieldName fw-bold">City</td>
                          <td className="fieldValue">{data.city}</td>
                          <td className="fieldAction">
                            {renderButtons(data.city, "city")}
                          </td>
                        </tr>
                        <tr>
                          <td className="fieldName fw-bold">Country</td>
                          <td className="fieldValue">{data.country}</td>
                          <td className="fieldAction">
                            {renderButtons(data.country, "country")}
                          </td>
                        </tr>
                        <tr>
                          <td className="fieldName fw-bold">Pin Code</td>
                          <td className="fieldValue">{data.pinCode}</td>
                          <td className="fieldAction">
                            {renderButtons(data.pinCode, "pinCode")}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="d-flex justify-content-center">
                      <button
                        className="btn w-lg btn-primary"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default CheckFormData;
