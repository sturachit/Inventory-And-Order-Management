import React, { useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import Header from './Header';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({ date: '', status: '', total: '' });
  const [editIndex, setEditIndex] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedOrders = orders.map((order, index) =>
        index === editIndex ? { ...order, ...formData } : order
      );
      setOrders(updatedOrders);
      setEditIndex(null);
    } else {
      const newOrder = {
        id: orders.length + 1,
        ...formData,
      };
      setOrders((prev) => [...prev, newOrder]);
    }
    setFormData({ date: '', status: '', total: '' });
  };

  const handleEdit = (index) => {
    setFormData(orders[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedOrders = orders.filter((_, i) => i !== index);
    setOrders(updatedOrders);
  };

  return (
    <Container>
      <Header />
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Order History</h2>
      <form onSubmit={handleSubmit} className="mb-4 bg-white p-4 rounded-lg shadow">
        <div className="mb-4">
          <label className="block text-gray-700">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Select Status</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Total</label>
          <input
            type="number"
            name="total"
            value={formData.total}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300 hover:bg-blue-700 w-full"
        >
          {editIndex !== null ? 'Update Order' : 'Add Order'}
        </button>
      </form>

      <Table striped bordered hover className="bg-white rounded-lg shadow">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th>#</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>{order.date}</td>
                <td>{order.status}</td>
                <td>${order.total}</td>
                <td>
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-yellow-500 text-white py-1 px-3 rounded-lg mr-2 transition duration-300 hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 text-white py-1 px-3 rounded-lg transition duration-300 hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No orders available.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default OrderHistory;
