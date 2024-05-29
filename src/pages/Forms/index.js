import React, { useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  UncontrolledTooltip,
} from "reactstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import Select from "react-select";
import Flatpickr from "react-flatpickr";

const Forms = () => {
  const [selectedSingleEmployeeName, setSelectedSingleEmployeeName] =
    useState(null);

  const [selectedSingleBank, setSelectedSingleBank] = useState(null);

  const [selectedSingleClientType, setSelectedSingleClientType] =
    useState(null);

  function handleSelectSingleEmployeeName(employeeName) {
    setSelectedSingleEmployeeName(employeeName);
  }
  function handleSelectSingleBankName(bankName) {
    setSelectedSingleBank(bankName);
  }
  function handleSelectSingleClientType(clientType) {
    setSelectedSingleClientType(clientType);
  }

  const employeeOptions = [
    {
      value: "Already Applied",
      label: "Already Applied",
    },
    {
      value: "Client Denied",
      label: "Client Denied",
    },
    {
      value: "Link Sent",
      label: "Link Sent",
    },
  ];
  const bankOptions = [
    {
      value: "Axis Bank",
      label: "Axis Bank",
    },
    {
      value: "HDFC Bank",
      label: "HDFC Bank",
    },
    {
      value: "AU Bank",
      label: "AU Bank",
    },
  ];
  const clientTypeOptions = [
    {
      value: "Salaried",
      label: "Salaried",
    },
    {
      value: "Self Employed",
      label: "Self Employed",
    },
    {
      value: "Business Man",
      label: "Business Man",
    },
  ];
  const [arrowNavTab, setarrowNavTab] = useState("1");
  const arrowNavToggle = (tab) => {
    if (arrowNavTab !== tab) {
      setarrowNavTab(tab);
    }
  };

  document.title = "Forms";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Forms" pageTitle="Applications" />
          <Row>
            <Col xs={12}>
              <Card>
                <CardBody>
                  <Nav
                    pills
                    className="nav nav-pills arrow-navtabs nav-primary bg-light mb-3"
                  >
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: arrowNavTab === "1",
                        })}
                        onClick={() => {
                          arrowNavToggle("1");
                        }}
                      >
                        Credit Card
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: arrowNavTab === "2",
                        })}
                        onClick={() => {
                          arrowNavToggle("2");
                        }}
                      >
                        Loan
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: arrowNavTab === "3",
                        })}
                        onClick={() => {
                          arrowNavToggle("3");
                        }}
                      >
                        Insurance
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: arrowNavTab === "4",
                        })}
                        onClick={() => {
                          arrowNavToggle("4");
                        }}
                      >
                        Demat Account
                      </NavLink>
                    </NavItem>
                  </Nav>

                  <TabContent activeTab={arrowNavTab} className="text-muted">
                    <TabPane tabId="1">
                      <Row>
                        <Col xxl={6}>
                          <Card>
                            <CardBody>
                              <div className="live-preview">
                                <Form>
                                  <Row>
                                    <Col md={4}>
                                      <div className="mb-3">
                                        <Label
                                          htmlFor="firstNameinput"
                                          className="form-label text-muted"
                                        >
                                          Employee Name
                                        </Label>
                                        <Select
                                          id="centerName"
                                          name="centerName"
                                          value={selectedSingleEmployeeName}
                                          onChange={(employeeName) => {
                                            handleSelectSingleEmployeeName(
                                              employeeName
                                            );
                                            // validation.setFieldValue(
                                            //   "centerName",
                                            //   centerName.value
                                            // );
                                          }}
                                          options={employeeOptions}
                                          placeholder="Employee Name"
                                        />
                                      </div>
                                    </Col>
                                    <Col md={4}>
                                      <div className="mb-3">
                                        <Label
                                          htmlFor="lastNameinput"
                                          className="form-label text-muted"
                                        >
                                          Bank Name
                                        </Label>
                                        <Select
                                          id="bankName"
                                          name="bankName"
                                          value={selectedSingleBank}
                                          onChange={(bankName) => {
                                            handleSelectSingleBankName(
                                              bankName
                                            );
                                            // validation.setFieldValue(
                                            //   "centerName",
                                            //   centerName.value
                                            // );
                                          }}
                                          options={bankOptions}
                                          placeholder="Bank Name"
                                        />
                                      </div>
                                    </Col>
                                    <Col md={4}>
                                      <div className="mb-3">
                                        <Label
                                          htmlFor="compnayNameinput"
                                          className="form-label text-muted"
                                        >
                                          Client Type
                                        </Label>
                                        <Select
                                          id="clientType"
                                          name="clientType"
                                          value={selectedSingleClientType}
                                          onChange={(clientType) => {
                                            handleSelectSingleClientType(
                                              clientType
                                            );
                                            // validation.setFieldValue(
                                            //   "centerName",
                                            //   centerName.value
                                            // );
                                          }}
                                          options={clientTypeOptions}
                                          placeholder="Client Type"
                                        />
                                      </div>
                                    </Col>
                                    <Col md={4}>
                                      <div className="mb-3">
                                        <Label
                                          htmlFor="phonenumberInput"
                                          className="form-label text-muted"
                                        >
                                          Full Name
                                        </Label>
                                        <Input
                                          type="text"
                                          className="form-control"
                                          placeholder="Enter full name"
                                          id="phonenumberInput"
                                        />
                                      </div>
                                    </Col>
                                    <Col md={4}>
                                      <div className="mb-3">
                                        <Label
                                          htmlFor="emailidInput"
                                          className="form-label text-muted"
                                        >
                                          Mobile Number
                                        </Label>
                                        <Input
                                          type="text"
                                          className="form-control"
                                          placeholder="999999999"
                                          id="emailidInput"
                                        />
                                      </div>
                                    </Col>
                                    <Col md={4}>
                                      <div className="mb-3">
                                        <Label
                                          htmlFor="address1ControlTextarea"
                                          className="form-label text-muted"
                                        >
                                          Current Address
                                        </Label>
                                        <Input
                                          type="text"
                                          className="form-control"
                                          placeholder="Address 1"
                                          id="address1ControlTextarea"
                                        />
                                      </div>
                                    </Col>
                                    <Col md={4}>
                                      <div className="mb-3">
                                        <Label
                                          htmlFor="citynameInput"
                                          className="form-label text-muted"
                                        >
                                          Pin Code
                                        </Label>
                                        <Input
                                          type="text"
                                          className="form-control"
                                          placeholder="Enter pin code"
                                          id="citynameInput"
                                        />
                                      </div>
                                    </Col>
                                    <Col md={4}>
                                      <div className="mb-3">
                                        <Label
                                          htmlFor="ForminputState"
                                          className="form-label text-muted"
                                        >
                                          Client DOB
                                        </Label>
                                        <Flatpickr
                                          className="form-control border dash-filter-picker"
                                          placeholder="Date Range"
                                          options={{
                                            dateFormat: "d M, Y",
                                          }}
                                        />
                                      </div>
                                    </Col>
                                    <Col md={4}>
                                      <div className="mb-3">
                                        <Label
                                          htmlFor="citynameInput"
                                          className="form-label text-muted"
                                        >
                                          Mother Name
                                        </Label>
                                        <Input
                                          type="text"
                                          className="form-control"
                                          placeholder="Enter mother name"
                                          id="citynameInput"
                                        />
                                      </div>
                                    </Col>
                                    <Col md={4}>
                                      <div className="mb-3">
                                        <Label
                                          htmlFor="citynameInput"
                                          className="form-label text-muted"
                                        >
                                          Father Name
                                        </Label>
                                        <Input
                                          type="text"
                                          className="form-control"
                                          placeholder="Enter father name"
                                          id="citynameInput"
                                        />
                                      </div>
                                    </Col>
                                    <Col md={4}>
                                      <div className="mb-3">
                                        <Label
                                          htmlFor="citynameInput"
                                          className="form-label text-muted"
                                        >
                                          Company Name
                                        </Label>
                                        <Input
                                          type="text"
                                          className="form-control"
                                          placeholder="Enter company name"
                                          id="citynameInput"
                                        />
                                      </div>
                                    </Col>
                                    <Col md={4}>
                                      <div className="mb-3">
                                        <Label
                                          htmlFor="citynameInput"
                                          className="form-label text-muted"
                                        >
                                          Company Address
                                        </Label>
                                        <Input
                                          type="text"
                                          className="form-control"
                                          placeholder="Enter company address"
                                          id="citynameInput"
                                        />
                                      </div>
                                    </Col>
                                    <Col md={4}>
                                      <div className="mb-3">
                                        <Label
                                          htmlFor="citynameInput"
                                          className="form-label text-muted"
                                        >
                                          Salary/Gross Income
                                        </Label>
                                        <Input
                                          type="text"
                                          className="form-control"
                                          placeholder="Enter income"
                                          id="citynameInput"
                                        />
                                      </div>
                                    </Col>
                                    <Col md={4}>
                                      <div className="mb-3">
                                        <Label
                                          htmlFor="citynameInput"
                                          className="form-label text-muted"
                                        >
                                          Official Email Id
                                        </Label>
                                        <Input
                                          type="text"
                                          className="form-control"
                                          placeholder="Enter email id"
                                          id="citynameInput"
                                        />
                                      </div>
                                    </Col>
                                    <Col md={4}>
                                      <div className="mb-3">
                                        <Label
                                          htmlFor="citynameInput"
                                          className="form-label text-muted"
                                        >
                                          Pan Card Number
                                        </Label>
                                        <Input
                                          type="text"
                                          className="form-control"
                                          placeholder="Enter Pan no"
                                          id="citynameInput"
                                        />
                                      </div>
                                    </Col>
                                    <Col md={12}>
                                      <div className="text-end">
                                        <button
                                          type="submit"
                                          className="btn btn-primary"
                                        >
                                          Submit
                                        </button>
                                      </div>
                                    </Col>
                                  </Row>
                                </Form>
                              </div>
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2">
                      <h5>Coming Soon!</h5>
                    </TabPane>
                    <TabPane tabId="3">
                      <h5>Coming Soon!</h5>
                    </TabPane>
                    <TabPane tabId="4">
                      <h5>Coming Soon!</h5>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Forms;
