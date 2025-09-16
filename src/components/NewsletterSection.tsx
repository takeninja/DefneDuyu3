import React from 'react';
import { Mail } from 'lucide-react';

const NewsletterSection = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-primary/5 to-accent/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
              <Mail size={24} className="text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-text mb-3">Bültenimize Abone Olun</h3>
          <p className="text-text/70 mb-6 max-w-2xl mx-auto">
            Çocuk gelişimi hakkında güncel bilgileri ve uzman önerilerini kaçırmayın.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="E-posta adresiniz"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text"
            />
            <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap">
              Abone Ol
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;