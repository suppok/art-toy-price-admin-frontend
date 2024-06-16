import React from 'react';
import { Sidenav, Nav } from 'rsuite';
import { Link } from 'react-router-dom';
import PeoplesIcon from '@rsuite/icons/legacy/Peoples';

const CustomSidenav = () => {
  return (
    <div className="sidenav-container">
      <Sidenav defaultOpenKeys={['1']} className="nav-item">
        <Sidenav.Body>
          <Nav>
            <Nav.Item
              as={Link}
              to="/artist"
              icon={<PeoplesIcon />}
              className="nav-item"
            >
              Artist
            </Nav.Item>
            <Nav.Item
              as={Link}
              to="/series"
              icon={<PeoplesIcon />}
              className="nav-item"
            >
              Series
            </Nav.Item>
            <Nav.Item
              as={Link}
              to="/collection"
              icon={<PeoplesIcon />}
              className="nav-item"
            >
              Collection
            </Nav.Item>
            <Nav.Item
              as={Link}
              to="/character"
              icon={<PeoplesIcon />}
              className="nav-item"
            >
              Character
            </Nav.Item>
            <Nav.Item
              as={Link}
              to="/reseller"
              icon={<PeoplesIcon />}
              className="nav-item"
            >
              Reseller
            </Nav.Item>
            <Nav.Item
              as={Link}
              to="/sale"
              icon={<PeoplesIcon />}
              className="nav-item"
            >
              Sale
            </Nav.Item>
            {/* <Nav.Menu eventKey="3" title="Advanced" icon={<MagicIcon />}>
              <Nav.Item eventKey="3-1">Geo</Nav.Item>
              <Nav.Item eventKey="3-2">Devices</Nav.Item>
              <Nav.Item eventKey="3-3">Loyalty</Nav.Item>
              <Nav.Item eventKey="3-4">Visit</Nav.Item>
            </Nav.Menu> */}
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};

export default CustomSidenav;
