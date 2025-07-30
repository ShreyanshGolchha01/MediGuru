import React from 'react';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">MG</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Medi Guru</h1>
              <p className="text-xs text-gray-500">Medical Training Portal</p>
            </div>
          </div>

          {/* User Info and Logout */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block text-right">
              <div className="text-sm font-medium text-gray-800">{user?.name}</div>
              <div className="text-xs text-gray-500 capitalize">
                {user?.role.replace('-', ' ')}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-gray-600" />
              </div>
              
              <button
                onClick={handleLogout}
                className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
