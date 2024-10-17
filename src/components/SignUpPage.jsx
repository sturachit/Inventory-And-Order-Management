import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';
import '../App.css';
import background from "../background.jpg";

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setError('Please fill out all fields');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      setError('');
      alert(`Signed up as ${role}: ${email}`);
      navigate('/');
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
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          <FaUserPlus className="inline-block mr-2" /> Sign Up
        </h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="formRole">Role</label>
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
            <label className="block text-gray-700" htmlFor="formEmail">Email</label>
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
            <label className="block text-gray-700" htmlFor="formPassword">Password</label>
            <input
              type="password"
              id="formPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="formConfirmPassword">Confirm Password</label>
            <input
              type="password"
              id="formConfirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex justify-between mt-6">
            <button 
              type="submit" 
              className="bg-blue-600 text-white font-semibold py-2 rounded-lg w-full transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none"
            >
              Sign Up
            </button>
            <button 
              type="button" 
              className="bg-gray-300 text-gray-700 font-semibold py-2 rounded-lg w-full ml-2 transition duration-300 ease-in-out hover:bg-gray-400 focus:outline-none"
              onClick={() => navigate('/')}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
