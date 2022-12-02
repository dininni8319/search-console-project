import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Divider from 'components/common/Divider';
import SocialAuthButtons from './SocialAuthButtons';

const RegistrationForm = ({ hasLabel, handleGoogleLogin }) => {
  // State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    isAccepted: false
  });


  const handleRegister = (event) => {
    event.preventDefault();

    if (formData.password === formData.password_confirmation) {

      fetch(`http://localhost:8000/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (response.ok) {
            navigate("/");
            return response.json();
          } else {
            alert("ops..");
          }
        })
        .then(() => {
          fetch(`${api_urls.backend}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: email.value,
              password: password.value,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data, 'testing the data');
              const token = data.token;

              /// una volta ricevuto il token, possiamo richiedere informazioni come username e email ad esempio
              //alla rotta view profile
              // fetch(`${api_urls.backend}/api/view-profile`, {
              //   method: "GET",
              //   headers: {
              //     Authorization: `Bearer ${token}`,
              //   },
              // })
              //   .then((response) => response.json())
              //   .then((data) => {
              //     login(data.data.name, token, data.data.id);
              //     navigate("/adminarea"); //object history;
              //   });
            });
        });
    } else {
      alert("the passwords are not the same");
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

      <SocialAuthButtons handleGoogleLogin={handleGoogleLogin}/>
    </Form>
  );
};

RegistrationForm.propTypes = {
  hasLabel: PropTypes.bool
};

export default RegistrationForm;
