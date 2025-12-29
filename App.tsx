import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import Identificacion from './screens/Identificacion';

import { ConflictProvider, useConflict } from './context/ConflictContext';

/**
 * Protege rutas que requieren login
 */
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useConflict();
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { user } = useConflict();

  return (
    <Routes>
      {/* ENTRADA ÚNICA */}
      <Route
        path="/"
        element={<Navigate to={user ? '/dashboard' : '/login'} replace />}
      />

      {/* LOGIN (SIN LAYOUT, CON LOGO) */}
      <Route path="/login" element={<Login />} />

      {/* APP POST-LOGIN (CON LAYOUT) */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/identificacion"
        element={
          <PrivateRoute>
            <Layout>
              <Identificacion />
            </Layout>
          </PrivateRoute>
        }
      />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <ConflictProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ConflictProvider>
  );
};

export default App;
