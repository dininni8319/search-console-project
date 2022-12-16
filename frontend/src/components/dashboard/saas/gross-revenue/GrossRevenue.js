import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Form, Row, Table, Button } from 'react-bootstrap';
import Flex from 'components/common/Flex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GrossRevenueChart from './GrossRevenueChart';
import FalconLink from 'components/common/FalconLink';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

let grossTableRows = [
  {
    id: 1,
    title: 'Click Totali',
    revenue: 0,
    marketValue: {
      up: false,
      value: '13%'
    }
  },
  {
    id: 2,
    title: 'Impressions',
    revenue: 0,
    marketValue: {
      up: true,
      value: '178%'
    }
  },
  {
    id: 2,
    title: 'CTR Media',
    revenue: 0,
    marketValue: {
      up: true,
      value: '178%'
    }
  },
  {
    id: 3,
    title: 'Posizione Media',
    revenue: 0,
    marketValue: {
      up: false,
      value: '',
    }
  }
];

const GrossRevenue = ({ analytics }) => {
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const [previousMonth, setPreviousMonth] = useState(months[11]);
  const chartRef = useRef(null);
  
  grossTableRows[0].revenue = analytics?.data?.performance?.clicks;
  grossTableRows[1].revenue = analytics?.data?.performance?.impressions;
  grossTableRows[2].revenue = (analytics?.data?.performance?.ctr)?.toFixed(2)  + '%';
  grossTableRows[3].revenue = (analytics?.data?.performance?.position)?.toFixed(2) + '%';

  useEffect(() => {
    if (selectedMonth) {
      const monthIndex = months.indexOf(selectedMonth) - 1;
      const prevMon = monthIndex >= 0 ? months[monthIndex] : months[11];

      setPreviousMonth(prevMon);
    }
  }, [selectedMonth]);

  const handleLegend = (event, name) => {
    chartRef.current.getEchartsInstance().dispatchAction({
      type: 'legendToggleSelect',
      name: name
    });
    event.target.closest('button').classList.toggle('opacity-50');
  };

  return (
    <Card className="h-100">
      <Card.Header>
        <Row className="justify-content-between gx-0">
          <Col xs="auto">
            <h1 className="fs-0 text-900">Performance degl'ultimi tre mesi</h1>
          </Col>
          <Col xs="auto">
            <Form.Select
              size="sm"
              className="pe-4"
              onChange={({ target }) => setSelectedMonth(target.value)}
            >
              {months.map(mon => (
                <option key={mon} value={mon}>
                  {mon}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body className="pt-0 pb-3 h-100">
        <div className="mx-ncard">
          <Table borderless className="font-sans-serif fw-medium fs--1">
            <tbody>
              {grossTableRows.map(row => (
                <tr key={row.id}>
                  <td className="pb-2 pt-0">{row.title}</td>
                  <td className="pb-2 pt-0 text-end" style={{ width: '20%' }}>
                    {row.revenue}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <GrossRevenueChart
            ref={chartRef}
            selectedMonth={selectedMonth}
            previousMonth={previousMonth}
            analytics={analytics}
            className="px-3 h-100"
            style={{ minHeight: '14.375rem' }}
          />
        </div>
      </Card.Body>
      <Card.Footer as={Flex} className="border-top py-2 flex-between-center">
        <Flex>
          <Button
            variant="text"
            size="sm"
            className="d-flex align-items-center p-0 shadow-none"
            onClick={() => handleLegend(event, 'currentMonth')}
          >
            <FontAwesomeIcon
              icon="circle"
              className="text-primary fs--2 me-1"
            />
            <span className="text">{selectedMonth}</span>
          </Button>
          <Button
            variant="text"
            size="sm"
            className="d-flex align-items-center p-0 shadow-none ms-2"
            onClick={() => handleLegend(event, 'prevMonth')}
          >
            <FontAwesomeIcon icon="circle" className="text-300 fs--2 me-1" />
            <span className="text">{previousMonth}</span>
          </Button>
        </Flex>
        <FalconLink title="View report" className="px-0" />
      </Card.Footer>
    </Card>
  );
};

GrossRevenue.propTypes = {
  data: PropTypes.shape({
    Jan: PropTypes.array.isRequired,
    Feb: PropTypes.array.isRequired,
    Mar: PropTypes.array.isRequired,
    Apr: PropTypes.array.isRequired,
    May: PropTypes.array.isRequired,
    Jun: PropTypes.array.isRequired,
    Jul: PropTypes.array.isRequired,
    Aug: PropTypes.array.isRequired,
    Sep: PropTypes.array.isRequired,
    Oct: PropTypes.array.isRequired,
    Nov: PropTypes.array.isRequired,
    Dec: PropTypes.array.isRequired
  }).isRequired
};

export default GrossRevenue;
