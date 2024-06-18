import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { fieldData } from "../../common/data/termsAndConditions";

const TermsAndConditions = ({ setShowTermsAndConditions }) => {
  const [checkboxState, setCheckboxState] = useState(false);
  const [showError, setShowError] = useState(false);

  function handleCheckbox() {
    if (checkboxState) {
      setShowTermsAndConditions(false);
      setShowError(false);
    } else {
      setShowTermsAndConditions(true);
      setShowError(true);
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Terms & Conditions" pageTitle="Work" />
        </Container>

        <Row className="justify-content-center">
          <Col lg={10}>
            <Card>
              <div className="bg-primary-subtle position-relative">
                <div className="card-body p-5">
                  <div className="text-center">
                    <h3 className="fw-semibold">Terms & Conditions</h3>
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
                  <h5>Welcome to Ascent BPO Services PVT LTD!</h5>
                  <p className="text-muted">
                    These terms and conditions outline the rules and regulations
                    for the use of Ascent BPO Services PVT LTD's Website,
                    located at ascenthaat.com.
                  </p>
                  <p className="text-muted">
                    By accessing this website we assume you accept these terms
                    and conditions. Do not continue to use ascenthaat.com if you
                    do not agree to take all of the terms and conditions stated
                    on this page.
                  </p>
                </div>

                <div>
                  <h5>Rules</h5>
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
                          <th className="sort" data-sort="instructions">
                            Instructions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="list form-check-all">
                        {fieldData?.map((field) => (
                          <tr key={field.id}>
                            <td className="fieldName fw-bold">
                              {field.fieldName}
                            </td>
                            <td className="fieldValue">{field.fieldValue}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="d-flex flex-column align-items-center p-2">
                  {showError ? (
                    <span className="text-danger">
                      Please Accept The Terms And Conditions
                    </span>
                  ) : null}
                  <div className="d-flex">
                    <label
                      htmlFor="termAndConditions"
                      className="mb-0 fs-18 "
                      style={{ marginRight: "10px" }}
                    >
                      I Agree With The Terms & Conditions
                    </label>
                    <input
                      id="termAndConditions"
                      type="checkbox"
                      className="form-check-input fs-18"
                      checked={checkboxState}
                      onChange={(e) => setCheckboxState(e.target.checked)}
                    />
                  </div>
                </div>

                <div className="text-end">
                  <Button
                    to="#!"
                    className="btn btn-primary me-1"
                    onClick={handleCheckbox}
                  >
                    Accept
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default TermsAndConditions;
