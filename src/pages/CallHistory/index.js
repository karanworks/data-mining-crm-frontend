import React, { useState } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import Widgets from "./Widgets";
import Flatpickr from "react-flatpickr";
import Select from "react-select";
import { Link } from "react-router-dom";

const CallHistory = () => {
  const [selectedSingleUser, setSelectedSingleUser] = useState(null);
  const [selectedSingleSubDisposition, setSelectedSingleSubDisposition] =
    useState(null);

  function handleSelectSingleUser(user) {
    setSelectedSingleUser(user);
  }
  function handleSelectSingleSubDisposition(subDisposition) {
    setSelectedSingleSubDisposition(subDisposition);
  }

  const userOptions = [
    {
      value: "Kaju",
      label: "Kaju",
    },
    {
      value: "Akhrot",
      label: "Akhrot",
    },
    {
      value: "Baadam",
      label: "Baadam",
    },
  ];
  const subDispositionOptions = [
    {
      value: "Interested",
      label: "Interested",
    },
    {
      value: "Not Interested",
      label: "Not Interested",
    },
    {
      value: "Switched Off",
      label: "Switched Off",
    },
    {
      value: "Cut The Call",
      label: "Cut The Call",
    },
  ];

  document.title = "Call History";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Call History" pageTitle="Calls" />
          <Row>
            <Col xs={12}>
              <Widgets />
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">All Calls</h4>
                </CardHeader>

                <CardBody>
                  <div className="listjs-table" id="userList">
                    <Row className="g-4 mb-3">
                      <Col className="col-sm-auto w-100 d-flex align-items-center justify-content-between">
                        <div className="search-box">
                          <input
                            type="text"
                            className="form-control bg-light border-light"
                            autoComplete="off"
                            id="searchList"
                            placeholder="Search call"
                          />
                          <i className="ri-search-line search-icon"></i>
                        </div>

                        <div className="d-flex" style={{ gap: "10px" }}>
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

                          <div>
                            <Select
                              id="users"
                              name="users"
                              value={selectedSingleUser}
                              onChange={(user) => {
                                handleSelectSingleUser(user);
                                // validation.setFieldValue(
                                //   "centerName",
                                //   centerName.value
                                // );
                              }}
                              options={userOptions}
                              placeholder="Users"
                            />
                          </div>
                          <div>
                            <Select
                              id="subDisposition"
                              name="subDisposition"
                              value={selectedSingleSubDisposition}
                              onChange={(subDisposition) => {
                                handleSelectSingleSubDisposition(
                                  subDisposition
                                );
                                // validation.setFieldValue(
                                //   "centerName",
                                //   centerName.value
                                // );
                              }}
                              options={subDispositionOptions}
                              placeholder="Sub Disposition"
                            />
                          </div>

                          <button
                            type="button"
                            className="btn btn-primary btn-label waves-effect waves-light"
                          >
                            <i className="ri-equalizer-fill label-icon align-middle fs-16 me-2"></i>
                            Apply Filters
                          </button>
                          {/* <button type="button" class="btn btn-success">
                            Download Data
                          </button> */}
                          <button
                            type="button"
                            class="btn btn-success custom-toggle"
                            data-bs-toggle="button"
                          >
                            <span class="icon-on">
                              <i class="ri-file-download-fill align-bottom me-1"></i>{" "}
                              Download Data
                            </span>
                          </button>
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
                            <th className="sort" data-sort="customer_name">
                              Customer Name
                            </th>
                            <th className="sort" data-sort="disposition">
                              Disposition
                            </th>
                            <th className="sort" data-sort="sub_disposition">
                              Sub Disposition
                            </th>

                            <th className="sort" data-sort="talktime">
                              Talktime
                            </th>

                            <th className="sort" data-sort="Remark">
                              Remark
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          <tr></tr>
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

export default CallHistory;
