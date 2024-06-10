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

const AssignedData = () => {
  const location = useLocation();
  console.log("LOCATION HOOK ->", location);
  const data = location.state?.data;

  console.log("ASSIGNED DATA HERE ->", data);

  document.title = "Assigned Data";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Assigned Data" pageTitle="Management" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Assigned Data</h4>
                </CardHeader>

                <CardBody>
                  <div className="listjs-table" id="userList">
                    <div className="table-responsive table-card mt-3 mb-1">
                      <table className="table table-nowrap" id="userTable">
                        <thead className="table-light">
                          <tr>
                            <th className="sort" data-sort="username">
                              Url
                            </th>
                            <th className="sort" data-sort="dateAndTime">
                              User Id
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {data.map((data) => (
                            <tr key={data.id}>
                              <td className="url">{data.url}</td>

                              <td className="status">{data.userId}</td>
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

export default AssignedData;
