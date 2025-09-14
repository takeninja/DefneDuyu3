import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Video, Puzzle } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Zap,
      title: 'Ergo Terapi',
      description: 'Çocukların günlük yaşam becerilerini eğlenceli aktivitelerle geliştiriyoruz. Oyun temelli yaklaşımımızla her çocuğun kendine güvenini artırıyoruz.',
      features: ['Motor beceri geliştirme', 'Duyusal entegrasyon', 'Öz bakım becerileri', 'El-göz koordinasyonu'],
      color: 'from-accent to-orange-400'
    },
    {
      icon: Video,
      title: 'Online Ebeveyn Koçluğu',
      description: 'Ebeveynlik yolculuğunuzda yanınızdayız. Çocuğunuzla daha güçlü bağlar kurmanız ve zorlu anları fırsata çevirmeniz için size rehberlik ediyoruz.',
      features: ['Birebir online görüşmeler', 'Ebeveyn eğitim programları', 'Davranış yönetimi', 'Aile dinamikleri'],
      color: 'from-primary to-green-400'
    },
    {
      icon: Puzzle,
      title: 'Otizmli Çocuklar İçin Koçluk',
      description: 'Otizmli çocukların eşsiz dünyalarını anlıyor, onların güçlü yanlarını ortaya çıkarıyoruz. Ailelere bu özel yolculukta destek ve umut veriyoruz.',
      features: ['Sosyal beceri geliştirme', 'İletişim desteği', 'Davranış analizi', 'Aile danışmanlığı'],
      color: 'from-secondary to-teal-400'
    }
  ];

  return (
    <section id="hizmetler" className="py-20 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-text mb-6">
            <span className="text-primary">Hizmetlerimiz</span>
          </h2>
          <p className="text-xl text-text/70 max-w-3xl mx-auto">
            Çocuğunuzun ihtiyaçlarına özel tasarlanmış, profesyonel destek hizmetlerimizi keşfedin.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-surface rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${service.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon size={40} className="text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-text mb-4">{service.title}</h3>
              <p className="text-text/70 mb-6 leading-relaxed">{service.description}</p>
              
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-text/70">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button className="w-full bg-secondary/30 hover:bg-primary hover:text-white text-text py-3 px-6 rounded-xl font-semibold transition-all duration-300 group-hover:shadow-md">
                Detayları İncele
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link 
            to="/online-randevu"
            className="inline-block bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Hizmetlerimizi Keşfedin
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;