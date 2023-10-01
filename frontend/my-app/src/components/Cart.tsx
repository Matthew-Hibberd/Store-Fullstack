import React, { useState } from 'react';
import { useCart } from '../CartContext';
// import products from '../data/products'; // Import your product data or fetch it from an API
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
  const cartTotal = cart.reduce((total, product) => {
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
      const uuid = user?.uuid

      const response = await fetch('http://127.0.0.1:5000/order', {
        method: 'POST',
        body: JSON.stringify({"products": cart.map((product) => product.uuid), "total": cartTotal, "customer_id": uuid, "paid": false}),
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
        <ChakraProvider theme={theme}>
        <Text>Welcome, {user.name}!</Text>
      {cart.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        <div>
            <List spacing={3}>
                {cart.map((product) => {
                    if (product) {
                        return (
                            <ListItem key={product.uuid}>
                            <Link to={`/product/${product.uuid}`}>{product.name}</Link>
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
      ) : (
        <ChakraProvider theme={theme}>
          <Text>Please log in to view your cart.</Text>
        </ChakraProvider>
      )}
    </div>
  );
};

export default Cart;
