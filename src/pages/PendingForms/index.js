import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Label,
  Row,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import { getCenters } from "../../slices/Centers/thunk";
import Select from "react-select";

const PendingForms = () => {
  const [selectedSingleStatus, setSelectedSingleStatus] = useState(null);

  function handleSelectSingleStatus(status) {
    setSelectedSingleStatus(status);
  }

  const StatusOptions = [
    {
      value: "Link Sent",
      label: "Link Sent",
    },
    {
      value: "Anyone",
      label: "Anyone",
    },
  ];

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

  document.title = "Daily Report";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Daily Report" pageTitle="Applications" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Pending Forms</h4>
                </CardHeader>

                <CardBody>
                  <div className="listjs-table" id="userList">
                    <Row className="g-4 mb-3">
                      <Col className="col-sm-auto w-100 d-flex align-items-center ">
                        <div className="d-flex" style={{ gap: "10px" }}>
                          <div className="search-box">
                            <input
                              type="text"
                              className="form-control bg-light border-light"
                              autoComplete="off"
                              id="searchList"
                              onChange={() => {}}
                              placeholder="Search name"
                            />
                            <i className="ri-search-line search-icon"></i>
                          </div>

                          <div className="d-flex">
                            <Flatpickr
                              className="form-control border dash-filter-picker"
                              placeholder="Date Range"
                              options={{
                                mode: "range",
                                dateFormat: "d M, Y",
                              }}
                            />
                          </div>

                          <button
                            type="button"
                            class="btn btn-primary btn-label waves-effect waves-light"
                          >
                            <i class="ri-equalizer-fill label-icon align-middle fs-16 me-2"></i>
                            Apply Filters
                          </button>
                        </div>
                      </Col>
                    </Row>

                    {/* Removed this "table-responsive" class */}
                    <div className="table-card mt-3 mb-1">
                      <table className="table align-middle table-nowrap">
                        <thead className="table-light">
                          <tr>
                            <th className="sort" data-sort="id">
                              ID
                            </th>
                            <th className="sort" data-sort="punch_date">
                              Punch Date
                            </th>
                            <th className="sort" data-sort="name">
                              Name
                            </th>
                            <th className="sort" data-sort="number">
                              Number
                            </th>

                            <th className="sort" data-sort="panNumber">
                              Pan Number
                            </th>

                            <th className="sort" data-sort="bank">
                              Bank
                            </th>

                            <th className="sort" data-sort="unique_attempts">
                              Tools
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          <tr>
                            <td className="id">1</td>
                            <td className="name">Indrajit Sinha</td>
                            <td className="punch_date">2023/01/08</td>
                            <td className="number">9982734838</td>
                            <td className="panNumber">BMPS8399M</td>
                            <td className="bank">
                              Indusind Bank Partha Debnath
                            </td>
                            <td
                              className="tools d-flex"
                              style={{ gap: "10px" }}
                            >
                              <Input
                                type="text"
                                placeholder="Application number"
                                style={{ width: "auto" }}
                              />
                              <Select
                                id="formStatus"
                                name="formStatus"
                                value={selectedSingleStatus}
                                onChange={(status) => {
                                  handleSelectSingleStatus(status);
                                }}
                                options={StatusOptions}
                                placeholder="Status"
                                style={{ width: "150px" }}
                              />
                              <Button color="primary">Submit</Button>
                            </td>
                          </tr>
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

export default PendingForms;
