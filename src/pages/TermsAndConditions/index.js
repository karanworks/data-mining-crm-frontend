import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";

const TermsAndConditions = () => {
  const fieldData = [
    {
      id: 1,
      fieldName: "Website URL",
      fieldValue: "ascenthaat.com",
    },
    {
      id: 2,
      fieldName: "Webiste Status",
      fieldValue:
        "Valid / Invalid (If website works properly then choose Valid and if it doesn't even open choose Invalid)",
    },
    {
      id: 3,
      fieldName: "Company Name",
      fieldValue:
        "Fill in 'Proper Case', (first letter of every word should be capital, Example - 'India Is Great' )",
    },
    {
      id: 4,
      fieldName: "Company Logo",
      fieldValue: "Should be in jpeg, jpg or png format",
    },
    {
      id: 5,
      fieldName: "Business Type",
      fieldValue:
        "Manufacturer, Importer, Trader, Exporter, Distributer, Supplier",
    },

    {
      id: 6,
      fieldName: "Address",
      fieldValue: "Not ends with the dot(.) symbol",
    },
    {
      id: 7,
      fieldName: "City",
      fieldValue: "Fill as given at website",
    },
    {
      id: 8,
      fieldName: "State",
      fieldValue: "Fill as given at website",
    },
    {
      id: 9,
      fieldName: "Country",
      fieldValue:
        "Fill in 'Proper Case', (first letter of every word should be capital, Example - 'India Is Great' )",
    },
    {
      id: 10,
      fieldName: "Pin Code",
      fieldValue: "NEEDS TO BE EDITED",
    },
    {
      id: 11,
      fieldName: "Contact No",
      fieldValue:
        "Put country code before the mobile number. and put std code before Landline No.",
    },
    {
      id: 12,
      fieldName: "Fax No",
      fieldValue: "NEEDS TO BE EDITED",
    },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Terms & Conditions" pageTitle="Settings" />
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
                  <h5>Welcome to Webwers!</h5>
                  <p className="text-muted">
                    These terms and conditions outline the rules and regulations
                    for the use of Company Name's Website, located at
                    ascenthaat.com.
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

                <div className="d-flex justify-content-center p-2">
                  <div className="d-flex">
                    <p className="mb-0 fs-18 " style={{ marginRight: "10px" }}>
                      I Agree With The Terms & Conditions
                    </p>
                    <input type="checkbox" className="form-check-input fs-18" />
                  </div>
                </div>

                <div className="text-end">
                  <Link to="#!" className="btn btn-primary me-1">
                    Accept
                  </Link>
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
