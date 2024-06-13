import React from 'react';
import { Navbar, Nav } from 'rsuite';
import HomeIcon from '@rsuite/icons/legacy/Home';
import InfoIcon from '@rsuite/icons/legacy/Info';
import UserIcon from '@rsuite/icons/legacy/User';

const CustomNavbar = () => {
  return (
    <Navbar>
      <Navbar.Brand href="#">Brand</Navbar.Brand>
      <Nav>
        <Nav.Item icon={<HomeIcon />} href="#">
          Home
        </Nav.Item>
        <Nav.Item icon={<InfoIcon />} href="#">
          About
        </Nav.Item>
        <Nav.Item icon={<UserIcon />} href="#">
          Contact
        </Nav.Item>
      </Nav>
      <Nav pullRight>
        <Nav.Item href="#">Login</Nav.Item>
        <Nav.Item href="#">Sign Up</Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default CustomNavbar;
