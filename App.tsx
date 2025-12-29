import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import Identification from "./screens/Identification";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN (SIN LAYOUT) */}
        <Route path="/login" element={<Login />} />

        {/* APP (CON LAYOUT) */}
        <Route
          path="/"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        <Route
          path="/identification"
          element={
            <Layout>
              <Identification />
            </Layout>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
