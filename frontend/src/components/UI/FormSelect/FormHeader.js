import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Background from 'components/common/Background';
import bg2 from 'assets/img/icons/spot-illustrations/corner-2.png';
import { useTranslation } from 'react-i18next';

const FormHeader = ({ title }) => {
  const { t } = useTranslation();

  return (
    <Col xs={11} md={8} xxl={8}>
      <Card className="h-100 py-3">
        <Background image={bg2} className="bg-card" />
        <Card.Body>
          <Row className="flex-column">
            <Col className="d-md-flex d-lg-block flex-between-center">
              <h2 className="mb-md-0 mb-lg-2">{title}</h2>
            </Col>
            <Col xs="auto">
              <p className="fw-normal text-700">{t('search_property')}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default FormHeader;
