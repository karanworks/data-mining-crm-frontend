import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";

const ViewFilledData = () => {
  const fieldData = [
    {
      id: 1,
      fieldName: "Website URL",
      fieldValue: "value",
    },
    {
      id: 2,
      fieldName: "Webiste Status",
      fieldValue: "value",
    },
    {
      id: 3,
      fieldName: "Company Name",
      fieldValue: "value",
    },
    {
      id: 4,
      fieldName: "Company Logo",
      fieldValue: "value",
    },
    {
      id: 5,
      fieldName: "Business Type",
      fieldValue: "value",
    },

    {
      id: 6,
      fieldName: "Address",
      fieldValue: "value",
    },
    {
      id: 7,
      fieldName: "City",
      fieldValue: "value",
    },
    {
      id: 8,
      fieldName: "State",
      fieldValue: "value",
    },
    {
      id: 9,
      fieldName: "Country",
      fieldValue: "value",
    },
    {
      id: 10,
      fieldName: "Pin Code",
      fieldValue: "value",
    },
    {
      id: 11,
      fieldName: "Contact No",
      fieldValue: "value",
    },
    {
      id: 12,
      fieldName: "Fax No",
      fieldValue: "value",
    },
  ];

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
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default ViewFilledData;
