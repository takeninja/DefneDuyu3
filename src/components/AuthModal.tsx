import React, { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
    setSuccess('');
    setShowPassword(false);
    setShowConfirmPassword(false);
    setShowForgotPassword(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) {
        setError('Şifre sıfırlama e-postası gönderilirken bir hata oluştu');
      } else {
        setSuccess('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi!');
        setTimeout(() => {
          setShowForgotPassword(false);
          setIsLogin(true);
          resetForm();
        }, 3000);
      }
    } catch (err) {
      setError('Beklenmeyen bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isLogin) {
        // Login
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setError(error.message === 'Invalid login credentials' 
            ? 'Geçersiz e-posta veya şifre' 
            : 'Giriş yapılırken bir hata oluştu');
        } else {
          setSuccess('Başarıyla giriş yapıldı!');
          setTimeout(() => {
            onAuthSuccess();
            handleClose();
          }, 1000);
        }
      } else {
        // Register
        if (password !== confirmPassword) {
          setError('Şifreler eşleşmiyor');
          setLoading(false);
          return;
        }

        if (password.length < 6) {
          setError('Şifre en az 6 karakter olmalıdır');
          setLoading(false);
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          if (error.message === 'User already registered' || error.message.includes('already registered')) {
            setError('Bu e-posta adresi zaten kayıtlı. Şifrenizi mi unuttunuz?');
            // Show forgot password option
            setTimeout(() => {
              setShowForgotPassword(true);
              setIsLogin(true);
            }, 2000);
          } else {
            setError('Kayıt olurken bir hata oluştu');
          }
        } else {
          setSuccess('Kayıt başarılı! Giriş yapabilirsiniz.');
          setTimeout(() => {
            setIsLogin(true);
            resetForm();
          }, 2000);
        }
      }
    } catch (err) {
      setError('Beklenmeyen bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {showForgotPassword ? 'Şifrenizi Sıfırlayın' : (isLogin ? 'Giriş Yap' : 'Kayıt Ol')}
          </h2>
          <p className="text-gray-600">
            {showForgotPassword 
              ? 'E-posta adresinizi girin, şifre sıfırlama bağlantısını gönderelim'
              : (isLogin 
                ? 'Hesabınıza giriş yapın' 
                : 'Yeni hesap oluşturun')
            }
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 text-center">
            {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={showForgotPassword ? handlePasswordReset : handleSubmit} className="space-y-6">
          {/* Back to Login Button (Forgot Password) */}
          {showForgotPassword && (
            <button
              type="button"
              onClick={() => setShowForgotPassword(false)}
              className="flex items-center space-x-2 text-primary-blue hover:text-primary-green transition-colors duration-200 mb-4"
            >
              <ArrowLeft size={16} />
              <span>Giriş sayfasına dön</span>
            </button>
          )}

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              {showForgotPassword 
                ? 'E-posta Adresi' 
                : (isLogin ? 'E-posta Adresi veya Kullanıcı Adı' : 'E-posta Adresi')
              }
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {isLogin && !showForgotPassword ? (
                  <User className="h-5 w-5 text-gray-400" />
                ) : (
                  <Mail className="h-5 w-5 text-gray-400" />
                )}
              </div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-200"
                placeholder={
                  showForgotPassword 
                    ? 'ornek@email.com' 
                    : (isLogin ? 'E-posta adresinizi veya kullanıcı adınızı girin' : 'ornek@email.com')
                }
              />
            </div>
          </div>

          {/* Password Field */}
          {!showForgotPassword && (
            <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Şifre
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-200"
                placeholder="Şifrenizi girin"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
            </div>
          )}

          {/* Forgot Password Link (Login only) */}
          {isLogin && !showForgotPassword && (
            <div className="text-right">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-primary-blue hover:text-primary-green transition-colors duration-200"
              >
                Şifremi Unuttum
              </button>
            </div>
          )}

          {/* Confirm Password Field (Register only) */}
          {!isLogin && !showForgotPassword && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                Şifre Tekrar
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-200"
                  placeholder="Şifrenizi tekrar girin"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-blue hover:bg-primary-blue/90 disabled:bg-gray-400 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:shadow-none"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {showForgotPassword 
                  ? 'Gönderiliyor...' 
                  : (isLogin ? 'Giriş yapılıyor...' : 'Kayıt olunuyor...')
                }
              </span>
            ) : (
              showForgotPassword 
                ? 'Şifre Sıfırlama Bağlantısı Gönder' 
                : (isLogin ? 'Giriş Yap' : 'Kayıt Ol')
            )}
          </button>
        </form>

        {/* Toggle Login/Register */}
        {!showForgotPassword && (
          <div className="mt-6 text-center">
          <p className="text-gray-600">
            {isLogin ? 'Hesabınız yok mu?' : 'Zaten hesabınız var mı?'}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                resetForm();
              }}
              className="ml-2 text-primary-blue hover:text-primary-green font-semibold transition-colors duration-200"
            >
              {isLogin ? 'Kayıt Ol' : 'Giriş Yap'}
            </button>
          </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;