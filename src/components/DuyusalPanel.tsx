import React, { useState, useRef, useEffect } from 'react';
import { Settings, Eye, Type } from 'lucide-react';
import { useAccessibility } from '../contexts/AccessibilityContext';

const DuyusalPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isHighContrast, toggleHighContrast, isLargeText, toggleLargeText } = useAccessibility();
  const panelRef = useRef<HTMLDivElement>(null);

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={panelRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-text hover:text-primary transition-colors duration-200 font-medium"
        aria-label="Duyusal Panel"
      >
        <Settings size={20} />
        <span className="hidden sm:inline">Duyusal Panel</span>
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-surface border border-gray-200 rounded-xl shadow-lg z-50 p-4">
          <div className="space-y-4">
            <h3 className="font-semibold text-text text-sm mb-3">Erişilebilirlik Seçenekleri</h3>
            
            {/* High Contrast Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Eye size={18} className="text-primary" />
                <div>
                  <div className="font-medium text-text text-sm">Yüksek Kontrast</div>
                  <div className="text-text/60 text-xs">Daha iyi görünürlük için</div>
                </div>
              </div>
              
              {/* Toggle Switch */}
              <button
                onClick={toggleHighContrast}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  isHighContrast ? 'bg-primary' : 'bg-gray-300'
                }`}
                role="switch"
                aria-checked={isHighContrast}
                aria-label="Yüksek kontrast modunu aç/kapat"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    isHighContrast ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            {/* Large Text Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Type size={18} className="text-primary" />
                <div>
                  <div className="font-medium text-text text-sm">Büyük Metin</div>
                  <div className="text-text/60 text-xs">Metinleri büyütür</div>
                </div>
              </div>
              
              {/* Toggle Switch */}
              <button
                onClick={toggleLargeText}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  isLargeText ? 'bg-primary' : 'bg-gray-300'
                }`}
                role="switch"
                aria-checked={isLargeText}
                aria-label="Büyük metin modunu aç/kapat"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    isLargeText ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DuyusalPanel;