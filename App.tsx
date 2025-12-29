import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./screens/Login";
import Layout from "./components/Layout";

// Screens
import Dashboard from "./screens/Dashboard";
import Identification from "./screens/Identification";
import ActorMapping from "./screens/ActorMapping";
import RiskAssessment from "./screens/RiskAssessment";
import Dynamics from "./screens/Dynamics";
import Repository from "./screens/Repository";
import History from "./screens/History";
import Guide from "./screens/Guide";
import FinalReport from "./screens/FinalReport";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN – pantalla limpia, sin layout */}
        <Route path="/" element={<Login />} />

        {/* APP – todo lo demás va con Layout */}
        <Route path="/app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="identification" element={<Identification />} />
          <Route path="actors" element={<ActorMapping />} />
          <Route path="risk" element={<RiskAssessment />} />
          <Route path="dynamics" element={<Dynamics />} />
          <Route path="repository" element={<Repository />} />
          <Route path="history" element={<History />} />
          <Route path="guide" element={<Guide />} />
          <Route path="report" element={<FinalReport />} />
        </Route>

        {/* CUALQUIER OTRA RUTA → LOGIN */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
