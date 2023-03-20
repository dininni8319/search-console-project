import React, { useContext } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import editing from 'assets/img/icons/spot-illustrations/21.png';
import { GoogleContext } from 'context/Google/index';
import GoogleIcon from 'assets/img/icons/icons8-google.png';

const Starter = () => {
  const { handleGoogleLogin } = useContext(GoogleContext);

  return (
    <Card>
      <Card.Body className="overflow-hidden p-lg-6">
        <Row className="align-items-center justify-content-between">
          <Col lg={6}>
            <img src={editing} className="img-fluid" alt="" />
          </Col>
          <Col lg={6} className="ps-lg-4 my-5 text-center text-lg-start">
            <h3 className="text-primary">Collega Search Console</h3>
            <p className="lead">Create Something Beautiful.</p>
            <Button
              variant="falcon-primary"
              as={Link}
              onClick={handleGoogleLogin}
              className="bg-primary"
            >
              <span className="bg-white p-2 ms-0">
                <img
                  src={GoogleIcon}
                  width="40px"
                  height="40px"
                  className="py-1"
                />
              </span>
              <span className="ps-2 text-white">Entra con google</span>
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Starter;
