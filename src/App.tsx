import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import OnlineRandevuPage from './pages/OnlineRandevuPage';
import HakkimizdaPage from './pages/HakkimizdaPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import KvkkPage from './pages/KvkkPage';

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div key={location.pathname} className="page-transition-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/online-randevu" element={<OnlineRandevuPage />} />
          <Route path="/hakkimizda" element={<HakkimizdaPage />} />
          <Route path="/gizlilik-politikasi" element={<PrivacyPolicyPage />} />
          <Route path="/kullanim-sartlari" element={<TermsOfServicePage />} />
          <Route path="/kvkk" element={<KvkkPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;