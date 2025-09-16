import React, { useState, useCallback } from 'react';
import { UserRole } from './types.js';
import Login from './components/Login.jsx';
import UniversityDashboard from './pages/UniversityDashboard.jsx';
import EmployerDashboard from './pages/EmployerDashboard.jsx';
import GovernmentDashboard from './pages/GovernmentDashboard.jsx';

const App = () => {
  const [userRole, setUserRole] = useState(null);

  const handleLogin = useCallback((role) => {
    setUserRole(role);
  }, []);
  
  const handleLogout = useCallback(() => {
    setUserRole(null);
  }, []);

  const renderDashboard = () => {
    switch (userRole) {
      case UserRole.University:
        return <UniversityDashboard onLogout={handleLogout} />;
      case UserRole.Employer:
        return <EmployerDashboard onLogout={handleLogout} />;
      case UserRole.Government:
        return <GovernmentDashboard onLogout={handleLogout} />;
      default:
        return <Login onLogin={handleLogin} />;
    }
  };

  return (
    <div className="min-h-screen text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {renderDashboard()}
    </div>
  );
};

export default App;