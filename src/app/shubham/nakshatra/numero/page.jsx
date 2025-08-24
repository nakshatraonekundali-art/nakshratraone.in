'use client'
import React, { useState, useEffect } from 'react';

const NumeroDetails = () => {
  const [numeroData, setNumeroData] = useState(null);
  const [numeroReport, setNumeroReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // API configuration
  const API_CONFIG = {
    userId: '643886',
    apiKey: '8cfa24ac82f34fa17f090ed5a6a2122b9f3e10bf',
    baseUrl: 'https://json.astrologyapi.com/v1'
  };

  let language = 'eng'; // Set to English
   
  // Birth details
  const birthDetails = {
    name: "shubham",
    day: 6,
    month: 8,
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

  // Function to fetch both numerology APIs
  const fetchNumeroData = async () => {
    try {
      setLoading(true);
      
      // Fetch numero_table data
      const tableResponse = await fetch(`${API_CONFIG.baseUrl}/numero_table`, {
        method: 'POST',
        headers: {
          'Authorization': getAuthHeader(),
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Accept-Language': language
        },
        body: JSON.stringify(birthDetails)
      });
      
      if (!tableResponse.ok) {
        throw new Error(`API Error: ${tableResponse.status} - ${tableResponse.statusText}`);
      }
      
      const tableData = await tableResponse.json();
      setNumeroData(tableData);
      
      // Fetch numero_report data
      const reportResponse = await fetch(`${API_CONFIG.baseUrl}/numero_report`, {
        method: 'POST',
        headers: {
          'Authorization': getAuthHeader(),
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Accept-Language': language
        },
        body: JSON.stringify(birthDetails)
      });
      
      if (!reportResponse.ok) {
        throw new Error(`Report API Error: ${reportResponse.status} - ${reportResponse.statusText}`);
      }
      
      const reportData = await reportResponse.json();
      setNumeroReport(reportData);
      
      console.log('Numero Table Data:', tableData);
      console.log('Numero Report Data:', reportData);
      
    } catch (error) {
      console.error('Error fetching Numero data:', error);
      setError(`Failed to load data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchNumeroData();
  }, []);

  // Function to handle next button click
  const handleNext = () => {
    console.log('Navigate to next section');
  };

  // Function to handle back button click
  const handleBack = () => {
    console.log('Navigate back');
  };

  // Function to get number color class
  const getNumberColorClass = (type) => {
    const colorClasses = {
      'destiny': 'from-purple-100 to-purple-50 border-purple-300',
      'radical': 'from-blue-100 to-blue-50 border-blue-300',
      'name': 'from-green-100 to-green-50 border-green-300'
    };
    return colorClasses[type] || 'from-gray-100 to-gray-50 border-gray-300';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-gray-50 rounded-lg p-8 shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="text-center mt-4 text-gray-600">Loading Your Numerology Report...</p>
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
              onClick={fetchNumeroData} 
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
            {numeroData && (
              <>
                {/* Main Title */}
                <div className="text-center mb-6">
                  <h1 className="text-xl font-bold text-gray-800 mb-2 leading-tight md:text-lg">
                    Numerology Report for {numeroData.name}
                  </h1>
                  <p className="text-sm text-gray-600">
                    Born on {numeroData.date}
                  </p>
                </div>

                {/* Lord Vishnu Image */}
                <div className="text-center mb-6">
                  <div className="w-full max-w-xs mx-auto mb-4">
                    <img 
                      src="https://img.freepik.com/premium-vector/vishnu-indian-lord-hinduism-hari-god-ancient-india-hindu-deity-sitting-lotus-flower-holding-attributes-traditional-holy-divinity-flat-vector-illustration-isolated-white-background_198278-17566.jpg"
                      alt="Lord Vishnu - Divine Numbers"
                      className="w-full h-auto object-contain rounded-lg"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div className="hidden bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg p-8 border-2 border-yellow-200">
                      <div className="text-6xl mb-4">🔢</div>
                      <div className="text-sm text-gray-600">Divine Numbers</div>
                    </div>
                  </div>
                </div>

                {/* Core Numbers */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 md:text-base flex items-center">
                    <span className="text-2xl mr-2">🔮</span>
                    Your Core Numbers
                  </h3>
                  
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg p-3 border border-purple-300 text-center">
                      <div className="text-2xl font-bold text-purple-700 mb-1">{numeroData.destiny_number}</div>
                      <div className="text-xs font-semibold text-gray-600">Destiny</div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg p-3 border border-blue-300 text-center">
                      <div className="text-2xl font-bold text-blue-700 mb-1">{numeroData.radical_number}</div>
                      <div className="text-xs font-semibold text-gray-600">Radical</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-lg p-3 border border-green-300 text-center">
                      <div className="text-2xl font-bold text-green-700 mb-1">{numeroData.name_number}</div>
                      <div className="text-xs font-semibold text-gray-600">Name</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-3 border border-orange-300 text-center">
                    <div className="text-sm font-semibold text-gray-600 mb-1">Ruling Planet</div>
                    <div className="text-lg font-bold text-orange-700">{numeroData.radical_ruler}</div>
                  </div>
                </div>

                {/* Detailed Report */}
                {numeroReport && (
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-300 mb-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                      <span className="text-2xl mr-2">📖</span>
                      {numeroReport.title}
                    </h3>
                    <div className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-semibold inline-block mb-4">
                      Radical Number {numeroData.radical_number} Analysis
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed md:text-xs">
                      {numeroReport.description}
                    </p>
                  </div>
                )}

                {/* Favorable Elements */}
                <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-4 border border-pink-300 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                    <span className="text-2xl mr-2">🌟</span>
                    Your Favorable Elements
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-pink-200">
                      <span className="text-sm font-semibold text-gray-600">Lucky Days:</span>
                      <span className="text-sm font-bold text-gray-800">{numeroData.fav_day}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-pink-200">
                      <span className="text-sm font-semibold text-gray-600">Lucky Color:</span>
                      <span className="text-sm font-bold text-gray-800">{numeroData.fav_color}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-pink-200">
                      <span className="text-sm font-semibold text-gray-600">Lucky Metal:</span>
                      <span className="text-sm font-bold text-gray-800">{numeroData.fav_metal}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-pink-200">
                      <span className="text-sm font-semibold text-gray-600">Lucky Stones:</span>
                      <span className="text-sm font-bold text-gray-800">{numeroData.fav_stone}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-pink-200">
                      <span className="text-sm font-semibold text-gray-600">Alternative Stones:</span>
                      <span className="text-sm font-bold text-gray-800">{numeroData.fav_substone}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm font-semibold text-gray-600">Favored Deity:</span>
                      <span className="text-sm font-bold text-gray-800">{numeroData.fav_god}</span>
                    </div>
                  </div>
                </div>

                {/* Numbers Compatibility */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-300 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                    <span className="text-2xl mr-2">🤝</span>
                    Number Relationships
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <div className="bg-green-100 rounded-lg p-3">
                      <div className="text-sm font-semibold text-green-800 mb-1">Friendly Numbers</div>
                      <div className="text-lg font-bold text-green-700">{numeroData.friendly_num}</div>
                    </div>
                    <div className="bg-yellow-100 rounded-lg p-3">
                      <div className="text-sm font-semibold text-yellow-800 mb-1">Neutral Numbers</div>
                      <div className="text-lg font-bold text-yellow-700">{numeroData.neutral_num}</div>
                    </div>
                    <div className="bg-red-100 rounded-lg p-3">
                      <div className="text-sm font-semibold text-red-800 mb-1">Challenging Numbers</div>
                      <div className="text-lg font-bold text-red-700">{numeroData.evil_num}</div>
                    </div>
                  </div>
                </div>

                {/* Sacred Mantra */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-300 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                    <span className="text-2xl mr-2">🕉️</span>
                    Your Sacred Mantra
                  </h3>
                  <div className="bg-orange-100 rounded-lg p-4 text-center">
                    <p className="text-lg font-bold text-orange-800 mb-2">{numeroData.fav_mantra}</p>
                    <p className="text-sm text-gray-600">
                      Chant this mantra daily for enhanced positive vibrations
                    </p>
                  </div>
                </div>

                {/* Guidance Message */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-300 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 md:text-base flex items-center">
                    <span className="text-2xl mr-2">🙏</span>
                    Divine Guidance
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed md:text-xs">
                    Numbers carry the divine vibrations of the universe. Embrace your numerological 
                    blueprint and align with these cosmic energies for a harmonious and prosperous life. 
                    Remember, your destiny is written in numbers, but your choices shape your journey.
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

export default NumeroDetails;