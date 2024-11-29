import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Cursor from "../src/components/Cursor/Cursor"
import Home from './pages/Home/Home'; 
import Product from './pages/Product/Product'; 
import SobreNos from './pages/SobreNos/SobreNos'; 
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer'; 
import Cadastro from './components/auth/Cadastro';
import Login from './components/auth/Login';
import ListaCompras from './pages/ListaCompras/ListaCompras';


function App() {
  return (
    <div>
      <Cursor />
      <Navbar />
      <Routes> {/* Routes dentro do BrowserRouter do index.js */}
        <Route path="/" element={<Home />} />
        <Route path="/sobre-nos" element={<SobreNos />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cadastrar" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;