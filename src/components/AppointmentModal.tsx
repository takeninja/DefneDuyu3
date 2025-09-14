import React, { useState } from 'react';
import { X, Calendar, User, Mail, Briefcase, CheckCircle, AlertCircle } from 'lucide-react';
import { createAppointment } from '../lib/supabase';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose }) => {
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
    'Online Ebeveyn Koçluğu',
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
        // Close modal after 3 seconds on success
        setTimeout(() => {
          onClose();
          setSubmitStatus('idle');
        }, 3000);
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

  const handleClose = () => {
    setFormData({
      client_name: '',
      child_name: '',
      email: '',
      service: '',
      requested_date: ''
    });
    setSubmitStatus('idle');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-text bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-text">Randevu Al</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X size={24} className="text-text/60" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-text/70 mb-6 text-center">
            Uzman ekibimizle tanışmak ve çocuğunuz için en uygun destek programını belirlemek için randevu alın.
          </p>

          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <div>
                <h3 className="font-semibold text-green-800">Randevu Talebiniz Alındı!</h3>
                <p className="text-green-600">En kısa sürede sizinle iletişime geçeceğiz.</p>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3">
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
                <label htmlFor="client_name" className="block text-sm font-semibold text-text mb-2">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  placeholder="Adınız ve soyadınız"
                />
              </div>

              <div>
                <label htmlFor="child_name" className="block text-sm font-semibold text-text mb-2">
                  Çocuğun Adı
                </label>
                <input
                  type="text"
                  id="child_name"
                  name="child_name"
                  value={formData.child_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  placeholder="Çocuğunuzun adı (isteğe bağlı)"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-text mb-2">
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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                placeholder="ornek@email.com"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="service" className="block text-sm font-semibold text-text mb-2">
                  <Briefcase className="inline h-4 w-4 mr-2" />
                  Hizmet Türü
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
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
                <label htmlFor="requested_date" className="block text-sm font-semibold text-text mb-2">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 border-2 border-gray-300 text-text hover:bg-gray-50 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                İptal
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-primary hover:bg-primary/90 disabled:bg-gray-400 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:shadow-none"
              >
                {isSubmitting ? 'Gönderiliyor...' : 'Randevu Talebi Gönder'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;