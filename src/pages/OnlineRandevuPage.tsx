import React, { useState } from 'react';
import { Calendar, User, Mail, Baby, Briefcase, CheckCircle, AlertCircle, Clock, Shield, Heart } from 'lucide-react';
import { createAppointment } from '../lib/supabase';

const OnlineRandevuPage = () => {
  const [formData, setFormData] = useState({
    client_name: '',
    child_name: '',
    email: '',
    service: '',
    requested_date: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const services = [
    'Ebeveyn Koçluğu',
    'Otizmli Çocuklar İçin Koçluk'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const success = await createAppointment(formData);
      if (success) {
        setSubmitStatus('success');
        setFormData({
          client_name: '',
          child_name: '',
          email: '',
          service: '',
          requested_date: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting appointment:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Set page title for SEO
  React.useEffect(() => {
    document.title = 'Online Randevu - CocukGeliyor | Uzman Desteği İçin Randevu Alın';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'CocukGeliyor uzman ekibinden randevu alın. Ebeveyn koçluğu, otizm desteği, DEHB danışmanlığı ve ergoterapi hizmetleri için online randevu sistemi.');
    }
  }, []);

  return (
    <div className="bg-gradient-to-br from-accent/10 via-secondary/20 to-primary/10 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="text-primary">Online</span> <span className="text-accent">Randevu</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Uzman ekibimizle tanışmak ve çocuğunuz için en uygun destek programını belirlemek için randevu alın.
          </p>
          
          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <Clock className="h-12 w-12 text-primary-yellow mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Hızlı Randevu</h3>
              <p className="text-gray-600 text-sm">24 saat içinde geri dönüş garantisi</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <Shield className="h-12 w-12 text-primary-green mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Güvenli Platform</h3>
              <p className="text-gray-600 text-sm">Kişisel bilgileriniz güvende</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <Heart className="h-12 w-12 text-primary-blue mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Uzman Ekip</h3>
              <p className="text-gray-600 text-sm">Alanında deneyimli terapistler</p>
            </div>
          </div>
        </div>

        {/* Appointment Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Randevu Formu
            </h2>
            <p className="text-gray-600">
              Lütfen aşağıdaki bilgileri eksiksiz doldurunuz. En kısa sürede sizinle iletişime geçeceğiz.
            </p>
          </div>

          {submitStatus === 'success' && (
            <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-2xl flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-green-800 mb-2">Randevu Talebiniz Başarıyla Alındı!</h3>
                <p className="text-green-600 mb-2">
                  Teşekkür ederiz! Randevu talebiniz sistemimize kaydedildi.
                </p>
                <p className="text-green-600 text-sm">
                  Uzman ekibimiz 24 saat içinde sizinle iletişime geçerek randevu detaylarını netleştirecektir.
                </p>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-2xl flex items-start space-x-4">
              <AlertCircle className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-800 mb-2">Bir Hata Oluştu</h3>
                <p className="text-red-600">
                  Randevu talebiniz gönderilemedi. Lütfen daha sonra tekrar deneyiniz veya doğrudan bizimle iletişime geçiniz.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-primary-blue" />
                Kişisel Bilgiler
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="client_name" className="block text-sm font-semibold text-gray-700 mb-3">
                    Veli Adı Soyadı *
                  </label>
                  <input
                    type="text"
                    id="client_name"
                    name="client_name"
                    value={formData.client_name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
                    placeholder="Adınız ve soyadınız"
                  />
                </div>

                <div>
                  <label htmlFor="child_name" className="block text-sm font-semibold text-gray-700 mb-3">
                    <Baby className="inline h-4 w-4 mr-1" />
                    Çocuğun Adı
                  </label>
                  <input
                    type="text"
                    id="child_name"
                    name="child_name"
                    value={formData.child_name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
                    placeholder="Çocuğunuzun adı (isteğe bağlı)"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary-green" />
                İletişim Bilgileri
              </h3>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3">
                  E-posta Adresi *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
                  placeholder="ornek@email.com"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Randevu onayı ve detayları bu e-posta adresine gönderilecektir.
                </p>
              </div>
            </div>

            {/* Service Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Briefcase className="h-5 w-5 mr-2 text-primary-yellow" />
                Hizmet Seçimi
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-3">
                    Hizmet Türü *
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300 text-gray-900"
                  >
                    <option value="">Hizmet türünü seçiniz</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="requested_date" className="block text-sm font-semibold text-gray-700 mb-3">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Tercih Edilen Tarih *
                  </label>
                  <input
                    type="date"
                    id="requested_date"
                    name="requested_date"
                    value={formData.requested_date}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300 text-gray-900"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary-blue hover:bg-primary-blue/90 disabled:bg-gray-400 text-white px-12 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:transform-none disabled:shadow-none min-w-[200px]"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Gönderiliyor...
                  </span>
                ) : (
                  'Randevu Talebi Gönder'
                )}
              </button>
              <p className="text-sm text-gray-500 mt-4">
                * işaretli alanlar zorunludur
              </p>
            </div>
          </form>

          {/* Additional Information */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-gradient-to-r from-primary-yellow/10 to-primary-green/10 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-3">Randevu Süreci Hakkında</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Randevu talebiniz alındıktan sonra 24 saat içinde sizinle iletişime geçeceğiz.
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  İlk görüşme genellikle 45-60 dakika sürmektedir.
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-yellow rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Online görüşmeler için güvenli video konferans platformu kullanılmaktadır.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineRandevuPage;