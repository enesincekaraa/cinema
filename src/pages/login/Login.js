import React, { useState } from 'react';
import { Box, Row, Stack, Form, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { login } from '../../authSlice';

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  const from = location.state?.from || '/';
  const loginUser = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
    navigate(from, { replace: true });
  };

  return (
    <Stack>
      <h2>Giriş Yap</h2>
      <Form onSubmit={loginUser} style={{ marginTop: '64px' }}>
        <Form.Group
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}>
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" required placeholder="name@example.com" />
        </Form.Group>
        <Form.Group
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          style={{ marginTop: '40px' }}>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" required />
        </Form.Group>
        <div className="d-grid" style={{ marginTop: '66px' }}>
          <Button type="submit" variant="auth">
            Giriş Yap
          </Button>
          <span className=" text-center" style={{ marginTop: '24px' }}>
            or
          </span>
          <Button
            onClick={() => {
              navigate('/register');
            }}
            variant="outline-secondary"
            style={{ marginTop: '8px' }}>
            Üye Ol
          </Button>
        </div>
      </Form>
    </Stack>
  );
};
