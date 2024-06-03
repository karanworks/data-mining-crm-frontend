import React from "react";
import { Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import comingsoon from "../../assets/images/comingsoon.png";

const Home = () => {
  document.title = "Home ";
  return (
    <React.Fragment>
      <div className="page-content ">
        <Container fluid>
          <BreadCrumb title="Home" pageTitle="Dashboard" />
          <Row>
            <Col xs={12}>
              <div className="text-center mt-sm-5 pt-4 mb-4 ">
                <div className="mb-sm-5 pb-sm-4 pb-5">
                  <img
                    src={comingsoon}
                    alt=""
                    height="120"
                    className="move-animation"
                  />
                </div>
                <div className="mb-5">
                  <h1 className="display-2 text-primary fw-bold">
                    Coming Soon
                  </h1>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Home;
