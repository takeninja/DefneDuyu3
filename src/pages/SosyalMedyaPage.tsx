import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import SocialFeed from '../components/social/SocialFeed';
import SocialSidebar from '../components/social/SocialSidebar';
import SocialHeader from '../components/social/SocialHeader';
import AuthModal from '../components/AuthModal';

const SosyalMedyaPage = () => {
  const { user, loading, isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    document.title = 'Sosyal Medya - Defne Duyu | Ebeveyn Topluluğu';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 
        'Ebeveynler için özel sosyal medya platformu. Deneyimlerinizi paylaşın, diğer ailelerle bağlantı kurun ve uzman desteği alın.'
      );
    }
  }, []);

  const handleChatToggle = () => {
    setShowChat(!showChat);
  };

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Redirect to auth modal if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Sosyal Medya Platformuna Hoş Geldiniz
          </h2>
          <p className="text-gray-600 mb-6">
            Bu platforma erişmek için giriş yapmanız gerekiyor. Henüz hesabınız yoksa kayıt olabilirsiniz.
          </p>
          <button
            onClick={() => setShowAuthModal(true)}
            className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
          >
            Giriş Yap / Kayıt Ol
          </button>
        </div>
        
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthSuccess={() => {
            setShowAuthModal(false);
            window.location.reload();
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Social Media Header */}
      <SocialHeader user={user} />
      
      <div className="flex max-w-7xl mx-auto">
        {/* Left Sidebar */}
        <SocialSidebar user={user} onChatClick={handleChatToggle} />
        
        {/* Main Content Area */}
        <div className="flex-1 px-4 py-6">
          {/* Social Feed */}
          <SocialFeed user={user} showChat={showChat} onChatToggle={handleChatToggle} />
        </div>
        
        {/* Right Sidebar - Friends & Chat */}
        <div className="w-80 p-4">
          <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
            <h3 className="font-bold text-gray-900 mb-4">Arkadaşlar</h3>
            <div className="space-y-3">
              {/* Friends list placeholder */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <span className="text-sm text-gray-600">Arkadaş listesi yakında...</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4">
            <h3 className="font-bold text-gray-900 mb-4">Sohbet</h3>
            <div className="space-y-3">
              {/* Chat list placeholder */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <span className="text-sm text-gray-600">Sohbet özelliği yakında...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SosyalMedyaPage;