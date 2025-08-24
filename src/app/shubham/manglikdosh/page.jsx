'use client'
import React, { useState, useEffect } from 'react';

const MangalDosha = () => {
  const [mangalDoshaData, setMangalDoshaData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // API configuration
  const API_CONFIG = {
    userId: '643886',
    apiKey: '8cfa24ac82f34fa17f090ed5a6a2122b9f3e10bf',
    baseUrl: 'https://json.astrologyapi.com/v1',
    api: 'manglik'
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

  // Function to fetch Mangal Dosha data
  const fetchMangalDoshaData = async () => {
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
      console.log('Mangal Dosha Data:', data);
      setMangalDoshaData(data);
      
    } catch (error) {
      console.error('Error fetching Mangal Dosha data:', error);
      setError(`Failed to load data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchMangalDoshaData();
  }, []);

  // Function to handle next button click
  const handleNext = () => {
    console.log('Navigate to next section');
  };

  // Function to handle back button click
  const handleBack = () => {
    console.log('Navigate back');
  };

  // Function to get status color and styling
  const getStatusStyling = (status) => {
    switch (status) {
      case 'LESS_EFFECTIVE':
        return {
          bgColor: 'from-yellow-100 to-orange-50 border-yellow-300',
          textColor: 'text-yellow-800',
          emoji: '⚠️'
        };
      case 'HIGH':
        return {
          bgColor: 'from-red-100 to-red-50 border-red-300',
          textColor: 'text-red-800',
          emoji: '🔥'
        };
      case 'MEDIUM':
        return {
          bgColor: 'from-orange-100 to-orange-50 border-orange-300',
          textColor: 'text-orange-800',
          emoji: '🟠'
        };
      case 'LOW':
        return {
          bgColor: 'from-green-100 to-green-50 border-green-300',
          textColor: 'text-green-800',
          emoji: '✅'
        };
      default:
        return {
          bgColor: 'from-gray-100 to-gray-50 border-gray-300',
          textColor: 'text-gray-800',
          emoji: '⚪'
        };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-gray-50 rounded-lg p-8 shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="text-center mt-4 text-gray-600">Loading Mangal Dosha Analysis...</p>
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
              onClick={fetchMangalDoshaData} 
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
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
        <div className="bg-gradient-to-b from-orange-50 via-red-50 to-pink-50 min-h-screen md:min-h-0 flex flex-col md:rounded-3xl md:shadow-2xl md:overflow-hidden md:h-[95vh]">
          {/* Header */}
          <div className="text-center pt-8 pb-6 px-6 flex-shrink-0 md:pt-6 md:pb-4 bg-gradient-to-b from-orange-50 via-red-50 to-pink-50 sticky top-0 z-10 md:relative">
            <div className="flex items-center justify-center mb-6 md:mb-3">
              <div className="text-orange-500 text-xl font-bold md:text-lg">Nakshatra</div>
              <div className="text-blue-500 text-xl font-bold md:text-lg">One</div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 pb-6 md:scrollbar-thin md:scrollbar-thumb-gray-300 md:scrollbar-track-transparent">
            {mangalDoshaData && (
              <>
                <div className="text-center mb-6">
                  <h1 className="text-xl font-bold text-gray-800 mb-2 leading-tight md:text-lg">
                    Mangal Dosha Analysis
                  </h1>
                  <p className="text-sm text-gray-600">
                    Mars Position & Remedial Analysis
                  </p>
                </div>

                {/* Shiva Image */}
                <div className="text-center mb-6">
                  <div className="bg-white bg-opacity-60 rounded-2xl p-4 border border-red-200 shadow-lg">
                    <img 
                      src="https://img.freepik.com/premium-vector/flat-maha-shivaratri-illustration_23-2149314570.jpg" 
                      alt="Lord Shiva - Maha Shivaratri" 
                      className="w-full max-w-xs mx-auto rounded-xl shadow-md"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div className="hidden text-center p-8">
                      <div className="text-6xl mb-4">🕉️</div>
                      <p className="text-gray-600 text-sm">Lord Shiva</p>
                    </div>
                  </div>
                </div>

                {/* Status Overview */}
                {(() => {
                  const statusStyle = getStatusStyling(mangalDoshaData.manglik_status);
                  return (
                    <div className={`bg-gradient-to-r ${statusStyle.bgColor} rounded-xl p-4 border mb-6`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{statusStyle.emoji}</span>
                          <div>
                            <h3 className={`text-lg font-bold ${statusStyle.textColor} md:text-base`}>
                              Mangal Dosha Status
                            </h3>
                            <div className="text-xs text-gray-600 mt-1">
                              {mangalDoshaData.manglik_status.replace('_', ' ')}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-xl font-bold ${statusStyle.textColor} md:text-lg`}>
                            {mangalDoshaData.percentage_manglik_present}%
                          </div>
                          <div className="text-xs text-gray-600">
                            Present
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white bg-opacity-40 rounded-lg p-3 mt-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-gray-700">After Cancellation:</span>
                          <span className={`text-sm font-bold ${statusStyle.textColor}`}>
                            {mangalDoshaData.percentage_manglik_after_cancellation}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-semibold text-gray-700">Is Cancelled:</span>
                          <span className={`text-sm font-bold ${mangalDoshaData.is_mars_manglik_cancelled ? 'text-green-600' : 'text-red-600'}`}>
                            {mangalDoshaData.is_mars_manglik_cancelled ? 'Yes ✓' : 'No ✗'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Mangal Dosha Report */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-300 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                    <span className="text-2xl mr-2">📋</span>
                    Detailed Report
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed md:text-xs">
                    {mangalDoshaData.manglik_report}
                  </p>
                </div>

                {/* Present Rules */}
                {mangalDoshaData.manglik_present_rule && (
                  <div className="space-y-4 mb-6">
                    {/* Based on House */}
                    {mangalDoshaData.manglik_present_rule.based_on_house && mangalDoshaData.manglik_present_rule.based_on_house.length > 0 && (
                      <div className="bg-gradient-to-r from-red-100 to-red-50 rounded-xl p-4 border border-red-300">
                        <h3 className="text-lg font-bold text-red-800 mb-3 md:text-base flex items-center">
                          <span className="text-2xl mr-2">🏠</span>
                          House-Based Rules
                        </h3>
                        <div className="space-y-2">
                          {mangalDoshaData.manglik_present_rule.based_on_house.map((rule, index) => (
                            <div key={index} className="bg-white bg-opacity-50 rounded-lg p-3">
                              <p className="text-sm text-gray-700 md:text-xs">{rule}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Based on Aspect */}
                    {mangalDoshaData.manglik_present_rule.based_on_aspect && mangalDoshaData.manglik_present_rule.based_on_aspect.length > 0 && (
                      <div className="bg-gradient-to-r from-orange-100 to-orange-50 rounded-xl p-4 border border-orange-300">
                        <h3 className="text-lg font-bold text-orange-800 mb-3 md:text-base flex items-center">
                          <span className="text-2xl mr-2">👁️</span>
                          Aspect-Based Rules
                        </h3>
                        <div className="space-y-2">
                          {mangalDoshaData.manglik_present_rule.based_on_aspect.slice(0, 3).map((rule, index) => (
                            <div key={index} className="bg-white bg-opacity-50 rounded-lg p-3">
                              <p className="text-sm text-gray-700 md:text-xs">{rule}</p>
                            </div>
                          ))}
                          {mangalDoshaData.manglik_present_rule.based_on_aspect.length > 3 && (
                            <div className="bg-white bg-opacity-30 rounded-lg p-2 text-center">
                              <p className="text-xs text-gray-600">
                                +{mangalDoshaData.manglik_present_rule.based_on_aspect.length - 3} more aspects
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Cancellation Rules */}
                {mangalDoshaData.manglik_cancel_rule && mangalDoshaData.manglik_cancel_rule.length > 0 && (
                  <div className="bg-gradient-to-r from-green-100 to-emerald-50 rounded-xl p-4 border border-green-300 mb-6">
                    <h3 className="text-lg font-bold text-green-800 mb-3 md:text-base flex items-center">
                      <span className="text-2xl mr-2">✅</span>
                      Cancellation Rules
                    </h3>
                    <div className="space-y-2">
                      {mangalDoshaData.manglik_cancel_rule.map((rule, index) => (
                        <div key={index} className="bg-white bg-opacity-50 rounded-lg p-3">
                          <p className="text-sm text-gray-700 md:text-xs">{rule}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

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
              className="bg-gradient-to-r from-red-400 to-orange-400 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-sm"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MangalDosha;