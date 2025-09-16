import React from 'react';
import { FileText, Users, Shield, AlertTriangle, CheckCircle, Scale, Brain } from 'lucide-react';

const TermsOfServicePage = () => {
  React.useEffect(() => {
    document.title = 'Kullanım Şartları - Defne Duyu Bütünleme';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 
        'Defne Duyu Bütünleme platformu kullanım şartları. Platform kullanımı, hizmet koşulları, kullanıcı sorumlulukları ve veri kullanımı hakkında detaylı bilgiler.'
      );
    }
  }, []);

  const sections = [
    {
      icon: Users,
      title: 'Kullanıcı Yükümlülükleri',
      content: 'Platform kullanımında uyulması gereken kurallar ve sorumluluklar.'
    },
    {
      icon: Shield,
      title: 'Hizmet Koşulları',
      content: 'Sunulan hizmetlerin kapsamı ve kullanım koşulları.'
    },
    {
      icon: Scale,
      title: 'Yasal Haklar',
      content: 'Kullanıcı hakları ve yasal sorumluluklar.'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-accent/10 via-secondary/20 to-primary/10 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="text-primary">Kullanım</span> <span className="text-accent">Şartları</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Defne Duyu Bütünleme platformunu kullanarak aşağıdaki şartları kabul etmiş sayılırsınız. 
            Lütfen bu şartları dikkatlice okuyunuz.
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
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Defne Duyu Bütünleme Platformu Kullanım Şartları
            </h2>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Amaç ve Kapsam</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Bu kullanım şartları, <a href="http://www.defneduyu.com" className="text-primary-blue hover:text-primary-green underline" target="_blank" rel="noopener noreferrer">www.defneduyu.com</a> alan adlı internet sitesi ("Platform") üzerinden sunulan hizmetlerden faydalanan tüm kullanıcılar ("Kullanıcı") ile Platform'un sahibi olan Defne Duyu Bütünleme ("Şirket") arasında düzenlenmiştir.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Hizmetin Konusu</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Platform, otizmli, DEHB'li ve benzeri nörogelişimsel farklılıklara sahip çocukların ebeveynlerine rehberlik ve destek sağlamak amacıyla kurulmuştur. Kullanıcılar, deneyimlerini paylaşabilir, uzmanlardan içerik okuyabilir, topluluk desteği alabilir.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Kullanıcı Yükümlülükleri</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Kullanıcılar aşağıdaki kurallara uymakla yükümlüdür:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-8 space-y-2">
              <li>Paylaştıkları içeriklerin doğru ve hukuka uygun olmasından sorumludur</li>
              <li>Hakaret, nefret söylemi, ayrımcılık, kişisel veri ifşası veya yasa dışı içerikler kesinlikle yasaktır</li>
              <li>Platform'da paylaştığı içeriklerin diğer kullanıcılar tarafından görülebileceğini kabul eder</li>
            </ul>

            <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-8">
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-red-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-red-800 mb-2">
                    Yasaklı Davranışlar
                  </h3>
                  <p className="text-red-700 leading-relaxed">
                    Platform üzerinde hakaret, nefret söylemi, ayrımcılık, kişisel veri ifşası ve yasalara aykırı davranışlar kesinlikle yasaktır.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Fikri Haklar</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Platform'da yer alan tüm içerikler ve görseller Defne Duyu Bütünleme'ye aittir. Kullanıcılar, bu içerikleri Şirket'in izni olmaksızın kopyalayamaz, çoğaltamaz, dağıtamaz.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Veri Kullanımı</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Kullanıcı, KVKK kapsamında kişisel verilerinin toplanmasına, işlenmesine ve gerektiğinde <strong>yapay zekâ modelimizin geliştirilmesi için anonimleştirilerek kullanılmasına</strong> onay verir.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
              <div className="flex items-start">
                <Brain className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">
                    Yapay Zeka Geliştirme
                  </h3>
                  <p className="text-blue-700 leading-relaxed">
                    Kişisel verileriniz, platform hizmetlerini iyileştirmek ve daha etkili destek sunabilmek 
                    amacıyla yapay zeka modelimizin geliştirilmesinde kullanılabilir. Bu süreçte verileriniz 
                    anonimleştirilir ve sadece hizmet kalitesini artırmak için kullanılır.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Sorumluluk Reddi</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Platform'da yer alan bilgiler yalnızca bilgilendirme ve rehberlik amaçlıdır. Buradaki içerikler tıbbi veya psikolojik tedavi tavsiyesi niteliği taşımaz. Kullanıcılar gerektiğinde sağlık profesyonellerine başvurmalıdır.
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-yellow-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                    Önemli Uyarı
                  </h3>
                  <p className="text-yellow-700 leading-relaxed">
                    Platform'daki bilgiler rehberlik amaçlıdır ve profesyonel tıbbi tavsiye yerine geçmez. 
                    Çocuğunuzun sağlığı ile ilgili kararlar için mutlaka uzman doktor görüşü alınız.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Yürürlük</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Bu kullanım şartları güncel tarih itibarıyla geçerlidir. Defne Duyu Bütünleme, gerekli gördüğü durumlarda şartlarda değişiklik yapabilir.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">8. İletişim</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Kullanım şartları hakkında sorularınız için:
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
                Bu kullanım şartları son olarak 15 Ocak 2025 tarihinde güncellenmiştir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;