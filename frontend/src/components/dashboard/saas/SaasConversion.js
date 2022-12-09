import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import SoftBadge from 'components/common/SoftBadge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CountUp from 'react-countup';
import Background from 'components/common/Background';
import bg3 from 'assets/img/icons/spot-illustrations/corner-3.png';

const SaasConversion = ( { data, title, color }) => {
  return (
    <Card className="h-100">
      <Background image={bg3} className="bg-card" />
      <Card.Body>
        <Row className="flex-column">
          <Col className="d-md-flex d-lg-block flex-between-center">
            <h6 className="mb-md-0 mb-lg-2">{title}</h6>
          </Col>
          <Col xs="auto">
            <h4 className={`fs-3 fw-normal ${color}`}>
              <CountUp
                start={0}
                end={data}
                suffix="%"
                duration={2.75}
                decimals={2}
                decimal="."
              />
            </h4>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default SaasConversion;
