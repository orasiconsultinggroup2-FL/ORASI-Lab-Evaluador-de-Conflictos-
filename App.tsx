import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import Layout from "./components/Layout";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const isAuth = localStorage.getItem("orasi_auth") === "true";
  return isAuth ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
