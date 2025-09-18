import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Home, Users, MessageCircle, Bell, ChevronDown, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import logo from '../../images/logo.png';

interface SocialHeaderProps {
  user: any;
}

const SocialHeader: React.FC<SocialHeaderProps> = ({ user }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { signOut } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Left Section - Logo & Search */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="Defne Duyu" className="h-10 w-10" />
              <span className="text-xl font-bold text-primary hidden sm:block">Sosyal Medya</span>
            </Link>
            
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Ara..."
                className="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Center Section - Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <Home className="h-6 w-6 text-primary" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <Users className="h-6 w-6 text-gray-600 hover:text-primary" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <MessageCircle className="h-6 w-6 text-gray-600 hover:text-primary" />
            </button>
          </div>

          {/* Right Section - User Menu */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
              <Bell className="h-5 w-5 text-gray-600" />
            </button>
            
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {user?.email?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-600" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                        <span className="text-white text-lg font-semibold">
                          {user?.email?.charAt(0).toUpperCase() || 'U'}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                    {user?.user_metadata?.profile_photo_url ? (
                      <img
                        src={user.user_metadata.profile_photo_url}
                        alt="Profile"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                        <span className="text-white text-lg font-semibold">
                          {user?.email?.charAt(0).toUpperCase() || 'U'}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <Link
                    to="/"
                    className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Home className="h-4 w-4 text-gray-600" />
                    <span className="text-gray-700">Ana Siteye Dön</span>
                  </Link>
                  
                  <button
                    onClick={signOut}
                    className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors duration-200 text-left"
                  >
                    <LogOut className="h-4 w-4 text-gray-600" />
                    <span className="text-gray-700">Çıkış Yap</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SocialHeader;