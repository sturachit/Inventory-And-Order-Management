import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import background from "../background.jpg"; 
import '../App.css'; 

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill out all fields');
    } else {
      setError('');
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/catalog');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div 
        className="bg-white shadow-lg rounded-lg p-8 w-96 relative z-10" 
        style={{
          backgroundImage: `url(${background})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
        }}
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-blue-600 font-semibold" htmlFor="formRole">Role</label>
            <select
              id="formRole"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:border-blue-500"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-blue-600 font-semibold" htmlFor="formEmail">Email</label> 
            <input
              type="email"
              id="formEmail"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-blue-600 font-semibold" htmlFor="formPassword">Password</label>
            <input
              type="password"
              id="formPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex justify-between mb-4">
            <button 
              type="submit" 
              className="bg-blue-600 text-white font-semibold py-2 rounded-lg w-full transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none mr-2"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => navigate('/signup')} 
              className="bg-green-600 text-white font-semibold py-2 rounded-lg w-full transition duration-300 ease-in-out hover:bg-green-700 focus:outline-none"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
