'use client'
import React, { useState, useEffect } from 'react';

const AscendantReport = () => {
  const [ascendantData, setAscendantData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // API configuration
  const API_CONFIG = {
    userId: '643886',
    apiKey: '8cfa24ac82f34fa17f090ed5a6a2122b9f3e10bf',
    baseUrl: 'https://json.astrologyapi.com/v1',
    api: 'general_ascendant_report'
  };

  let language = 'hi'; // Set to English
   
  // Birth details
  const birthDetails = {
    day: 8,
    month: 2,
    year: 2000,
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

  // Function to fetch Ascendant report data
  const fetchAscendantData = async () => {
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
      console.log('Ascendant Data:', data);
      setAscendantData(data);
      
    } catch (error) {
      console.error('Error fetching Ascendant data:', error);
      setError(`Failed to load data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchAscendantData();
  }, []);

  // Function to handle next button click
  const handleNext = () => {
    console.log('Navigate to next section');
  };

  // Function to handle back button click
  const handleBack = () => {
    console.log('Navigate back');
  };

  // Function to get zodiac sign emoji
  const getZodiacEmoji = (sign) => {
    const zodiacEmojis = {
      'Aries': '♈',
      'Taurus': '♉',
      'Gemini': '♊',
      'Cancer': '♋',
      'Leo': '♌',
      'Virgo': '♍',
      'Libra': '♎',
      'Scorpio': '♏',
      'Sagittarius': '♐',
      'Capricorn': '♑',
      'Aquarius': '♒',
      'Pisces': '♓'
    };
    return zodiacEmojis[sign] || '⭐';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-gray-50 rounded-lg p-8 shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="text-center mt-4 text-gray-600">Loading Your Ascendant Report...</p>
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
              onClick={fetchAscendantData} 
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
          {/* Header - Fixed */}
          <div className="text-center pt-8 pb-6 px-6 flex-shrink-0 md:pt-6 md:pb-4 bg-gradient-to-b from-pink-50 via-rose-50 to-purple-50 sticky top-0 z-10 md:relative md:sticky-none">
            <div className="flex items-center justify-center mb-6 md:mb-3">
              <div className="text-orange-500 text-xl font-bold md:text-lg">Nakshatra</div>
              <div className="text-blue-500 text-xl font-bold md:text-lg">One</div>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto px-6 pb-6 md:scrollbar-thin md:scrollbar-thumb-gray-300 md:scrollbar-track-transparent">
            {ascendantData && ascendantData.asc_report && (
              <>
                {/* Main Title */}
                <div className="text-center mb-6">
                  <h1 className="text-xl font-bold text-gray-800 mb-4 leading-tight md:text-lg">
                    Your Rising Sign is {ascendantData.asc_report.ascendant} - The First Impression You Make
                  </h1>
                </div>

                {/* Ascendant Sign Image/Icon */}
                <div className="text-center mb-6">
                  <div className="w-full max-w-xs mx-auto mb-4">
                    <img 
                      src="https://img.freepik.com/free-vector/lord-rama-pointing-his-bow-sky_23-2148449886.jpg"
                      alt={`${ascendantData.asc_report.ascendant} Rising Sign`}
                      className="w-full h-auto object-contain rounded-lg"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div className="hidden bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg p-8 border-2 border-yellow-200">
                      <div className="text-6xl mb-4">{getZodiacEmoji(ascendantData.asc_report.ascendant)}</div>
                      <div className="text-sm text-gray-600">{ascendantData.asc_report.ascendant} Rising</div>
                    </div>
                  </div>
                </div>

                {/* Ascendant Sign Badge */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center bg-gradient-to-r from-orange-400 to-pink-400 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg">
                    <span className="text-2xl mr-2">{getZodiacEmoji(ascendantData.asc_report.ascendant)}</span>
                    {ascendantData.asc_report.ascendant} Rising
                  </div>
                </div>

                {/* What is Ascendant? */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-300 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                    <span className="text-2xl mr-2">🌅</span>
                    What is Your Rising Sign?
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed md:text-sm">
                    Your Ascendant (Rising sign) is the zodiac sign that was rising on the eastern horizon 
                    at the exact moment of your birth. It represents the mask you wear in public, 
                    your first impression on others, and how you approach new situations in life.
                  </p>
                </div>

                {/* Detailed Report */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-300 mb-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 md:text-base flex items-center">
                      <span className="text-2xl mr-2">✨</span>
                      Your {ascendantData.asc_report.ascendant} Rising Personality
                    </h3>
                    <div className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-semibold inline-block mb-4">
                      How The World Sees You
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-sm text-gray-700 leading-relaxed md:text-xs">
                      {ascendantData.asc_report.report}
                    </p>
                  </div>
                </div>

                {/* Key Traits */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-300 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                    <span className="text-2xl mr-2">🎭</span>
                    Key {ascendantData.asc_report.ascendant} Rising Traits
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white bg-opacity-60 rounded-lg p-3 text-center">
                      <div className="text-lg mb-1">🌟</div>
                      <div className="text-xs font-semibold text-gray-700">First Impression</div>
                    </div>
                    <div className="bg-white bg-opacity-60 rounded-lg p-3 text-center">
                      <div className="text-lg mb-1">🎪</div>
                      <div className="text-xs font-semibold text-gray-700">Public Persona</div>
                    </div>
                    <div className="bg-white bg-opacity-60 rounded-lg p-3 text-center">
                      <div className="text-lg mb-1">🚀</div>
                      <div className="text-xs font-semibold text-gray-700">Life Approach</div>
                    </div>
                    <div className="bg-white bg-opacity-60 rounded-lg p-3 text-center">
                      <div className="text-lg mb-1">💫</div>
                      <div className="text-xs font-semibold text-gray-700">Natural Style</div>
                    </div>
                  </div>
                </div>

                {/* Inspirational Message */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-300 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 md:text-base flex items-center">
                    <span className="text-2xl mr-2">💎</span>
                    Embrace Your {ascendantData.asc_report.ascendant} Rising
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed md:text-xs">
                    Remember, your Rising sign is your cosmic invitation to the world. 
                    It's the energy you naturally radiate and the lens through which you 
                    experience life. Embrace this aspect of yourself - it's your unique 
                    way of making your mark on the world.
                  </p>
                </div>
              </>
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

export default AscendantReport;