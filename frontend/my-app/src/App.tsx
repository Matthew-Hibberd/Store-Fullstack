import React, { useState } from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ProductList from './components/ProductList'
import ProductDetail, { Product } from './components/ProductDetail'
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import { User, UserProvider } from './UserContext';
import Register from './components/Register';
import CartProvider from "./CartContext"

const App: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [user, setUser] = useState<User| null>(null)
  return (
    <ChakraProvider theme={theme}>
      <UserProvider>
      <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:uuid" element={<ProductDetail />} />
          <Route path="/register" Component={Register} />
        </Routes>
      </CartProvider>
    </Router>
    </UserProvider>
    </ChakraProvider>
  )
}

export default App
