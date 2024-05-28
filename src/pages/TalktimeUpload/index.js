import React from "react";
import { Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";

const TalktimeUpload = () => {
  document.title = "Talktime Upload";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Talktime Upload" pageTitle="Uploads" />
          <Row>
            <Col xs={12}></Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default TalktimeUpload;
