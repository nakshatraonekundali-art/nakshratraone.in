'use client'
import React, { useState, useEffect } from 'react';

const BasicGemSuggestion = () => {
  const [gemData, setGemData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // API configuration
  const API_CONFIG = {
    userId: '643886',
    apiKey: '8cfa24ac82f34fa17f090ed5a6a2122b9f3e10bf',
    baseUrl: 'https://json.astrologyapi.com/v1',
    api: 'basic_gem_suggestion'
  };

  let language = 'hi'; // Set to English
   
  // Birth details
  const birthDetails = {
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

  // Function to fetch Gem suggestion data
  const fetchGemData = async () => {
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
      console.log('Gem Data:', data);
      setGemData(data);
      
    } catch (error) {
      console.error('Error fetching Gem data:', error);
      setError(`Failed to load data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchGemData();
  }, []);

  // Function to handle next button click
  const handleNext = () => {
    console.log('Navigate to next section');
  };

  // Function to handle back button click
  const handleBack = () => {
    console.log('Navigate back');
  };

  // Function to get gem emoji
  const getGemEmoji = (gemName) => {
    const gemEmojis = {
      'Ruby': '💎',
      'Yellow Sapphire': '🟡',
      'Red Coral': '🪸',
      'Pearl': '🤍',
      'Emerald': '💚',
      'Diamond': '💎',
      'Blue Sapphire': '🔵',
      'Hessonite': '🟠',
      'Cat\'s Eye': '👁️'
    };
    return gemEmojis[gemName] || '💎';
  };

  // Function to get gem color class
  const getGemColorClass = (category) => {
    const colorClasses = {
      'LIFE': 'from-red-100 to-red-50 border-red-300',
      'BENEFIC': 'from-yellow-100 to-yellow-50 border-yellow-300',
      'LUCKY': 'from-orange-100 to-orange-50 border-orange-300'
    };
    return colorClasses[category] || 'from-gray-100 to-gray-50 border-gray-300';
  };

  // Function to get category description
  const getCategoryDescription = (category) => {
    const descriptions = {
      'LIFE': 'Your primary life stone for overall strength and vitality',
      'BENEFIC': 'Your beneficial stone for prosperity and wisdom',
      'LUCKY': 'Your lucky stone for courage and success'
    };
    return descriptions[category] || '';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-gray-50 rounded-lg p-8 shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="text-center mt-4 text-gray-600">Loading Your Gem Suggestions...</p>
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
              onClick={fetchGemData} 
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
            {gemData && (
              <>
                {/* Main Title */}
                <div className="text-center mb-6">
                  <h1 className="text-xl font-bold text-gray-800 mb-4 leading-tight md:text-lg">
                    Your Personalized Gemstone Recommendations
                  </h1>
                  <p className="text-sm text-gray-600">
                    Based on your birth details and planetary positions
                  </p>
                </div>

                {/* Guru Image */}
                <div className="text-center mb-6">
                  <div className="w-full max-w-xs mx-auto mb-4">
                    <img 
                      src="https://img.freepik.com/free-vector/flat-illustration-guru-purnima_23-2150428338.jpg"
                      alt="Gemstone Guru"
                      className="w-full h-auto object-contain rounded-lg"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div className="hidden bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg p-8 border-2 border-yellow-200">
                      <div className="text-6xl mb-4">💎</div>
                      <div className="text-sm text-gray-600">Gemstone Guidance</div>
                    </div>
                  </div>
                </div>

                {/* Introduction */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-300 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                    <span className="text-2xl mr-2">✨</span>
                    The Power of Gemstones
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed md:text-xs">
                    Gemstones have been used for centuries to harness planetary energies and enhance 
                    various aspects of life. Each stone resonates with specific cosmic vibrations 
                    that can amplify positive influences in your journey.
                  </p>
                </div>

                {/* Gem Cards */}
                {Object.entries(gemData).map(([category, gem], index) => (
                  <div key={category} className={`bg-gradient-to-r ${getGemColorClass(category)} rounded-xl p-4 border mb-6`}>
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-800 md:text-base flex items-center">
                          <span className="text-2xl mr-2">{getGemEmoji(gem.name)}</span>
                          {gem.name}
                        </h3>
                        <div className="bg-white bg-opacity-70 px-2 py-1 rounded-lg text-xs font-semibold text-gray-700">
                          {category} STONE
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mb-3">
                        {getCategoryDescription(category)}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-white bg-opacity-60 rounded-lg p-3">
                        <div className="text-xs font-semibold text-gray-600 mb-1">Deity</div>
                        <div className="text-sm font-bold text-gray-800">{gem.gem_deity}</div>
                      </div>
                      <div className="bg-white bg-opacity-60 rounded-lg p-3">
                        <div className="text-xs font-semibold text-gray-600 mb-1">Alternative</div>
                        <div className="text-sm font-bold text-gray-800">{gem.semi_gem}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-gray-600">Wear On:</span>
                        <span className="text-sm font-bold text-gray-800">{gem.wear_finger} finger</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-gray-600">Weight:</span>
                        <span className="text-sm font-bold text-gray-800">{gem.weight_caret} carats</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-gray-600">Metal:</span>
                        <span className="text-sm font-bold text-gray-800">{gem.wear_metal}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-gray-600">Best Day:</span>
                        <span className="text-sm font-bold text-gray-800">{gem.wear_day}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Important Notes */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-300 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                    <span className="text-2xl mr-2">⚠️</span>
                    Important Guidelines
                  </h3>
                  
                  <div className="space-y-2 text-sm text-gray-700 md:text-xs">
                    <div className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <span>Consult with a qualified gemstone expert before purchasing</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <span>Ensure gemstones are natural and properly energized</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <span>Follow proper wearing rituals and maintenance</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <span>Start with one stone and observe its effects</span>
                    </div>
                  </div>
                </div>

                {/* Blessing Message */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-300 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 md:text-base flex items-center">
                    <span className="text-2xl mr-2">🙏</span>
                    Divine Blessings
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed md:text-xs">
                    May these sacred gemstones bring positive energy, protection, and prosperity 
                    into your life. Remember, the true power lies in your faith and positive intentions.
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

export default BasicGemSuggestion;