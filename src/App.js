import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home/Home';
import { Login } from './pages/login/Login';
import { AuthLayout } from './layouts/auth/AuthLayout';
import Background from './images/Picture.png';
import { Register } from './pages/register/Register';
import { Toaster } from 'react-hot-toast';
import MainLayout from './layouts/main/MainLayout';
import { Detail } from './pages/detail/Detail';
import { Ticket } from './pages/ticket/Ticket';
import { Purchased } from './pages/purchased/Purchased';
import { ProtectedRoute } from './components/protected/ProtectedRoute';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<Detail />} />

            <Route
              path="/detail/:id/ticket"
              element={
                <ProtectedRoute>
                  <Ticket />
                </ProtectedRoute>
              }
            />
            <Route
              path="/purchased-films"
              element={
                <ProtectedRoute>
                  <Purchased />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
