import React, { useState } from 'react';
import { LogOut } from 'lucide-react';

// ============ COMPONENTS ============

// Login Component
const LoginScreen = ({ onLogin, members }) => {
  const [loginForm, setLoginForm] = useState({ username: '', password: '', role: 'member' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginForm.role === 'admin') {
      onLogin({ id: 0, name: 'Admin', role: 'admin' });
    } else {
      const member = members.find(m => m.name.toLowerCase().includes(loginForm.username.toLowerCase()));
      if (member) {
        onLogin({ ...member, role: 'member' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-green-700 mb-2">महिला बचत समूह</h1>
          <h2 className="text-xl text-gray-600">Women's Savings Group</h2>
          <p className="text-sm text-gray-500 mt-2">Rural Finance Manager</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Login As</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={loginForm.role}
              onChange={(e) => setLoginForm({...loginForm, role: e.target.value})}
            >
              <option value="admin">Admin</option>
              <option value="member">Member</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {loginForm.role === 'admin' ? 'Admin Username' : 'Member Name'}
            </label>
            <input 
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder={loginForm.role === 'admin' ? 'admin' : 'Enter your name'}
              value={loginForm.username}
              onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm">
          <p className="font-semibold text-blue-900 mb-2">Demo Credentials:</p>
          <p className="text-blue-800">Admin: username "admin"</p>
          <p className="text-blue-800">Member: any member name (e.g., "Sarita")</p>
        </div>
      </div>
    </div>
  );
};
export default LoginScreen;
