import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Form, Row } from 'react-bootstrap';
import Flex from 'components/common/Flex';
import LinePaymentChart from './LinePaymentChart';

const LinePayment = ({ analytics }) => {
  const chartRef = useRef(null);

  return (
    <Card className="rounded-3 overflow-hidden shadow-none h-90">
      <Card.Body
        className="bg-line-chart-gradient"
        as={Flex}
        justifyContent="between"
        direction="column"
      >
        <Row className="align-items-center g-0">
          <Col className="light">
            <h4 className="text-white mb-0">Click Totali</h4>
            <p className="fs--3 fw-semi-bold text-white">
              {analytics?.data?.performance?.clicks}
            </p>
          </Col>
          {/* <Col xs="auto" className="d-none d-sm-block">
            <Form.Select
              size="sm"
              className="mb-3"
              onChange={e => setPaymentStatus(e.target.value)}
            >
              <option value="all">All Payments</option>
              <option value="successful">Successful Payments</option>
              <option value="failed">Failed Payments</option>
            </Form.Select>
          </Col> */}
        </Row>
        <LinePaymentChart
          analytics={analytics}
          ref={chartRef}
          style={{ height: '300px' }}
        />
      </Card.Body>
    </Card>
  );
};

LinePayment.propTypes = {
  data: PropTypes.shape({
    all: PropTypes.array,
    successful: PropTypes.array,
    failed: PropTypes.array
  })
};

export default LinePayment;
