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

  const [formData, setFormData] = useState({
    name: '',
    gender: 'Male',
    month: 'MM',
    day: 'DD',
    year: 'YYYY',
    hour: 'HH',
    minute: 'MM',
    country: 'India',
    city: '',
    latitude: null,
    longitude: null,
    timezone: 5.5
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
      return updated;
    });
  };

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
        formData.minute === 'MM') {
      console.log('getBirthDetails: Form data not complete, returning null');
      console.log('Missing fields:', {
        name: !formData.name,
        month: formData.month === 'MM',
        day: formData.day === 'DD',
        year: formData.year === 'YYYY',
        hour: formData.hour === 'HH',
        minute: formData.minute === 'MM'
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

    // Set coordinates based on selected city
    if (formData.city && formData.country) {
      // For now, use default coordinates for major Indian cities
      // In a real app, you'd use a geocoding service
      if (formData.city.includes('Delhi') || formData.city.includes('New Delhi')) {
        lat = 28.6139; lon = 77.2090; tzone = 5.5;
      } else if (formData.city.includes('Mumbai')) {
        lat = 19.0760; lon = 72.8777; tzone = 5.5;
      } else if (formData.city.includes('Bangalore')) {
        lat = 12.9716; lon = 77.5946; tzone = 5.5;
      } else if (formData.city.includes('Chennai')) {
        lat = 13.0827; lon = 80.2707; tzone = 5.5;
      } else if (formData.city.includes('Hyderabad')) {
        lat = 17.3850; lon = 78.4867; tzone = 5.5;
      } else if (formData.city.includes('Kolkata')) {
        lat = 22.5726; lon = 88.3639; tzone = 5.5;
      } else if (formData.city.includes('Pune')) {
        lat = 18.5204; lon = 73.8567; tzone = 5.5;
      } else if (formData.city.includes('Ahmedabad')) {
        lat = 23.0225; lon = 72.5714; tzone = 5.5;
      } else if (formData.city.includes('Jaipur')) {
        lat = 26.9124; lon = 75.7873; tzone = 5.5;
      } else if (formData.city.includes('Surat')) {
        lat = 21.1702; lon = 72.8311; tzone = 5.5;
      } else if (formData.city.includes('Lucknow')) {
        lat = 26.8467; lon = 80.9462; tzone = 5.5;
      } else if (formData.city.includes('Kanpur')) {
        lat = 26.4499; lon = 80.3319; tzone = 5.5;
      } else if (formData.city.includes('Nagpur')) {
        lat = 21.1458; lon = 79.0882; tzone = 5.5;
      } else if (formData.city.includes('Indore')) {
        lat = 22.7196; lon = 75.8577; tzone = 5.5;
      } else if (formData.city.includes('Thane')) {
        lat = 19.2183; lon = 72.9781; tzone = 5.5;
      } else if (formData.city.includes('Bhopal')) {
        lat = 23.2599; lon = 77.4126; tzone = 5.5;
      } else if (formData.city.includes('Visakhapatnam')) {
        lat = 17.6868; lon = 83.2185; tzone = 5.5;
      } else if (formData.city.includes('Pimpri-Chinchwad')) {
        lat = 18.6298; lon = 73.7997; tzone = 5.5;
      } else if (formData.city.includes('Patna')) {
        lat = 25.5941; lon = 85.1376; tzone = 5.5;
      } else if (formData.city.includes('Vadodara')) {
        lat = 22.3072; lon = 73.1812; tzone = 5.5;
      } else if (formData.city.includes('Ghaziabad')) {
        lat = 28.6654; lon = 77.4391; tzone = 5.5;
      } else if (formData.city.includes('Ludhiana')) {
        lat = 30.9010; lon = 75.8573; tzone = 5.5;
      } else if (formData.city.includes('Agra')) {
        lat = 27.1767; lon = 78.0081; tzone = 5.5;
      } else if (formData.city.includes('Nashik')) {
        lat = 19.9975; lon = 73.7898; tzone = 5.5;
      } else if (formData.city.includes('Faridabad')) {
        lat = 28.4089; lon = 77.3178; tzone = 5.5;
      } else if (formData.city.includes('Meerut')) {
        lat = 28.9845; lon = 77.7064; tzone = 5.5;
      } else if (formData.city.includes('Rajkot')) {
        lat = 22.3039; lon = 70.8022; tzone = 5.5;
      } else if (formData.city.includes('Kalyan-Dombivali')) {
        lat = 19.2350; lon = 73.1299; tzone = 5.5;
      } else if (formData.city.includes('Vasai-Virar')) {
        lat = 19.4250; lon = 72.8223; tzone = 5.5;
      } else if (formData.city.includes('Varanasi')) {
        lat = 25.3176; lon = 82.9739; tzone = 5.5;
      } else if (formData.city.includes('Srinagar')) {
        lat = 34.0837; lon = 74.7973; tzone = 5.5;
      } else if (formData.city.includes('Aurangabad')) {
        lat = 19.8762; lon = 75.3433; tzone = 5.5;
      } else if (formData.city.includes('Dhanbad')) {
        lat = 23.7957; lon = 86.4304; tzone = 5.5;
      } else if (formData.city.includes('Amritsar')) {
        lat = 31.6340; lon = 74.8723; tzone = 5.5;
      } else if (formData.city.includes('Navi Mumbai')) {
        lat = 19.0330; lon = 73.0297; tzone = 5.5;
      } else if (formData.city.includes('Allahabad')) {
        lat = 25.4358; lon = 81.8463; tzone = 5.5;
      } else if (formData.city.includes('Ranchi')) {
        lat = 23.3441; lon = 85.3096; tzone = 5.5;
      } else if (formData.city.includes('Howrah')) {
        lat = 22.5958; lon = 88.2636; tzone = 5.5;
      } else if (formData.city.includes('Coimbatore')) {
        lat = 11.0168; lon = 76.9558; tzone = 5.5;
      } else if (formData.city.includes('Jabalpur')) {
        lat = 23.1815; lon = 79.9864; tzone = 5.5;
      } else if (formData.city.includes('Gwalior')) {
        lat = 26.2183; lon = 78.1828; tzone = 5.5;
      } else if (formData.city.includes('Vijayawada')) {
        lat = 16.5062; lon = 80.6480; tzone = 5.5;
      } else if (formData.city.includes('Jodhpur')) {
        lat = 26.2389; lon = 73.0243; tzone = 5.5;
      } else if (formData.city.includes('Madurai')) {
        lat = 9.9252; lon = 78.1198; tzone = 5.5;
      } else if (formData.city.includes('Raipur')) {
        lat = 21.2514; lon = 81.6296; tzone = 5.5;
      } else if (formData.city.includes('Kota')) {
        lat = 25.2138; lon = 75.8648; tzone = 5.5;
      } else if (formData.city.includes('Guwahati')) {
        lat = 26.1833; lon = 91.7462; tzone = 5.5;
      } else if (formData.city.includes('Chandigarh')) {
        lat = 30.7333; lon = 76.7794; tzone = 5.5;
      } else if (formData.city.includes('Solapur')) {
        lat = 17.6599; lon = 75.9064; tzone = 5.5;
      } else if (formData.city.includes('Hubli-Dharwad')) {
        lat = 15.3647; lon = 75.1240; tzone = 5.5;
      } else if (formData.city.includes('Bareilly')) {
        lat = 28.3670; lon = 79.4304; tzone = 5.5;
      } else if (formData.city.includes('Moradabad')) {
        lat = 28.8389; lon = 78.7738; tzone = 5.5;
      } else if (formData.city.includes('Mysore')) {
        lat = 12.2958; lon = 76.6394; tzone = 5.5;
      } else if (formData.city.includes('Gurgaon')) {
        lat = 28.4595; lon = 77.0266; tzone = 5.5;
      } else if (formData.city.includes('Aligarh')) {
        lat = 27.8974; lon = 78.0880; tzone = 5.5;
      } else if (formData.city.includes('Jalandhar')) {
        lat = 31.3260; lon = 75.5762; tzone = 5.5;
      }
    }

    const birthDetails = {
      name: formData.name,
      day: parseInt(formData.day) || 1,
      month: monthMap[formData.month] || 1,
      year: parseInt(formData.year) || 2000,
      hour: parseInt(formData.hour) || 12,
      min: parseInt(formData.minute) || 0,
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