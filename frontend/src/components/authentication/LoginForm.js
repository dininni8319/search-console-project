import Divider from 'components/common/Divider';
import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import SocialAuthButtons from './SocialAuthButtons';
import { ConfigContext } from 'context/Config/index';
import { useNavigate } from 'react-router';
import { AuthContext } from 'context/Auth/index';
import { useTranslation } from 'react-i18next';
import Flex from 'components/common/Flex';

const LoginForm = ({ hasLabel, layout }) => {
  const [ error, setError ] = useState(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { api_urls } = useContext(ConfigContext);

  const [ message, setMessage ] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });

  const handleLogin = event => {
    event.preventDefault();
    setError(null);

    fetch(`${api_urls.backend}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: error ? null : formData?.email,
        password: error ? null : formData?.password,
      })
    })
      .then(response => response.json())
      .then(data => {
        const token = data.token;

        if (token && !error) {
          fetch(`${api_urls.backend}/view-profile`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
            .then(response => response.json())
            .then(data => {
              let username = `${data.data.name}`;

              toast.success(`Logged in as ${formData.email}`, {
                theme: 'colored'
              });
              login(username, token, data.data.id);
              navigate('/auth_google');

            });
        } else {
          if (Array.isArray(data.message.password)) {
            setError(prev => [...data.message.password])
          } else {
           setError(prev => data.message)
          }
        }
      });
  };

  const handleFieldChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>{t('email_address')}</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Email address' : ''}
          value={formData.email}
          name="email"
          onChange={handleFieldChange}
          type="email"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Password</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Password' : ''}
          value={formData.password}
          name="password"
          onChange={handleFieldChange}
          type="password"
        />
      </Form.Group>

      <Row className="justify-content-between align-items-center">
        <Col xs="auto">
          <Form.Check type="checkbox" id="rememberMe" className="mb-0">
            <Form.Check.Input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={e =>
                setFormData({
                  ...formData,
                  remember: e.target.checked
                })
              }
            />
            <Form.Check.Label className="mb-0 text-700">
              {t('remember_me')}
            </Form.Check.Label>
          </Form.Check>
        </Col>

        <Col xs="auto">
          <Link
            className="fs--1 mb-0"
            to={`/authentication/${layout}/forgot-password`}
          >
            {t('forgot_password')}
          </Link>
        </Col>
        <Flex justifyContent='center'>
          {error && <span className='text-danger py-2 text-sm'>{error}</span>}
        </Flex>
      </Row>

      <Form.Group>
        {message && <span className='text-danger'>{message}</span>}
        <Button
          type="submit"
          color="primary"
          className="mt-3 w-100"
          disabled={!formData.email || !formData.password}
        >
          {t('login')}
        </Button>
      </Form.Group>

      <Divider className="mt-4">{t('or_log')}</Divider>

      <SocialAuthButtons />
    </Form>
  );
};

LoginForm.propTypes = {
  layout: PropTypes.string,
  hasLabel: PropTypes.bool
};

LoginForm.defaultProps = {
  layout: 'simple',
  hasLabel: false
};

export default LoginForm;
