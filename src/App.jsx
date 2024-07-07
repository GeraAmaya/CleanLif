// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PATHROUTES from './components/Helpers/PathRoutes';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import DashboardOperario from './components/DashboardOperario/DashboardOperario';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={PATHROUTES.LOGIN} element={<Login />} />
        <Route path={PATHROUTES.DASHBOARD} element={<ProtectedRoute element={Dashboard} />} />
        <Route path={PATHROUTES.DASHBOARD_OPERARIO} element={<ProtectedRoute element={DashboardOperario} />} />
      </Routes>
    </Router>
  );
};

export default App;
