'use client'
import React, { useState, useEffect } from 'react';
import { useKundli } from '../../context/KundliContext';
import Navigation from '../../components/Navigation';

const Moon = () => {
  const [moonData, setMoonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { formData, language } = useKundli();

  // API configuration
  const API_CONFIG = {
    userId: '643886',
    apiKey: '8cfa24ac82f34fa17f090ed5a6a2122b9f3e10bf',
    baseUrl: 'https://json.astrologyapi.com/v1',
    api: 'general_house_report/moon'
  };

  // Translations
  const translations = {
    loading: {
      english: 'Loading Moon Analysis...',
      hindi: 'चंद्र विश्लेषण लोड हो रहा है...'
    },
    error: {
      english: 'Error Loading Data',
      hindi: 'डेटा लोड करने में त्रुटि'
    },
    retry: {
      english: 'Retry',
      hindi: 'पुन: प्रयास करें'
    },
    next: {
      english: 'Next →',
      hindi: 'आगे →'
    },
    back: {
      english: 'Back',
      hindi: 'पीछे'
    }
  };

  // Birth details from context
  const birthDetails = {
    day: parseInt(formData.day) || 6,
    month: parseInt(formData.month) || 1,
    year: parseInt(formData.year) || 2000,
    hour: parseInt(formData.hour) || 7,
    min: parseInt(formData.minute) || 45,
    lat: parseFloat(formData.latitude) || 19.132,
    lon: parseFloat(formData.longitude) || 72.342,
    tzone: parseFloat(formData.timezone) || 5.5
  };

  // Function to get Basic Auth header
  const getAuthHeader = () => {
    const credentials = `${API_CONFIG.userId}:${API_CONFIG.apiKey}`;
    return `Basic ${btoa(credentials)}`;
  };

  // Function to fetch Moon analysis data
  const fetchMoonData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_CONFIG.baseUrl}/${API_CONFIG.api}`, {
        method: 'POST',
        headers: {
          'Authorization': getAuthHeader(),
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Accept-Language': language === 'english' ? 'en' : 'hi'
        },
        body: JSON.stringify(birthDetails)
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Moon Data:', data);
      setMoonData(data);
      
    } catch (error) {
      console.error('Error fetching Moon data:', error);
      setError(`Failed to load data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchMoonData();
  }, []);

  // Function to handle next button click
  const handleNext = () => {
    console.log('Navigate to next planet or section');
  };

  // Function to handle back button click
  const handleBack = () => {
    console.log('Navigate back');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-gray-50 rounded-lg p-8 shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-center mt-4 text-gray-600">{language === 'english' ? translations.loading.english : translations.loading.hindi}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="bg-gray-50 rounded-lg p-8 shadow-xl max-w-md w-full">
          <div className="text-red-600 text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold mb-2">{language === 'english' ? translations.error.english : translations.error.hindi}</h2>
            <p className="text-sm text-gray-600 mb-4">{error}</p>
            <button 
              onClick={fetchMoonData} 
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            >
              {language === 'english' ? translations.retry.english : translations.retry.hindi}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white md:bg-gradient-to-br md:from-purple-800 md:via-purple-600 md:to-purple-400 md:flex md:items-center md:justify-center md:p-4">
      {/* Mobile: Full width, Desktop: Centered card */}
      <div className="w-full max-w-full mx-auto md:max-w-lg">
        <div className="bg-gradient-to-b from-gray-50 via-blue-50 to-purple-50 min-h-screen md:min-h-0 flex flex-col md:rounded-3xl md:shadow-2xl md:overflow-hidden md:h-[95vh]">
          {/* Header */}
          <div className="text-center pt-8 pb-6 px-6 flex-shrink-0 md:pt-6 md:pb-4">
            <div className="flex items-center justify-center mb-6 md:mb-3">
              <div className="text-orange-500 text-xl font-bold md:text-lg">Nakshatra</div>
              <div className="text-blue-500 text-xl font-bold md:text-lg">One</div>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto px-6 pb-6 md:scrollbar-thin md:scrollbar-thumb-gray-300 md:scrollbar-track-transparent">
            {/* Moon Image and Title */}
            <div className="text-center mb-6">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center shadow-lg md:w-20 md:h-20">
                <img 
                  src="https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/kundli_analyser/graha_devta/moon.png"
                  alt="Moon"
                  className="w-20 h-20 object-contain md:w-16 md:h-16"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="text-4xl hidden md:text-3xl">☽</div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-4 md:text-xl md:mb-3">Chandra (Moon)</h2>
              
              {/* Blue Tags */}
              <div className="flex flex-wrap justify-center gap-2 mb-6 md:mb-4">
                <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium md:px-3 md:py-1 md:text-xs">
                  Uttra Shadha
                </span>
                <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium md:px-3 md:py-1 md:text-xs">
                  Capricorn
                </span>
                <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium md:px-3 md:py-1 md:text-xs">
                  2 House
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-base text-gray-700 leading-relaxed text-center px-2 md:text-sm">
                Chandra is a sattvic or a spiritual planet. It brings feelings of trust, 
                honesty, calmness, and joy. It shows the kindness of the Goddess, 
                the divine Mother. Chandra represents female qualities, giving 
                beauty and charm. In human relationships, Chandra is like the 
                Mother.
              </p>
            </div>

            {/* House Report - Blue bordered section */}
            {moonData && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-300 mb-6">
                <p className="text-base text-gray-700 leading-relaxed md:text-sm">
                  {moonData.house_report}
                </p>
              </div>
            )}

            {/* Personalized Life Map Section */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 border border-orange-200 mb-6">
              <div className="mb-4 md:mb-3">
                <button className="bg-gradient-to-r from-red-400 to-pink-400 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:shadow-md transition-all border-2 border-red-500 md:text-xs">
                  PERSONALIZED LIFE MAP
                </button>
              </div>
              
              <div className="flex items-start space-x-4 md:space-x-3">
                <div className="flex-1">
                  <p className="text-sm text-gray-700 mb-3 leading-relaxed md:text-xs md:mb-2">
                    Reveal your <span className="font-bold text-gray-800">strengths</span>, <span className="font-bold text-gray-800">karmic patterns</span>, and 
                    fortune windows with detailed house cusps.
                  </p>
                  <p className="text-sm text-gray-700 mb-3 leading-relaxed md:text-xs md:mb-2">
                    <span className="font-bold text-gray-800">Nakshatra insights</span>, and <span className="font-bold text-gray-800">remedial tips</span> crafted 
                    specifically for your birth chart.
                  </p>
                  <div className="bg-yellow-200 px-3 py-1 rounded-lg inline-block md:px-2">
                    <span className="text-sm font-semibold text-gray-800 md:text-xs">Know Your Destiny ⭐</span>
                  </div>
                </div>
                <div className="w-20 h-24 bg-gradient-to-br from-purple-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0 md:w-16 md:h-20">
                  <div className="text-white text-xs font-bold text-center leading-tight px-2 md:text-[10px]">
                    Your Personalized<br/>Vedic Kundli
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom padding for scrolling */}
            <div className="h-4"></div>
          </div>

          {/* Navigation - Fixed at bottom */}
          <Navigation 
            currentPage="planets/moon"
            nextText={language === 'english' ? translations.next.english : translations.next.hindi}
            backText={language === 'english' ? translations.back.english : translations.back.hindi}
            onNext={handleNext}
            onBack={handleBack}
          />
        </div>
      </div>
    </div>
  );
};

export default Moon;