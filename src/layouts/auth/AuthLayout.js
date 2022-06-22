import React from 'react';
import { Container } from 'react-bootstrap';
import { Outlet, useLocation } from 'react-router';
import Background from '../../images/Picture.png';
import Register from '../../images/Register.jpg';
import './AuthLayout.css';
export const AuthLayout = () => {
  const location = useLocation();
  const bgPath = location.pathname === '/login' ? Background : Register;
  return (
    <Container
      className="auth-layout"
      fluid
      style={{
        backgroundImage: `url(${bgPath})`,
        height: '100vh',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}>
      <div className="auth-layout__container" style={{marginRight:"200px"}}>
        <Outlet />
      </div>
    </Container>
  );
};
