import React, { useState } from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import FeaturedArticles from '../components/FeaturedArticles';
import AppointmentModal from '../components/AppointmentModal';

const HomePage = () => {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  const handleAppointmentClick = () => {
    setIsAppointmentModalOpen(true);
  };

  const handleCloseAppointmentModal = () => {
    setIsAppointmentModalOpen(false);
  };

  return (
    <>
      <Hero onAppointmentClick={handleAppointmentClick} />
      <FeaturedArticles />
      <Services />
      <AppointmentModal 
        isOpen={isAppointmentModalOpen} 
        onClose={handleCloseAppointmentModal} 
      />
    </>
  );
};

export default HomePage;