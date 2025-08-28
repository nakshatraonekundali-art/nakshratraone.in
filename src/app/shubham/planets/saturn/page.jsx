'use client'
import React, { useState, useEffect } from 'react';
import Navigation from '../../components/Navigation';
import { useKundli } from '../../context/KundliContext';

const SaturnAnalysis = () => {
  const [saturnData, setSaturnData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { language, formData } = useKundli();
  
  // Translations
  const translations = {
    loading: language === 'hindi' ? 'शनि विश्लेषण लोड हो रहा है...' : 'Loading Saturn Analysis...',
    error: language === 'hindi' ? 'डेटा लोड करने में त्रुटि' : 'Error Loading Data',
    retry: language === 'hindi' ? 'पुनः प्रयास करें' : 'Retry',
    next: language === 'hindi' ? 'अगला →' : 'Next →',
    back: language === 'hindi' ? 'वापस' : 'Back'
  };

  // API configuration
  const API_CONFIG = {
    userId: '643886',
    apiKey: '8cfa24ac82f34fa17f090ed5a6a2122b9f3e10bf',
    baseUrl: 'https://json.astrologyapi.com/v1',
    api: 'general_house_report/saturn'
  };

  // Map language to API language parameter
  const apiLanguage = language === 'hindi' ? 'hi' : 'en';
   
  // Use birth details from context or fallback to defaults
  const birthDetails = formData && typeof formData === 'object' ? formData : {
    day: 6,
    month: 1,
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

  // Helper function to strip HTML tags for security
const stripHtmlTags = (html) => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '');
};

// Function to simulate Saturn data if API fails (fallback)
const loadFallbackData = () => {
    const fallbackData = {
      house_report: language === 'hindi' 
        ? "शनि ग्रह आपकी जन्म कुंडली में कुंभ राशि के पूर्वा भाद्रपद नक्षत्र में तीसरे भाव में स्थित है। यह स्थिति आपको धैर्य, अनुशासन और कड़ी मेहनत के माध्यम से सफलता दिलाती है। आप एक गंभीर व्यक्तित्व के धनी हैं जो जीवन की चुनौतियों का सामना धैर्य और दृढ़ता से करते हैं। भाई-बहनों के साथ संबंधों में देरी या बाधाएं हो सकती हैं, लेकिन समय के साथ ये रिश्ते मजबूत होते जाएंगे। आप में लेखन, अनुसंधान या तकनीकी क्षेत्रों में गहरी रुचि है। छोटी यात्राओं में सावधानी बरतनी चाहिए। आपकी वाणी में गंभीरता है और आप सोच-समझकर बोलते हैं। धीमी लेकिन स्थायी प्रगति आपकी विशेषता है। कड़ी मेहनत और धैर्य से आप जीवन में बड़ी सफलताएं प्राप्त करेंगे।"
        : "Saturn is positioned in the 3rd house of your birth chart in Aquarius sign under Purva Bhadrapada nakshatra. This placement brings success through patience, discipline, and hard work. You possess a serious personality that faces life's challenges with patience and determination. There may be delays or obstacles in relationships with siblings, but these relationships will strengthen over time. You have deep interest in writing, research, or technical fields. Caution should be exercised during short travels. Your speech carries gravity and you speak thoughtfully. Slow but steady progress is your specialty. Through hard work and patience, you will achieve great success in life. This position also indicates a methodical approach to communication and learning, making you an excellent teacher or mentor in your chosen field."
    };
    
    console.log('Loading fallback Saturn data:', fallbackData);
    setSaturnData(fallbackData);
  };

  // Function to fetch Saturn analysis data
  const fetchSaturnData = async () => {
    try {
      setLoading(true);
      setError(''); // Clear previous errors
      
      // Validate birth details first and ensure they are numbers
      const safeDetails = {
        day: parseInt(birthDetails?.day) || 6,
        month: parseInt(birthDetails?.month) || 1,
        year: parseInt(birthDetails?.year) || 2000,
        hour: parseInt(birthDetails?.hour) || 7,
        min: parseInt(birthDetails?.min) || 45,
        lat: parseFloat(birthDetails?.lat) || 19.132,
        lon: parseFloat(birthDetails?.lon) || 72.342,
        tzone: parseFloat(birthDetails?.tzone) || 5.5
      };
      
      console.log('Birth details being used:', safeDetails);
      console.log('API Language:', apiLanguage);
      
      // Make API call using the working pattern from Jupiter analysis
      const response = await fetch(`${API_CONFIG.baseUrl}/${API_CONFIG.api}`, {
        method: 'POST',
        headers: {
          'Authorization': getAuthHeader(),
          'Content-Type': 'application/json',
          'Accept-Language': apiLanguage // This is the key based on working pattern
        },
        body: JSON.stringify({
          day: safeDetails.day,
          month: safeDetails.month, 
          year: safeDetails.year,
          hour: safeDetails.hour,
          min: safeDetails.min,
          lat: safeDetails.lat,
          lon: safeDetails.lon,
          tzone: safeDetails.tzone
          // Note: No 'lang' parameter in body, using Accept-Language header instead
        })
      });
      
      console.log('API Response status:', response.status);
      console.log('Request payload:', {
        day: safeDetails.day,
        month: safeDetails.month, 
        year: safeDetails.year,
        hour: safeDetails.hour,
        min: safeDetails.min,
        lat: safeDetails.lat,
        lon: safeDetails.lon,
        tzone: safeDetails.tzone,
        'Accept-Language': apiLanguage
      });
      
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
      console.log('Saturn Data received from API:', data);
      
      // Validate the response data
      if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
        throw new Error('No data received from API');
      }
      
      // Check if we have the expected structure
      if (!data.house_report && !data.planet) {
        console.warn('Unexpected API response structure:', data);
        throw new Error('Invalid API response structure');
      }
      
      setSaturnData(data);
      console.log('Saturn data set successfully:', data);
      
    } catch (error) {
      console.error('Error fetching Saturn data:', error);
      setError(error.message);
      
      // Auto-load demo data on any error
      console.log('Loading fallback data due to error...');
      loadFallbackData();
      
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    console.log('useKundli context data:', { language, formData });
    console.log('Birth details:', birthDetails);
    fetchSaturnData();
  }, [language]); // Re-fetch when language changes

  // Function to handle next button click
  const handleNext = () => {
    window.location.href = '/shubham/planets/rahu';
  };

  // Function to handle back button click
  const handleBack = () => {
    window.location.href = '/shubham/planets/venus';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-gray-50 rounded-lg p-8 shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="text-center mt-4 text-gray-600">{translations.loading}</p>
        </div>
      </div>
    );
  }

  if (error && !saturnData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="bg-gray-50 rounded-lg p-8 shadow-xl max-w-md w-full">
          <div className="text-red-600 text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold mb-2">{translations.error}</h2>
            <p className="text-sm text-gray-600 mb-4">{error}</p>
            <div className="flex flex-col space-y-2">
              <button 
                onClick={fetchSaturnData} 
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                {translations.retry}
              </button>
              <button 
                onClick={loadFallbackData} 
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                {language === 'hindi' ? 'डेमो डेटा लोड करें' : 'Load Demo Data'}
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
            {/* Saturn Image and Title */}
            <div className="text-center mb-6">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-200 to-purple-300 flex items-center justify-center shadow-lg md:w-20 md:h-20">
                <img 
                  src="https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/kundli_analyser/graha_devta/saturn.png"
                  alt="Saturn"
                  className="w-20 h-20 object-contain md:w-16 md:h-16"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="text-4xl hidden md:text-3xl">♄</div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-4 md:text-xl md:mb-3">
                {language === 'hindi' ? 'शनि (Saturn)' : 'Shani (Saturn)'}
              </h2>
              
              {/* Tags - Saturn themed colors */}
              <div className="flex flex-wrap justify-center gap-2 mb-6 md:mb-4">
                <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium md:px-3 md:py-1 md:text-xs">
                  Purva Bhadrapad
                </span>
                <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium md:px-3 md:py-1 md:text-xs">
                  Aquarius
                </span>
                <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium md:px-3 md:py-1 md:text-xs">
                  3 House
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-base text-gray-700 leading-relaxed text-center px-2 md:text-sm">
                {language === 'hindi' 
                  ? "शनि, जिसे अंग्रेजी में सैटर्न कहते हैं, भगवान सूर्य का पुत्र है। शनि अंधकार, मृत्यु और दुख की उन चुनौतियों का प्रतिनिधित्व करता है जिन्हें हमें सच्ची ज्ञान की प्राप्ति के लिए पार करना होता है। संस्कृत में, शनि का अर्थ 'धीमी गति से चलने वाला' है, क्योंकि यह प्रत्येक राशि से गुजरने में लगभग ढाई वर्ष का समय लेता है।"
                  : "Shani, also known as Saturn, is the child of the Lord Sun. Shani represents the challenges of darkness, death, and sadness that we must overcome to find true enlightenment. In Sanskrit, Shani means 'the slow mover,' as it takes about two and a half years to pass through each zodiac sign. Shani rules over the zodiac signs Capricorn and Aquarius."
                }
              </p>
            </div>

            {/* House Report - Saturn themed colors */}
            {saturnData && saturnData.house_report && (
              <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-4 border border-red-400 mb-6">
                <p className="text-base text-gray-700 leading-relaxed md:text-sm">
                  {stripHtmlTags(saturnData.house_report)}
                </p>
              </div>
            )}

            {/* Precise Karmic Forecast Section - Saturn themed */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-200 mb-6">
              <div className="mb-4 md:mb-3">
                <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:shadow-md transition-all border-2 border-orange-600 md:text-xs">
                  {language === 'hindi' ? 'सटीक कर्मिक पूर्वानुमान' : 'PRECISE KARMIC FORECAST'}
                </button>
              </div>
              
              <div className="flex items-start space-x-4 md:space-x-3">
                <div className="flex-1">
                  <p className="text-sm text-gray-700 mb-3 leading-relaxed md:text-xs md:mb-2">
                    {language === 'hindi' 
                      ? "अपनी दशा की समयरेखा, योगिनी और अष्टकवर्ग स्कोर का अन्वेषण करें। सर्वाष्टक वर्ग शक्ति मानचित्र और संयुक्त मित्रता तालिका।"
                      : "Explore your Dasha timeline, Yogini and Ashtakavarga scores. Sarvaashatak Varga strength map and composite friendship table."
                    }
                  </p>
                  <p className="text-sm text-gray-700 mb-3 leading-relaxed md:text-xs md:mb-2">
                    {language === 'hindi' 
                      ? "अपनी ऊर्जाओं को संतुलित करने के लिए मार्गदर्शन।"
                      : "Guidance to balance your Energies."
                    }
                  </p>
                  <div className="mt-3">
                    <button className="text-orange-600 text-sm font-semibold underline hover:text-orange-700 md:text-xs">
                      {language === 'hindi' ? 'मेरे रहस्य प्रकट करें →' : 'Reveal My Secrets →'}
                    </button>
                  </div>
                </div>
                <div className="w-20 h-24 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0 md:w-16 md:h-20">
                  <div className="text-white text-xs font-bold text-center leading-tight px-2 md:text-[10px]">
                    {language === 'hindi' ? 'आपकी व्यक्तिगत वैदिक कुंडली' : 'YOUR PERSONALIZED VEDIC KUNDLI'}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom padding for scrolling */}
            <div className="h-4"></div>
          </div>

          {/* Navigation - Fixed at bottom */}
          <Navigation 
            currentPage="planets/saturn"
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

export default SaturnAnalysis;