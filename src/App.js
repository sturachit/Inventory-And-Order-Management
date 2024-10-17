import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import ProductCatalog from './components/ProductCatalog';

import OrderHistory from './components/OrderHistory';
import AdminPanel from './components/AdminPanel';



function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/catalog" element={<ProductCatalog />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
