import React from 'react';
import { Shield, Eye, Database, FileText, Users, Lock } from 'lucide-react';

const KvkkPage = () => {
  React.useEffect(() => {
    document.title = 'KVKK Aydınlatma Metni - Defne Duyu';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Defne Duyu KVKK aydınlatma metni. Kişisel Verilerin Korunması Kanunu kapsamında veri işleme faaliyetleri hakkında detaylı bilgiler.');
    }
  }, []);

  const sections = [
    {
      icon: Shield,
      title: 'Veri Sorumlusu',
      content: 'Kişisel verilerinizin işlenmesinden sorumlu kuruluş bilgileri.'
    },
    {
      icon: Database,
      title: 'İşleme Amaçları',
      content: 'Kişisel verilerinizin hangi amaçlarla işlendiği.'
    },
    {
      icon: Users,
      title: 'Veri Sahipleri Hakları',
      content: 'KVKK kapsamında sahip olduğunuz haklar.'
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
            6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında kişisel verilerinizin 
            işlenmesi hakkında aydınlatma metni.
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
            <p className="text-gray-700 mb-6 leading-relaxed">
              6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca, kişisel verileriniz; 
              veri sorumlusu sıfatıyla Defne Duyu tarafından aşağıda açıklanan kapsamda işlenmektedir.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="font-bold text-gray-900 mb-4">İletişim Bilgileri:</h3>
              <p className="text-gray-700 mb-2">
                <strong>Adres:</strong> Çankaya/ANKARA, Türkiye
              </p>
              <p className="text-gray-700 mb-2">
                <strong>E-posta:</strong> defneduyu@gmail.com
              </p>
              <p className="text-gray-700">
                <strong>Telefon:</strong> 0(540) 793 04 69
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Kişisel Verilerin İşlenme Amaçları</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-8 space-y-2">
              <li>Çocuk gelişimi ve terapi hizmetlerinin sunulması</li>
              <li>Randevu planlaması ve takibi</li>
              <li>Müşteri ilişkileri yönetimi</li>
              <li>Hizmet kalitesinin artırılması</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
              <li>İstatistiksel analiz ve raporlama</li>
              <li><strong>Yapay zeka modellerinin eğitimi ve geliştirilmesi</strong></li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
              <div className="flex items-start">
                <Database className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">
                    Yapay Zeka Eğitimleri
                  </h3>
                  <p className="text-blue-700 leading-relaxed">
                    Kişisel verileriniz, çocuk gelişimi alanında daha etkili hizmetler sunabilmek 
                    amacıyla yapay zeka modellerinin eğitiminde kullanılabilir. Bu süreçte verileriniz 
                    anonimleştirilir ve sadece hizmet kalitesini artırmak için kullanılır.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">3. İşlenen Kişisel Veri Kategorileri</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Aşağıdaki kategorilerde kişisel verileriniz işlenmektedir:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-8 space-y-2">
              <li><strong>Kimlik Verileri:</strong> Ad, soyad, doğum tarihi</li>
              <li><strong>İletişim Verileri:</strong> E-posta, telefon, adres</li>
              <li><strong>Müşteri İşlem Verileri:</strong> Randevu kayıtları, hizmet geçmişi</li>
              <li><strong>Finansal Veriler:</strong> Ödeme bilgileri, fatura bilgileri</li>
              <li><strong>Özel Nitelikli Veriler:</strong> Sağlık verileri (çocuk gelişimi ile ilgili)</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Kişisel Verilerin İşlenme Hukuki Sebepleri</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Kişisel verileriniz KVKK'nın 5. ve 6. maddelerinde belirtilen aşağıdaki hukuki sebeplere dayanılarak işlenmektedir:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-8 space-y-2">
              <li>Açık rızanızın bulunması</li>
              <li>Sözleşmenin kurulması veya ifasının gerekli olması</li>
              <li>Yasal yükümlülüğün yerine getirilmesi</li>
              <li>Meşru menfaatlerin korunması</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Kişisel Verilerin Aktarılması</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Kişisel verileriniz aşağıdaki durumlarda üçüncü kişilerle paylaşılabilir:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-8 space-y-2">
              <li>Yasal zorunluluklar gereği kamu kurumları ile</li>
              <li>Hizmet sağlayıcılar ile (teknik destek, ödeme sistemleri)</li>
              <li>İş ortakları ile (sadece gerekli olan veriler)</li>
              <li>Açık rızanızın bulunduğu durumlar</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Veri Sahibi Olarak Haklarınız</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-8 space-y-2">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>İşlenen kişisel verileriniz hakkında bilgi talep etme</li>
              <li>Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme</li>
              <li>Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme</li>
              <li>Kişisel verilerinizin silinmesini veya yok edilmesini isteme</li>
              <li>Kişisel verilerinizin işlenmesine itiraz etme</li>
              <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kişinin aleyhine bir sonucun ortaya çıkmasına itiraz etme</li>
              <li>Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde zararın giderilmesini talep etme</li>
            </ul>

            <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-8">
              <div className="flex items-start">
                <FileText className="h-6 w-6 text-green-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-green-800 mb-2">
                    Başvuru Yöntemi
                  </h3>
                  <p className="text-green-700 leading-relaxed">
                    Haklarınızı kullanmak için defneduyu@gmail.com adresine yazılı olarak 
                    başvurabilirsiniz. Başvurularınız en geç 30 gün içinde yanıtlanacaktır.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Veri Güvenliği</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Kişisel verilerinizin güvenliği için aşağıdaki teknik ve idari tedbirleri almaktayız:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-8 space-y-2">
              <li>SSL şifreleme teknolojisi</li>
              <li>Güvenli sunucu altyapısı</li>
              <li>Erişim kontrolü ve yetkilendirme</li>
              <li>Düzenli güvenlik denetimleri</li>
              <li>Personel eğitimleri</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">8. İletişim</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              KVKK kapsamındaki sorularınız için bizimle iletişime geçebilirsiniz:
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