import React, { useState } from 'react';
import { useCart } from '../CartContext';
import products from '../data/products'; // Import your product data or fetch it from an API
import {
    ChakraProvider,
    theme,
    Text,
    Button,
    List,
    ListItem
  } from "@chakra-ui/react"
    import { Link } from 'react-router-dom';

import { useUser } from '../UserContext';

const Cart: React.FC = () => {
    const { cart, clearCart } = useCart(); // Access the cart state
    const [isOrdering, setIsOrdering] = useState(false);
    const { user } = useUser();

  // Calculate the cart total price based on the products and their quantities
  const cartTotal = cart.reduce((total, productId) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      return total + product.price;
    }
    return total;
  }, 0);

  const handleMakeOrder = async () => {
    if (cart.length === 0) {
      alert('Your cart is empty. Add items to your cart before placing an order.');
      return;
    }

    setIsOrdering(true);

    try {
      // Assuming you have an API endpoint for order submission
      const uuid = user
      const response = await fetch('http://127.0.0.1:5000/order', {
        method: 'POST',
        body: JSON.stringify({"products": cart, "total": cartTotal, "customer_id": uuid, "paid": false}),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        clearCart()
        alert('Order placed successfully!');
      } else {
        alert('Order failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('An error occurred while submitting your order.');
    } finally {
      setIsOrdering(false);
    }
  };

  return (
    <div>
      {user ? (
        <p>Welcome, {user}!</p>
      ) : (
        <p>Please log in to view your orders.</p>
      )}
      {
    <ChakraProvider theme={theme}>
      {cart.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        <div>
            <List spacing={3}>
                {cart.map((productId) => {
                    const product = products.find((p) => p.id === productId);
                    if (product) {
                        return (
                            <ListItem key={product.id}>
                            <Link to={`/product/${product.id}`}>{product.name}</Link>
                        </ListItem>
                        );
                    }
                    return null;
                })}
            </List>
          <Text>Total: R{cartTotal.toFixed(2)}</Text>
          <Button onClick={handleMakeOrder} disabled={isOrdering}> Create Order</Button>
        </div>
      )}
    </ChakraProvider>
    }
    </div>
  );
};

export default Cart;
