import React from 'react';
import { Sidenav, Nav } from 'rsuite';
import { Link } from 'react-router-dom';
import PeoplesIcon from '@rsuite/icons/legacy/Peoples';

const CustomSidenav = () => {
  return (
    <div className="sidenav-container" style={{ width: 240 }}>
      <Sidenav defaultOpenKeys={['1']} activeKey="1">
        <Sidenav.Body>
          <Nav>
            <Nav.Item as={Link} to="/artist" icon={<PeoplesIcon />}>
              Artist
            </Nav.Item>
            <Nav.Item as={Link} to="/series" icon={<PeoplesIcon />}>
              Series
            </Nav.Item>
            <Nav.Item as={Link} to="/collection" icon={<PeoplesIcon />}>
              Collection
            </Nav.Item>
            <Nav.Item as={Link} to="/character" icon={<PeoplesIcon />}>
              Character
            </Nav.Item>
            <Nav.Item as={Link} to="/reseller" icon={<PeoplesIcon />}>
              Reseller
            </Nav.Item>
            <Nav.Item as={Link} to="/sale" icon={<PeoplesIcon />}>
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
