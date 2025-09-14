import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import AuthModal from './AuthModal';
import { useAuth } from '../hooks/useAuth';
import logo from '../images/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();
  const { user, loading, signOut, isAuthenticated } = useAuth();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="bg-surface shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="Defne Duyu Logo" className="h-8 w-8" />
              <span className="text-2xl font-bold text-primary">Defne Duyu</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`transition-colors duration-200 font-medium ${
                isActive('/') ? 'text-primary' : 'text-text hover:text-primary'
              }`}
            >
              Ana Sayfa
            </Link>
            <Link 
              to="/blog" 
              className={`transition-colors duration-200 font-medium ${
                isActive('/blog') ? 'text-primary' : 'text-text hover:text-primary'
              }`}
            >
              Blog
            </Link>
            <Link 
              to="/online-randevu" 
              className={`transition-colors duration-200 font-medium ${
                isActive('/online-randevu') ? 'text-primary' : 'text-text hover:text-primary'
              }`}
            >
              Online Randevu
            </Link>
            <Link 
              to="/hakkimizda" 
              className={`transition-colors duration-200 font-medium ${
                isActive('/hakkimizda') ? 'text-primary' : 'text-text hover:text-primary'
              }`}
            >
              Hakkımızda
            </Link>
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              <div className="w-8 h-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            ) : isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-text">
                  <User size={20} />
                  <span className="text-sm font-medium">
                    {user?.email?.split('@')[0]}
                  </span>
                </div>
                <button
                  onClick={signOut}
                  className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors duration-200 text-sm font-medium"
                >
                  <LogOut size={16} />
                  <span>Çıkış</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Giriş / Kayıt
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-text hover:text-primary focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`transition-colors duration-200 font-medium ${
                  isActive('/') ? 'text-primary' : 'text-text hover:text-primary'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Ana Sayfa
              </Link>
              <Link 
                to="/blog" 
                className={`transition-colors duration-200 font-medium ${
                  isActive('/blog') ? 'text-primary' : 'text-text hover:text-primary'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                to="/online-randevu" 
                className={`transition-colors duration-200 font-medium ${
                  isActive('/online-randevu') ? 'text-primary' : 'text-text hover:text-primary'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Online Randevu
              </Link>
              <Link 
                to="/hakkimizda" 
                className={`transition-colors duration-200 font-medium ${
                  isActive('/hakkimizda') ? 'text-primary' : 'text-text hover:text-primary'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Hakkımızda
              </Link>
              
              {/* Mobile Auth */}
              <div className="pt-4 border-t border-gray-200">
                {loading ? (
                  <div className="flex justify-center">
                    <div className="w-6 h-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                  </div>
                ) : isAuthenticated ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-text">
                      <User size={20} />
                      <span className="font-medium">
                        {user?.email?.split('@')[0]}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        signOut();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors duration-200 font-medium"
                    >
                      <LogOut size={16} />
                      <span>Çıkış Yap</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-full font-semibold transition-all duration-300"
                  >
                    Giriş / Kayıt
                  </button>
                )}
              </div>
            </nav>
          </div>
        )}

        {/* Auth Modal */}
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onAuthSuccess={() => {
            // Handle successful authentication
            console.log('Authentication successful');
          }}
        />
      </div>
    </header>
  );
};

export default Header;