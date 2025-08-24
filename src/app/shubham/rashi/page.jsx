'use client'
import React, { useState, useEffect } from 'react';

const Rashi = () => {
  const [rashiData, setRashiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedPlanet, setSelectedPlanet] = useState('sun');

  // API configuration
  const API_CONFIG = {
    userId: '643886',
    apiKey: '8cfa24ac82f34fa17f090ed5a6a2122b9f3e10bf',
    baseUrl: 'https://json.astrologyapi.com/v1',
  };
  let language = 'en'; // Default language is Hindi

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
      name: 'Surya (Sun)',
      api: 'general_rashi_report/sun',
      image: 'https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/kundli_analyser/graha_devta/sun.png',
      emoji: '☉',
      color: 'from-orange-100 to-yellow-200'
    },
    moon: {
      name: 'Chandra (Moon)',
      api: 'general_rashi_report/moon',
      image: 'https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/kundli_analyser/graha_devta/moon.png',
      emoji: '☽',
      color: 'from-blue-100 to-purple-200'
    },
    mars: {
      name: 'Mangal (Mars)',
      api: 'general_rashi_report/mars',
      image: 'https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/kundli_analyser/graha_devta/mars_2.png',
      emoji: '♂',
      color: 'from-red-100 to-pink-200'
    },
    mercury: {
      name: 'Budh (Mercury)',
      api: 'general_rashi_report/mercury',
      image: 'https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/kundli_analyser/graha_devta/mercury.png',
      emoji: '☿',
      color: 'from-green-100 to-teal-200'
    },
    jupiter: {
      name: 'Guru (Jupiter)',
      api: 'general_rashi_report/jupiter',
      image: 'https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/kundli_analyser/graha_devta/jupiter.png',
      emoji: '♃',
      color: 'from-yellow-100 to-orange-200'
    },
    saturn: {
      name: 'Shani (Saturn)',
      api: 'general_rashi_report/saturn',
      image: 'https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/kundli_analyser/graha_devta/saturn.png',
      emoji: '♄',
      color: 'from-gray-100 to-slate-200'
    },
    rahu: {
      name: 'Rahu',
      api: 'general_rashi_report/rahu',
      image: 'https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/kundli_analyser/graha_devta/rahu.png',
      emoji: '☊',
      color: 'from-purple-100 to-indigo-200'
    },
    ketu: {
      name: 'Ketu',
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
          'Accept-Language': language
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

  // Function to handle next button click
  const handleNext = () => {
    console.log('Navigate to next section');
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
          <p className="text-center mt-4 text-gray-600">Loading Rashi Analysis...</p>
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
            <h2 className="text-xl font-bold mb-2">Error Loading Data</h2>
            <p className="text-sm text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => fetchRashiData(selectedPlanet)} 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Retry
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
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Choose Your Planet</h3>
              <div className="grid grid-cols-4 gap-3 mb-6">
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
                    <div className="text-2xl mb-1 text-orange-500 ">{planet.emoji}</div>
                    <div className="text-xs font-medium text-gray-700">{planet.name.split(' ')[0]}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Planet Image and Title */}
            <div className="text-center mb-6">
              <div className={`w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br ${currentPlanet.color} flex items-center justify-center shadow-lg md:w-20 md:h-20`}>
                <img 
                  src={currentPlanet.image}
                  alt={currentPlanet.name}
                  className="w-20 h-20 object-contain md:w-16 md:h-16"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="text-4xl hidden md:text-3xl">{currentPlanet.emoji}</div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-4 md:text-xl md:mb-3">{currentPlanet.name}</h2>
              
              {/* Planet Info */}
              {rashiData && (
                <div className="flex flex-wrap justify-center gap-2 mb-6 md:mb-4">
                  <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium md:px-3 md:py-1 md:text-xs">
                    {rashiData.planet || currentPlanet.name.split(' ')[0]}
                  </span>
                  <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium md:px-3 md:py-1 md:text-xs">
                    Rashi Report
                  </span>
                </div>
              )}
            </div>

            {/* Rashi Report - Blue bordered section */}
            {rashiData && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-300 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">Your Rashi Analysis</h3>
                <p className="text-base text-gray-700 leading-relaxed md:text-sm">
                  {rashiData.rashi_report}
                </p>
              </div>
            )}

         

            {/* Bottom padding for scrolling */}
            <div className="h-4"></div>
          </div>

          {/* Navigation - Fixed at bottom */}
          <div className="flex justify-between items-center p-6 bg-white bg-opacity-90 border-t border-gray-200 flex-shrink-0">
            <button 
              onClick={handleBack}
              className="p-3 rounded-full border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button 
              onClick={handleNext}
              className="bg-gradient-to-r from-orange-400 to-pink-400 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-sm"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rashi;