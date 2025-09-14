import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Users, Award, Heart } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Target,
      title: 'Hedef Odaklı Yaklaşım',
      description: 'Her çocuğun bireysel ihtiyaçlarına göre özelleştirilmiş destek programları.'
    },
    {
      icon: Users,
      title: 'Uzman Ekip',
      description: 'Alanında deneyimli terapist ve koçlardan oluşan profesyonel ekibimiz.'
    },
    {
      icon: Award,
      title: 'Kanıtlanmış Yöntemler',
      description: 'Bilimsel araştırmalara dayalı, etkisi kanıtlanmış terapi teknikleri.'
    },
    {
      icon: Heart,
      title: 'Sevgi Dolu Ortam',
      description: 'Çocukların kendilerini güvende ve değerli hissettiği sıcak bir atmosfer.'
    }
  ];

  return (
    <section id="hakkimizda" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-primary-blue">Biz</span> <span className="text-primary-green">Kimiz?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Her çocuğun gelişimi özeldir. Defne Duyu, farkındalık sayfası olarak; otizm terapisi, duyu bütünleme, 
            ergoterapi ve sinirbilim temelli gelişim desteği sunar. Ailelerin yanında, çocukların potansiyelini 
            desteklemek için buradayız.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary-yellow to-primary-green mb-6">
                <feature.icon size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-yellow/10 to-primary-green/10 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Bu Güzel Yolculukta Yanınızdayız
            </h3>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Her çocuğun farklı olduğunu biliyoruz. Bu yüzden her aileye özel, kişiselleştirilmiş 
              destek sunarak çocuğunuzun potansiyelini ortaya çıkarmasına yardımcı oluyoruz.
            </p>
            <Link 
              to="/hakkimizda"
              className="inline-block bg-primary-blue hover:bg-primary-blue/90 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Hikayemizi Keşfedin
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;