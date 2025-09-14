import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import logoFooter from '../images/logo-footer.jpeg';

const Footer = () => {
  return (
    <footer id="iletisim" className="bg-text text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <img src={logoFooter} alt="Defne Duyu Logo" className="h-16 w-16" />
              <span className="text-2xl font-bold">Defne Duyu</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Çocukların sağlıklı gelişimi için aileler ve uzmanlar arasında köprü görevi görüyoruz.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-primary hover:bg-primary/80 p-2 rounded-full transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-accent hover:bg-accent/80 p-2 rounded-full transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="bg-secondary hover:bg-secondary/80 text-text p-2 rounded-full transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full transition-colors duration-300">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Hızlı Bağlantılar</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-accent transition-colors duration-300">Ana Sayfa</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-accent transition-colors duration-300">Blog</Link></li>
              <li><a href="#hizmetler" className="text-gray-400 hover:text-accent transition-colors duration-300">Hizmetler</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent transition-colors duration-300">SSS</a></li>
              <li><Link to="/hakkimizda" className="text-gray-400 hover:text-accent transition-colors duration-300">Hakkımızda</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6">Hizmetlerimiz</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">Ergo Terapi</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">Online Ebeveyn Koçluğu</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">Otizmli Çocuklar İçin Koçluk</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6">İletişim</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-gray-400">defneduyu@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-accent" />
                <span className="text-gray-400">0(540) 793 04 69</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-secondary mt-1" />
                <span className="text-gray-400">
                  Çankaya/ANKARA<br />
                  Türkiye
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 pt-12 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-xl font-bold mb-4">Bültenimize Abone Olun</h3>
            <p className="text-gray-400 mb-6">Çocuk gelişimi hakkında güncel bilgileri kaçırmayın.</p>
            <div className="flex space-x-3">
              <input 
                type="email" 
                placeholder="E-posta adresiniz"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-full focus:outline-none focus:border-primary-blue text-white"
              />
              <button className="bg-primary hover:bg-primary/90 px-6 py-3 rounded-full font-semibold transition-colors duration-300">
                Abone Ol
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Defne Duyu. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;