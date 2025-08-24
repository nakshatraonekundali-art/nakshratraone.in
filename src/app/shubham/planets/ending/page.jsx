'use client'
import React, { useState } from 'react';

const PlanetsEndingScreen = () => {
  const [loading, setLoading] = useState(false);

  // Function to handle next button click
  const handleNext = () => {
    console.log('Navigate to next section or planet analysis');
  };

  // Function to handle back button click
  const handleBack = () => {
    console.log('Navigate back');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-gray-50 rounded-lg p-8 shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="text-center mt-4 text-gray-600">Loading...</p>
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
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-6 leading-tight md:text-xl">
                What is the purpose of your life, and what does your soul desire?
              </h1>
            </div>

            {/* Description Content */}
            <div className="mb-8">
              <p className="text-base text-gray-700 leading-relaxed mb-6 md:text-sm">
                "Atma" means soul, and "karaka" means significator. Atmakaraka is
                the planet that signifies the soul's desires. According to Vedic
                astrology, a soul is reborn because it has desires from previous
                lives that need fulfillment. The purpose of the new life is to provide
                another chance to satisfy those desires.
              </p>
              
              <p className="text-base text-gray-700 leading-relaxed md:text-sm">
                The Atmakaraka planet in your birth chart reveals these desires. It
                indicates whether you will fulfill them easily or face challenges in
                doing so. In my opinion, the Atmakaraka is one of the most crucial
                planets in your astrological chart.
              </p>
            </div>

            {/* Atmakaraka Illustration */}
            <div className="text-center mb-8">
              <div className="w-full max-w-sm mx-auto mb-4">
                <img 
                  src="https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/kundli_analyser/atmakarka.png"
                  alt="Atmakaraka - Soul's Purpose with Planetary Alignment"
                  className="w-full h-auto object-contain rounded-lg"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="hidden bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-8 border-2 border-purple-200">
                  <div className="text-6xl mb-4">🧘‍♂️</div>
                  <div className="text-sm text-gray-600">Atmakaraka Illustration</div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 italic">
                The cosmic connection between your soul and planetary influences
              </p>
            </div>

            {/* Key Insights Section */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 text-center md:text-base">
                Understanding Your Soul's Journey
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="text-white text-xs font-bold">1</div>
                  </div>
                  <p className="text-sm text-gray-700 md:text-xs">
                    Your <span className="font-bold">Atmakaraka planet</span> reveals your soul's deepest desires and life purpose
                  </p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="text-white text-xs font-bold">2</div>
                  </div>
                  <p className="text-sm text-gray-700 md:text-xs">
                    It shows whether you'll achieve your goals <span className="font-bold">easily</span> or face <span className="font-bold">challenges</span>
                  </p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="text-white text-xs font-bold">3</div>
                  </div>
                  <p className="text-sm text-gray-700 md:text-xs">
                    Understanding this helps you align with your <span className="font-bold">spiritual path</span> and <span className="font-bold">karmic lessons</span>
                  </p>
                </div>
              </div>
            </div>

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
              className="bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-sm"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanetsEndingScreen;