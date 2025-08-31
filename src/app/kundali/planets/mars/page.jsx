'use client'
import React, { useState, useEffect } from 'react';
import Navigation from '../../components/Navigation';
import { useKundli } from '../../context/KundliContext';
import Link from 'next/link';

const MarsAnalysis = () => {
  const [marsData, setMarsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { language, formData } = useKundli();

  // Translations
  const translations = {
    loading: language === 'hindi' ? 'मंगल विश्लेषण लोड हो रहा है...' : 'Loading Mars Analysis...',
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
    api: 'general_house_report/mars'
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

  // Function to fetch Mars analysis data
  const fetchMarsData = async () => {
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
      console.log('Mars Data received from API:', data);
      
      // Validate the response data
      if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
        throw new Error('No data received from API');
      }
      
      // Check if we have the expected structure
      if (!data.house_report && !data.planet) {
        console.warn('Unexpected API response structure:', data);
        throw new Error('Invalid API response structure');
      }
      
      setMarsData(data);
      console.log('Mars data set successfully:', data);
      
    } catch (error) {
      console.error('Error fetching Mars data:', error);
      setError(error.message);
      
      // Load fallback data on any error
      console.log('Loading fallback data due to error:', error.message);
      loadFallbackData();
      
    } finally {
      setLoading(false);
    }
  };

  // Function to simulate Mars data if API fails (fallback)
  const loadFallbackData = () => {
    const fallbackData = {
      house_report: language === 'hindi' 
        ? "मंगल ग्रह आपकी जन्म कुंडली में कर्क राशि के पुष्य नक्षत्र में 8वें भाव में स्थित है। यह स्थिति आपको गुप्त विद्याओं में गहरी रुचि, जीवन के रहस्यों को समझने की क्षमता, और परिवर्तनों का सामना करने की अद्भुत शक्ति प्रदान करती है। आपमें अनुसंधान की प्रबल प्रवृत्ति है और आप छुपी हुई बातों को जानने में दक्ष हैं। यह स्थिति आपको साहस, दृढ़ता और धैर्य के गुण देती है। हालांकि कभी-कभी आप क्रोधी हो सकते हैं, लेकिन आपमें अन्याय के खिलाफ लड़ने की हिम्मत भी है। आर्थिक मामलों में सावधानी बरतें और स्वास्थ्य का विशेष ध्यान रखें।"
        : "Mars is positioned in the 8th house of your birth chart in Cancer sign under Pushya nakshatra. This placement gives you profound interest in occult sciences, ability to understand life's mysteries, and remarkable power to face transformations. You possess a strong research inclination and are skilled at uncovering hidden matters. This position blesses you with courage, determination, and patience. While you may sometimes be temperamental, you also have the courage to fight against injustice. Exercise caution in financial matters and pay special attention to your health. Your Mars placement indicates deep emotional strength and the ability to regenerate after setbacks."
    };
    
    console.log('Loading fallback Mars data:', fallbackData);
    setMarsData(fallbackData);
  };

  // Fetch data on component mount
  useEffect(() => {
    console.log('useKundli context data:', { language, formData });
    console.log('Birth details:', birthDetails);
    fetchMarsData();
  }, [language]); // Re-fetch when language changes

  // Function to handle next button click
  const handleNext = () => {
    window.location.href = '/kundali/planets/jupiter';
  };

  // Function to handle back button click
  const handleBack = () => {
    window.location.href = '/kundali/planets/moon';
  };
  
  // Function to strip HTML tags from house_report
  const stripHtmlTags = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-gray-50 rounded-lg p-8 shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="text-center mt-4 text-gray-600">{translations.loading}</p>
        </div>
      </div>
    );
  }

  if (error && !marsData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="bg-gray-50 rounded-lg p-8 shadow-xl max-w-md w-full">
          <div className="text-red-600 text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold mb-2">{translations.error}</h2>
            <p className="text-sm text-gray-600 mb-4">{error}</p>
            <div className="flex flex-col space-y-2">
              <button 
                onClick={fetchMarsData} 
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
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
        <div className="bg-gradient-to-b from-red-50 via-orange-50 to-pink-50 min-h-screen md:min-h-0 flex flex-col md:rounded-3xl md:shadow-2xl md:overflow-hidden md:h-[95vh]">
          {/* Header - Fixed */}
          <div className="text-center pt-8 pb-6 px-6 flex-shrink-0 md:pt-6 md:pb-4 bg-gradient-to-b from-red-50 via-orange-50 to-pink-50 sticky top-0 z-10 md:relative md:sticky-none">
             <div className="flex items-center justify-center mb-6 md:mb-3">
              <div className="text-orange-500 text-xl font-bold md:text-lg">Nakshatra</div>
              <div className="text-blue-500 text-xl font-bold md:text-lg">One</div>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto px-6 pb-6 md:scrollbar-thin md:scrollbar-thumb-gray-300 md:scrollbar-track-transparent">
            {/* Mars Image and Title */}
            <div className="text-center mb-6">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-200 to-orange-300 flex items-center justify-center shadow-lg md:w-20 md:h-20">
                <img 
                  src="https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/kundli_analyser/graha_devta/mars_2.png"
                  alt="Mars"
                  className="w-20 h-20 object-contain md:w-16 md:h-16"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="text-4xl hidden md:text-3xl">♂</div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-4 md:text-xl md:mb-3">
                {language === 'hindi' ? 'मंगल (Mars)' : 'Mangal (Mars)'}
              </h2>
              
              {/* Tags - Mars themed colors */}
              <div className="flex flex-wrap justify-center gap-2 mb-6 md:mb-4">
                <span className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium md:px-3 md:py-1 md:text-xs">
                  Pushya
                </span>
                <span className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium md:px-3 md:py-1 md:text-xs">
                  Cancer
                </span>
                <span className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium md:px-3 md:py-1 md:text-xs">
                  8 House
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-base text-gray-700 leading-relaxed text-center px-2 md:text-sm">
                {language === 'hindi' 
                  ? "मंगल, जिसे कुज भी कहा जाता है, जिसका अर्थ है 'पृथ्वी से जन्मा', माता पृथ्वी का पुत्र है। यह उद्देश्य के साथ कार्य करने का प्रतिनिधित्व करता है। मंगल शक्ति, बल, वीरता और साहस के बारे में है। यह दिखाता है कि हम जीवन में कितनी अच्छी तरह से दृढ़ हो सकते हैं।"
                  : "Mars, also known as Kuja meaning 'born from the Earth,' is the child of Mata Prithvi. It represents taking action with a purpose. Mars is all about power, strength, bravery, and being bold. It shows how well we can be forceful in life. Mars also controls our strong, outward feelings. It rules the zodiac signs Aries and Scorpio."
                }
              </p>
            </div>

            {/* House Report - Mars themed colors */}
            {marsData && marsData.house_report && (
              <div className="bg-gradient-to-r from-pink-50 to-red-50 rounded-xl p-4 border border-pink-300 mb-6">
                <p className="text-base text-gray-700 leading-relaxed md:text-sm">
                  {stripHtmlTags(marsData.house_report)}
                </p>
              </div>
            )}

            {/* Kundli Report Section - Mars themed */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 border border-orange-200 mb-6">
              <div className="mb-4 md:mb-3">
                <button className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:shadow-md transition-all border-2 border-pink-600 md:text-xs">
                <Link href="/kundali/subscription">     {language === 'hindi' ? '145+ पेज की कुंडली रिपोर्ट प्राप्त करें' : 'GET 145+ PAGES KUNDLI REPORT'}</Link>
                
                </button>
              </div>
              
              <div className="flex items-start space-x-4 md:space-x-3">
                <div className="flex-1">
                  <p className="text-sm text-gray-700 mb-3 leading-relaxed md:text-xs md:mb-2">
                    {language === 'hindi' 
                      ? "व्यक्तिगत उपायों के साथ आपकी विस्तृत कुंडली रिपोर्ट तैयार है। सटीक ग्रह स्थितियों के साथ गहरी चार्ट विश्लेषण प्राप्त करें।"
                      : "Your detailed Kundli report with personalised remedies is ready. Get an in-depth chart analysis with precise planetary positions,"
                    }
                  </p>
                  <p className="text-sm text-gray-700 mb-3 leading-relaxed md:text-xs md:mb-2">
                    {language === 'hindi' 
                      ? "दशा पूर्वानुमान और आपकी जन्म कुंडली के लिए विशेष रूप से तैयार किए गए उपाय सुझाव।"
                      : "Dasha forecasts, and remedy suggestions crafted specifically for your birth chart."
                    }
                  </p>
                </div>
                   <div className="w-20 h-24  rounded-lg flex items-center justify-center shadow-lg flex-shrink-0 md:w-16 md:h-20">
                  <img src="	https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/kundli_analyser/abundance_report.png" alt="" />
                </div>
                
              </div>
            </div>

            {/* Bottom padding for scrolling */}
            <div className="h-4"></div>
          </div>

          {/* Navigation - Fixed at bottom */}
          <Navigation 
            currentPage="planets/mars"
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

export default MarsAnalysis;