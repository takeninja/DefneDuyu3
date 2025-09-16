import React from 'react';
import { Shield, Eye, Database, Brain, Lock, Users } from 'lucide-react';

const PrivacyPolicyPage = () => {
  React.useEffect(() => {
    document.title = 'Gizlilik Politikası - Defne Duyu Bütünleme';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Defne Duyu gizlilik politikası. Kişisel verilerinizin korunması ve yapay zeka eğitimleri için kullanımı hakkında detaylı bilgiler.');
    }
    metaDesc.setAttribute('content',
        'Defne Duyu Bütünleme gizlilik politikası. Kullanıcı verilerinin korunması, platform güvenliği ve yapay zeka modelimizin geliştirilmesi hakkında detaylı bilgiler.'
    );
  }, []);

  return (
    <div className="bg-gradient-to-br from-accent/10 via-secondary/20 to-primary/10 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="text-primary">Gizlilik</span> <span className="text-accent">Politikası</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Defne Duyu Bütünleme olarak kullanıcıların gizliliği ve kişisel verilerinin korunması önceliğimizdir. 
            Bu politika, Platform'da toplanan bilgilerin nasıl kullanıldığını ve korunduğunu açıklar.
          </p>
        </div>

        {/* Detailed Content */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Genel İlke</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Kullanıcıların gizliliği ve kişisel verilerinin korunması önceliğimizdir. Bu politika, Platform'da toplanan bilgilerin nasıl kullanıldığını ve korunduğunu açıklar.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Toplanan Veriler</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Platform'da aşağıdaki veriler toplanmaktadır:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-8 space-y-2">
              <li>Kayıt formunda verilen bilgiler</li>
              <li>Kullanıcı paylaşımları ve deneyim yazıları</li>
              <li>Çerezler aracılığıyla elde edilen teknik veriler</li>
              <li>İletişim formları ve destek talepleri</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Verilerin Kullanım Amaçları</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Toplanan veriler aşağıdaki amaçlarla kullanılmaktadır:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-8 space-y-2">
              <li>Kullanıcı deneyimini iyileştirmek</li>
              <li>Platform güvenliğini sağlamak</li>
              <li>Online rehberlik ve topluluk desteği sunmak</li>
              <li><strong>Yapay zekâ modelimizi geliştirmek için anonimleştirilmiş verileri işlemek</strong></li>
              <li>İstatistiksel analizler yapmak</li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
              <div className="flex items-start">
                <Database className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">
                    Yapay Zeka Geliştirme Hakkında Önemli Bilgi
                  </h3>
                  <p className="text-blue-700 leading-relaxed">
                    Verileriniz, platform hizmetlerini iyileştirmek ve daha etkili destek sunabilmek 
                    amacıyla yapay zeka modelimizin geliştirilmesinde kullanılabilir. Bu süreçte verileriniz 
                    anonimleştirilir ve sadece hizmet kalitesini artırmak için kullanılır.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Veri Güvenliği</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Kişisel verileriniz güvenli sunucularda saklanmakta, şifreleme ve erişim kontrolleriyle korunmaktadır.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Veri Saklama Süresi</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Verileriniz, ilgili mevzuat ve işleme amaçları için gerekli olan süre boyunca saklanır. 
              Süre sonunda veriler silinir, yok edilir veya anonim hale getirilir.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Çocukların Verileri</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Platform, ebeveynler için hazırlanmıştır. 18 yaş altındaki kullanıcıların kişisel verilerinin 
              işlenmesi yalnızca ebeveyn onayı ile mümkündür.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Politika Değişiklikleri</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Gizlilik Politikası zaman zaman güncellenebilir. Güncellemeler kullanıcıya duyurulacaktır.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">8. İletişim</h2>
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