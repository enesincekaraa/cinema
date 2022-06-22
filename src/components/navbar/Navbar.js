import React from 'react';
import { Row, Col, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import './Navbar.css';
import { logout } from '../../authSlice';
export const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  let navLinkClassName = 'navbar__link';
  let activeClassName = 'navbar__link navbar__link--active';

  const dropdownClick = (value) => {
    switch (value) {
      case 'logout':
        dispatch(logout());
        break;
      case 'purchase':
        navigate('/purchased-films');
      default:
        break;
    }
  };

  return (
    <nav className="navbar" style={{ padding: '30px 0' }}>
      <Row className=" d-flex justify-content-center align-items-center" style={{ width: '100%' }}>
        <Col>
          <span>Erasta Sinema</span>
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? activeClassName : navLinkClassName)}>
            Ana Sayfa
          </NavLink>
          {user && (
            <NavDropdown
              onSelect={(e) => dropdownClick(e)}
              title={
                <div className="navbar__dropdown-title d-flex justify-content-center align-items-center">
                  {user.name.charAt(0)}
                </div>
              }
              id="basic-nav-dropdown">
              <NavDropdown.Item eventKey="purchase">Satın Aldıklarım</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item eventKey="logout">Çıkış Yap</NavDropdown.Item>
            </NavDropdown>
          )}
          {!user && (
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? activeClassName : navLinkClassName)}>
              Giriş Yap
            </NavLink>
          )}
        </Col>
      </Row>
    </nav>
  );
};
