import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaWarehouse, FaShoppingCart, FaUser } from 'react-icons/fa';

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', closeDropdown);
    return () => {
      document.removeEventListener('mousedown', closeDropdown);
    };
  }, []);

  return (
    <nav className="bg-gradient-to-r from-gray-800 to-gray-600 shadow-lg mb-4 w-full">
      <div className="container mx-auto flex justify-between items-center py-3">
        <Link to="/" className="text-white font-bold text-xl flex items-center">
          <FaWarehouse className="mr-2" /> InventoryHub
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link 
            to="/catalog" 
            className="text-white flex items-center space-x-2 bg-gray-700 hover:bg-yellow-500 transition-all duration-300 px-3 py-2 rounded no-underline"
          >
            <FaShoppingCart className="mr-2" /> Catalog
          </Link>

          <Link 
            to="/order-history" 
            className="text-white flex items-center space-x-2 bg-gray-700 hover:bg-yellow-500 transition-all duration-300 px-3 py-2 rounded no-underline"
          >
            <FaShoppingCart className="mr-2" /> Order History
          </Link>
          


          <Link 
            to="/admin" 
            className="text-white flex items-center space-x-2 bg-gray-700 hover:bg-yellow-500 transition-all duration-300 px-3 py-2 rounded no-underline"
          >
            <FaWarehouse className="mr-2" /> Admin Panel
          </Link>

          <div className="relative inline-block text-left" ref={dropdownRef}>
            <span
              className="text-white flex items-center space-x-2 bg-gray-700 hover:bg-yellow-500 transition-all duration-300 px-3 py-2 rounded cursor-pointer"
              onClick={toggleDropdown}
            >
              <FaUser className="mr-2" /> User
            </span>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white shadow-lg z-10 rounded">
                <Link to="/" className="block px-4 py-2 hover:bg-gray-700 no-underline">
                  Login
                </Link>
                <div className="border-t border-gray-600"></div>
                <Link to="/" className="block px-4 py-2 hover:bg-gray-700 no-underline">
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
