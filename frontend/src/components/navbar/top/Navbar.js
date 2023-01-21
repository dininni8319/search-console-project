import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const NavBar = () => {
  const { t } = useTranslation();
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#">Search Console</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav className="ms-auto my-2 my-lg-0">
          <Link to="/login" className="pe-3">
            {t('enter')}
          </Link>
          <Link to="/register" className="pe-3">
            {t('register')}
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
