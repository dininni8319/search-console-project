import React, { useState, useContext, useReducer } from 'react';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Divider from 'components/common/Divider';
import SocialAuthButtons from './SocialAuthButtons';
import { ConfigContext } from 'context/Config/index';
import { AuthContext } from 'context/Auth/index';

const initialState = {
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  isAccepted: false
};

const reducer = (state, action) => {
  return { ...state, [action.input]: action.value };
};

const RegistrationForm = ({ hasLabel, handleGoogleLogin }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { api_urls } = useContext(ConfigContext);
  // State

  const handleChange = e => {
    const { name, value, checked } = e.target;
    const action = {
      input: name,
      value: name === 'isAccepted' ? checked : value
    };
    dispatch(action);
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    isAccepted: false
  });

  const handleRegister = event => {
    event.preventDefault();

    if (formData.password === formData.password_confirmation) {
      fetch(`${api_urls.backend}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
        .then(response => {
          if (response.ok) {
            navigate('/auth_google');
            return response.json();
          } else {
            alert('ops..');
          }
        })
        .then(() => {
          fetch(`${api_urls.backend}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password
            })
          })
            .then(response => response.json())
            .then(data => {
              const token = data.token;

              fetch(`${api_urls.backend}/view-profile`, {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${token}`
                }
              })
                .then(response => response.json())
                .then(data => {
                  login(data.data.name, token, data.data.id);
                  navigate('/auth_google'); //object history;
                });
            });
        });
    } else {
      alert('the passwords are not the same');
    }
  };

  // Handler
  const handleSubmit = e => {
    e.preventDefault();
    toast.success(`Successfully registered as ${formData.name}`, {
      theme: 'colored'
    });
  };

  const handleFieldChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Form onSubmit={handleRegister}>
      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Name</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Name' : ''}
          value={formData.name}
          name="name"
          onChange={handleFieldChange}
          type="text"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Email address</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Email address' : ''}
          value={formData.email}
          name="email"
          onChange={handleFieldChange}
          type="text"
        />
      </Form.Group>

      <Row className="g-2 mb-3">
        <Form.Group as={Col} sm={6}>
          {hasLabel && <Form.Label>Password</Form.Label>}
          <Form.Control
            placeholder={!hasLabel ? 'Password' : ''}
            value={formData.password}
            name="password"
            onChange={handleFieldChange}
            type="password"
          />
        </Form.Group>
        <Form.Group as={Col} sm={6}>
          {hasLabel && <Form.Label>Confirm Password</Form.Label>}
          <Form.Control
            placeholder={!hasLabel ? 'Confirm Password' : ''}
            value={formData.password_confirmation}
            name="password_confirmation"
            onChange={handleFieldChange}
            type="password"
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3">
        <Form.Check type="checkbox" id="acceptCheckbox" className="form-check">
          <Form.Check.Input
            type="checkbox"
            name="isAccepted"
            checked={formData.isAccepted}
            onChange={e =>
              setFormData({
                ...formData,
                isAccepted: e.target.checked
              })
            }
          />

          <Form.Check.Label className="form-label">
            I accept the <Link to="#!">terms</Link> and{' '}
            <Link to="#!">privacy policy</Link>
          </Form.Check.Label>
        </Form.Check>
      </Form.Group>

      <Form.Group className="mb-4">
        <Button
          className="w-100"
          type="submit"
          disabled={
            !formData.name ||
            !formData.email ||
            !formData.password ||
            !formData.password_confirmation ||
            !formData.isAccepted
          }
        >
          Register
        </Button>
      </Form.Group>
      <Divider>or register with</Divider>

      <SocialAuthButtons handleGoogleLogin={handleGoogleLogin} />
    </Form>
  );
};

RegistrationForm.propTypes = {
  hasLabel: PropTypes.bool
};

export default RegistrationForm;
