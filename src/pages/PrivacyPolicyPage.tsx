import React from 'react';
import { Shield, Eye, Database, Brain, Lock, Users } from 'lucide-react';

const PrivacyPolicyPage = () => {
  React.useEffect(() => {
    document.title = 'Gizlilik Politikası - Defne Duyu';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Defne Duyu gizlilik politikası. Kişisel verilerinizin korunması ve yapay zeka eğitimleri için kullanımı hakkında detaylı bilgiler.');
    }
  }, []);

  const sections = [
    {
      icon: Shield,
      title: 'Veri Güvenliği',
      content: 'Kişisel verileriniz en yüksek güvenlik standartlarıyla korunmaktadır.'
    },
    {
      icon: Brain,
      title: 'Yapay Zeka Eğitimleri',
      content: 'Verileriniz hizmet kalitesini artırmak için yapay zeka modellerinin eğitiminde kullanılabilir.'
    },
    {
      icon: Database,
      title: 'Veri Saklama',
      content: 'Verileriniz yasal gereklilikler çerçevesinde güvenli sunucularda saklanır.'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-accent/10 via-secondary/20 to-primary/10 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="text-primary">Gizlilik</span> <span className="text-accent">Politikası</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kişisel verilerinizin korunması bizim için önceliklidir. Bu politika, verilerinizin nasıl toplandığını, 
            kullanıldığını ve korunduğunu açıklamaktadır.
          </p>
        </div>

        {/* Key Points */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
                  <section.icon size={24} className="text-white" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">{section.title}</h3>
              <p className="text-gray-600 text-center text-sm leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>

        {/* Detailed Content */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Toplanan Bilgiler</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Defne Duyu olarak, size daha iyi hizmet verebilmek için aşağıdaki bilgileri topluyoruz:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-8 space-y-2">
              <li>Ad, soyad ve iletişim bilgileri</li>
              <li>E-posta adresi ve telefon numarası</li>
              <li>Çocuğunuzun yaşı ve gelişim durumu ile ilgili bilgiler</li>
              <li>Randevu ve terapi süreçleri ile ilgili kayıtlar</li>
              <li>Web sitesi kullanım verileri ve çerezler</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Bilgilerin Kullanımı</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Topladığımız bilgiler aşağıdaki amaçlarla kullanılmaktadır:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-8 space-y-2">
              <li>Terapi ve koçluk hizmetlerinin sunulması</li>
              <li>Randevu planlaması ve takibi</li>
              <li>Hizmet kalitesinin artırılması</li>
              <li>İletişim ve bilgilendirme</li>
              <li><strong>Yapay zeka modellerinin eğitimi ve geliştirilmesi</strong></li>
            </ul>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
              <div className="flex items-start">
                <Brain className="h-6 w-6 text-yellow-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                    Yapay Zeka Eğitimleri Hakkında Önemli Bilgi
                  </h3>
                  <p className="text-yellow-700 leading-relaxed">
                    Verileriniz, çocuk gelişimi alanında daha etkili ve kişiselleştirilmiş hizmetler sunabilmek 
                    amacıyla yapay zeka modellerinin eğitiminde kullanılabilir. Bu süreçte kişisel kimlik 
                    bilgileriniz anonimleştirilir ve sadece hizmet kalitesini artırmak için kullanılır.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Veri Güvenliği</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Kişisel verilerinizin güvenliği için aşağıdaki önlemleri alıyoruz:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-8 space-y-2">
              <li>SSL şifreleme ile güvenli veri aktarımı</li>
              <li>Güvenli sunucularda veri saklama</li>
              <li>Erişim kontrolü ve yetkilendirme sistemleri</li>
              <li>Düzenli güvenlik denetimleri</li>
              <li>Personel eğitimleri ve gizlilik anlaşmaları</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Haklarınız</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              KVKK kapsamında aşağıdaki haklara sahipsiniz:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-8 space-y-2">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>İşlenen verileriniz hakkında bilgi talep etme</li>
              <li>Verilerin düzeltilmesini veya silinmesini isteme</li>
              <li>Veri işlemeye itiraz etme</li>
              <li>Zararın giderilmesini talep etme</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">5. İletişim</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Gizlilik politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz:
            </p>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-700 mb-2">
                <strong>E-posta:</strong> defneduyu@gmail.com
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Telefon:</strong> 0(540) 793 04 69
              </p>
              <p className="text-gray-700">
                <strong>Adres:</strong> Çankaya/ANKARA, Türkiye
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Bu gizlilik politikası son olarak 15 Ocak 2025 tarihinde güncellenmiştir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;