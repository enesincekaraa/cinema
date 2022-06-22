import React from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router';
import { Navbar } from '../../components/navbar/Navbar';

export default function MainLayout() {
  return (
    <Container>
      <Navbar />
      <div style={{ marginTop: '100px', paddingBottom: '50px' }}>
        <Outlet />
      </div>
    </Container>
  );
}
