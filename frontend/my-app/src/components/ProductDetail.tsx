import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../CartContext';
import {
  ChakraProvider,
  theme,
  Heading,
  Text,
  Button,
  Input,
} from "@chakra-ui/react"
import { Link } from 'react-router-dom';

export interface Product {
  name: string;
  description: string;
  price: number;
  uuid: string;
}

const ProductDetail: React.FC = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false); // Track editing state
  const [editedProduct, setEditedProduct] = useState<Product | undefined>(undefined);
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch product data when the component mounts
    async function fetchData() {
      // Fetch product data from the API
      fetch('http://127.0.0.1:5000/products/', {
        method: 'POST',
        body: JSON.stringify({ "ids": [uuid] }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && Array.isArray(data.products)) {
            // Check if data.products is an array
            setProduct(data.products[0]); // Update the product state
            setEditedProduct(data.products[0]); // Initialize editedProduct state
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

  const cartContext = useCart();
  const { cart, addToCart } = cartContext;

  const handleDelete = () => {
    // Trigger an API request to delete the product with the given UUID
    async function deleteProducts() {
      // Fetch product data from the API
      fetch('http://127.0.0.1:5000/remove-products/', {
          method: 'POST',
          body: JSON.stringify({"ids":[uuid]}),
          headers: {
          'Content-Type': 'application/json',
          },
      })
      .then((response) => {
          console.log(response.status)
          if (response.status === 200) {
              navigate('/')
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

  const handleEdit = () => {
    setIsEditing(true); // Enable editing mode
  };

  const handleSave = () => {
    // Trigger an API request to save changes to the product
    fetch(`http://127.0.0.1:5000/product/${uuid}`, {
      method: 'PUT',
      body: JSON.stringify(editedProduct),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          setIsEditing(false); // Disable editing mode
          setProduct(editedProduct); // Update the product with edited data
        } else {
          console.error('Error saving product changes:', response.status);
        }
      })
      .catch((error) => {
        console.error('Error saving product changes:', error);
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Update the editedProduct state with the changes
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }) as Product | undefined);
  };

  if (!product) {
    return (
      <ChakraProvider theme={theme}>
        <Text>Product not found</Text>
        <Link to="/"><Button>Back to Shop</Button></Link>
      </ChakraProvider>
    );
  }

  return (
    <ChakraProvider theme={theme}>
      <Heading>{isEditing ? <Input name="name" value={editedProduct?.name} onChange={handleInputChange} /> : product.name}</Heading>
      <Text>{isEditing ? <Input name="description" value={editedProduct?.description} onChange={handleInputChange} /> : product.description}</Text>
      <Text>Price: ${isEditing ? <Input name="price" value={editedProduct?.price} onChange={handleInputChange} /> : product.price}</Text>
      {isEditing ? (
        <Button onClick={handleSave}>Save</Button>
      ) : (
        <Button onClick={handleEdit}>Edit</Button>
      )}
      <Button onClick={() => addToCart(product)}>Add to Cart</Button>
      <Button onClick={handleDelete}>Delete</Button>
      <Link to="/"><Button>Back to Shop</Button></Link>
    </ChakraProvider>
  );
};

export default ProductDetail;
