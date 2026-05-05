import React, { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from '@/components/ScrollToTop.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ShoppingCart from '@/components/ShoppingCart.jsx';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton.jsx';
import HomePage from '@/pages/HomePage.jsx';
import ProductDetailPage from '@/pages/ProductDetailPage.jsx';
import SuccessPage from '@/pages/SuccessPage.jsx';
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";

const Layout = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handleAddToCart = (event) => {
      console.log("Producto agregado:", event.detail?.id);
      setIsCartOpen(true); // 🔥 abre carrito
    };

    window.addEventListener("add-to-cart", handleAddToCart);

    return () => {
      window.removeEventListener("add-to-cart", handleAddToCart);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header setIsCartOpen={setIsCartOpen} />
      <ShoppingCart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />

      <main className="flex-grow">
        {children}
      </main>

      <FloatingWhatsAppButton phoneNumber="+56912345678" />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="*" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;