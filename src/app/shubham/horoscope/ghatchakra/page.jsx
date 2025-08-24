'use client'
import React, { useState, useEffect } from 'react';

const GhatChakra = () => {
  const [ghatChakraData, setGhatChakraData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // API configuration
  const API_CONFIG = {
    userId: '643886',
    apiKey: '8cfa24ac82f34fa17f090ed5a6a2122b9f3e10bf',
    baseUrl: 'https://json.astrologyapi.com/v1',
    api: 'ghat_chakra'
  };

  const language = 'hi';
   
  // Birth details
  const birthDetails = {
    day: 4,
    month: 8,
    year: 2004,
    hour: 7,
    min: 45,
    lat: 19.132,
    lon: 72.342,
    tzone: 5.5
  };

  // Function to get Basic Auth header
  const getAuthHeader = () => {
    const credentials = `${API_CONFIG.userId}:${API_CONFIG.apiKey}`;
    return `Basic ${btoa(credentials)}`;
  };

  // Function to fetch Ghat Chakra data
  const fetchGhatChakraData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_CONFIG.baseUrl}/${API_CONFIG.api}`, {
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
      console.log('Ghat Chakra Data:', data);
      setGhatChakraData(data);
      
    } catch (error) {
      console.error('Error fetching Ghat Chakra data:', error);
      setError(`Failed to load data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchGhatChakraData();
  }, []);

  // Function to handle next button click
  const handleNext = () => {
    console.log('Navigate to next section');
  };

  // Function to handle back button click
  const handleBack = () => {
    console.log('Navigate back');
  };

  // Function to get chakra element info with appropriate styling
  const getChakraElementInfo = (key, value) => {
    const elementInfo = {
      month: { 
        label: 'Month', 
        emoji: '📅', 
        color: 'from-blue-100 to-blue-50 border-blue-300',
        textColor: 'text-blue-800'
      },
      tithi: { 
        label: 'Tithi', 
        emoji: '🌙', 
        color: 'from-purple-100 to-purple-50 border-purple-300',
        textColor: 'text-purple-800'
      },
      day: { 
        label: 'Day', 
        emoji: '🗓️', 
        color: 'from-green-100 to-green-50 border-green-300',
        textColor: 'text-green-800'
      },
      nakshatra: { 
        label: 'Nakshatra', 
        emoji: '⭐', 
        color: 'from-orange-100 to-orange-50 border-orange-300',
        textColor: 'text-orange-800'
      },
      yog: { 
        label: 'Yog', 
        emoji: '🧘', 
        color: 'from-indigo-100 to-indigo-50 border-indigo-300',
        textColor: 'text-indigo-800'
      },
      karan: { 
        label: 'Karan', 
        emoji: '⚡', 
        color: 'from-red-100 to-red-50 border-red-300',
        textColor: 'text-red-800'
      },
      pahar: { 
        label: 'Pahar', 
        emoji: '🕐', 
        color: 'from-yellow-100 to-yellow-50 border-yellow-300',
        textColor: 'text-yellow-800'
      },
      moon: { 
        label: 'Moon', 
        emoji: '🌕', 
        color: 'from-gray-100 to-gray-50 border-gray-300',
        textColor: 'text-gray-800'
      }
    };
    
    return elementInfo[key] || { 
      label: key.charAt(0).toUpperCase() + key.slice(1), 
      emoji: '🔮', 
      color: 'from-pink-100 to-pink-50 border-pink-300',
      textColor: 'text-pink-800'
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-gray-50 rounded-lg p-8 shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="text-center mt-4 text-gray-600">Loading Ghat Chakra Analysis...</p>
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
              onClick={fetchGhatChakraData} 
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            >
              Retry
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
        <div className="bg-gradient-to-b from-pink-50 via-rose-50 to-purple-50 min-h-screen md:min-h-0 flex flex-col md:rounded-3xl md:shadow-2xl md:overflow-hidden md:h-[95vh]">
          {/* Header */}
          <div className="text-center pt-8 pb-6 px-6 flex-shrink-0 md:pt-6 md:pb-4 bg-gradient-to-b from-pink-50 via-rose-50 to-purple-50 sticky top-0 z-10 md:relative">
            <div className="flex items-center justify-center mb-6 md:mb-3">
              <div className="text-orange-500 text-xl font-bold md:text-lg">Nakshatra</div>
              <div className="text-blue-500 text-xl font-bold md:text-lg">One</div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 pb-6 md:scrollbar-thin md:scrollbar-thumb-gray-300 md:scrollbar-track-transparent">
            {ghatChakraData && (
              <>
                <div className="text-center mb-6">
                  <h1 className="text-xl font-bold text-gray-800 mb-2 leading-tight md:text-lg">
                    Ghat Chakra Analysis
                  </h1>
                  <p className="text-sm text-gray-600">
                    Stored Karmas & Chakra Percentages
                  </p>
                </div>

                {/* Chakra Image */}
                <div className="text-center mb-6">
                  <div className="bg-white bg-opacity-60 rounded-2xl p-4 border border-purple-200 shadow-lg">
                    <img 
                      src="https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/kundli_analyser/chakras_new/chakras_main.png" 
                      alt="Seven Chakras" 
                      className="w-full max-w-xs mx-auto rounded-xl shadow-md"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div className="hidden text-center p-8">
                      <div className="text-6xl mb-4">🧘‍♀️</div>
                      <p className="text-gray-600 text-sm">Seven Chakras</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-300 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                    <span className="text-2xl mr-2">🔮</span>
                    What are Stored Karmas?
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed md:text-xs">
                    Chakra percentages gives you how much karma do you have stored 
                    in each of your chakras. The Chakra with the highest percentage 
                    is the one you need to work on most in this lifetime.
                  </p>
                </div>

                {/* Elements */}
                <div className="space-y-4 mb-6">
                  {Object.entries(ghatChakraData).map(([key, value]) => {
                    const elementInfo = getChakraElementInfo(key, value);
                    
                    return (
                      <div key={key} className={`bg-gradient-to-r ${elementInfo.color} rounded-xl p-4 border`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">{elementInfo.emoji}</span>
                            <div>
                              <h3 className={`text-lg font-bold ${elementInfo.textColor} md:text-base`}>
                                {elementInfo.label}
                              </h3>
                              <div className="text-xs text-gray-600 mt-1">
                                Chakra Element
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-xl font-bold ${elementInfo.textColor} md:text-lg`}>
                              {value}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Chakra Summary */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-300 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                    <span className="text-2xl mr-2">📊</span>
                    Your Chakra Configuration
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(ghatChakraData).slice(0, 8).map(([key, value]) => {
                      const elementInfo = getChakraElementInfo(key, value);
                      return (
                        <div key={key} className="bg-white bg-opacity-60 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="text-lg mr-2">{elementInfo.emoji}</span>
                              <span className="text-xs font-semibold text-gray-700">
                                {elementInfo.label}
                              </span>
                            </div>
                            <span className={`text-sm font-bold ${elementInfo.textColor}`}>
                              {value}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Guidance */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-300 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 md:text-base flex items-center">
                    <span className="text-2xl mr-2">🕉️</span>
                    Spiritual Guidance
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed md:text-xs">
                    Your Ghat Chakra analysis reveals the karmic blueprint of your soul's journey. 
                    Focus on balancing your chakras through meditation, spiritual practices, and conscious living.
                  </p>
                </div>
              </>
            )}
            <div className="h-4"></div>
          </div>

          {/* Navigation */}
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

export default GhatChakra;