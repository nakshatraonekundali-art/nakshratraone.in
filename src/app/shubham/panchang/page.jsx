'use client'
import React, { useState, useEffect } from 'react';

const PanchangDetails = () => {
  const [panchangData, setPanchangData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // API configuration
  const API_CONFIG = {
    userId: '643886',
    apiKey: '8cfa24ac82f34fa17f090ed5a6a2122b9f3e10bf',
    baseUrl: 'https://json.astrologyapi.com/v1',
    api: 'advanced_panchang'
  };

  let language = 'hi'; // Set to English
   
  // Birth details
  const birthDetails = {
    name: "Shubham",
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

  // Function to fetch Panchang data
  const fetchPanchangData = async () => {
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
      console.log('Panchang Data:', data);
      setPanchangData(data);
      
    } catch (error) {
      console.error('Error fetching Panchang data:', error);
      setError(`Failed to load data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchPanchangData();
  }, []);

  // Function to handle next button click
  const handleNext = () => {
    console.log('Navigate to next section');
  };

  // Function to handle back button click
  const handleBack = () => {
    console.log('Navigate back');
  };

  // Function to format time
  const formatTime = (timeObj) => {
    if (!timeObj) return 'N/A';
    const { hour, minute, second } = timeObj;
    const h = hour % 24; // Handle 24+ hours
    return `${h.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
  };

  // Function to get element color class
  const getElementColorClass = (type) => {
    const colorClasses = {
      'tithi': 'from-blue-100 to-blue-50 border-blue-300',
      'nakshatra': 'from-purple-100 to-purple-50 border-purple-300',
      'yog': 'from-green-100 to-green-50 border-green-300',
      'karan': 'from-yellow-100 to-yellow-50 border-yellow-300',
      'time': 'from-red-100 to-red-50 border-red-300'
    };
    return colorClasses[type] || 'from-gray-100 to-gray-50 border-gray-300';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-gray-50 rounded-lg p-8 shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="text-center mt-4 text-gray-600">Loading Today's Panchang...</p>
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
              onClick={fetchPanchangData} 
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
              <div className="text-orange-500 text-xl font-bold md:text-lg">Panchang</div>
              <div className="text-blue-500 text-xl font-bold md:text-lg">One</div>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto px-6 pb-6 md:scrollbar-thin md:scrollbar-thumb-gray-300 md:scrollbar-track-transparent">
            {panchangData && (
              <>
                {/* Main Title */}
                <div className="text-center mb-6">
                  <h1 className="text-xl font-bold text-gray-800 mb-2 leading-tight md:text-lg">
                    Today's Vedic Calendar - Panchang
                  </h1>
                  <p className="text-sm text-gray-600">
                    {panchangData.day}, {birthDetails.day}/{birthDetails.month}/{birthDetails.year}
                  </p>
                </div>

                {/* Lord Shiva Image */}
                <div className="text-center mb-6">
                  <div className="w-full max-w-xs mx-auto mb-4">
                    <img 
                      src="https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/kundli_analyser/panchang.png"
                      alt="Maha Shivaratri - Divine Time"
                      className="w-full h-auto object-contain rounded-lg"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div className="hidden bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg p-8 border-2 border-yellow-200">
                      <div className="text-6xl mb-4">🕉️</div>
                      <div className="text-sm text-gray-600">Sacred Time</div>
                    </div>
                  </div>
                </div>

                {/* Sun & Moon Times */}
                <div className={`bg-gradient-to-r ${getElementColorClass('time')} rounded-xl p-4 border mb-6`}>
                  <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                    <span className="text-2xl mr-2">🌅</span>
                    Celestial Timings
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white bg-opacity-70 rounded-lg p-3 text-center">
                      <div className="text-xs font-semibold text-gray-600 mb-1">Sunrise</div>
                      <div className="text-sm font-bold text-gray-800">{panchangData.sunrise}</div>
                      <div className="text-xs text-gray-500">Vedic: {panchangData.vedic_sunrise}</div>
                    </div>
                    <div className="bg-white bg-opacity-70 rounded-lg p-3 text-center">
                      <div className="text-xs font-semibold text-gray-600 mb-1">Sunset</div>
                      <div className="text-sm font-bold text-gray-800">{panchangData.sunset}</div>
                      <div className="text-xs text-gray-500">Vedic: {panchangData.vedic_sunset}</div>
                    </div>
                    <div className="bg-white bg-opacity-70 rounded-lg p-3 text-center">
                      <div className="text-xs font-semibold text-gray-600 mb-1">Moonrise</div>
                      <div className="text-sm font-bold text-gray-800">{panchangData.moonrise}</div>
                    </div>
                    <div className="bg-white bg-opacity-70 rounded-lg p-3 text-center">
                      <div className="text-xs font-semibold text-gray-600 mb-1">Moonset</div>
                      <div className="text-sm font-bold text-gray-800">{panchangData.moonset}</div>
                    </div>
                  </div>
                </div>

                {/* Tithi */}
                <div className={`bg-gradient-to-r ${getElementColorClass('tithi')} rounded-xl p-4 border mb-6`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-800 md:text-base flex items-center">
                      <span className="text-2xl mr-2">🌙</span>
                      Tithi
                    </h3>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-800">{panchangData.tithi.details.tithi_name}</div>
                      <div className="text-xs text-gray-600">Ends: {formatTime(panchangData.tithi.end_time)}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="bg-white bg-opacity-70 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-semibold text-gray-600">Number:</span>
                        <span className="text-sm font-bold text-gray-800">{panchangData.tithi.details.tithi_number}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-semibold text-gray-600">Deity:</span>
                        <span className="text-sm font-bold text-gray-800">{panchangData.tithi.details.deity}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-gray-600">Special:</span>
                        <span className="text-sm font-bold text-gray-800">{panchangData.tithi.details.special}</span>
                      </div>
                    </div>
                    <div className="bg-blue-100 rounded-lg p-3">
                      <p className="text-xs text-gray-700">{panchangData.tithi.details.summary}</p>
                    </div>
                  </div>
                </div>

                {/* Nakshatra */}
                <div className={`bg-gradient-to-r ${getElementColorClass('nakshatra')} rounded-xl p-4 border mb-6`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-800 md:text-base flex items-center">
                      <span className="text-2xl mr-2">⭐</span>
                      Nakshatra
                    </h3>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-800">{panchangData.nakshatra.details.nak_name}</div>
                      <div className="text-xs text-gray-600">Ends: {formatTime(panchangData.nakshatra.end_time)}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="bg-white bg-opacity-70 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-semibold text-gray-600">Number:</span>
                        <span className="text-sm font-bold text-gray-800">{panchangData.nakshatra.details.nak_number}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-semibold text-gray-600">Ruler:</span>
                        <span className="text-sm font-bold text-gray-800">{panchangData.nakshatra.details.ruler}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-gray-600">Deity:</span>
                        <span className="text-sm font-bold text-gray-800">{panchangData.nakshatra.details.deity}</span>
                      </div>
                    </div>
                    <div className="bg-purple-100 rounded-lg p-3">
                      <div className="text-xs font-semibold text-purple-800 mb-1">Special: {panchangData.nakshatra.details.special}</div>
                      <p className="text-xs text-gray-700">{panchangData.nakshatra.details.summary}</p>
                    </div>
                  </div>
                </div>

                {/* Yoga */}
                <div className={`bg-gradient-to-r ${getElementColorClass('yog')} rounded-xl p-4 border mb-6`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-800 md:text-base flex items-center">
                      <span className="text-2xl mr-2">🧘</span>
                      Yoga
                    </h3>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-800">{panchangData.yog.details.yog_name}</div>
                      <div className="text-xs text-gray-600">Ends: {formatTime(panchangData.yog.end_time)}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="bg-white bg-opacity-70 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-semibold text-gray-600">Number:</span>
                        <span className="text-sm font-bold text-gray-800">{panchangData.yog.details.yog_number}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-gray-600">Special:</span>
                        <span className="text-sm font-bold text-gray-800">{panchangData.yog.details.special}</span>
                      </div>
                    </div>
                    <div className="bg-green-100 rounded-lg p-3">
                      <p className="text-xs text-gray-700">{panchangData.yog.details.meaning}</p>
                    </div>
                  </div>
                </div>

                {/* Karana */}
                <div className={`bg-gradient-to-r ${getElementColorClass('karan')} rounded-xl p-4 border mb-6`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-800 md:text-base flex items-center">
                      <span className="text-2xl mr-2">⚡</span>
                      Karana
                    </h3>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-800">{panchangData.karan.details.karan_name}</div>
                      <div className="text-xs text-gray-600">Ends: {formatTime(panchangData.karan.end_time)}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="bg-white bg-opacity-70 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-semibold text-gray-600">Number:</span>
                        <span className="text-sm font-bold text-gray-800">{panchangData.karan.details.karan_number}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-gray-600">Deity:</span>
                        <span className="text-sm font-bold text-gray-800">{panchangData.karan.details.deity}</span>
                      </div>
                    </div>
                    <div className="bg-yellow-100 rounded-lg p-3">
                      <p className="text-xs text-gray-700">{panchangData.karan.details.special}</p>
                    </div>
                  </div>
                </div>

                {/* Zodiac Signs */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-300 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                    <span className="text-2xl mr-2">♒</span>
                    Celestial Signs
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white bg-opacity-70 rounded-lg p-3 text-center">
                      <div className="text-xs font-semibold text-gray-600 mb-1">Sun Sign</div>
                      <div className="text-sm font-bold text-gray-800">{panchangData.sun_sign}</div>
                    </div>
                    <div className="bg-white bg-opacity-70 rounded-lg p-3 text-center">
                      <div className="text-xs font-semibold text-gray-600 mb-1">Moon Sign</div>
                      <div className="text-sm font-bold text-gray-800">{panchangData.moon_sign}</div>
                    </div>
                    <div className="bg-white bg-opacity-70 rounded-lg p-3 text-center">
                      <div className="text-xs font-semibold text-gray-600 mb-1">Paksha</div>
                      <div className="text-sm font-bold text-gray-800">{panchangData.paksha}</div>
                    </div>
                    <div className="bg-white bg-opacity-70 rounded-lg p-3 text-center">
                      <div className="text-xs font-semibold text-gray-600 mb-1">Season</div>
                      <div className="text-sm font-bold text-gray-800">{panchangData.ritu}</div>
                    </div>
                  </div>
                </div>

                {/* Hindu Calendar */}
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border border-orange-300 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                    <span className="text-2xl mr-2">🗓️</span>
                    Hindu Calendar
                  </h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-2 border-b border-orange-200">
                      <span className="text-xs font-semibold text-gray-600">Month (Purnimanta):</span>
                      <span className="text-sm font-bold text-gray-800">{panchangData.hindu_maah.purnimanta}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-orange-200">
                      <span className="text-xs font-semibold text-gray-600">Month (Amanta):</span>
                      <span className="text-sm font-bold text-gray-800">{panchangData.hindu_maah.amanta}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-orange-200">
                      <span className="text-xs font-semibold text-gray-600">Vikram Samvat:</span>
                      <span className="text-sm font-bold text-gray-800">{panchangData.vikram_samvat} ({panchangData.vkram_samvat_name})</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-xs font-semibold text-gray-600">Shaka Samvat:</span>
                      <span className="text-sm font-bold text-gray-800">{panchangData.shaka_samvat} ({panchangData.shaka_samvat_name})</span>
                    </div>
                  </div>
                </div>

                {/* Auspicious Times */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-300 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                    <span className="text-2xl mr-2">🕐</span>
                    Important Timings
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="bg-green-100 rounded-lg p-3">
                      <div className="text-sm font-semibold text-green-800 mb-1">Abhijit Muhurta (Auspicious)</div>
                      <div className="text-xs text-gray-700">{panchangData.abhijit_muhurta.start} - {panchangData.abhijit_muhurta.end}</div>
                    </div>
                    <div className="bg-red-100 rounded-lg p-3">
                      <div className="text-sm font-semibold text-red-800 mb-1">Rahu Kaal (Inauspicious)</div>
                      <div className="text-xs text-gray-700">{panchangData.rahukaal.start} - {panchangData.rahukaal.end}</div>
                    </div>
                    <div className="bg-yellow-100 rounded-lg p-3">
                      <div className="text-sm font-semibold text-yellow-800 mb-1">Guli Kaal</div>
                      <div className="text-xs text-gray-700">{panchangData.guliKaal.start} - {panchangData.guliKaal.end}</div>
                    </div>
                    <div className="bg-purple-100 rounded-lg p-3">
                      <div className="text-sm font-semibold text-purple-800 mb-1">Yamghant Kaal</div>
                      <div className="text-xs text-gray-700">{panchangData.yamghant_kaal.start} - {panchangData.yamghant_kaal.end}</div>
                    </div>
                  </div>
                </div>

                {/* Direction Details */}
                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-4 border border-cyan-300 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                    <span className="text-2xl mr-2">🧭</span>
                    Directional Guidance
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white bg-opacity-70 rounded-lg p-3 text-center">
                      <div className="text-xs font-semibold text-gray-600 mb-1">Disha Shool</div>
                      <div className="text-sm font-bold text-gray-800">{panchangData.disha_shool}</div>
                    </div>
                    <div className="bg-white bg-opacity-70 rounded-lg p-3 text-center">
                      <div className="text-xs font-semibold text-gray-600 mb-1">Nak Shool</div>
                      <div className="text-sm font-bold text-gray-800">{panchangData.nak_shool.direction}</div>
                    </div>
                    <div className="bg-white bg-opacity-70 rounded-lg p-3 text-center">
                      <div className="text-xs font-semibold text-gray-600 mb-1">Moon Nivas</div>
                      <div className="text-sm font-bold text-gray-800">{panchangData.moon_nivas}</div>
                    </div>
                    <div className="bg-white bg-opacity-70 rounded-lg p-3 text-center">
                      <div className="text-xs font-semibold text-gray-600 mb-1">Ayana</div>
                      <div className="text-sm font-bold text-gray-800">{panchangData.ayana}</div>
                    </div>
                  </div>
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

export default PanchangDetails;