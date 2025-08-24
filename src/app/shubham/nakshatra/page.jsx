'use client'
import React, { useState, useEffect } from 'react';
import { useKundli } from '../context/KundliContext';
import Navigation from '../components/Navigation';

const NakshatraPrediction = () => {
  const [nakshatraData, setNakshatraData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { language, getBirthDetails } = useKundli();

  // API configuration
  const API_CONFIG = {
    userId: '643886',
    apiKey: '8cfa24ac82f34fa17f090ed5a6a2122b9f3e10bf',
    baseUrl: 'https://json.astrologyapi.com/v1',
    api: 'daily_nakshatra_prediction'
  };

  // Get birth details from context
  const birthDetails = getBirthDetails();
  
  // Translations
  const translations = {
    loading: {
      english: "Loading Your Nakshatra Prediction...",
      hindi: "आपकी नक्षत्र भविष्यवाणी लोड हो रही है..."
    },
    error: {
      english: "Error Loading Data",
      hindi: "डेटा लोड करने में त्रुटि"
    },
    retry: {
      english: "Retry",
      hindi: "पुनः प्रयास करें"
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

  // Function to get Basic Auth header
  const getAuthHeader = () => {
    const credentials = `${API_CONFIG.userId}:${API_CONFIG.apiKey}`;
    return `Basic ${btoa(credentials)}`;
  };

  // Function to fetch Nakshatra prediction data
  const fetchNakshatraData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_CONFIG.baseUrl}/${API_CONFIG.api}`, {
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
      console.log('Nakshatra Data:', data);
      setNakshatraData(data);
      
    } catch (error) {
      console.error('Error fetching Nakshatra data:', error);
      setError(`Failed to load data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchNakshatraData();
  }, []);

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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="text-center mt-4 text-gray-600">{language === 'english' ? translations.loading.english : translations.loading.hindi}</p>
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
            <h2 className="text-xl font-bold mb-2">{language === 'english' ? translations.error.english : translations.error.hindi}</h2>
            <p className="text-sm text-gray-600 mb-4">{error}</p>
            <button 
              onClick={fetchNakshatraData} 
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            >
              {language === 'english' ? translations.retry.english : translations.retry.hindi}
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
            {nakshatraData && (
              <>
                {/* Main Title */}
                <div className="text-center mb-6">
                  <h1 className="text-xl font-bold text-gray-800 mb-4 leading-tight md:text-lg">
                    Your birth star is {nakshatraData.birth_moon_nakshatra} Nakshatra and is associated with the deity Vishvadevas
                  </h1>
                </div>

                {/* Deity Image */}
                <div className="text-center mb-6">
                  <div className="w-full max-w-xs mx-auto mb-4">
                    <img 
                      src="https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/kundli_analyser/nak_deity/vishvadevas.png"
                      alt="Vishvadevas - Universal Gods"
                      className="w-full h-auto object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div className="hidden bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg p-8 border-2 border-yellow-200">
                      <div className="text-6xl mb-4">🕉️</div>
                      <div className="text-sm text-gray-600">Vishvadevas</div>
                    </div>
                  </div>
                </div>

                {/* Nakshatra Description */}
                <div className="mb-6">
                  <p className="text-base text-gray-700 leading-relaxed text-center md:text-sm">
                    Hello {nakshatraData.birth_moon_nakshatra} Nakshatra! You were born between 26°40' 
                    Sagittarius to 10°00' Capricorn, and you're ruled by the planet Sun. 
                    Your Nakshatra is associated with Vishvadevas, the universal gods, 
                    and it is symbolized by the tusk of an elephant, which represents 
                    strength, power, and wisdom. You are a natural leader and possess 
                    a strong sense of purpose.
                  </p>
                </div>

                {/* Personality Traits */}
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4 border border-orange-300 mb-6">
                  <p className="text-base text-gray-700 leading-relaxed md:text-sm">
                    As a {nakshatraData.birth_moon_nakshatra}, you have a strong and dynamic 
                    personality. You possess a natural charisma and leadership 
                    abilities that inspire others to follow you. You are ambitious 
                    and goal-oriented, and you have a strong sense of purpose in 
                    life. You are also deeply spiritual and seek to understand the 
                    meaning and purpose of existence. You have a sharp mind 
                    and an analytical approach to problem-solving.
                  </p>
                </div>

                {/* Today's Predictions */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-300 mb-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 md:text-base">
                      Daily Predictions for {nakshatraData.prediction_date}
                    </h3>
                    <div className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-semibold inline-block mb-4">
                      Your Strengths and Guidance
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Health */}
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm mb-2 flex items-center">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        Health & Wellness
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed ml-4 md:text-xs">
                        {nakshatraData.prediction.health}
                      </p>
                    </div>

                    {/* Emotions */}
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm mb-2 flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        Emotional State
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed ml-4 md:text-xs">
                        {nakshatraData.prediction.emotions}
                      </p>
                    </div>

                    {/* Professional Life */}
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm mb-2 flex items-center">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                        Career & Finance
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed ml-4 md:text-xs">
                        {nakshatraData.prediction.profession}
                      </p>
                    </div>

                    {/* Personal Life */}
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm mb-2 flex items-center">
                        <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
                        Relationships & Personal
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed ml-4 md:text-xs">
                        {nakshatraData.prediction.personal_life}
                      </p>
                    </div>

                    {/* Luck & Travel */}
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm mb-2 flex items-center">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                        Fortune & Travel
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed ml-4 md:text-xs">
                        {nakshatraData.prediction.luck} {nakshatraData.prediction.travel}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Bottom padding for scrolling */}
            <div className="h-4"></div>
          </div>

          {/* Navigation - Fixed at bottom */}
          <Navigation 
            currentPage="nakshatra" 
            nextText={language === 'english' ? translations.next.english : translations.next.hindi}
            backText={language === 'english' ? translations.back.english : translations.back.hindi}
            onNext={handleNext}
            onBack={handleBack}
          />
        </div>
      </div>
    </div>
  );
};

export default NakshatraPrediction;