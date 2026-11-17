import { useState } from 'react'
import ProductPage from "./pages/ProductPage";
import AddProductPage from "./pages/AddProductPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import { Routes, Route } from 'react-router'
import  NavBar from './NavBar'
import './App.css'

function App() {


  return (
    <>
    <NavBar />
    <Routes>
      <Route path="/" element={<ProductPage />}/>
      <Route path="/products/add" element={<AddProductPage />}/>
      <Route path="/products/:id" element={<ProductDetailsPage />}/>
    </Routes>
    </>
  )
}

export default App
