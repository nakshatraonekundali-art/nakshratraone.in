'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';

const KundliContext = createContext();

export const useKundli = () => {
  const context = useContext(KundliContext);
  if (!context) {
    console.error('useKundli must be used within a KundliProvider');
    throw new Error('useKundli must be used within a KundliProvider');
  }
  console.log('useKundli hook called, context found:', !!context);
  return context;
};

export const KundliProvider = ({ children }) => {
  console.log('KundliProvider initialized');
  
  // Initialize language from localStorage if available, otherwise default to English
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('kundli-language');
      console.log('Initializing language from localStorage:', savedLanguage);
      return savedLanguage || 'english';
    }
    console.log('Initializing language (server-side): english');
    return 'english';
  });

  const [formData, setFormData] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('kundli-form');
        if (saved) {
          return JSON.parse(saved);
        }
      } catch (_) {}
    }
    return {
      name: '',
      gender: 'Male',
      month: 'MM',
      day: 'DD',
      year: 'YYYY',
      hour: 'HH',
      min: 'MM',
      country: 'India',
      city: '',
      mobile: '',
      email: '',
      latitude: 28.6139, // Default to Delhi
      longitude: 77.2090,
      timezone: 5.5
    };
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [kundliData, setKundliData] = useState(null);

  // Save language to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('kundli-language', language);
      console.log('Language saved to localStorage:', language);
    }
  }, [language]);

  const updateFormData = (newData) => {
    console.log('updateFormData called with:', newData);
    setFormData(prev => {
      const updated = { ...prev, ...newData };
      console.log('Form data updated to:', updated);
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem('kundli-form', JSON.stringify(updated));
        }
      } catch (_) {}
      return updated;
    });
  };

  // Keep form data synced to localStorage on mount changes (for external updates)
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('kundli-form', JSON.stringify(formData));
      }
    } catch (_) {}
  }, [formData]);

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const setKundliResults = (data) => {
    setKundliData(data);
  };

  const toggleLanguage = () => {
    console.log('toggleLanguage called, current language:', language);
    setLanguage(prev => {
      const newLang = prev === 'english' ? 'hindi' : 'english';
      console.log('Language toggled from', prev, 'to', newLang);
      return newLang;
    });
  };

  const setLanguageDirectly = (newLanguage) => {
    console.log('setLanguageDirectly called with:', newLanguage, 'current:', language);
    setLanguage(newLanguage);
  };

  // Debug language changes
  useEffect(() => {
    console.log('Language state changed to:', language);
  }, [language]);

  const getBirthDetails = () => {
    console.log('getBirthDetails called with formData:', formData);
    
    // Check if we have valid form data
    if (!formData.name || 
        formData.month === 'MM' || 
        formData.day === 'DD' || 
        formData.year === 'YYYY' || 
        formData.hour === 'HH' || 
        formData.min === 'MM' ||
        !formData.email) {
      console.log('getBirthDetails: Form data not complete, returning null');
      console.log('Missing fields:', {
        name: !formData.name,
        month: formData.month === 'MM',
        day: formData.day === 'DD',
        year: formData.year === 'YYYY',
        hour: formData.hour === 'HH',
        min: formData.min === 'MM',
        email: !formData.email
      });
      return null;
    }

    const monthMap = {
      'January': 1, 'February': 2, 'March': 3, 'April': 4, 'May': 5, 'June': 6,
      'July': 7, 'August': 8, 'September': 9, 'October': 10, 'November': 11, 'December': 12
    };

    // Get coordinates based on city/country
    let lat = 28.6139; // Default to Delhi
    let lon = 77.2090;
    let tzone = 5.5;

    // Use coordinates from formData if available, otherwise use defaults
    if (formData.latitude && formData.longitude) {
      lat = formData.latitude;
      lon = formData.longitude;
      tzone = formData.timezone || 5.5;
    }

    const birthDetails = {
      name: formData.name,
      day: parseInt(formData.day) || 1,
      month: monthMap[formData.month] || 1,
      year: parseInt(formData.year) || 2000,
      hour: parseInt(formData.hour) || 12,
      min: parseInt(formData.min) || 0,
      lat: lat,
      lon: lon,
      tzone: tzone
    };

    console.log('getBirthDetails: Returning valid birth details:', birthDetails);
    return birthDetails;
  };

  const value = {
    formData,
    updateFormData,
    currentStep,
    nextStep,
    prevStep,
    kundliData,
    setKundliResults,
    getBirthDetails,
    language,
    toggleLanguage,
    setLanguageDirectly
  };

  console.log('KundliProvider rendering with language:', language);

  return (
    <KundliContext.Provider value={value}>
      {children}
    </KundliContext.Provider>
  );
};