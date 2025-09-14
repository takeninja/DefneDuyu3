import React from 'react';
import { Heart, Target, Eye, Users, Award, Shield, Lightbulb } from 'lucide-react';

const HakkimizdaPage = () => {
  React.useEffect(() => {
    document.title = 'Hakkımızda - Defne Duyu | Misyonumuz ve Vizyonumuz';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Defne Duyu hakkında bilgi edinin. Misyonumuz, vizyonumuz ve uzman ekibimizle çocuk gelişimi alanında sunduğumuz hizmetleri keşfedin.');
    }
  }, []);

  const teamMembers = [
    {
      name: 'Dr. Ayşe Kaya',
      title: 'Kurucu & Baş Ergoterapi Uzmanı',
      description: 'Çocuk gelişimi alanında 15 yıllık deneyime sahip. Özel gereksinimli çocuklar konusunda uzman.',
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
    {
      name: 'Uzm. Mehmet Demir',
      title: 'Otizm Spektrum Uzmanı',
      description: 'Otizm spektrum bozukluğu olan çocuklar ve aileleriyle çalışma konusunda 10 yıllık tecrübe.',
      image: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
    {
      name: 'Erg. Fatma Şen',
      title: 'Ergoterapi Uzmanı',
      description: 'Motor beceri gelişimi ve duyusal entegrasyon konularında uzman. Çocuklarla çalışmayı seviyor.',
      image: 'https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
    {
      name: 'Psik. Zeynep Yılmaz',
      title: 'Ebeveyn Koçu',
      description: 'Aile danışmanlığı ve ebeveyn koçluğu alanında 8 yıllık deneyim. Pozitif ebeveynlik uzmanı.',
      image: 'https://images.pexels.com/photos/7176319/pexels-photo-7176319.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Sevgi ve Şefkat',
      description: 'Her çocuğa sevgi dolu bir yaklaşımla, onların kendilerini değerli hissetmelerini sağlıyoruz.'
    },
    {
      icon: Shield,
      title: 'Güven ve Güvenlik',
      description: 'Aileler ve çocuklar için güvenli, destekleyici bir ortam yaratmaya odaklanıyoruz.'
    },
    {
      icon: Lightbulb,
      title: 'Yenilikçilik',
      description: 'En güncel yöntemler ve teknolojilerle çocukların gelişimini destekliyoruz.'
    },
    {
      icon: Users,
      title: 'İşbirliği',
      description: 'Aileler, uzmanlar ve çocuklar arasında güçlü bir işbirliği ağı kuruyoruz.'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-accent/10 via-secondary/20 to-primary/10 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="text-primary">Biz</span> <span className="text-accent">Kimiz?</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Çocukların dünyasına dokunan, ailelerin kalbine ulaşan bir ekibiz. Her çocuğun eşsiz hikayesinde 
            yanında olmak için buradayız.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-20">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-yellow to-primary-green rounded-2xl flex items-center justify-center">
                <Target size={32} className="text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6">
              <span className="text-primary-green">Misyonumuz</span>
            </h2>
            <p className="text-lg text-gray-600 text-center max-w-4xl mx-auto leading-relaxed">
              Her çocuğun içindeki sonsuz potansiyeli keşfetmesine yardımcı olmak. Ailelere bu eşsiz yolculukta 
              rehberlik ederek, çocukların kendilerine güvenli, mutlu ve başarılı bireyler olarak yetişmelerini sağlamak. 
              Sevgi, sabır ve uzmanlıkla her aileye dokunmak, onların hayatlarına anlam katmak bizim en büyük amacımız.
            </p>
          </div>
        </section>

        {/* Vision Section */}
        <section className="mb-20">
          <div className="bg-gradient-to-br from-primary-blue/10 to-primary-green/10 rounded-3xl p-8 md:p-12">
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-blue to-primary-yellow rounded-2xl flex items-center justify-center">
                <Eye size={32} className="text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6">
              <span className="text-primary-blue">Vizyonumuz</span>
            </h2>
            <p className="text-lg text-gray-600 text-center max-w-4xl mx-auto leading-relaxed">
              Türkiye'nin her köşesindeki çocuğa ulaşabilen, ailelerin ilk tercihi olan bir platform olmak. 
              Çocuk gelişimi alanında umut ışığı yakmak, her ailenin "mümkün" diyebileceği bir gelecek inşa etmek. 
              Sevgiyle büyüyen, kendine güvenen, potansiyelini keşfetmiş nesiller yetiştirmek için var gücümüzle çalışmak.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              <span className="text-primary-yellow">Neden CocukGeliyor?</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Bizi farklı kılan değerler ve yaklaşımımız
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-yellow to-primary-green rounded-xl flex items-center justify-center">
                    <value.icon size={24} className="text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">{value.title}</h3>
                <p className="text-gray-600 text-center text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              <span className="text-primary-green">Ekibimiz</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Alanında uzman, deneyimli ve çocukları seven profesyonel ekibimizle tanışın
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-primary-blue font-semibold mb-3 text-sm">{member.title}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-primary-yellow/10 to-primary-green/10 rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Bu Güzel Yolculukta Yanınızdayız
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Her çocuk özeldir, her aile değerlidir. Sizin de bu eşsiz yolculuğunuzda yanınızda olmak, 
              çocuğunuzun potansiyelini keşfetmesine yardımcı olmak için buradayız.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/#randevu"
                className="bg-primary-blue hover:bg-primary-blue/90 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Hemen Randevu Al
              </a>
              <a 
                href="/#iletisim"
                className="border-2 border-primary-green text-primary-green hover:bg-primary-green hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
              >
                Bizimle İletişime Geçin
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HakkimizdaPage;