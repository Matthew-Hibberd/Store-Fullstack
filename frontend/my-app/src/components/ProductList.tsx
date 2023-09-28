import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import products from '../data/products';

import Cart from './Cart';
import OrdersList from './OrdersList'

import {
    Heading,
    ChakraProvider,
    Box,
    VStack,
    Grid,
    theme,
    List,
    ListItem,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
  } from "@chakra-ui/react"
import Login from './Login';

  interface Product{
    name: string,
    description: string,
    price: number,
    uuid: string
}

const ProductList: React.FC = () => {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function fetchData() {
        // Fetch product data from the API
        fetch('http://127.0.0.1:5000/products/', {
            method: 'POST',
            body: JSON.stringify({"ids":[]}),
            headers: {
            'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((data) => {
        if (data && Array.isArray(data.products)) {
            // Check if data.products is an array
            setProducts(data.products); // Update the products state
        } else {
            console.error('Invalid API response:', data);
        }
        })
        .catch((error) => {
        console.error('Error fetching product data:', error);
        });
        }
        fetchData()
    }, []);
  return (
    <Tabs>
        <TabList>
            <Tab>Shop</Tab>
            <Tab>Cart</Tab>
            <Tab>Orders</Tab>
            <Tab>Login</Tab>
        </TabList>
        <TabPanels>
            <TabPanel>
            <Heading>Shop</Heading>
            <List spacing={3}>
                {products.map((product) => (
                    <ListItem key={product.uuid}>
                        <Link to={`/product/${product.uuid}`}>{product.name}</Link>
                    </ListItem>
                ))}
            </List>
            </TabPanel>
            <TabPanel>
            <Heading>Cart</Heading>
            <Cart />
            </TabPanel>
            <TabPanel>
            <Heading>Orders</Heading>
            <OrdersList />
            </TabPanel>
            <TabPanel>
                <Heading>Login</Heading>
                <Login />
            </TabPanel>
        </TabPanels>
    </Tabs>
  );
};

export default ProductList;
