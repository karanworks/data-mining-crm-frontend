import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { useLocation } from "react-router-dom";

import { formCheck, formRecheck } from "../../slices/CheckForm/thunk";
import { checkedForm } from "../../slices/CheckForm/reducer";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const CheckFormData = () => {
  const location = useLocation();
  const { data, id, token, reportDataForms } = location?.state;

  const { checkedFormsIds, recheckFields } = useSelector(
    (state) => state.CheckForm
  );

  console.log("DATA HERE ->", data);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const [formFieldsCheck, setFormFieldsCheck] = useState(
    initialFormFieldsCheck
  );

  const [selectedForm, setSelectedForm] = useState(null);

  const [allFormsData, setAllFormsData] = useState(null);

  const [noDataToCheck, setNoDataToCheck] = useState(false);

  const [isEditingForm, setIsEditingForm] = useState(false);

  useEffect(() => {
    // set the selected form according to token
    const selectedFormData = reportDataForms.find((form) => form.id == id);

    if (isEditingForm) {
      console.log("EDITING A FORM IF CONDITION");
      setAllFormsData([
        data?.filter((form) => !checkedFormsIds.includes(form.id)),
      ]);
    } else {
      setAllFormsData(data);
    }
    setSelectedForm(selectedFormData);
  }, []);

  useEffect(() => {
    // check if form has already been filled by making an api call
    async function fetchRecheckForms() {
      const selectedFormData = reportDataForms?.find((form) => form.id == id);

      console.log("SELECTED FORM DATA FOR RECHECK ->", selectedFormData);
      dispatch(
        formRecheck({
          userId: selectedFormData?.userId,
          formId: selectedFormData?.id,
          token,
        })
      );
    }

    fetchRecheckForms();
  }, [data]);

  useEffect(() => {
    // if the form has been already filled then modified value will be updated here
    if (recheckFields.length) {
      const recheckFormFieldValues = {};
      recheckFields.forEach((form) => {
        recheckFormFieldValues[form.fieldName] = form.correct;
      });

      console.log("RECHECK FORM FIELDS ->", recheckFormFieldValues);

      setFormFieldsCheck(recheckFormFieldValues);
      setIsEditingForm(true);
    } else {
      setFormFieldsCheck({
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
      });
      setIsEditingForm(false);
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
    let selectedFormData;

    if (id === selectedForm.id) {
      selectedFormData = reportDataForms.find((form) => form.id == id);
      console.log("SELECTED FORM WHILE EDITING ->", allFormsData);
    } else {
      selectedFormData = allFormsData[0];
    }

    dispatch(
      formCheck({
        formFields: formFieldsCheck,
        formId: selectedFormData.id,
        token,
        userId: selectedFormData.userId,
      })
    );

    console.log("IS EDITING A FORM ->", isEditingForm);
    if (isEditingForm) {
      toast.success("Form has been updated !", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });

      setIsEditingForm(false);

      setTimeout(() => {
        navigate("/report");
      }, 1000);
    } else {
      const removeSubmittedForm = allFormsData.filter(
        (form) => form.id !== selectedForm.id
      );
      dispatch(checkedForm(selectedForm?.id));

      if (removeSubmittedForm.length) {
        setAllFormsData(removeSubmittedForm);

        setSelectedForm(removeSubmittedForm[0]);
      } else {
        setNoDataToCheck(true);
      }

      toast.success("Form has been checked !", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });

      // RESET THE FIELDS
      setFormFieldsCheck({
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
      });
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Row className="justify-content-center">
          <Col lg={10}>
            {noDataToCheck ? (
              <Card>
                <CardBody>No Data to Check!</CardBody>
              </Card>
            ) : (
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
                            <td className="fieldValue">{selectedForm?.url}</td>
                            <td className="fieldAction"></td>
                          </tr>
                          <tr>
                            <td className="fieldName fw-bold">Company Name</td>
                            <td className="fieldValue">
                              {selectedForm?.companyName}
                            </td>
                            <td className="fieldAction">
                              {renderButtons(
                                selectedForm?.companyName,
                                "companyName"
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td className="fieldName fw-bold">
                              Company Profile
                            </td>
                            <td className="fieldValue">
                              {selectedForm?.companyProfile}
                            </td>
                            <td className="fieldAction">
                              {renderButtons(
                                selectedForm?.companyProfile,
                                "companyProfile"
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td className="fieldName fw-bold">Address</td>
                            <td className="fieldValue">
                              {selectedForm?.address}
                            </td>
                            <td className="fieldAction">
                              {renderButtons(selectedForm?.address, "address")}
                            </td>
                          </tr>
                          <tr>
                            <td className="fieldName fw-bold">
                              Website Status
                            </td>
                            <td className="fieldValue">
                              {selectedForm?.websiteStatus}
                            </td>
                            <td className="fieldAction">
                              {renderButtons(
                                selectedForm?.websiteStatus,
                                "websiteStatus"
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td className="fieldName fw-bold">Business Type</td>
                            <td className="fieldValue">
                              {selectedForm?.businessType}
                            </td>
                            <td className="fieldAction">
                              {renderButtons(
                                selectedForm?.businessType,
                                "businessType"
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td className="fieldName fw-bold">Contact No 1</td>
                            <td className="fieldValue">
                              {selectedForm?.contactNo1}
                            </td>
                            <td className="fieldAction">
                              {renderButtons(
                                selectedForm?.contactNo1,
                                "contactNo1"
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td className="fieldName fw-bold">Contact No 2</td>
                            <td className="fieldValue">
                              {selectedForm?.contactNo2}
                            </td>
                            <td className="fieldAction">
                              {renderButtons(
                                selectedForm?.contactNo2,
                                "contactNo2"
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td className="fieldName fw-bold">Email Id 1</td>
                            <td className="fieldValue">
                              {selectedForm?.emailId1}
                            </td>
                            <td className="fieldAction">
                              {renderButtons(
                                selectedForm?.emailId1,
                                "emailId1"
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td className="fieldName fw-bold">Email Id 2</td>
                            <td className="fieldValue">
                              {selectedForm?.emailId2}
                            </td>
                            <td className="fieldAction">
                              {renderButtons(
                                selectedForm?.emailId2,
                                "emailId2"
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td className="fieldName fw-bold">Fax No</td>
                            <td className="fieldValue">
                              {selectedForm?.faxNo}
                            </td>
                            <td className="fieldAction">
                              {renderButtons(selectedForm?.faxNo, "faxNo")}
                            </td>
                          </tr>
                          <tr>
                            <td className="fieldName fw-bold">State</td>
                            <td className="fieldValue">
                              {selectedForm?.state}
                            </td>
                            <td className="fieldAction">
                              {renderButtons(selectedForm?.state, "state")}
                            </td>
                          </tr>
                          <tr>
                            <td className="fieldName fw-bold">City</td>
                            <td className="fieldValue">{selectedForm?.city}</td>
                            <td className="fieldAction">
                              {renderButtons(selectedForm?.city, "city")}
                            </td>
                          </tr>
                          <tr>
                            <td className="fieldName fw-bold">Country</td>
                            <td className="fieldValue">
                              {selectedForm?.country}
                            </td>
                            <td className="fieldAction">
                              {renderButtons(selectedForm?.country, "country")}
                            </td>
                          </tr>
                          <tr>
                            <td className="fieldName fw-bold">Pin Code</td>
                            <td className="fieldValue">
                              {selectedForm?.pinCode}
                            </td>
                            <td className="fieldAction">
                              {renderButtons(selectedForm?.pinCode, "pinCode")}
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
            )}
          </Col>
        </Row>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default CheckFormData;
