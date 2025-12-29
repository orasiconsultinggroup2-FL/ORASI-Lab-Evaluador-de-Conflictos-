
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './screens/Dashboard';
import Identification from './screens/Identification';
import History from './screens/History';
import ActorMapping from './screens/ActorMapping';
import Dynamics from './screens/Dynamics';
import RiskAssessment from './screens/RiskAssessment';
import FinalReport from './screens/FinalReport';
import Guide from './screens/Guide';
import Login from './screens/Login';
import Repository from './screens/Repository';
import { ConflictProvider, useConflict } from './context/ConflictContext';

const AppRoutes = () => {
  const { user } = useConflict();

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/repository" element={<Repository />} />
        <Route path="/identification" element={<Identification />} />
        <Route path="/history" element={<History />} />
        <Route path="/actors" element={<ActorMapping />} />
        <Route path="/dynamics" element={<Dynamics />} />
        <Route path="/risk" element={<RiskAssessment />} />
        <Route path="/final-report" element={<FinalReport />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <ConflictProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </ConflictProvider>
  );
};

export default App;
