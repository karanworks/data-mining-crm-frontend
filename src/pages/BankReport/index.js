import React from "react";
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
import Flatpickr from "react-flatpickr";

const BankReport = () => {
  const bankReportData = [
    {
      id: 1,
      applicationId: 73838,
      customerName: "Lokesh Kumar",
      phone: "7691090901",
      panCard: "AHXPJ388D",
      clientOf: "Credit Rupay of Qadir on 17 Dec, 22",
      status1: "VKYC Done",
      status2: 85,
    },
    {
      id: 2,
      applicationId: 638348,
      customerName: "Surjit singh	",
      phone: "8590466998",
      panCard: "AHXPJ388D",
      clientOf: "Credit Rupay of Qadir on 17 Dec, 22",
      status1: "VKYC Done",
      status2: 83,
    },
  ];

  document.title = "Bank Report";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Applications" pageTitle="Bank Report" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Bank Report</h4>
                </CardHeader>

                <CardBody>
                  <div className="listjs-table" id="userList">
                    <Row className="g-4 mb-3">
                      <Col className="col-sm-auto w-100 d-flex justify-content-between">
                        <div className="input-group">
                          <Flatpickr
                            className="form-control border dash-filter-picker"
                            options={{
                              mode: "range",
                              dateFormat: "d M, Y",
                            }}
                          />
                          <div className="input-group-text bg-primary border-primary text-white">
                            <i className="ri-calendar-2-line"></i>
                          </div>
                        </div>
                        <div className="search-box">
                          <input
                            type="text"
                            className="form-control bg-light border-light"
                            autoComplete="off"
                            id="searchList"
                            placeholder="Search center"
                          />
                          <i className="ri-search-line search-icon"></i>
                        </div>
                      </Col>
                    </Row>

                    <div className="table-responsive table-card mt-3 mb-1">
                      <table className="table align-middle table-nowrap">
                        <thead className="table-light">
                          <tr>
                            <th className="sort" data-sort="id">
                              S.NO
                            </th>
                            <th className="sort" data-sort="application_id">
                              Application Id
                            </th>
                            <th className="sort" data-sort="customer_name">
                              Customer Name
                            </th>
                            <th className="sort" data-sort="phone">
                              Phone
                            </th>

                            <th className="sort" data-sort="pan_card">
                              Pan Card
                            </th>

                            <th className="sort" data-sort="client_of">
                              Client of
                            </th>

                            <th className="sort" data-sort="status_1">
                              Status 1
                            </th>
                            <th className="sort" data-sort="status_2">
                              Status 2
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {bankReportData?.map((bankReport) => (
                            <tr key={bankReport?.id}>
                              <td className="id">{bankReport?.id}</td>
                              <td className="id">
                                {bankReport?.applicationId}
                              </td>
                              <td className="center_name">
                                {bankReport?.customerName}
                              </td>
                              <td className="owner_name">
                                {bankReport?.phone}
                              </td>
                              <td className="phone_number">
                                {bankReport?.panCard}
                              </td>
                              <td className="password">
                                {bankReport?.clientOf}
                              </td>
                              <td className="status1">
                                <span class="badge bg-success-subtle text-success">
                                  {bankReport?.status1}
                                </span>
                              </td>
                              <td className="status2">
                                <span class="badge bg-primary-subtle text-primary">
                                  {bankReport?.status2}
                                </span>
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
      </div>
    </React.Fragment>
  );
};

export default BankReport;
