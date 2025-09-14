import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import OnlineRandevuPage from './pages/OnlineRandevuPage';
import HakkimizdaPage from './pages/HakkimizdaPage';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/online-randevu" element={<OnlineRandevuPage />} />
        <Route path="/hakkimizda" element={<HakkimizdaPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;