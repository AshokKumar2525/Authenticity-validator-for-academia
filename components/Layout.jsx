import React from 'react';
import { LogoutIcon } from './icons/ActionIcons.jsx';

const getRoleName = (role) => {
    if (!role) return '';
    return role.charAt(0).toUpperCase() + role.slice(1);
}

const Layout = ({ userRole, onLogout, children }) => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col flex-1">
        <header className="w-full bg-white dark:bg-gray-800 shadow-md z-10">
          <div className="flex items-center justify-between h-16 px-6">
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                <span className="text-indigo-600 dark:text-indigo-400">VeriChain</span> | {getRoleName(userRole)} Dashboard
              </h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={onLogout}
                className="flex items-center text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
              >
                <LogoutIcon />
                <span className="ml-2 font-medium">Logout</span>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;