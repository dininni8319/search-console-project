import React, { useContext } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GoogleContext } from 'context/Google/index';

const SocialAuthButtons = () => {
  const { handleGoogleLogin } = useContext(GoogleContext);

  return (
    <Form.Group className="mb-0">
      <Row>
        <Col sm={12} className="pe-sm-1">
          <Button
            variant=""
            size="sm"
            className="btn-outline-google-plus mt-2 w-100"
            onClick={handleGoogleLogin}
          >
            <FontAwesomeIcon
              icon={['fab', 'google-plus-g']}
              transform="grow-8"
              className="me-2"
            />{' '}
            google
          </Button>
        </Col>
      
      </Row>
    </Form.Group>
  );
};

export default SocialAuthButtons;
