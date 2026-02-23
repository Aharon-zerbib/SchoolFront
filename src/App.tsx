import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';

// Composant pour protéger les routes qui nécessitent d'être connecté
const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const token = localStorage.getItem("token");
  // Si on a pas de token, on redirige vers le login
  return token ? children : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Racine par défaut (Default Root) */}
        <Route path="/" element={<Home />} />

        {/* Route pour le Login (Identifier) */}
        <Route path="/login" element={<LoginPage />} />

        {/* Route pour l'Inscription (Nouveau) */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Route identifiée (après login) protégée */}
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />

        {/* Redirection automatique vers Home pour toute autre URL */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
