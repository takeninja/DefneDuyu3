import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onAppointmentClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onAppointmentClick }) => {
  return (
    <section id="ana-sayfa" className="relative bg-gradient-to-br from-accent/10 via-secondary/20 to-primary/10 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Decorative element */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-1 bg-surface/50 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
              <Sparkles className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium text-text/70">Çocuklar İçin Özel Destek</span>
            </div>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-text mb-6 leading-tight">
            <span className="text-primary">Her Çocuk Bir Dünya,</span>
            <br />
            <span className="text-accent">Her Adım Bir Başlangıç</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-text/70 mb-8 max-w-3xl mx-auto leading-relaxed">
            Çocukların gelişimine ışık tutan, ebeveynlere rehberlik eden bir platform.
          </p>

          {/* Description */}
          <p className="text-lg text-text/60 mb-10 max-w-2xl mx-auto">
            Her çocuğun eşsiz potansiyelini keşfetmesine yardımcı olurken, ailelere bu güzel yolculukta 
            destek ve rehberlik sunuyoruz. Çünkü her çocuk özeldir ve her adım değerlidir.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#hizmetler" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2">
              <span>Hizmetlerimizi Keşfedin</span>
              <ArrowRight size={20} />
            </a>
            <button 
              onClick={onAppointmentClick}
              className="border-2 border-accent text-accent hover:bg-accent hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
            >
              Online Randevu Al
            </button>
          </div>
        </div>
      </div>

      {/* Decorative shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/30 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary/20 rounded-full blur-xl"></div>
    </section>
  );
};

export default Hero;