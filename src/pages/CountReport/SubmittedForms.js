import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getReportDataForms } from "../../slices/Report/thunk";
import { useNavigate } from "react-router-dom";

const SubmittedForms = () => {
  const location = useLocation();
  const token = location?.state?.data;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { reportDataForms } = useSelector((state) => state.Report);

  function handleCheckForm(data) {
    navigate("/report/check-form-data", { state: { data, token } });
  }

  console.log("SUBMITTED FORMS DATA ->", reportDataForms);

  useEffect(() => {
    dispatch(getReportDataForms(token));
  }, [dispatch]);

  document.title = "Report";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Report" pageTitle="Reports" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Report</h4>
                </CardHeader>

                <CardBody>
                  <div className="listjs-table" id="userList">
                    <Row className="g-4 mb-3 d-flex justify-content-between"></Row>
                    <div className="table-responsive mt-2">
                      <table className="table table-bordered table-nowrap align-middle mb-0">
                        <thead>
                          <tr>
                            <th scope="col">Username</th>
                            <th scope="col">Company Info</th>
                            <th scope="col">Business Type</th>
                            <th scope="col">Website Status</th>
                            <th scope="col">Form Status</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          {reportDataForms?.map((form) => (
                            <tr key={form.id}>
                              <td>{form.username}</td>
                              <td className="companyInfo">
                                <div>
                                  <div>URL - {form.url}</div>
                                  <div>Name - {form.companyName}</div>
                                </div>
                              </td>
                              <td>{form.businessType}</td>
                              <td>
                                {form.websiteStatus === "Valid URL" ? (
                                  <span className="badge border border-success text-success">
                                    {form.websiteStatus}
                                  </span>
                                ) : (
                                  <span className="badge border border-danger text-danger">
                                    {form.websiteStatus}
                                  </span>
                                )}
                              </td>

                              <td>
                                {form.status === 1 ? (
                                  <span className="badge border border-success text-success">
                                    Checked
                                  </span>
                                ) : (
                                  <span className="badge border border-danger text-danger">
                                    Not Checked
                                  </span>
                                )}
                              </td>
                              <td>
                                <button
                                  className="btn btn-sm btn-success edit-item-btn"
                                  data-bs-toggle="modal"
                                  data-bs-target="#showModal"
                                  onClick={() => {
                                    handleCheckForm(form);
                                  }}
                                >
                                  Check
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="d-flex justify-content-end">
                      <div className="pagination-wrap hstack gap-2">
                        <Link
                          className="page-item pagination-prev disabled"
                          to="#"
                        >
                          Previous
                        </Link>
                        <ul className="pagination listjs-pagination mb-0"></ul>
                        <Link className="page-item pagination-next" to="#">
                          Next
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <ToastContainer />
      </div>
    </React.Fragment>
  );
};

export default SubmittedForms;
