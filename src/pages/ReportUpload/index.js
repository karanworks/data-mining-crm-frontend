import React from "react";
import { Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";

const ReportUpload = () => {
  document.title = "Report Upload";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Report Upload" pageTitle="Uploads" />
          <Row>
            <Col xs={12}></Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ReportUpload;
