import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AccessibilityContextType {
  isHighContrast: boolean;
  toggleHighContrast: () => void;
  isLargeText: boolean;
  toggleLargeText: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

interface AccessibilityProviderProps {
  children: ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isLargeText, setIsLargeText] = useState(false);

  // Load saved preference from localStorage on mount
  useEffect(() => {
    const savedHighContrast = localStorage.getItem('highContrast');
    if (savedHighContrast === 'true') {
      setIsHighContrast(true);
    }
    
    const savedLargeText = localStorage.getItem('largeText');
    if (savedLargeText === 'true') {
      setIsLargeText(true);
    }
  }, []);

  // Apply high contrast styles when mode changes
  useEffect(() => {
    if (isHighContrast) {
      // Add high contrast class to body
      document.body.classList.add('high-contrast');
    } else {
      // Remove high contrast class from body
      document.body.classList.remove('high-contrast');
    }
  }, [isHighContrast]);

  // Apply large text styles when mode changes
  useEffect(() => {
    if (isLargeText) {
      document.body.classList.add('large-text');
    } else {
      document.body.classList.remove('large-text');
    }
  }, [isLargeText]);

  const toggleHighContrast = () => {
    const newValue = !isHighContrast;
    setIsHighContrast(newValue);
    localStorage.setItem('highContrast', newValue.toString());
  };

  const toggleLargeText = () => {
    const newValue = !isLargeText;
    setIsLargeText(newValue);
    localStorage.setItem('largeText', newValue.toString());
  };

  return (
    <AccessibilityContext.Provider value={{
      isHighContrast,
      toggleHighContrast,
      isLargeText,
      toggleLargeText
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};