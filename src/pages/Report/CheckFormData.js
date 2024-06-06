import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { useLocation } from "react-router-dom";

const CheckFormData = () => {
  const location = useLocation();
  const data = location?.state?.data;

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
                          <td className="fieldAction">
                            <div className="d-flex gap-2">
                              <button
                                type="button"
                                class="btn btn-outline-success"
                              >
                                <i class="ri-check-fill"></i>
                              </button>
                              <button
                                type="button"
                                class="btn btn-outline-danger "
                              >
                                <i class="ri-close-fill"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="fieldName fw-bold">Website Name</td>
                          <td className="fieldValue">{data.companyName}</td>
                          <td className="fieldAction">
                            <div className="d-flex gap-2">
                              <button
                                type="button"
                                class="btn btn-outline-success"
                              >
                                <i class="ri-check-fill"></i>
                              </button>
                              <button
                                type="button"
                                class="btn btn-outline-danger "
                              >
                                <i class="ri-close-fill"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="fieldName fw-bold">Profile</td>
                          <td className="fieldValue">{data.companyProfile}</td>
                          <td className="fieldAction">
                            <div className="d-flex gap-2">
                              <button
                                type="button"
                                class="btn btn-outline-success"
                              >
                                <i class="ri-check-fill"></i>
                              </button>
                              <button
                                type="button"
                                class="btn btn-outline-danger "
                              >
                                <i class="ri-close-fill"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="fieldName fw-bold">Address</td>
                          <td className="fieldValue">{data.address}</td>
                          <td className="fieldAction">
                            <div className="d-flex gap-2">
                              <button
                                type="button"
                                class="btn btn-outline-success"
                              >
                                <i class="ri-check-fill"></i>
                              </button>
                              <button
                                type="button"
                                class="btn btn-outline-danger "
                              >
                                <i class="ri-close-fill"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="fieldName fw-bold">Status</td>
                          <td className="fieldValue">{data.websiteStatus}</td>
                          <td className="fieldAction">
                            <div className="d-flex gap-2">
                              <button
                                type="button"
                                class="btn btn-outline-success"
                              >
                                <i class="ri-check-fill"></i>
                              </button>
                              <button
                                type="button"
                                class="btn btn-outline-danger "
                              >
                                <i class="ri-close-fill"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="fieldName fw-bold">Business Type</td>
                          <td className="fieldValue">{data.businessType}</td>
                          <td className="fieldAction">
                            <div className="d-flex gap-2">
                              <button
                                type="button"
                                class="btn btn-outline-success"
                              >
                                <i class="ri-check-fill"></i>
                              </button>
                              <button
                                type="button"
                                class="btn btn-outline-danger "
                              >
                                <i class="ri-close-fill"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="fieldName fw-bold">Contact No 1</td>
                          <td className="fieldValue">{data.contactNo1}</td>
                          <td className="fieldAction">
                            <div className="d-flex gap-2">
                              <button
                                type="button"
                                class="btn btn-outline-success"
                              >
                                <i class="ri-check-fill"></i>
                              </button>
                              <button
                                type="button"
                                class="btn btn-outline-danger "
                              >
                                <i class="ri-close-fill"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="fieldName fw-bold">Contact No 2</td>
                          <td className="fieldValue">{data.contactNo2}</td>
                          <td className="fieldAction">
                            <div className="d-flex gap-2">
                              <button
                                type="button"
                                class="btn btn-outline-success"
                              >
                                <i class="ri-check-fill"></i>
                              </button>
                              <button
                                type="button"
                                class="btn btn-outline-danger "
                              >
                                <i class="ri-close-fill"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="fieldName fw-bold">Email Id 1</td>
                          <td className="fieldValue">{data.emailId1}</td>
                          <td className="fieldAction">
                            <div className="d-flex gap-2">
                              <button
                                type="button"
                                class="btn btn-outline-success"
                              >
                                <i class="ri-check-fill"></i>
                              </button>
                              <button
                                type="button"
                                class="btn btn-outline-danger "
                              >
                                <i class="ri-close-fill"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="fieldName fw-bold">Email Id 2</td>
                          <td className="fieldValue">{data.emailId2}</td>
                          <td className="fieldAction">
                            <div className="d-flex gap-2">
                              <button
                                type="button"
                                class="btn btn-outline-success"
                              >
                                <i class="ri-check-fill"></i>
                              </button>
                              <button
                                type="button"
                                class="btn btn-outline-danger "
                              >
                                <i class="ri-close-fill"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="fieldName fw-bold">Fax No</td>
                          <td className="fieldValue">{data.faxNo}</td>
                          <td className="fieldAction">
                            <div className="d-flex gap-2">
                              <button
                                type="button"
                                class="btn btn-outline-success"
                              >
                                <i class="ri-check-fill"></i>
                              </button>
                              <button
                                type="button"
                                class="btn btn-outline-danger "
                              >
                                <i class="ri-close-fill"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="fieldName fw-bold">State</td>
                          <td className="fieldValue">{data.state}</td>
                          <td className="fieldAction">
                            <div className="d-flex gap-2">
                              <button
                                type="button"
                                class="btn btn-outline-success"
                              >
                                <i class="ri-check-fill"></i>
                              </button>
                              <button
                                type="button"
                                class="btn btn-outline-danger "
                              >
                                <i class="ri-close-fill"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="fieldName fw-bold">City</td>
                          <td className="fieldValue">{data.city}</td>
                          <td className="fieldAction">
                            <div className="d-flex gap-2">
                              <button
                                type="button"
                                class="btn btn-outline-success"
                              >
                                <i class="ri-check-fill"></i>
                              </button>
                              <button
                                type="button"
                                class="btn btn-outline-danger "
                              >
                                <i class="ri-close-fill"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="fieldName fw-bold">Country</td>
                          <td className="fieldValue">{data.country}</td>
                          <td className="fieldAction">
                            <div className="d-flex gap-2">
                              <button
                                type="button"
                                class="btn btn-outline-success"
                              >
                                <i class="ri-check-fill"></i>
                              </button>
                              <button
                                type="button"
                                class="btn btn-outline-danger "
                              >
                                <i class="ri-close-fill"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="fieldName fw-bold">Pin Code</td>
                          <td className="fieldValue">{data.pinCode}</td>
                          <td className="fieldAction">
                            <div className="d-flex gap-2">
                              <button
                                type="button"
                                class="btn btn-outline-success"
                              >
                                <i class="ri-check-fill"></i>
                              </button>
                              <button
                                type="button"
                                class="btn btn-outline-danger "
                              >
                                <i class="ri-close-fill"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
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

export default CheckFormData;
