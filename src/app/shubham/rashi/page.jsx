'use client'
import React, { useState, useEffect } from 'react';
import { useKundli } from '../context/KundliContext';
import Navigation from '../components/Navigation';

const Rashi = () => {
  const [rashiData, setRashiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedPlanet, setSelectedPlanet] = useState('sun');
  const { language } = useKundli();

  // API configuration
  const API_CONFIG = {
    userId: '643886',
    apiKey: '8cfa24ac82f34fa17f090ed5a6a2122b9f3e10bf',
    baseUrl: 'https://json.astrologyapi.com/v1',
  };

  // Translations
  const translations = {
    loading: {
      english: "Loading Rashi Analysis...",
      hindi: "राशि विश्लेषण लोड हो रहा है..."
    },
    error: {
      english: "Error Loading Data",
      hindi: "डेटा लोड करने में त्रुटि"
    },
    retry: {
      english: "Retry",
      hindi: "पुनः प्रयास करें"
    },
    title: {
      english: "Rashi Analysis",
      hindi: "राशि विश्लेषण"
    },
    choosePlanet: {
      english: "Choose Your Planet",
      hindi: "अपना ग्रह चुनें"
    },
    rashiReport: {
      english: "Rashi Report",
      hindi: "राशि रिपोर्ट"
    },
    analysis: {
      english: "Your Rashi Analysis",
      hindi: "आपका राशि विश्लेषण"
    },
    next: {
      english: "Next →",
      hindi: "अगला →"
    },
    back: {
      english: "Back",
      hindi: "वापस"
    }
  };

  // Birth details
  const birthDetails = {
    name: "Shubham",
    day: 4,
    month: 8,
    year: 2010,
    hour: 7,
    min: 45,
    lat: 19.132,
    lon: 72.342,
    tzone: 5.5
  };

  // Planet configurations
  const planets = {
    sun: {
      name: {
        english: 'Surya (Sun)',
        hindi: 'सूर्य'
      },
      api: 'general_rashi_report/sun',
      image: 'https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/kundli_analyser/graha_devta/sun.png',
      emoji: '☉',
      color: 'from-orange-100 to-yellow-200'
    },
    moon: {
      name: {
        english: 'Chandra (Moon)',
        hindi: 'चन्द्र'
      },
      api: 'general_rashi_report/moon',
      image: 'https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/kundli_analyser/graha_devta/moon.png',
      emoji: '☽',
      color: 'from-blue-100 to-purple-200'
    },
    mars: {
      name: {
        english: 'Mangal (Mars)',
        hindi: 'मंगल'
      },
      api: 'general_rashi_report/mars',
      image: 'https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/kundli_analyser/graha_devta/mars_2.png',
      emoji: '♂',
      color: 'from-red-100 to-pink-200'
    },
    mercury: {
      name: {
        english: 'Budh (Mercury)',
        hindi: 'बुध'
      },
      api: 'general_rashi_report/mercury',
      image: 'https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/kundli_analyser/graha_devta/mercury.png',
      emoji: '☿',
      color: 'from-green-100 to-teal-200'
    },
    jupiter: {
      name: {
        english: 'Guru (Jupiter)',
        hindi: 'गुरु'
      },
      api: 'general_rashi_report/jupiter',
      image: 'https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/kundli_analyser/graha_devta/jupiter.png',
      emoji: '♃',
      color: 'from-yellow-100 to-orange-200'
    },
    saturn: {
      name: {
        english: 'Shani (Saturn)',
        hindi: 'शनि'
      },
      api: 'general_rashi_report/saturn',
      image: 'https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/kundli_analyser/graha_devta/saturn.png',
      emoji: '♄',
      color: 'from-gray-100 to-slate-200'
    },
    rahu: {
      name: {
        english: 'Rahu',
        hindi: 'राहु'
      },
      api: 'general_rashi_report/rahu',
      image: 'https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/kundli_analyser/graha_devta/rahu.png',
      emoji: '☊',
      color: 'from-purple-100 to-indigo-200'
    },
    ketu: {
      name: {
        english: 'Ketu',
        hindi: 'केतु'
      },
      api: 'general_rashi_report/ketu',
      image: 'https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/kundli_analyser/graha_devta/ketu.png',
      emoji: '☋',
      color: 'from-indigo-100 to-purple-200'
    }
  };

  // Function to get Basic Auth header
  const getAuthHeader = () => {
    const credentials = `${API_CONFIG.userId}:${API_CONFIG.apiKey}`;
    return `Basic ${btoa(credentials)}`;
  };

  // Function to fetch Rashi data
  const fetchRashiData = async (planet) => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`${API_CONFIG.baseUrl}/${planets[planet].api}`, {
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
      console.log('Rashi Data:', data);
      setRashiData(data);
      
    } catch (error) {
      console.error('Error fetching Rashi data:', error);
      setError(`Failed to load data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when component mounts or planet changes
  useEffect(() => {
    fetchRashiData(selectedPlanet);
  }, [selectedPlanet]);

  // Function to handle planet selection
  const handlePlanetChange = (planet) => {
    setSelectedPlanet(planet);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-gray-50 rounded-lg p-8 shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="text-center mt-4 text-gray-600">
            {language === 'english' ? translations.loading.english : translations.loading.hindi}
          </p>
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
            <h2 className="text-xl font-bold mb-2">
              {language === 'english' ? translations.error.english : translations.error.hindi}
            </h2>
            <p className="text-sm text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => fetchRashiData(selectedPlanet)} 
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            >
              {language === 'english' ? translations.retry.english : translations.retry.hindi}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentPlanet = planets[selectedPlanet];

  return (
    <div className="min-h-screen bg-white md:bg-gradient-to-br md:from-purple-800 md:via-purple-600 md:to-purple-400 md:flex md:items-center md:justify-center md:p-4">
      {/* Mobile: Full width, Desktop: Centered card */}
      <div className="w-full max-w-full mx-auto md:max-w-lg">
        <div className="bg-gradient-to-b from-pink-50 via-rose-50 to-purple-50 min-h-screen md:min-h-0 flex flex-col md:rounded-3xl md:shadow-2xl md:overflow-hidden md:h-[95vh]">
          {/* Header - Fixed */}
          <div className="text-center pt-8 pb-6 px-6 flex-shrink-0 md:pt-6 md:pb-4 bg-gradient-to-b from-pink-50 via-rose-50 to-purple-50 sticky top-0 z-10 md:relative md:sticky-none">
            <div className="flex items-center justify-center mb-6 md:mb-3">
              <div className="text-orange-500 text-xl font-bold md:text-lg">Nakshatra</div>
              <div className="text-blue-500 text-xl font-bold md:text-lg">One</div>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto px-6 pb-6 md:scrollbar-thin md:scrollbar-thumb-gray-300 md:scrollbar-track-transparent">
            {/* Main Title */}
            <div className="text-center mb-6">
              <h1 className="text-xl font-bold text-gray-800 mb-2 leading-tight md:text-lg">
                {language === 'english' ? translations.title.english : translations.title.hindi}
              </h1>
            </div>

            {/* Zodiac Header Image */}
            <div className="text-center mb-6">
              <img 
                src="https://img.freepik.com/premium-vector/people-with-zodiac-signs-concept-man-woman-near-wheel-with-astrological-signs-scorpio-libra-sagittarius-cancer-horoscope-astrology-cartoon-flat-vector-illustration_118813-17057.jpg?w=1060"
                alt="Zodiac Signs"
                className="w-full max-w-xs mx-auto rounded-xl shadow-lg mb-4"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>

            {/* Planet Selection */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-300 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center md:text-base">
                {language === 'english' ? translations.choosePlanet.english : translations.choosePlanet.hindi}
              </h3>
              <div className="grid grid-cols-4 gap-3 mb-2">
                {Object.entries(planets).map(([key, planet]) => (
                  <button
                    key={key}
                    onClick={() => handlePlanetChange(key)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedPlanet === key 
                        ? 'border-blue-500 bg-blue-50 shadow-md' 
                        : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <div className="text-2xl mb-1 text-orange-500">{planet.emoji}</div>
                    <div className="text-xs font-medium text-gray-700">
                      {language === 'english' ? planet.name.english.split(' ')[0] : planet.name.hindi}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Planet Display */}
            <div className="text-center mb-6">
              <div className={`w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br ${currentPlanet.color} flex items-center justify-center shadow-lg md:w-20 md:h-20`}>
                <img 
                  src={currentPlanet.image}
                  alt={language === 'english' ? currentPlanet.name.english : currentPlanet.name.hindi}
                  className="w-20 h-20 object-contain md:w-16 md:h-16"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="text-4xl hidden md:text-3xl">{currentPlanet.emoji}</div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-4 md:text-xl md:mb-3">
                {language === 'english' ? currentPlanet.name.english : currentPlanet.name.hindi}
              </h2>
              
              {/* Planet Info Tags */}
              {rashiData && (
                <div className="flex flex-wrap justify-center gap-2 mb-6 md:mb-4">
                  <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium md:px-3 md:py-1 md:text-xs">
                    {rashiData.planet || (language === 'english' ? currentPlanet.name.english.split(' ')[0] : currentPlanet.name.hindi)}
                  </span>
                  <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium md:px-3 md:py-1 md:text-xs">
                    {language === 'english' ? translations.rashiReport.english : translations.rashiReport.hindi}
                  </span>
                </div>
              )}
            </div>

            {/* Rashi Report - Styled section matching Panchang */}
            {rashiData && (
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-300 mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3 text-center md:text-base flex items-center justify-center">
                  <span className="text-2xl mr-2">🌟</span>
                  {language === 'english' ? translations.analysis.english : translations.analysis.hindi}
                </h3>
                <div className="bg-white bg-opacity-70 rounded-lg p-4">
                  <p className="text-base text-gray-700 leading-relaxed md:text-sm">
                    {rashiData.rashi_report}
                  </p>
                </div>
              </div>
            )}

            {/* Bottom padding for scrolling */}
            <div className="h-4"></div>
          </div>

          {/* Navigation Component - Fixed at bottom */}
          <Navigation 
            currentPage="rashi"
            nextText={language === 'english' ? translations.next.english : translations.next.hindi}
            backText={language === 'english' ? translations.back.english : translations.back.hindi}
            showNext={true}
            showBack={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Rashi;