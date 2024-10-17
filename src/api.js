import axios from 'axios';

const baseURL = 'https://fakestoreapi.com/products'; 

export const fetchProducts = async () => {
  try {
    const response = await axios.get(baseURL);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};
