import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col, Modal, ListGroup, Form } from 'react-bootstrap';
import Header from './Header';
import axios from 'axios';
import '../App.css';

const categories = ['All', 'Fashion', 'Accessories', 'Electronics', 'Jewelery'];

function ProductCatalog() {
  const [cart, setCart] = useState({});
  const [showCart, setShowCart] = useState(false);
  const [sortOption, setSortOption] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart[product.id];
      const newQuantity = existingProduct ? existingProduct.quantity + 1 : 1;
      return {
        ...prevCart,
        [product.id]: { ...product, quantity: newQuantity },
      };
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      delete newCart[productId];
      return newCart;
    });
  };

  const handleShowCart = () => setShowCart(true);
  const handleCloseCart = () => setShowCart(false);

  const filteredProducts = products.filter((product) => {
    const matchesPriceFilter = () => {
      if (priceFilter === 'under100') return product.price < 100;
      if (priceFilter === 'under500') return product.price >= 100 && product.price < 500;
      if (priceFilter === 'under2500') return product.price >= 500 && product.price < 2500;
      return true;
    };

    const matchesCategoryFilter = () => {
      return selectedCategory === 'All' || product.category === selectedCategory.toLowerCase();
    };

    return matchesPriceFilter() && matchesCategoryFilter();
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'lowToHigh') {
      return a.price - b.price;
    } else if (sortOption === 'highToLow') {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <Container>
      <Header />
      
      <h2 className="text-2xl font-bold mb-4">Product Catalog</h2>

      <Form.Group controlId="filterPrice" className="mb-4">
        <Form.Label>Filter by Price</Form.Label>
        <Form.Control
          as="select"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="">All</option>
          <option value="under100">Under $100</option>
          <option value="under500">Under $500</option>
          <option value="under2500">Under $2500</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="filterCategory" className="mb-4">
        <Form.Label>Filter by Category</Form.Label>
        <Form.Control
          as="select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="sortProducts" className="mb-4">
        <Form.Label>Sort by Price</Form.Label>
        <Form.Control
          as="select"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="">Select</option>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </Form.Control>
      </Form.Group>

      <Row>
        {sortedProducts.map((product) => (
          <Col key={product.id} md={4}>
            <Card className="mb-6 shadow-lg">
              <Card.Img variant="top" src={product.image} alt={product.title} />
              <Card.Body className="p-4">
                <Card.Title className="text-lg font-bold">{product.title}</Card.Title>
                <Card.Text>Price: ${product.price}</Card.Text>
                <Button
                  className="w-full py-2 bg-blue-600 text-white font-semibold rounded"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Button variant="primary" onClick={handleShowCart}>
        View Cart ({Object.keys(cart).length})
      </Button>

      <Modal show={showCart} onHide={handleCloseCart}>
        <Modal.Header closeButton className="bg-gray-800 text-white">
          <Modal.Title>Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-gray-100">
          {Object.keys(cart).length > 0 ? (
            <ListGroup>
              {Object.values(cart).map((item) => (
                <ListGroup.Item key={item.id} className="flex justify-between bg-white p-4 mb-2 shadow">
                  <strong className="text-gray-700">{item.title} (x{item.quantity})</strong>
                  <span className="text-gray-500">${item.price * item.quantity}</span>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p className="text-gray-500">Your cart is empty.</p>
          )}
        </Modal.Body>
        <Modal.Footer className="bg-gray-200">
          <Button className="bg-red-600 text-white px-4 py-2 rounded" onClick={handleCloseCart}>
            Close
          </Button>
          <Button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => alert('Checkout functionality here!')}>
            Proceed to Checkout
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ProductCatalog;
