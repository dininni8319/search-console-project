import { useState, useContext, useReducer } from 'react';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Divider from 'components/common/Divider';
import SocialAuthButtons from './SocialAuthButtons';
import { ConfigContext } from 'context/Config/index';
import { AuthContext } from 'context/Auth/index';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { api_urls } = useContext(ConfigContext);
  const [ error, setError ] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    isAccepted: false
  });

  const handleRegister = event => {
    event.preventDefault();
    setError(null)
    if (formData.password === formData.password_confirmation) {
      fetch(`${api_urls.backend}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
        .then((response) => response.json())
        .then((data)  => {
          if (data) {
            if (Array.isArray(data.message.email)) {
              setError(prev => [...data.message.email]);
            } else {
              setError(prev => data.message);
            }
          }
       })
        .then(() => {
          console.log(error);
          if (error) {
            return;
          } else {
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
  
                fetch(`${api_urls.backend}/view-profile`, {
                  method: 'GET',
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                })
                  .then(response => response.json())
                  .then((data) => {
                    if (data.success && !error) {
                      login(data.data.name, token, data.data.id);
                      navigate('/auth_google'); 
                    } else {
                      if (Array.isArray(data.message.email)) {
                        setError(prev => [...data.message.email])
                      } else {
                       setError(prev => data.message)
                      }
                    }
                  });
              });

          }
        });
    } else {
      setError('the passwords are not the same');
    }
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
        {hasLabel && <Form.Label>{t('name')}</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Name' : ''}
          value={formData.name}
          name="name"
          onChange={handleFieldChange}
          type="text"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>{t('email_address')}</Form.Label>}
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
          {hasLabel && <Form.Label>{t('confirm_pass')}</Form.Label>}
          <Form.Control
            placeholder={!hasLabel ? `${t('confirm_pass')}` : ''}
            value={formData.password_confirmation}
            name="password_confirmation"
            onChange={handleFieldChange}
            type="password"
          />
        </Form.Group>
        <div className='py-2'>
          {error && <span className='text-danger text-sm'>{error}</span>}
        </div>
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
           {t('accept')}<Link to="#!"> {t('termini')}</Link> {t("and")}{' '}
            <Link to="#!">{t('privacy')}</Link>
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
          {t("register")}
        </Button>
      </Form.Group>
      <Divider>{t('or_log')}</Divider>

      <SocialAuthButtons handleGoogleLogin={handleGoogleLogin} />
    </Form>
  );
};

RegistrationForm.propTypes = {
  hasLabel: PropTypes.bool
};

export default RegistrationForm;
