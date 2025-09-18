import React from 'react';
import { HelpCircle, MessageCircle, Mail, Phone, ChevronDown, ChevronUp } from 'lucide-react';

const HelpPage = () => {
  const [openFAQ, setOpenFAQ] = React.useState<number | null>(null);

  const faqs = [
    {
      question: 'Sosyal medya platformuna nasıl kayıt olabilirim?',
      answer: 'Ana sayfada "Giriş / Kayıt" butonuna tıklayarak kayıt formunu doldurabilirsiniz. E-posta adresinizi doğruladıktan sonra platforma erişim sağlayabilirsiniz.'
    },
    {
      question: 'Arkadaş nasıl eklerim?',
      answer: 'Arkadaşlar sayfasına giderek "Tüm Kullanıcılar" sekmesinden diğer kullanıcıları görebilir ve arkadaşlık isteği gönderebilirsiniz. Gönderdiğiniz istekler onaylandığında arkadaş listenize eklenecektir.'
    },
    {
      question: 'Mesajlaşma nasıl çalışır?',
      answer: 'Sadece arkadaş olduğunuz kişilerle mesajlaşabilirsiniz. Mesajlar sayfasından arkadaşlarınızı seçerek gerçek zamanlı sohbet edebilirsiniz.'
    },
    {
      question: 'Gönderi nasıl kaydederim?',
      answer: 'Beğendiğiniz gönderileri kaydetmek için gönderi üzerindeki kaydet butonunu kullanabilirsiniz. Kaydedilen gönderilerinizi "Kaydedilenler" sayfasından görüntüleyebilirsiniz.'
    },
    {
      question: 'Etkinlik nasıl oluştururum?',
      answer: 'Etkinlikler sayfasında "Etkinlik Oluştur" butonuna tıklayarak yeni etkinlik oluşturabilirsiniz. Etkinlik başlığı, tarihi, konumu ve açıklamasını ekleyebilirsiniz.'
    },
    {
      question: 'Profil bilgilerimi nasıl güncellerim?',
      answer: 'Ayarlar sayfasından profil bilgilerinizi (ad, soyad, hakkımda, konum, website) güncelleyebilirsiniz. Değişiklikler anında kaydedilir.'
    },
    {
      question: 'AI asistan nasıl kullanılır?',
      answer: 'Ana sayfada "AI Asistan ile Sohbet Et" butonuna tıklayarak yapay zeka asistanımızla sohbet edebilirsiniz. Size ebeveynlik konularında yardımcı olabilir.'
    },
    {
      question: 'Hesabımı nasıl silerim?',
      answer: 'Hesap silme işlemi için lütfen destek ekibimizle iletişime geçin. Size yardımcı olmaktan memnuniyet duyarız.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <HelpCircle className="h-6 w-6 mr-2 text-primary" />
            Yardım Merkezi
          </h1>
          <p className="text-gray-600 mt-2">
            Sık sorulan sorular ve destek bilgileri.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Sık Sorulan Sorular
              </h2>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      {openFAQ === index ? (
                        <ChevronUp className="h-5 w-5 text-gray-600" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-600" />
                      )}
                    </button>
                    {openFAQ === index && (
                      <div className="px-4 pb-4">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            {/* Quick Help */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Hızlı Yardım
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-gray-900">AI Asistan</p>
                    <p className="text-sm text-gray-600">Anında yardım alın</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-gray-900">Rehber</p>
                    <p className="text-sm text-gray-600">Platform kullanım kılavuzu</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                İletişim
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-gray-900">E-posta</p>
                    <a 
                      href="mailto:defneduyu@gmail.com" 
                      className="text-sm text-primary hover:text-primary/80"
                    >
                      defneduyu@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-gray-900">Telefon</p>
                    <a 
                      href="tel:+905407930469" 
                      className="text-sm text-primary hover:text-primary/80"
                    >
                      0(540) 793 04 69
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Hours */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Destek Saatleri
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Pazartesi - Cuma:</span>
                  <span className="font-medium text-gray-900">09:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cumartesi:</span>
                  <span className="font-medium text-gray-900">10:00 - 16:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pazar:</span>
                  <span className="font-medium text-gray-900">Kapalı</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Help */}
        <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Daha Fazla Yardıma İhtiyacınız Var mı?
          </h3>
          <p className="text-gray-600 mb-4">
            Sorunuz burada yanıtlanmadıysa, lütfen bizimle iletişime geçmekten çekinmeyin. 
            Size yardımcı olmaktan memnuniyet duyarız.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:defneduyu@gmail.com"
              className="flex items-center justify-center space-x-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors duration-200"
            >
              <Mail className="h-4 w-4" />
              <span>E-posta Gönder</span>
            </a>
            <a
              href="tel:+905407930469"
              className="flex items-center justify-center space-x-2 border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-lg transition-colors duration-200"
            >
              <Phone className="h-4 w-4" />
              <span>Telefon Et</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;