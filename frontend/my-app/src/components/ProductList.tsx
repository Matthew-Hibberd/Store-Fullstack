import React, { useEffect, useState } from 'react';

import Cart from './Cart';
import OrdersList from './OrdersList'

import {
    Heading,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Button,
    Text
  } from "@chakra-ui/react"
  import PaginatedProductList from './PaginatedProductList';
import Login from './Login';
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';

  interface Product{
    name: string,
    description: string,
    price: number,
    uuid: string
}

const ProductList: React.FC = () => {
    const { user, logout } = useUser();
    const [products, setProducts] = useState<Product[]>([]);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout()
        navigate('/')
    }

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
    const handleDelete = (selectedProductUuids: string[]) => {
        async function deleteProducts() {
        // Fetch product data from the API
        fetch('http://127.0.0.1:5000/remove-products/', {
            method: 'POST',
            body: JSON.stringify({"ids":selectedProductUuids}),
            headers: {
            'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            console.log(response.status)
            if (response.status === 200) {
                const updatedProducts = products.filter(
                    (product) => !selectedProductUuids.includes(product.uuid)
                );
                setProducts(updatedProducts);
            } else {
                console.error('Invalid API response:',response.status);
            }
            })
        .catch((error) => {
        console.error('Error delete product:', error);
        });
        }
        deleteProducts()
      };
  return (
    <Tabs>
        <TabList>
            <Tab>Shop</Tab>
            <Tab>Cart</Tab>
            <Tab>Orders</Tab>
            {!user ? (
                <Tab>Login</Tab>
            ) : (
                <Button onClick={handleLogout}>Logout</Button>
            )
            }
        </TabList>
        <TabPanels>
            <TabPanel>
            <Heading>Shop</Heading>
            {products ? (
                <PaginatedProductList data={products} onDelete={handleDelete}/>
            ) : (
                <Text>There are no more products available. Get the Shop Admin to add some to the database!</Text>
            )}
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
