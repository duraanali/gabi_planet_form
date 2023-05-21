import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductsList from './components/products/ProductsList';
import AddProduct from './components/products/AddProduct';
import Home from './components/Home';

import { Route, Link, Routes } from 'react-router-dom';
import ProductCard from './components/products/ProductCard';

// axios.get, axios.post, axios.put, axios.delete
function App() {

  const [products, setProducts ] = useState({});

  useEffect(() => {

    axios.get('http://localhost:8000/products')
      .then((res) => {
        setProducts(res.data)
      })
      .catch((error) => {
        console.log(error)
      })

  }, []);

  // add products
  const addProduct = (product) => {
    axios.post('http://localhost:8000/products', product)
      .then((res) => {
        // Make the one added first one in the list
        setProducts([res.data, ...products])
      })
      .catch((error) => {
        console.log(error)
      })
  }


  return (
    <div className="bg-slate-600">

    <header className="bg-white py-10">
      <nav className="h-full">
        <div className="container mx-auto flex justify-between items-center">
            <h3 className="text-2xl font-bold">Gabi Products</h3>
            <ul className="hidden md:flex space-x-6">
              <li><Link to="/" className="bg-red-400 px-4 py-2 rounded-3xl hover:bg-red-500 text-white">Home</Link></li>
              <li><Link to="/products" className="bg-red-400 px-4 py-2 rounded-3xl hover:bg-red-500 text-white">Products</Link></li>
              <li><Link to="/add_product" className="bg-red-400 px-4 py-2 rounded-3xl hover:bg-red-500 text-white">Add Product</Link></li>
            </ul>
        </div>
      </nav>
    </header>
    
    <Routes>
      <Route path="/products/:id" element={<ProductCard products={products} />} />
      <Route path="/add_product" element={<AddProduct addProduct={addProduct} />} />
      <Route path="/products" element={<ProductsList products={products} />} />
      <Route path="/" element={<Home />} />
    </Routes>
  </div>
  );
}

export default App;