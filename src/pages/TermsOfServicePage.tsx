import React from 'react';
import { FileText, Users, Shield, AlertTriangle, CheckCircle, Scale } from 'lucide-react';

const TermsOfServicePage = () => {
  React.useEffect(() => {
    document.title = 'Kullanım Şartları - Defne Duyu';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Defne Duyu kullanım şartları. Platform kullanımı, hizmet koşulları ve kullanıcı sorumlulukları hakkında detaylı bilgiler.');
    }
  }, []);

  const sections = [
    {
      icon: Users,
      title: 'Kullanıcı Sorumlulukları',
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
            Defne Duyu platformunu kullanarak aşağıdaki şartları kabul etmiş sayılırsınız. 
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Genel Hükümler</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Bu kullanım şartları, Defne Duyu platformunun kullanımını düzenler. Platform kullanımı ile 
              bu şartları kabul etmiş sayılırsınız.
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-8 space-y-2">
              <li>Platform 18 yaş üstü kullanıcılar içindir</li>
              <li>Verilen bilgilerin doğru ve güncel olması gerekmektedir</li>
              <li>Hesap güvenliğinden kullanıcı sorumludur</li>
              <li>Platform kurallarına uyulması zorunludur</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Hizmet Kapsamı</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Defne Duyu aşağıdaki hizmetleri sunmaktadır:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-8 space-y-2">
              <li>Online ebeveyn koçluğu hizmetleri</li>
              <li>Otizmli çocuklar için özel destek programları</li>
              <li>Ergoterapi danışmanlığı</li>
              <li>Çocuk gelişimi konularında bilgilendirme</li>
              <li>Online randevu ve danışmanlık sistemi</li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">
                    Hizmet Kalitesi Taahhüdü
                  </h3>
                  <p className="text-blue-700 leading-relaxed">
                    Sunduğumuz tüm hizmetler alanında uzman kişiler tarafından verilmektedir. 
                    Hizmet kalitesini sürekli geliştirmek için çalışıyoruz.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Kullanıcı Sorumlulukları</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Platform kullanıcıları aşağıdaki kurallara uymakla yükümlüdür:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-8 space-y-2">
              <li>Doğru ve güncel bilgi paylaşımı</li>
              <li>Randevu saatlerine uyum</li>
              <li>Saygılı ve uygun iletişim</li>
              <li>Platform kurallarına uygun davranış</li>
              <li>Telif hakları ve fikri mülkiyet haklarına saygı</li>
            </ul>

            <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-8">
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-red-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-red-800 mb-2">
                    Yasaklı Davranışlar
                  </h3>
                  <p className="text-red-700 leading-relaxed">
                    Platform üzerinde hakaret, spam, yanıltıcı bilgi paylaşımı, başkalarının 
                    hesaplarını kullanma ve yasalara aykırı davranışlar kesinlikle yasaktır.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Ödeme ve İptal Koşulları</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Ücretli hizmetler için aşağıdaki koşullar geçerlidir:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-8 space-y-2">
              <li>Ödeme işlemleri güvenli ödeme sistemleri ile yapılır</li>
              <li>Randevu iptalleri 24 saat öncesinden yapılmalıdır</li>
              <li>İade koşulları hizmet türüne göre değişiklik gösterir</li>
              <li>Fiyat değişiklikleri önceden bildirilir</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Sorumluluk Sınırlaması</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Defne Duyu platformu:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-8 space-y-2">
              <li>Hizmet kesintilerinden sorumlu değildir</li>
              <li>Üçüncü taraf bağlantılarından sorumlu değildir</li>
              <li>Kullanıcı verilerinin yanlış kullanımından sorumlu değildir</li>
              <li>Teknik sorunlardan kaynaklanan zararlardan sorumlu değildir</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Değişiklikler</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Bu kullanım şartları gerektiğinde güncellenebilir. Önemli değişiklikler kullanıcılara 
              e-posta yoluyla bildirilir.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">7. İletişim</h2>
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