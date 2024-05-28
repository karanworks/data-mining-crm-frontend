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

const Forms = () => {
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
                                        <Input
                                          type="text"
                                          className="form-control"
                                          placeholder="Enter your Employee "
                                          id="firstNameinput"
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
                                        <Input
                                          type="text"
                                          className="form-control"
                                          placeholder="Enter your lastname"
                                          id="lastNameinput"
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
                                        <Input
                                          type="text"
                                          className="form-control"
                                          placeholder="Enter company name"
                                          id="compnayNameinput"
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
                                          placeholder="Enter your city"
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
                                        <select
                                          id="ForminputState"
                                          className="form-select text-muted"
                                          data-choices
                                          data-choices-sorting="true"
                                        >
                                          <option>Choose...</option>
                                          <option>...</option>
                                        </select>
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
                                          placeholder="Enter your city"
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
                                          placeholder="Enter your city"
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
                                          placeholder="Enter your city"
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
                                          placeholder="Enter your city"
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
                                          placeholder="Enter your city"
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
                                          placeholder="Enter your city"
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
                                          placeholder="Enter your city"
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
