import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import SetupSchool from './pages/SetupSchool';
import SchoolSettings from './pages/SchoolSettings';
import api from './api';

// Composant pour protéger les routes et vérifier la configuration de l'école
const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const token = localStorage.getItem("token");
  const [hasSchool, setHasSchool] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (token) {
      api.get("/user")
        .then(res => {
          setHasSchool(!!res.data.school_id);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setHasSchool(false);
        });
    }
  }, [token, location.pathname]);

  if (!token) return <Navigate to="/login" replace />;
  
  if (hasSchool === null) return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-zinc-950 font-sans text-slate-950 dark:text-zinc-50">
      <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 dark:border-zinc-50 border-t-transparent"></div>
    </div>
  );

  // Éviter la boucle infinie : Si on est déjà sur /setup-school, on ne redirige pas
  if (hasSchool === false && location.pathname !== '/setup-school') {
    return <Navigate to="/setup-school" replace />;
  }

  // Si on a déjà une école et qu'on essaie d'aller sur setup, on va au dashboard
  if (hasSchool === true && location.pathname === '/setup-school') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Route Onboarding protégée sans boucle */}
        <Route 
          path="/setup-school" 
          element={
            <PrivateRoute>
              <SetupSchool />
            </PrivateRoute>
          } 
        />

        {/* Route Dashboard protégée */}
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />

        {/* Route Paramètres de l'école */}
        <Route 
          path="/school/settings" 
          element={
            <PrivateRoute>
              <SchoolSettings />
            </PrivateRoute>
          } 
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
