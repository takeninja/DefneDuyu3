import React, { useState } from 'react';
import { Calendar, User, Mail, Baby, Briefcase, CheckCircle, AlertCircle } from 'lucide-react';
import { createAppointment } from '../lib/supabase';

const AppointmentForm = () => {
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
    'Ergo Terapi',
    'Online Ebeveyn Rehberliği',
    'Otizmli Çocuklar İçin Rehberlik'
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

  return (
    <section className="py-20 bg-gradient-to-br from-primary-yellow/10 to-primary-green/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-primary-blue">Randevu</span> <span className="text-primary-green">Alın</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Uzman ekibimizle tanışmak ve çocuğunuz için en uygun destek programını belirlemek için randevu alın.
          </p>
        </div>

        <div id="randevu" className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          {submitStatus === 'success' && (
            <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <div>
                <h3 className="font-semibold text-green-800">Randevu Talebiniz Alındı!</h3>
                <p className="text-green-600">En kısa sürede sizinle iletişime geçeceğiz.</p>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3">
              <AlertCircle className="h-6 w-6 text-red-600" />
              <div>
                <h3 className="font-semibold text-red-800">Bir Hata Oluştu</h3>
                <p className="text-red-600">Lütfen daha sonra tekrar deneyiniz.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="client_name" className="block text-sm font-semibold text-gray-700 mb-2">
                  <User className="inline h-4 w-4 mr-2" />
                  Veli Adı Soyadı
                </label>
                <input
                  type="text"
                  id="client_name"
                  name="client_name"
                  value={formData.client_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300"
                  placeholder="Adınız ve soyadınız"
                />
              </div>

              <div>
                <label htmlFor="child_name" className="block text-sm font-semibold text-gray-700 mb-2">
                  <Baby className="inline h-4 w-4 mr-2" />
                  Çocuğun Adı
                </label>
                <input
                  type="text"
                  id="child_name"
                  name="child_name"
                  value={formData.child_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300"
                  placeholder="Çocuğunuzun adı"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                <Mail className="inline h-4 w-4 mr-2" />
                E-posta Adresi
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300"
                placeholder="ornek@email.com"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">
                  <Briefcase className="inline h-4 w-4 mr-2" />
                  Hizmet Türü
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300"
                >
                  <option value="">Hizmet seçiniz</option>
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="requested_date" className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="inline h-4 w-4 mr-2" />
                  Tercih Edilen Tarih
                </label>
                <input
                  type="date"
                  id="requested_date"
                  name="requested_date"
                  value={formData.requested_date}
                  onChange={handleInputChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            <div className="text-center pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary-blue hover:bg-primary-blue/90 disabled:bg-gray-400 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:transform-none disabled:shadow-none"
              >
                {isSubmitting ? 'Gönderiliyor...' : 'Randevu Talebi Gönder'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AppointmentForm;