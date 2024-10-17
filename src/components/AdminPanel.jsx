import React, { useState } from 'react';
import { Container, Card, Table, Button, Form } from 'react-bootstrap';
import Header from './Header';

function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ id: '', name: '', price: '', stock: '' });
  const [editIndex, setEditIndex] = useState(null);

  const handleAddOrUpdateProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.stock) {
      if (editIndex !== null) {
        const updatedProducts = products.map((product, index) =>
          index === editIndex ? { ...product, ...newProduct } : product
        );
        setProducts(updatedProducts);
        setEditIndex(null);
      } else {
        const updatedProducts = [...products, { id: products.length + 1, ...newProduct }];
        setProducts(updatedProducts);
      }
      setNewProduct({ id: '', name: '', price: '', stock: '' }); 
    }
  };

  const handleEdit = (index) => {
    setNewProduct(products[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  return (
    <Container>
      <Header />
      <Card className="rounded-lg shadow-lg">
        <Card.Body>
          <h2 className="bg-blue-900 text-white p-4 text-center rounded-lg">
            Admin Panel
          </h2>
          <h4 className="text-center my-4">Manage Products</h4>
          <Form onSubmit={(e) => { e.preventDefault(); handleAddOrUpdateProduct(); }}>
            <Form.Group controlId="formProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </Form.Group>

            <Form.Group controlId="formProductPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </Form.Group>

            <Form.Group controlId="formProductStock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter stock"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </Form.Group>

            <Button
              style={{ backgroundColor: '#020120' }}
              type="submit"
              className="w-full text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              {editIndex !== null ? 'Update Product' : 'Add Product'}
            </Button>
          </Form>

          <h4 className="mt-5">Product List</h4>
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product, index) => (
                  <tr key={product.id}>
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.stock}</td>
                    <td>
                      <Button variant="warning" onClick={() => handleEdit(index)} className="mr-2">
                        Edit
                      </Button>
                      <Button variant="danger" onClick={() => handleDelete(index)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">No products available.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AdminPanel;
