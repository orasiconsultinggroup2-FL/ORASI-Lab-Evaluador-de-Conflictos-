import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import Identification from "./screens/Identification";

import { ConflictProvider, useConflict } from "./context/ConflictContext";

/**
 * Protección de rutas:
 * - Si no hay usuario → Login
 * - Si hay usuario → App
 */
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useConflict();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* LOGIN */}
      <Route path="/login" element={<Login />} />

      {/* APP PROTEGIDA */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/identification"
        element={
          <ProtectedRoute>
            <Layout>
              <Identification />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* CATCH ALL */}
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
