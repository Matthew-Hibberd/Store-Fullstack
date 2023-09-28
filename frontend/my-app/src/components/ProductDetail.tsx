import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../CartContext';

import {
    ChakraProvider,
    theme,
    Heading,
    Text,
    Button,
  } from "@chakra-ui/react"
import { Link } from 'react-router-dom';

interface Product{
  name: string,
  description: string,
  price: number,
  uuid: string
}

const ProductDetail: React.FC = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const [product, setProduct] = useState<Product | undefined>(undefined);

  useEffect(() => {
    async function fetchData() {
    // Fetch product data from the API
    fetch('http://127.0.0.1:5000/products/', {
        method: 'POST',
        body: JSON.stringify({"ids":[uuid]}),
        headers: {
        'Content-Type': 'application/json',
        },
    })
    .then((response) => response.json())
    .then((data) => {
    if (data && Array.isArray(data.products)) {
        // Check if data.products is an array
        setProduct(data.products[0]); // Update the products state
    } else {
        console.error('Invalid API response:', data);
    }
    })
    .catch((error) => {
    console.error('Error fetching product data:', error);
    });
    }
    fetchData()
  }, [uuid]);

  const cartContext = useCart()


  if (!product) {
    return (
        <ChakraProvider theme={theme}>
            <Text>Product not found</Text>
            <Link to="/"><Button>Back to Shop</Button></Link>
        </ChakraProvider>
    )
  }

  const { cart, addToCart } = cartContext;

  return (
    <ChakraProvider theme={theme}>
      <Heading>{product.name}</Heading>
      <Text>{product.description}</Text>
      <Text>Price: ${product.price}</Text>
      <Button onClick={() => addToCart(product.uuid)}>Add to Cart</Button>
      <Link to="/"><Button>Back to Shop</Button></Link>
    </ChakraProvider>
  );
};

export default ProductDetail;
