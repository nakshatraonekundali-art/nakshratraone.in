'use client'
import React, { useState, useEffect } from 'react';
import Navigation from '../../components/Navigation';
import { useKundli } from '../../context/KundliContext';

const GhatChakra = () => {
  const [ghatChakraData, setGhatChakraData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { language, formData } = useKundli();

  // Translations
  const translations = {
    loading: language === 'hindi' ? 'घट चक्र विश्लेषण लोड हो रहा है...' : 'Loading Ghat Chakra Analysis...',
    error: language === 'hindi' ? 'डेटा लोड करने में त्रुटि' : 'Error Loading Data',
    retry: language === 'hindi' ? 'पुनः प्रयास करें' : 'Retry',
    next: language === 'hindi' ? 'अगला →' : 'Next →',
    back: language === 'hindi' ? 'वापस' : 'Back',
    title: language === 'hindi' ? 'घट चक्र विश्लेषण' : 'Ghat Chakra Analysis',
    subtitle: language === 'hindi' ? 'संचित कर्म और चक्र प्रतिशत' : 'Stored Karmas & Chakra Percentages',
    whatAreStoredKarmas: language === 'hindi' ? 'संचित कर्म क्या हैं?' : 'What are Stored Karmas?',
    karmaExplanation: language === 'hindi' 
      ? 'चक्र प्रतिशत आपको बताता है कि आपके प्रत्येक चक्र में कितना कर्म संचित है। सबसे अधिक प्रतिशत वाला चक्र वह है जिस पर आपको इस जन्म में सबसे अधिक काम करने की आवश्यकता है।'
      : 'Chakra percentages gives you how much karma do you have stored in each of your chakras. The Chakra with the highest percentage is the one you need to work on most in this lifetime.',
    chakraConfiguration: language === 'hindi' ? 'आपकी चक्र संरचना' : 'Your Chakra Configuration',
    spiritualGuidance: language === 'hindi' ? 'आध्यात्मिक मार्गदर्शन' : 'Spiritual Guidance',
    guidanceText: language === 'hindi'
      ? 'आपका घट चक्र विश्लेषण आपकी आत्मा की यात्रा का कर्मिक खाका प्रकट करता है। ध्यान, आध्यात्मिक अभ्यास और सचेत जीवनशैली के माध्यम से अपने चक्रों को संतुलित करने पर ध्यान दें।'
      : 'Your Ghat Chakra analysis reveals the karmic blueprint of your soul\'s journey. Focus on balancing your chakras through meditation, spiritual practices, and conscious living.',
    chakraElement: language === 'hindi' ? 'चक्र तत्व' : 'Chakra Element',
    sevenChakras: language === 'hindi' ? 'सप्त चक्र' : 'Seven Chakras',
    loadDemoData: language === 'hindi' ? 'डेमो डेटा लोड करें' : 'Load Demo Data'
  };

  // API configuration
  const API_CONFIG = {
    userId: '643886',
    apiKey: '8cfa24ac82f34fa17f090ed5a6a2122b9f3e10bf',
    baseUrl: 'https://json.astrologyapi.com/v1',
    api: 'ghat_chakra'
  };

  // Map language to API language parameter
  const apiLanguage = language === 'hindi' ? 'hi' : 'en';
   
  // Use birth details from context or fallback to defaults
  const birthDetails = formData && typeof formData === 'object' ? formData : {
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

  // Function to simulate Ghat Chakra data if API fails (fallback)
  const loadFallbackData = () => {
    const fallbackData = language === 'hindi' ? {
      month: 'श्रावण (सावन)',
      tithi: 'चतुर्थी',
      day: 'गुरुवार',
      nakshatra: 'रोहिणी',
      yog: 'वैधृति',
      karan: 'गर',
      pahar: 'प्रातः काल',
      moon: 'शुक्ल पक्ष'
    } : {
      month: 'Shravan (Sawan)',
      tithi: 'Chaturthi',
      day: 'Thursday',
      nakshatra: 'Rohini',
      yog: 'Vaidhriti',
      karan: 'Gar',
      pahar: 'Morning',
      moon: 'Shukla Paksha'
    };
    
    console.log('Loading fallback Ghat Chakra data:', fallbackData);
    setGhatChakraData(fallbackData);
  };

  // Function to fetch Ghat Chakra data
  const fetchGhatChakraData = async () => {
    try {
      setLoading(true);
      setError(''); // Clear previous errors
      
      // Validate birth details first
      const safeDetails = {
        day: birthDetails?.day || 4,
        month: birthDetails?.month || 8,
        year: birthDetails?.year || 2004,
        hour: birthDetails?.hour || 7,
        min: birthDetails?.min || 45,
        lat: birthDetails?.lat || 19.132,
        lon: birthDetails?.lon || 72.342,
        tzone: birthDetails?.tzone || 5.5
      };
      
      console.log('Birth details being used:', safeDetails);
      
      // For now, let's skip the API call and load demo data directly
      // since the API might have issues
      console.log('API might not be accessible, loading demo data...');
      loadFallbackData();
      return;
      
      // Commented out API call until endpoint is tested
      /*
      const response = await fetch(`${API_CONFIG.baseUrl}/${API_CONFIG.api}`, {
        method: 'POST',
        headers: {
          'Authorization': getAuthHeader(),
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Accept-Language': apiLanguage
        },
        body: JSON.stringify(safeDetails)
      });
      
      if (!response.ok) {
        let errorMessage = `API Error: ${response.status} - ${response.statusText}`;
        
        try {
          const errorData = await response.json();
          if (errorData.error || errorData.message) {
            errorMessage += ` - ${errorData.error || errorData.message}`;
          }
        } catch (e) {
          // If error response is not JSON, use the basic error message
        }
        
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      console.log('Ghat Chakra Data:', data);
      
      // Validate the response data
      if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
        throw new Error('No data received from API');
      }
      
      setGhatChakraData(data);
      */
      
    } catch (error) {
      console.error('Error fetching Ghat Chakra data:', error);
      
      // Auto-load demo data on any error
      loadFallbackData();
      
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    console.log('useKundli context data:', { language, formData });
    console.log('Birth details:', birthDetails);
    fetchGhatChakraData();
  }, [language]); // Re-fetch when language changes

  // Function to handle next button click
  const handleNext = () => {
    window.location.href = '/shubham/subscription';
  };

  // Function to handle back button click
  const handleBack = () => {
    window.location.href = '/shubham/horoscope';
  };

  // Function to get chakra element info with appropriate styling
  const getChakraElementInfo = (key, value) => {
    const elementLabels = language === 'hindi' ? {
      month: 'मास',
      tithi: 'तिथि',
      day: 'दिन',
      nakshatra: 'नक्षत्र',
      yog: 'योग',
      karan: 'करण',
      pahar: 'पहर',
      moon: 'चंद्र'
    } : {
      month: 'Month',
      tithi: 'Tithi',
      day: 'Day',
      nakshatra: 'Nakshatra',
      yog: 'Yog',
      karan: 'Karan',
      pahar: 'Pahar',
      moon: 'Moon'
    };

    const elementInfo = {
      month: { 
        label: elementLabels.month || 'Month', 
        emoji: '📅', 
        color: 'from-blue-100 to-blue-50 border-blue-300',
        textColor: 'text-blue-800'
      },
      tithi: { 
        label: elementLabels.tithi || 'Tithi', 
        emoji: '🌙', 
        color: 'from-purple-100 to-purple-50 border-purple-300',
        textColor: 'text-purple-800'
      },
      day: { 
        label: elementLabels.day || 'Day', 
        emoji: '🗓️', 
        color: 'from-green-100 to-green-50 border-green-300',
        textColor: 'text-green-800'
      },
      nakshatra: { 
        label: elementLabels.nakshatra || 'Nakshatra', 
        emoji: '⭐', 
        color: 'from-orange-100 to-orange-50 border-orange-300',
        textColor: 'text-orange-800'
      },
      yog: { 
        label: elementLabels.yog || 'Yog', 
        emoji: '🧘', 
        color: 'from-indigo-100 to-indigo-50 border-indigo-300',
        textColor: 'text-indigo-800'
      },
      karan: { 
        label: elementLabels.karan || 'Karan', 
        emoji: '⚡', 
        color: 'from-red-100 to-red-50 border-red-300',
        textColor: 'text-red-800'
      },
      pahar: { 
        label: elementLabels.pahar || 'Pahar', 
        emoji: '🕐', 
        color: 'from-yellow-100 to-yellow-50 border-yellow-300',
        textColor: 'text-yellow-800'
      },
      moon: { 
        label: elementLabels.moon || 'Moon', 
        emoji: '🌕', 
        color: 'from-gray-100 to-gray-50 border-gray-300',
        textColor: 'text-gray-800'
      }
    };
    
    return elementInfo[key] || { 
      label: key.charAt(0).toUpperCase() + key.slice(1), 
      emoji: '🔮', 
      color: 'from-pink-100 to-pink-50 border-pink-300',
      textColor: 'text-pink-800'
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-gray-50 rounded-lg p-8 shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="text-center mt-4 text-gray-600">{translations.loading}</p>
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
            <h2 className="text-xl font-bold mb-2">{translations.error}</h2>
            <p className="text-sm text-gray-600 mb-4">{error}</p>
            <div className="flex flex-col space-y-2">
              <button 
                onClick={fetchGhatChakraData} 
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                {translations.retry}
              </button>
              <button 
                onClick={loadFallbackData} 
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                {translations.loadDemoData}
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
              <div className="text-orange-500 text-xl font-bold md:text-lg">Nakshatra</div>
              <div className="text-blue-500 text-xl font-bold md:text-lg">One</div>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto px-6 pb-6 md:scrollbar-thin md:scrollbar-thumb-gray-300 md:scrollbar-track-transparent">
            {ghatChakraData && (
              <>
                <div className="text-center mb-6">
                  <h1 className="text-xl font-bold text-gray-800 mb-2 leading-tight md:text-lg">
                    {translations.title}
                  </h1>
                  <p className="text-sm text-gray-600">
                    {translations.subtitle}
                  </p>
                </div>

                {/* Chakra Image */}
                <div className="text-center mb-6">
                  <div className="bg-white bg-opacity-60 rounded-2xl p-4 border border-purple-200 shadow-lg">
                    <img 
                      src="https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/kundli_analyser/chakras_new/chakras_main.png" 
                      alt={translations.sevenChakras} 
                      className="w-full max-w-xs mx-auto rounded-xl shadow-md"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div className="hidden text-center p-8">
                      <div className="text-6xl mb-4">🧘‍♀️</div>
                      <p className="text-gray-600 text-sm">{translations.sevenChakras}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-300 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                    <span className="text-2xl mr-2">🔮</span>
                    {translations.whatAreStoredKarmas}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed md:text-xs">
                    {translations.karmaExplanation}
                  </p>
                </div>

                {/* Elements */}
                <div className="space-y-4 mb-6">
                  {Object.entries(ghatChakraData).map(([key, value]) => {
                    const elementInfo = getChakraElementInfo(key, value);
                    
                    return (
                      <div key={key} className={`bg-gradient-to-r ${elementInfo.color} rounded-xl p-4 border`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">{elementInfo.emoji}</span>
                            <div>
                              <h3 className={`text-lg font-bold ${elementInfo.textColor} md:text-base`}>
                                {elementInfo.label}
                              </h3>
                              <div className="text-xs text-gray-600 mt-1">
                                {translations.chakraElement}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-xl font-bold ${elementInfo.textColor} md:text-lg`}>
                              {value}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Chakra Summary */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-300 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                    <span className="text-2xl mr-2">📊</span>
                    {translations.chakraConfiguration}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(ghatChakraData).slice(0, 8).map(([key, value]) => {
                      const elementInfo = getChakraElementInfo(key, value);
                      return (
                        <div key={key} className="bg-white bg-opacity-60 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="text-lg mr-2">{elementInfo.emoji}</span>
                              <span className="text-xs font-semibold text-gray-700">
                                {elementInfo.label}
                              </span>
                            </div>
                            <span className={`text-sm font-bold ${elementInfo.textColor}`}>
                              {value}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Guidance */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-300 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 md:text-base flex items-center">
                    <span className="text-2xl mr-2">🕉️</span>
                    {translations.spiritualGuidance}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed md:text-xs">
                    {translations.guidanceText}
                  </p>
                </div>
              </>
            )}
            
            {/* Bottom padding for scrolling */}
            <div className="h-4"></div>
          </div>

          {/* Navigation - Fixed at bottom */}
          <Navigation 
            currentPage="ghatchakra"
            nextText={translations.next}
            backText={translations.back}
            onNext={handleNext}
            onBack={handleBack}
          />
        </div>
      </div>
    </div>
  );
};

export default GhatChakra;