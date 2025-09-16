import React from 'react';
import { Shield, Eye, Database, FileText, Users, Lock, Brain } from 'lucide-react';

const KvkkPage = () => {
  React.useEffect(() => {
    document.title = 'KVKK Aydınlatma Metni - Defne Duyu Bütünleme';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 
        'Defne Duyu Bütünleme KVKK aydınlatma metni. Kişisel Verilerin Korunması Kanunu kapsamında veri işleme faaliyetleri ve yapay zeka geliştirme süreçleri hakkında detaylı bilgiler.'
      );
    }
  }, []);

  const sections = [
    {
      icon: Shield,
      title: 'Veri Sorumlusu',
      content: 'Defne Duyu Bütünleme, KVKK kapsamında veri sorumlusudur.'
    },
    {
      icon: Database,
      title: 'İşlenen Veriler',
      content: 'Kimlik, iletişim bilgileri, kullanıcı içerikleri ve çerez verileri.'
    },
    {
      icon: Users,
      title: 'Veri Sahipleri Hakları',
      content: 'KVKK kapsamında sahip olduğunuz haklar ve başvuru yolları.'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-accent/10 via-secondary/20 to-primary/10 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="text-primary">KVKK</span> <span className="text-accent">Aydınlatma Metni</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kişisel Verilerin İşlenmesine İlişkin Aydınlatma Metni
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
            Defne Duyu Bütünleme olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") 
            uyarınca kişisel verilerinizin güvenliğine ve gizliliğine önem veriyoruz.
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Veri Sorumlusu</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Defne Duyu Bütünleme, KVKK kapsamında veri sorumlusudur.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">2. İşlenen Kişisel Veriler</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Platform üzerinden kayıt olurken veya hizmetlerden faydalanırken tarafımızla paylaştığınız:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-8 space-y-2">
              <li>Kimlik Bilgileri (Ad, Soyad)</li>
              <li>İletişim Bilgileri (Telefon, E-posta)</li>
              <li>Kullanıcı İçerikleri (Paylaşımlar, deneyim yazıları, mesajlar)</li>
              <li>Çerez ve kullanım verileri</li>
            </ul>
            <p className="text-gray-700 mb-8 leading-relaxed">
              işlenebilecektir.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">3. İşleme Amaçları</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Kişisel verileriniz şu amaçlarla işlenmektedir:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-8 space-y-2">
              <li>Platform üyeliğinizi oluşturmak ve hizmetleri sunmak</li>
              <li>Online rehberlik ve topluluk desteğini organize etmek</li>
              <li>Kullanıcı deneyimini geliştirmek</li>
              <li><strong>Yapay zekâ modellerimizi geliştirmek için anonimleştirilmiş verileri işlemek</strong></li>
              <li>Yasal yükümlülüklerimizi yerine getirmek</li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
              <div className="flex items-start">
                <Brain className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">
                    Yapay Zeka Geliştirme
                  </h3>
                  <p className="text-blue-700 leading-relaxed">
                    Kişisel verileriniz, platform hizmetlerini iyileştirmek ve daha etkili destek sunabilmek 
                    amacıyla yapay zeka modellerimizin geliştirilmesinde kullanılabilir. Bu süreçte verileriniz 
                    anonimleştirilir ve sadece hizmet kalitesini artırmak için kullanılır.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Hukuki Sebep</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Kişisel verileriniz, KVKK'nın 5. ve 6. maddeleri kapsamında, açık rıza ve sözleşmenin ifası 
              hukuki sebebine dayalı olarak işlenmektedir.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Veri Paylaşımı</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Kişisel verileriniz, yasal zorunluluklar dışında üçüncü kişilerle paylaşılmayacaktır. 
              Yapay zekâ modelimizi geliştirmek için kullanılan veriler yalnızca anonim hale getirildikten 
              sonra işlenir.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Haklarınız</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              KVKK'nın 11. maddesi gereği;
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-8 space-y-2">
              <li>Verilerinizin işlenip işlenmediğini öğrenme,</li>
              <li>İşlenmişse bilgi talep etme,</li>
              <li>Yanlış veya eksik işlenmişse düzeltilmesini isteme,</li>
              <li>Silinmesini veya yok edilmesini talep etme,</li>
              <li>İşlemenin sınırlandırılmasını talep etme,</li>
              <li>İtiraz etme</li>
            </ul>
            <p className="text-gray-700 mb-8 leading-relaxed">
              haklarına sahipsiniz.
            </p>

            <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-8">
              <div className="flex items-start">
                <FileText className="h-6 w-6 text-green-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-green-800 mb-2">
                    Başvuru Yöntemi
                  </h3>
                  <p className="text-green-700 leading-relaxed">
                    Taleplerinizi <a href="mailto:info@defneduyu.com" className="text-green-800 underline hover:text-green-900">info@defneduyu.com</a> adresine iletebilirsiniz.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">7. İletişim</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              KVKK kapsamındaki sorularınız için bizimle iletişime geçebilirsiniz:
            </p>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-700 mb-2">
                <strong>E-posta:</strong> <a href="mailto:info@defneduyu.com" className="text-primary hover:text-primary/80 underline">info@defneduyu.com</a>
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
                Bu aydınlatma metni son olarak 15 Ocak 2025 tarihinde güncellenmiştir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KvkkPage;