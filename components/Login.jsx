import React from 'react';
import { UserRole } from '../types.js';
import { UniversityIcon, EmployerIcon, GovernmentIcon } from './icons/RoleIcons.jsx';

const RoleCard = ({ role, title, description, icon, onSelect }) => (
  <div
    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer p-8 flex flex-col items-center text-center"
    onClick={() => onSelect(role)}
  >
    <div className="bg-indigo-100 dark:bg-indigo-900/50 p-4 rounded-full mb-6">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);


const Login = ({ onLogin }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">
          Welcome to <span className="text-indigo-600 dark:text-indigo-400">VeriChain</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
          The trusted platform for academic certificate verification in Jharkhand. Please select your role to continue.
        </p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        <RoleCard
          role={UserRole.University}
          title="University"
          description="Manage your institution's academic records and respond to verification requests."
          icon={<UniversityIcon />}
          onSelect={onLogin}
        />
        <RoleCard
          role={UserRole.Employer}
          title="Employer / Verifier"
          description="Authenticate candidate certificates quickly and securely to ensure genuine credentials."
          icon={<EmployerIcon />}
          onSelect={onLogin}
        />
        <RoleCard
          role={UserRole.Government}
          title="Government Body"
          description="Oversee verification activities, monitor trends, and maintain academic integrity."
          icon={<GovernmentIcon />}
          onSelect={onLogin}
        />
      </main>
      <footer className="mt-12 text-center text-gray-500 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} Department of Higher Education, Jharkhand. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Login;