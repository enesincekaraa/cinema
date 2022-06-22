import React, { useState } from 'react';
import { Box, Row, Stack, Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import {useNavigate} from "react-router-dom"
import { register } from '../../authSlice';

export const Register = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const addUser = (e) => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
    navigate("/login")
  };
  return (
    <Stack>
      <h2>Üye Ol</h2>
      <Form onSubmit={addUser} style={{ marginTop: '64px' }}>
        <Form.Group
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" required placeholder="Jack" />
        </Form.Group>
        <Form.Group
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          style={{ marginTop: '40px' }}>
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
            Üye Ol
          </Button>
        </div>
      </Form>
    </Stack>
  );
};
