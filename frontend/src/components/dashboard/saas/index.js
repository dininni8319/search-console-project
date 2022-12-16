import React from 'react';
import { Col, Row } from 'react-bootstrap';
import LinePayment from './line-payment/LinePayment';
import SaasActiveUser from './SaasActiveUser';
import SaasRevenue from './SaasRevenue';
import SaasConversion from './SaasConversion';
import DepositeStatus from './DepositeStatus';
import StatisticsCards from './stats-cards/StatisticsCards'
import GrossRevenue from './gross-revenue/GrossRevenue';
import DoMoreCard from './DoMoreCard';

const Saas = ({ analytics, isOpen, setIsOpen }) => {

  return (
    <>
      <Row className="g-2">
        <Col xxl={9}>
          <LinePayment 
            analytics={analytics}
            isOpen={isOpen} 
            setIsOpen={setIsOpen}
          />
        </Col>
        <Col>
          <Row className="g-2">
            <Col xxl={12}>
            <StatisticsCards data={analytics?.data}/>
            </Col>
    
          </Row>
        </Col>
      </Row>
      <Row className="g-3 mb-2">
        <Col xxl={9}>
          <DepositeStatus />
          <Row className="g-2">
            <Col md xxl={3}>
                <SaasActiveUser data={analytics?.data?.performance} title='Click Totali' />
            </Col>
            <Col xxl={3}>
              <SaasRevenue data={analytics?.data?.performance} title="Impressions"/>
            </Col>
            <Col xxl={3}>
              <SaasConversion data={analytics?.data?.performance?.position} title='Posizione Media' color='text-primary'/>
            </Col>
            <Col xxl={3}>
              <SaasConversion data={analytics?.data?.performance?.ctr} title='CTR Media' color='text-danger'/>
            </Col>
            <Col lg={12}>
              <GrossRevenue analytics={analytics} />            
            </Col>
          </Row>
        </Col>
        <Col xxl={3}>
          <Row className="g-3 mt-2">
            <Col md xxl={12}>
              <DoMoreCard />
            </Col>
          </Row>
        </Col>
      </Row>
      {/* <TransactionSummary data={transactionSummary} /> */}
    </>

  
  );
};

export default Saas;
