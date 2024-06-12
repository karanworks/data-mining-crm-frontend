import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const VerifiedData = () => {
  const location = useLocation();
  const data = location.state?.data;

  function handleISTTimeZone(utcTimestamp) {
    // Timestamp in UTC

    // Create a new Date object from the UTC timestamp
    const utcDate = new Date(utcTimestamp);

    // Get the offset in minutes between UTC and IST
    const istOffsetInMinutes = utcDate.getTimezoneOffset() + 330;

    // Create a new Date object with the IST offset
    const istDate = new Date(
      utcDate.getTime() + istOffsetInMinutes * 60 * 1000
    );

    // Get the IST day and time components
    const istYear = istDate.getFullYear();
    const istMonth = String(istDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const istDay = String(istDate.getDate()).padStart(2, "0");
    const istHours = String(istDate.getHours()).padStart(2, "0");
    const istMinutes = String(istDate.getMinutes()).padStart(2, "0");
    const istSeconds = String(istDate.getSeconds()).padStart(2, "0");
    // const istMilliseconds = String(istDate.getMilliseconds()).padStart(3, "0");

    // Format the IST day and time
    const istDayAndTime = `${istDay}-${istMonth}-${istYear} ${istHours}:${istMinutes}:${istSeconds}`;

    return istDayAndTime;
  }

  document.title = "For Checking";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="For Checking" pageTitle="Management" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">For Checking</h4>
                </CardHeader>

                <CardBody>
                  <div className="listjs-table" id="userList">
                    <div className="table-responsive table-card mt-3 mb-1">
                      <table className="table table-nowrap" id="userTable">
                        <thead className="table-light">
                          <tr>
                            <th className="sort" data-sort="username">
                              Username
                            </th>
                            <th className="sort" data-sort="dateAndTime">
                              Date & Time
                            </th>
                            <th className="sort" data-sort="companyInfo">
                              Company Info
                            </th>
                            <th className="sort" data-sort="type">
                              Business Type
                            </th>

                            <th className="sort" data-sort="status">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {data.map((data) => (
                            <tr key={data.id}>
                              <td className="username">{data.username}</td>
                              <td className="dateAndTime">
                                <span className="badge border border-primary text-primary fs-12">
                                  {handleISTTimeZone(data.createdAt)}
                                </span>
                              </td>
                              <td className="companyInfo">
                                <div>
                                  <div>URL - {data.url}</div>
                                  <div>Name - {data.companyName}</div>
                                </div>
                              </td>
                              <td className="businessType">
                                {data.businessType}
                              </td>
                              <td className="status">
                                {data.websiteStatus === "Valid URL" ? (
                                  <span className="badge border border-success text-success">
                                    {data.websiteStatus}
                                  </span>
                                ) : (
                                  <span className="badge border border-danger text-danger">
                                    {data.websiteStatus}
                                  </span>
                                )}
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

export default VerifiedData;
