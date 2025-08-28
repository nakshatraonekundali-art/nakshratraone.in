'use client'
import React, { useState, useEffect } from 'react';
import { useKundli } from '../context/KundliContext';
import Navigation from '../components/Navigation';

const NakshatraPrediction = () => {
  const [nakshatraData, setNakshatraData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { language } = useKundli();

  // API configuration
  const API_CONFIG = {
    userId: '643886',
    apiKey: '8cfa24ac82f34fa17f090ed5a6a2122b9f3e10bf',
    baseUrl: 'https://json.astrologyapi.com/v1',
    api: 'daily_nakshatra_prediction',
    // Helper method to generate auth header
    getAuthHeader: function() {
      const credentials = `${this.userId}:${this.apiKey}`;
      return `Basic ${btoa(credentials)}`;
    },
    // Helper method to get language header value
    getLanguageHeader: function(lang) {
      return lang === 'hindi' ? 'hi' : 'en';
    }
  };

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
    title: {
      english: "Nakshatra Prediction",
      hindi: "नक्षत्र भविष्यवाणी"
    },
    birthStar: {
      english: "Your Birth Star",
      hindi: "आपका जन्म नक्षत्र"
    },
    personality: {
      english: "Personality Traits",
      hindi: "व्यक्तित्व के लक्षण"
    },
    dailyPredictions: {
      english: "Daily Predictions",
      hindi: "दैनिक भविष्यवाणी"
    },
    strengths: {
      english: "Your Strengths and Guidance",
      hindi: "आपकी शक्तियाँ और मार्गदर्शन"
    },
    health: {
      english: "Health & Wellness",
      hindi: "स्वास्थ्य और कल्याण"
    },
    emotions: {
      english: "Emotional State",
      hindi: "भावनात्मक अवस्था"
    },
    career: {
      english: "Career & Finance",
      hindi: "करियर और वित्त"
    },
    relationships: {
      english: "Relationships & Personal",
      hindi: "रिश्ते और व्यक्तिगत"
    },
    fortune: {
      english: "Fortune & Travel",
      hindi: "भाग्य और यात्रा"
    },
    next: {
      english: "Continue to Ascendant →",
      hindi: "लग्न की ओर जारी रखें →"
    },
    back: {
      english: "← Back to Rashi",
      hindi: "← राशि पर वापस जाएं"
    },
    // Additional translations for context words
    nakshatra: {
      english: "Nakshatra",
      hindi: "नक्षत्र"
    },
    universalGods: {
      english: "Universal Gods",
      hindi: "विश्वदेव"
    },
    vishvadevas: {
      english: "Vishvadevas",
      hindi: "विश्वदेव"
    },
    bornBetween: {
      english: "You were born between",
      hindi: "आपका जन्म इनके बीच हुआ है"
    },
    ruledByPlanet: {
      english: "and you're ruled by the planet",
      hindi: "और आप इस ग्रह द्वारा शासित हैं"
    },
    associatedWith: {
      english: "Your Nakshatra is associated with",
      hindi: "आपका नक्षत्र इनसे जुड़ा है"
    },
    symbolizedBy: {
      english: "and it is symbolized by the tusk of an elephant, which represents strength, power, and wisdom. You are a natural leader and possess a strong sense of purpose.",
      hindi: "और यह हाथी के दांत से प्रतीकित होता है, जो शक्ति, सामर्थ्य और बुद्धिमता का प्रतिनिधित्व करता है। आप एक प्राकृतिक नेता हैं और आपके पास एक मजबूत उद्देश्य की भावना है।"
    },
    helloNakshatra: {
      english: "Hello",
      hindi: "नमस्कार"
    },
    personalityDescription: {
      english: "As a",
      hindi: "एक"
    },
    personalityDescription2: {
      english: ", you have a strong and dynamic personality. You possess a natural charisma and leadership abilities that inspire others to follow you. You are ambitious and goal-oriented, and you have a strong sense of purpose in life. You are also deeply spiritual and seek to understand the meaning and purpose of existence. You have a sharp mind and an analytical approach to problem-solving.",
      hindi: " के रूप में, आपके पास एक मजबूत और गतिशील व्यक्तित्व है। आपके पास प्राकृतिक करिश्मा और नेतृत्व क्षमताएं हैं जो दूसरों को आपका अनुसरण करने के लिए प्रेरित करती हैं। आप महत्वाकांक्षी और लक्ष्य-उन्मुख हैं, और जीवन में आपका एक मजबूत उद्देश्य है। आप गहराई से आध्यात्मिक भी हैं और अस्तित्व के अर्थ और उद्देश्य को समझने की कोशिश करते हैं। आपके पास तेज दिमाग और समस्या-समाधान के लिए एक विश्लेषणात्मक दृष्टिकोण है।"
    }
  };

  // Using API_CONFIG.getAuthHeader() instead of standalone function

  // Function to load fallback data if API fails
  const loadFallbackData = () => {
    const fallbackData = {
      birth_moon_nakshatra: language === 'english' ? 'Uttara Bhadrapada' : 'उत्तर भाद्रपद',
      prediction_date: new Date().toLocaleDateString(),
      prediction: {
        health: language === 'english' 
          ? "Take care of your health today. Focus on hydration and rest." 
          : "आज अपने स्वास्थ्य का ध्यान रखें। हाइड्रेशन और आराम पर ध्यान दें।",
        emotions: language === 'english'
          ? "Your emotional balance is strong today. Practice gratitude."
          : "आज आपका भावनात्मक संतुलन मजबूत है। कृतज्ञता का अभ्यास करें।",
        profession: language === 'english'
          ? "Good day for career advancement. Take initiative in meetings."
          : "करियर में आगे बढ़ने के लिए अच्छा दिन है। बैठकों में पहल करें।",
        personal_life: language === 'english'
          ? "Spend quality time with family. Resolve any pending issues."
          : "परिवार के साथ गुणवत्तापूर्ण समय बिताएं। किसी भी लंबित मुद्दे को हल करें।",
        luck: language === 'english'
          ? "Lucky colors are yellow and orange today."
          : "आज के भाग्यशाली रंग पीला और नारंगी हैं।",
        travel: language === 'english'
          ? "Short trips will be beneficial."
          : "छोटी यात्राएं फायदेमंद होंगी।"
      }
    };
    
    console.log('Loading fallback Nakshatra data:', fallbackData);
    setNakshatraData(fallbackData);
  };

  // Function to fetch Nakshatra prediction data
  const fetchNakshatraData = async () => {
    try {
      setLoading(true);
      setError(''); // Clear previous errors
      
      // Validate birth details first and ensure they are numbers
      const safeDetails = {
        name: birthDetails?.name || "Shubham",
        day: parseInt(birthDetails?.day) || 4,
        month: parseInt(birthDetails?.month) || 8,
        year: parseInt(birthDetails?.year) || 2010,
        hour: parseInt(birthDetails?.hour) || 7,
        min: parseInt(birthDetails?.min) || 45,
        lat: parseFloat(birthDetails?.lat) || 19.132,
        lon: parseFloat(birthDetails?.lon) || 72.342,
        tzone: parseFloat(birthDetails?.tzone) || 5.5
      };
      
      console.log('Birth details being used:', safeDetails);
      console.log('API Language:', API_CONFIG.getLanguageHeader(language));
      
      const response = await fetch(`${API_CONFIG.baseUrl}/${API_CONFIG.api}`, {
        method: 'POST',
        headers: {
          'Authorization': API_CONFIG.getAuthHeader(),
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Accept-Language': API_CONFIG.getLanguageHeader(language)
        },
        body: JSON.stringify(safeDetails)
      });
      
      console.log('API Response status:', response.status);
      
      if (!response.ok) {
        let errorMessage = `API Error: ${response.status} - ${response.statusText}`;
        
        try {
          const errorData = await response.json();
          if (errorData.error || errorData.message) {
            errorMessage += ` - ${JSON.stringify(errorData)}`;
          }
        } catch (e) {
          console.log('Error response is not JSON:', e);
        }
        
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      console.log('Nakshatra Data received from API:', data);
      
      // Validate the response data
      if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
        throw new Error('No data received from API');
      }
      
      // Check if we have the expected structure
      if (!data.birth_moon_nakshatra || !data.prediction) {
        console.warn('Unexpected API response structure:', data);
        throw new Error('Invalid API response structure');
      }
      
      setNakshatraData(data);
      console.log('Nakshatra data set successfully:', data);
      
    } catch (error) {
      console.error('Error fetching Nakshatra data:', error);
      setError(error.message);
      
      // Load fallback data on any error
      console.log('Loading fallback data due to error:', error.message);
      loadFallbackData();
      
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount and when language changes
  useEffect(() => {
    console.log('useKundli context data:', { language });
    console.log('Birth details:', birthDetails);
    fetchNakshatraData();
  }, [language]); // Re-fetch when language changes

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-gray-50 rounded-lg p-8 shadow-xl max-w-md w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <h2 className="text-center mt-4 text-gray-800 font-medium">
            {language === 'english' ? translations.loading.english : translations.loading.hindi}
          </h2>
          <p className="text-center mt-2 text-sm text-gray-600">
            {language === 'english' ? 'Analyzing your birth star...' : 'आपके जन्म नक्षत्र का विश्लेषण किया जा रहा है...'}
          </p>
        </div>
      </div>
    );
  }

  if (error && !nakshatraData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="bg-gray-50 rounded-lg p-8 shadow-xl max-w-md w-full">
          <div className="text-red-600 text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold mb-2">
              {language === 'english' ? translations.error.english : translations.error.hindi}
            </h2>
            <p className="text-sm text-gray-600 mb-4">{error}</p>
            <div className="flex flex-col space-y-2">
              <button 
                onClick={fetchNakshatraData} 
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                {language === 'english' ? translations.retry.english : translations.retry.hindi}
              </button>
              <button 
                onClick={loadFallbackData} 
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                {language === 'english' ? 'Load Demo Data' : 'डेमो डेटा लोड करें'}
              </button>
            </div>
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
              <div className="text-orange-500 text-xl font-bold md:text-lg">
                {language === 'english' ? 'Nakshatra' : 'नक्षत्र'}
              </div>
              <div className="text-blue-500 text-xl font-bold md:text-lg">One</div>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto px-6 pb-6 md:scrollbar-thin md:scrollbar-thumb-gray-300 md:scrollbar-track-transparent">
            {/* Main Title */}
            <div className="text-center mb-6">
              <h1 className="text-xl font-bold text-gray-800 mb-2 leading-tight md:text-lg">
                {language === 'english' ? translations.title.english : translations.title.hindi}
              </h1>
            </div>

            {nakshatraData && (
              <>
                {/* Birth Star Information */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-300 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 text-center md:text-base flex items-center justify-center">
                    <span className="text-2xl mr-2">⭐</span>
                    {language === 'english' ? translations.birthStar.english : translations.birthStar.hindi}
                  </h3>
                  <div className="bg-white bg-opacity-70 rounded-lg p-4 text-center">
                    <h2 className="text-xl font-bold text-gray-800 mb-2 md:text-lg">
                      {nakshatraData.birth_moon_nakshatra} {language === 'english' ? translations.nakshatra.english : translations.nakshatra.hindi}
                    </h2>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {language === 'english' 
                        ? `Your birth star is ${nakshatraData.birth_moon_nakshatra} Nakshatra and is associated with the deity Vishvadevas`
                        : `आपका जन्म नक्षत्र ${nakshatraData.birth_moon_nakshatra} नक्षत्र है और यह देवता विश्वदेव से जुड़ा हुआ है`
                      }
                    </p>
                  </div>
                </div>

                {/* Deity Image */}
                <div className="text-center mb-6">
                  <div className="w-full max-w-xs mx-auto mb-4">
                    <img 
                      src="https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/kundli_analyser/nak_deity/vishvadevas.png"
                      alt={language === 'english' ? "Vishvadevas - Universal Gods" : "विश्वदेव - सार्वभौमिक देवता"}
                      className="w-full h-auto object-contain rounded-lg shadow-lg"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div className="hidden bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg p-8 border-2 border-yellow-200">
                      <div className="text-6xl mb-4">🕉️</div>
                      <div className="text-sm text-gray-600">
                        {language === 'english' ? translations.vishvadevas.english : translations.vishvadevas.hindi}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Nakshatra Description */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-300 mb-6">
                  <div className="bg-white bg-opacity-70 rounded-lg p-4">
                    <p className="text-base text-gray-700 leading-relaxed text-center md:text-sm">
                      {language === 'english' 
                        ? `Hello ${nakshatraData.birth_moon_nakshatra} Nakshatra! You were born between 26°40' Sagittarius to 10°00' Capricorn, and you're ruled by the planet Sun. Your Nakshatra is associated with Vishvadevas, the universal gods, and it is symbolized by the tusk of an elephant, which represents strength, power, and wisdom. You are a natural leader and possess a strong sense of purpose.`
                        : `${translations.helloNakshatra.hindi} ${nakshatraData.birth_moon_nakshatra} ${translations.nakshatra.hindi}! ${translations.bornBetween.hindi} 26°40' धनु से 10°00' मकर, ${translations.ruledByPlanet.hindi} सूर्य। ${translations.associatedWith.hindi} ${translations.vishvadevas.hindi}, ${translations.universalGods.hindi}, ${translations.symbolizedBy.hindi}`
                      }
                    </p>
                  </div>
                </div>

                {/* Personality Traits */}
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4 border border-orange-300 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                    <span className="text-2xl mr-2">🌟</span>
                    {language === 'english' ? translations.personality.english : translations.personality.hindi}
                  </h3>
                  <div className="bg-white bg-opacity-70 rounded-lg p-4">
                    <p className="text-base text-gray-700 leading-relaxed md:text-sm">
                      {language === 'english' 
                        ? `As a ${nakshatraData.birth_moon_nakshatra}, you have a strong and dynamic personality. You possess a natural charisma and leadership abilities that inspire others to follow you. You are ambitious and goal-oriented, and you have a strong sense of purpose in life. You are also deeply spiritual and seek to understand the meaning and purpose of existence. You have a sharp mind and an analytical approach to problem-solving.`
                        : `${translations.personalityDescription.hindi} ${nakshatraData.birth_moon_nakshatra}${translations.personalityDescription2.hindi}`
                      }
                    </p>
                  </div>
                </div>

                {/* Today's Predictions */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-300 mb-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                      <span className="text-2xl mr-2">🔮</span>
                      {language === 'english' ? translations.dailyPredictions.english : translations.dailyPredictions.hindi}
                    </h3>
                    <div className="text-center mb-4">
                      <div className="text-sm font-semibold text-gray-600 mb-2">
                        {nakshatraData.prediction_date}
                      </div>
                      <div className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-semibold inline-block">
                        {language === 'english' ? translations.strengths.english : translations.strengths.hindi}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Health */}
                    <div className="bg-white bg-opacity-70 rounded-lg p-3">
                      <h4 className="font-bold text-gray-800 text-sm mb-2 flex items-center">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        {language === 'english' ? translations.health.english : translations.health.hindi}
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed ml-4 md:text-xs">
                        {nakshatraData.prediction.health}
                      </p>
                    </div>

                    {/* Emotions */}
                    <div className="bg-white bg-opacity-70 rounded-lg p-3">
                      <h4 className="font-bold text-gray-800 text-sm mb-2 flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        {language === 'english' ? translations.emotions.english : translations.emotions.hindi}
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed ml-4 md:text-xs">
                        {nakshatraData.prediction.emotions}
                      </p>
                    </div>

                    {/* Professional Life */}
                    <div className="bg-white bg-opacity-70 rounded-lg p-3">
                      <h4 className="font-bold text-gray-800 text-sm mb-2 flex items-center">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                        {language === 'english' ? translations.career.english : translations.career.hindi}
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed ml-4 md:text-xs">
                        {nakshatraData.prediction.profession}
                      </p>
                    </div>

                    {/* Personal Life */}
                    <div className="bg-white bg-opacity-70 rounded-lg p-3">
                      <h4 className="font-bold text-gray-800 text-sm mb-2 flex items-center">
                        <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
                        {language === 'english' ? translations.relationships.english : translations.relationships.hindi}
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed ml-4 md:text-xs">
                        {nakshatraData.prediction.personal_life}
                      </p>
                    </div>

                    {/* Luck & Travel */}
                    <div className="bg-white bg-opacity-70 rounded-lg p-3">
                      <h4 className="font-bold text-gray-800 text-sm mb-2 flex items-center">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                        {language === 'english' ? translations.fortune.english : translations.fortune.hindi}
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

          {/* Navigation Component - Fixed at bottom */}
          <Navigation 
            currentPage="nakshatra"
            nextText={language === 'english' ? translations.next.english : translations.next.hindi}
            backText={language === 'english' ? translations.back.english : translations.back.hindi}
            showNext={true}
            showBack={true}
          />
        </div>
      </div>
    </div>
  );
};

export default NakshatraPrediction;