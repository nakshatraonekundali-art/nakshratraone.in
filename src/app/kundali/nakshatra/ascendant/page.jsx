'use client'
import React, { useState, useEffect } from 'react';
import { useKundli } from '../../context/KundliContext';
import Navigation from '../../components/Navigation';

const AscendantReport = () => {
  const [ascendantData, setAscendantData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { language } = useKundli();

  // API configuration
  const API_CONFIG = {
    userId: '643886',
    apiKey: '8cfa24ac82f34fa17f090ed5a6a2122b9f3e10bf',
    baseUrl: 'https://json.astrologyapi.com/v1',
    api: 'general_ascendant_report'
  };
   
  // Birth details
  const birthDetails = {
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
      english: "Loading Your Ascendant Report...",
      hindi: "आपकी लग्न रिपोर्ट लोड हो रही है..."
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
      english: "- The First Impression You Make",
      hindi: "- आपकी पहली छाप"
    },
    risingSignTitle: {
      english: "Your Rising Sign is",
      hindi: "आपका उदय राशि है"
    },
    whatIsAscendant: {
      english: "What is Your Rising Sign?",
      hindi: "आपकी उदय राशि क्या है?"
    },
    ascendantDescription: {
      english: "Your Ascendant (Rising sign) is the zodiac sign that was rising on the eastern horizon at the exact moment of your birth. It represents the mask you wear in public, your first impression on others, and how you approach new situations in life.",
      hindi: "आपकी लग्न (उदय राशि) वह राशि है जो आपके जन्म के समय पूर्वी क्षितिज पर उदित हो रही थी। यह आपके सार्वजनिक व्यक्तित्व, दूसरों पर आपकी पहली छाप, और जीवन में नई परिस्थितियों का सामना करने के आपके तरीके को दर्शाती है।"
    },
    personalityTitle: {
      english: "Rising Personality",
      hindi: "उदय व्यक्तित्व"
    },
    howWorldSeesYou: {
      english: "How The World Sees You",
      hindi: "दुनिया आपको कैसे देखती है"
    },
    keyTraits: {
      english: "Key Rising Traits",
      hindi: "मुख्य उदय विशेषताएं"
    },
    firstImpression: {
      english: "First Impression",
      hindi: "पहली छाप"
    },
    publicPersona: {
      english: "Public Persona",
      hindi: "सार्वजनिक व्यक्तित्व"
    },
    lifeApproach: {
      english: "Life Approach",
      hindi: "जीवन दृष्टिकोण"
    },
    naturalStyle: {
      english: "Natural Style",
      hindi: "प्राकृतिक शैली"
    },
    embraceTitle: {
      english: "Embrace Your Rising",
      hindi: "अपनी लग्न को अपनाएं"
    },
    embraceMessage: {
      english: "Remember, your Rising sign is your cosmic invitation to the world. It's the energy you naturally radiate and the lens through which you experience life. Embrace this aspect of yourself - it's your unique way of making your mark on the world.",
      hindi: "याद रखें, आपकी उदय राशि दुनिया के लिए आपका ब्रह्मांडीय निमंत्रण है। यह वह ऊर्जा है जो आप स्वाभाविक रूप से विकीर्ण करते हैं और वह दृष्टिकोण है जिससे आप जीवन का अनुभव करते हैं। अपने इस पहलू को अपनाएं - यही दुनिया पर अपनी छाप छोड़ने का आपका अनूठा तरीका है।"
    },
    next: {
      english: "Continue to Gems →",
      hindi: "रत्न की ओर जारी रखें →"
    },
    back: {
      english: "← Back to Nakshatra",
      hindi: "← नक्षत्र पर वापस जाएं"
    }
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
      setError('');
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
          <p className="text-center mt-4 text-gray-600">
            {language === 'english' ? translations.loading.english : translations.loading.hindi}
          </p>
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
            <h2 className="text-xl font-bold mb-2">
              {language === 'english' ? translations.error.english : translations.error.hindi}
            </h2>
            <p className="text-sm text-gray-600 mb-4">{error}</p>
            <button 
              onClick={fetchAscendantData} 
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
            {ascendantData && ascendantData.asc_report && (
              <>
                {/* Main Title */}
                <div className="text-center mb-6">
                  <h1 className="text-xl font-bold text-gray-800 mb-4 leading-tight md:text-lg">
                    {language === 'english' ? translations.risingSignTitle.english : translations.risingSignTitle.hindi} {ascendantData.asc_report.ascendant} {language === 'english' ? translations.title.english : translations.title.hindi}
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
                    {language === 'english' ? translations.whatIsAscendant.english : translations.whatIsAscendant.hindi}
                  </h3>
                  <div className="bg-white bg-opacity-70 rounded-lg p-4">
                    <p className="text-base text-gray-700 leading-relaxed md:text-sm">
                      {language === 'english' ? translations.ascendantDescription.english : translations.ascendantDescription.hindi}
                    </p>
                  </div>
                </div>

                {/* Detailed Report */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-300 mb-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 md:text-base flex items-center">
                      <span className="text-2xl mr-2">✨</span>
                      {language === 'english' ? `Your ${ascendantData.asc_report.ascendant} ${translations.personalityTitle.english}` : `आपका ${ascendantData.asc_report.ascendant} ${translations.personalityTitle.hindi}`}
                    </h3>
                    <div className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-semibold inline-block mb-4">
                      {language === 'english' ? translations.howWorldSeesYou.english : translations.howWorldSeesYou.hindi}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white bg-opacity-70 rounded-lg p-4">
                      <p className="text-sm text-gray-700 leading-relaxed md:text-xs">
                        {ascendantData.asc_report.report}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Key Traits */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-300 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                    <span className="text-2xl mr-2">🎭</span>
                    {language === 'english' ? `Key ${ascendantData.asc_report.ascendant} ${translations.keyTraits.english}` : `मुख्य ${ascendantData.asc_report.ascendant} ${translations.keyTraits.hindi}`}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white bg-opacity-60 rounded-lg p-3 text-center">
                      <div className="text-lg mb-1">🌟</div>
                      <div className="text-xs font-semibold text-gray-700">
                        {language === 'english' ? translations.firstImpression.english : translations.firstImpression.hindi}
                      </div>
                    </div>
                    <div className="bg-white bg-opacity-60 rounded-lg p-3 text-center">
                      <div className="text-lg mb-1">🎪</div>
                      <div className="text-xs font-semibold text-gray-700">
                        {language === 'english' ? translations.publicPersona.english : translations.publicPersona.hindi}
                      </div>
                    </div>
                    <div className="bg-white bg-opacity-60 rounded-lg p-3 text-center">
                      <div className="text-lg mb-1">🚀</div>
                      <div className="text-xs font-semibold text-gray-700">
                        {language === 'english' ? translations.lifeApproach.english : translations.lifeApproach.hindi}
                      </div>
                    </div>
                    <div className="bg-white bg-opacity-60 rounded-lg p-3 text-center">
                      <div className="text-lg mb-1">💫</div>
                      <div className="text-xs font-semibold text-gray-700">
                        {language === 'english' ? translations.naturalStyle.english : translations.naturalStyle.hindi}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Inspirational Message */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-300 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 md:text-base flex items-center">
                    <span className="text-2xl mr-2">💎</span>
                    {language === 'english' ? `${translations.embraceTitle.english} ${ascendantData.asc_report.ascendant}` : `अपनी ${ascendantData.asc_report.ascendant} ${translations.embraceTitle.hindi}`}
                  </h3>
                  <div className="bg-white bg-opacity-70 rounded-lg p-4">
                    <p className="text-sm text-gray-700 leading-relaxed md:text-xs">
                      {language === 'english' ? translations.embraceMessage.english : translations.embraceMessage.hindi}
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* Bottom padding for scrolling */}
            <div className="h-4"></div>
          </div>

          {/* Navigation Component - Fixed at bottom */}
          <Navigation 
            currentPage="ascendant"
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

export default AscendantReport;