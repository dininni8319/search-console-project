import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Row } from 'react-bootstrap';
import Flex from 'components/common/Flex';
import LinePaymentChart from './LinePaymentChart';
import { useTranslation } from 'react-i18next';

const LinePayment = ({ analytics, setIsOpen }) => {
  const { t } = useTranslation();

  const chartRef = useRef(null);
  const handleClick = event => {
    event.preventDefault();
    setIsOpen(true);
  };
  return (
    <Card className="rounded-3 overflow-hidden shadow-none h-90">
      <Card.Body
        className="bg-line-chart-gradient pb-5"
        as={Flex}
        justifyContent="between"
        direction="column"
      >
        <Row className="align-items-center g-0">
          <Col className="light">
            <h4 className="text-white mb-0">{t('total_clicks')}</h4>
            <p className="fs--3 fw-semi-bold text-white">
              {analytics?.data?.performance?.clicks > 0 && analytics?.data?.performance?.clicks}
              {analytics?.data?.performance?.clicks === 0 && t('no_data')}
            </p>
          </Col>
          <Col xs="auto" className="d-sm-block">
            <button
              type="button"
              className="btn btn-warning text-white"
              onClick={e => handleClick(e)}
            >
              {t('select_date')}
            </button>
          </Col>
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
