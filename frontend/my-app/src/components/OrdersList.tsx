import React, { useEffect, useState,  } from 'react'
import {
    ChakraProvider,
    theme,
    Text
  } from "@chakra-ui/react"
// import orders from '../data/orders';
import { useUser } from '../UserContext';
import PaginatedOrdersList from './PaginatedOrdersList';

export interface Order {
  "uuid": string,
  "customer_id": string,
  "paid": boolean,
  "products": string[],
  "total": number
}

const OrdersList: React.FC = () => {
  const { user } = useUser();

  const [orders, setOrders] = useState<Order[]>([]);


    useEffect(() => {
        async function fetchData() {
        // Fetch order data from the API
          if (user){
            fetch('http://127.0.0.1:5000/orders/', {
                method: 'POST',
                body: JSON.stringify({"customerId":user.uuid}),
                headers: {
                'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((data) => {
            if (data && Array.isArray(data.orders)) {
                // Check if data.orders is an array
                setOrders(data.orders); // Update the order state
            } else {
                console.error('Invalid API response:', data);
            }
            })
            .catch((error) => {
            console.error('Error fetching order data:', error);
            });
          }
        }
        fetchData()
    }, [user]);
  return (<div>
    {user ? (
    <ChakraProvider theme={theme}>
      {orders.length === 0 ? (
        <Text>You have no orders.</Text>
      ) : (
        <PaginatedOrdersList data={orders} />
      )}
    </ChakraProvider>
      ) : (
        <ChakraProvider theme={theme}>
          <Text>Please log in to view your orders.</Text>
        </ChakraProvider>
      )}
    </div>
  );
};

export default OrdersList;
