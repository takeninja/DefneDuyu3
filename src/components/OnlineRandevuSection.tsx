import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Shield, ArrowRight, CheckCircle } from 'lucide-react';

const OnlineRandevuSection = () => {
  const features = [
    {
      icon: Calendar,
      title: 'Kolay Randevu',
      description: 'Online formla hızlı randevu alın'
    },
    {
      icon: Clock,
      title: '24 Saat İçinde',
      description: 'Hızlı geri dönüş garantisi'
    },
    {
      icon: Shield,
      title: 'Güvenli Platform',
      description: 'Kişisel bilgileriniz güvende'
    }
  ];

  const services = [
    'Ebeveyn Koçluğu',
    'Otizmli Çocuklar İçin Koçluk',
    'DEHB Danışmanlığı',
    'Ergo Terapi'
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary-blue/5 to-primary-green/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-primary-blue">Online</span> <span className="text-primary-green">Randevu</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Uzman ekibimizden randevu almak artık çok kolay. Online formumuzla hemen başvurun.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Features */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              Neden Online Randevu?
            </h3>
            
            <div className="space-y-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-yellow to-primary-green rounded-xl flex items-center justify-center">
                      <feature.icon size={24} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h4>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-4">Sunduğumuz Hizmetler:</h4>
              <div className="grid grid-cols-1 gap-3">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle size={16} className="text-primary-green" />
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - CTA */}
          <div className="text-center">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-yellow to-primary-green rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar size={40} className="text-white" />
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Hemen Randevu Alın
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Çocuğunuzun gelişimi için uzman desteği almak sadece birkaç tık uzağınızda. 
                Formu doldurun, biz sizinle iletişime geçelim.
              </p>
              
              <Link 
                to="/online-randevu"
                className="inline-flex items-center space-x-3 bg-primary-blue hover:bg-primary-blue/90 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <span>Randevu Al</span>
                <ArrowRight size={20} />
              </Link>
              
              <p className="text-sm text-gray-500 mt-4">
                ✓ 24 saat içinde geri dönüş garantisi
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="text-3xl font-bold text-primary-blue mb-2">500+</div>
            <div className="text-gray-600">Mutlu Aile</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="text-3xl font-bold text-primary-green mb-2">5+</div>
            <div className="text-gray-600">Yıl Deneyim</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="text-3xl font-bold text-primary-yellow mb-2">24h</div>
            <div className="text-gray-600">Geri Dönüş Süresi</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OnlineRandevuSection;