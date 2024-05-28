import React from "react";
import { Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";

const AssignData = () => {
  document.title = "Assign Data";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Assign Data" pageTitle="Uploads" />
          <Row>
            <Col xs={12}></Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AssignData;
