import React from 'react';
import { Link } from "react-router-dom";
import { Navbar,NavDropdown, Nav, Form, FormControl, Button } from 'react-bootstrap';

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#">Search Console</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav className="ms-auto my-2 my-lg-0">
          <Link to="/login" className='pe-3'>Entra</Link>
          <Link to="/register" className='pe-3'>Registrati</Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar;