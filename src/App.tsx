import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import OnlineRandevuPage from './pages/OnlineRandevuPage';
import SosyalMedyaPage from './pages/SosyalMedyaPage';
import HakkimizdaPage from './pages/HakkimizdaPage';
import FriendsPage from './pages/FriendsPage';
import MessagesPage from './pages/MessagesPage';
import SavedPostsPage from './pages/SavedPostsPage';
import EventsPage from './pages/EventsPage';
import SettingsPage from './pages/SettingsPage';
import HelpPage from './pages/HelpPage';
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
          <Route path="/sosyal-medya" element={<SosyalMedyaPage />} />
          <Route path="/sosyal-medya/friends" element={<FriendsPage />} />
          <Route path="/sosyal-medya/messages" element={<MessagesPage />} />
          <Route path="/sosyal-medya/saved" element={<SavedPostsPage />} />
          <Route path="/sosyal-medya/events" element={<EventsPage />} />
          <Route path="/sosyal-medya/settings" element={<SettingsPage />} />
          <Route path="/sosyal-medya/help" element={<HelpPage />} />
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