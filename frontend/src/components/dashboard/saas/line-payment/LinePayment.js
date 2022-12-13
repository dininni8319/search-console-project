import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Form, Row } from 'react-bootstrap';
import Flex from 'components/common/Flex';
import LinePaymentChart from './LinePaymentChart';
import Modal from '../../../UI/Modal/Modal';

const LinePayment = ({ analytics, isOpen, setIsOpen }) => {
  const chartRef = useRef(null);

  const closeModal = () => setIsOpen(false)
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
            <h4 className="text-white mb-0">Click Totali</h4>
            <p className="fs--3 fw-semi-bold text-white">
              {analytics?.data?.performance?.clicks}
            </p>
          </Col>
          <Col xs="auto" className="d-none d-sm-block">
           {isOpen && <Modal 
              closeModal={closeModal}
              title="Customizza la tua Ricerca"
              // message="sel"
              confirmMessage="Elimina"
              declineMessage="Annulla"
              // action={handleDelete}
            />}
            <button className='btn btn-warning text-white' onClick={() => setIsOpen(true)}>Seleziona una data</button>
          
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
