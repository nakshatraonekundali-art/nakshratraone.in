'use client'
import React, { useState, useEffect } from 'react';

const HoroscopeChart = () => {
  const [chartData, setChartData] = useState(null);
  const [chartImage, setChartImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // API configuration
  const API_CONFIG = {
    userId: '643886',
    apiKey: '8cfa24ac82f34fa17f090ed5a6a2122b9f3e10bf',
    baseUrl: 'https://json.astrologyapi.com/v1',
    chartDataApi: 'horo_chart/D1', // D1 for main birth chart
    chartImageApi: 'horo_chart_image/D1'
  };

  const language = 'hi';
   
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

  // Function to fetch chart image (SVG)
  const fetchChartImage = async () => {
    try {
      const response = await fetch(`${API_CONFIG.baseUrl}/${API_CONFIG.chartImageApi}`, {
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
        throw new Error(`Chart Image API Error: ${response.status} - ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Chart Image Data:', data);
      setChartImage(data);
      
    } catch (error) {
      console.error('Error fetching chart image:', error);
      throw error;
    }
  };

  // Function to fetch chart data
  const fetchChartData = async () => {
    try {
      const response = await fetch(`${API_CONFIG.baseUrl}/${API_CONFIG.chartDataApi}`, {
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
        throw new Error(`Chart Data API Error: ${response.status} - ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Chart Data:', data);
      setChartData(data);
      
    } catch (error) {
      console.error('Error fetching chart data:', error);
      throw error;
    }
  };

  // Function to fetch both chart image and data
  const fetchHoroscopeData = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Fetch both APIs simultaneously
      await Promise.all([
        fetchChartImage(),
        fetchChartData()
      ]);
      
    } catch (error) {
      console.error('Error fetching horoscope data:', error);
      setError(`Failed to load data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchHoroscopeData();
  }, []);

  // Function to handle next button click
  const handleNext = () => {
    console.log('Navigate to next section');
  };

  // Function to handle back button click
  const handleBack = () => {
    console.log('Navigate back');
  };

  // Function to get planet info
  const getPlanetInfo = (planet) => {
    const planetNames = {
      'SUN': { name: 'Sun', emoji: '☉', color: 'text-yellow-600' },
      'MOON': { name: 'Moon', emoji: '☽', color: 'text-gray-600' },
      'MARS': { name: 'Mars', emoji: '♂', color: 'text-red-600' },
      'MERCURY': { name: 'Mercury', emoji: '☿', color: 'text-green-600' },
      'JUPITER': { name: 'Jupiter', emoji: '♃', color: 'text-purple-600' },
      'VENUS': { name: 'Venus', emoji: '♀', color: 'text-pink-600' },
      'SATURN': { name: 'Saturn', emoji: '♄', color: 'text-blue-600' },
      'RAHU': { name: 'Rahu', emoji: '☊', color: 'text-orange-600' },
      'KETU': { name: 'Ketu', emoji: '☋', color: 'text-indigo-600' }
    };
    return planetNames[planet] || { name: planet, emoji: '●', color: 'text-gray-600' };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-gray-50 rounded-lg p-8 shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="text-center mt-4 text-gray-600">Loading Horoscope Chart...</p>
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
              onClick={fetchHoroscopeData} 
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
            {/* Main Title */}
           
            {/* Chart Image - SVG Display */}
            {chartImage && chartImage.svg && (
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-300 mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                  <span className="text-2xl mr-2">🔮</span>
                  Birth Chart
                </h3>
                <div className="bg-white rounded-lg p-4 flex justify-center">
                  <div 
                    dangerouslySetInnerHTML={{ __html: chartImage.svg }}
                    className="max-w-full"
                    style={{ maxHeight: '400px', overflow: 'visible' }}
                  />
                </div>
                <div className="mt-3 bg-blue-100 rounded-lg p-3">
                  <p className="text-xs text-blue-800 text-center">
                    This is your personalized Vedic birth chart showing planetary positions at your time of birth
                  </p>
                </div>
              </div>
            )}

            {/* Chart Data Analysis */}
            {chartData && (
              <>
                {/* Houses with Planets */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-300 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                    <span className="text-2xl mr-2">🏠</span>
                    Houses & Planetary Positions
                  </h3>
                  
                  <div className="space-y-3">
                    {chartData.map && chartData.map((house, index) => (
                      <div key={index} className="bg-white bg-opacity-70 rounded-lg p-3">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center">
                            <span className="text-sm font-bold text-purple-700 mr-2">
                              House {house.sign}
                            </span>
                            <span className="text-xs text-gray-600">
                              ({house.sign_name})
                            </span>
                          </div>
                          {house.planet && house.planet.length > 0 && (
                            <div className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                              {house.planet.length} Planet{house.planet.length > 1 ? 's' : ''}
                            </div>
                          )}
                        </div>
                        
                        {house.planet && house.planet.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {house.planet.map((planet, planetIndex) => {
                              const planetInfo = getPlanetInfo(planet);
                              return (
                                <div 
                                  key={planetIndex}
                                  className={`flex items-center bg-gray-100 rounded-full px-3 py-1 text-xs ${planetInfo.color}`}
                                >
                                  <span className="mr-1">{planetInfo.emoji}</span>
                                  <span className="font-semibold">{planetInfo.name}</span>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="text-xs text-gray-500 italic">No planets in this house</div>
                        )}
                      </div>
                    ))}
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

export default HoroscopeChart;