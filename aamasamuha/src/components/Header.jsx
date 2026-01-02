import React from 'react'
import { LogOut } from 'lucide-react';

const Header = ({ user, onLogout }) => {
  return (
    <div className="bg-green-600 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">
            {user.role === 'admin' ? 'Admin Dashboard' : `Welcome, ${user.name}`}
          </h1>
          <p className="text-green-100">
            {user.role === 'admin' ? "Women's Savings Group Management" : 'Member Dashboard'}
          </p>
        </div>
        <button 
          onClick={onLogout} 
          className="flex items-center gap-2 bg-green-700 px-4 py-2 rounded-lg hover:bg-green-800"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;