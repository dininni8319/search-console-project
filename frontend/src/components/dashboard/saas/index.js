import React from 'react';
import { Col, Row } from 'react-bootstrap';
import LinePayment from './line-payment/LinePayment';
import {
  grossRevenue,
  candleChartData
} from 'data/dashboard/saas';
import SaasActiveUser from './SaasActiveUser';
import SaasRevenue from './SaasRevenue';
import SaasConversion from './SaasConversion';
import DepositeStatus from './DepositeStatus';
import StatisticsCards from './stats-cards/StatisticsCards';
import TransactionSummary from './TransactionSummary';
import GrossRevenue from './gross-revenue/GrossRevenue';
const Saas = ({ analytics }) => {

  return (
    <>
      <Row className="g-3">
        <Col xxl={9} className="g-3">
          <LinePayment analytics={analytics}/>
        </Col>
        <Col xxl={3}>
          <StatisticsCards data={analytics?.data}/>
        </Col>
      </Row>
      <Row className="g-3">
        <Col xxl={2}>
          <SaasActiveUser data={analytics?.data?.performance} title='Click Totali' />
        </Col>
        <Col xxl={2}>
           <SaasRevenue data={analytics?.data?.performance} title="Impressions"/>
        </Col>
        <Col xxl={2}>
          <SaasConversion data={analytics?.data?.performance.position} title='Posizione Media' color='text-primary'/>
        </Col>
        <Col xxl={3}>
          <SaasConversion data={analytics?.data?.performance?.ctr} title='CTR Media' color='text-danger'/>
        </Col>
      </Row>
      
      <Row className="g-3 mb-3">
        <Col xxl={9}>
          <DepositeStatus />
          
          <Row className="g-3">
            <Col xs={12}>
            </Col>
            <Col lg={4}>
             
            </Col>
            <Col lg={8}>
              <GrossRevenue data={grossRevenue} />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Saas;
