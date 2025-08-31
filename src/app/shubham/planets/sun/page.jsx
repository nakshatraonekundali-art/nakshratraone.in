'use client'
import React, { useState, useEffect } from 'react';
import { useKundli } from '../../context/KundliContext';
import Navigation from '../../components/Navigation';
import Link from 'next/link';

const SunAnalysis = () => {
  const { formData, language, getBirthDetails } = useKundli();
  const [sunData, setSunData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // API configuration
  const API_CONFIG = {
    userId: '643886',
    apiKey: '8cfa24ac82f34fa17f090ed5a6a2122b9f3e10bf',
    baseUrl: 'https://json.astrologyapi.com/v1',
    api: 'general_house_report/sun'
  };

  // Map language to API language parameter
  const apiLanguage = language === 'hindi' ? 'hi' : 'en';

  // Use birth details from context or fallback to defaults
  const birthDetails = formData && typeof formData === 'object' ? formData : {
    day: 6,
    month: 8,
    year: 2010,
    hour: 1,
    min: 45,
    lat: 19.132,
    lon: 72.342,
    tzone: 5.5
  };

  console.log("shubham",birthDetails);
  
  
  // Translations - Updated structure like Jupiter
  const translations = {
    loading: language === 'hindi' ? 'सूर्य विश्लेषण लोड हो रहा है...' : 'Loading Sun Analysis...',
    error: language === 'hindi' ? 'डेटा लोड करने में त्रुटि' : 'Error Loading Data',
    retry: language === 'hindi' ? 'पुनः प्रयास करें' : 'Retry',
    next: language === 'hindi' ? 'अगला →' : 'Next →',
    back: language === 'hindi' ? 'वापस' : 'Back',
    title: language === 'hindi' ? 'सूर्य (Sun)' : 'Surya (Sun)',
    description: language === 'hindi' 
      ? "सूर्य एक पवित्र आकृति की तरह है। यह स्मार्ट सोच और एक खुले दिमाग वाले रवैये का प्रतिनिधित्व करता है। सूर्य को अक्सर जीवन देने वाले के रूप में जाना जाता है। सूर्य पृथ्वी पर आध्यात्मिक जीवन के लिए बहुत महत्वपूर्ण है।"
      : "Surya is like a sacred figure. It represents smart thinking and an open-minded attitude. Surya is often known as the one who gives life. Surya is very important for spiritual life on Earth. It represents our core identity, vitality, and life purpose. Like all planets, Surya's energies can be imbalanced and need proper balancing for true harmony.",
    tailoredPlan: language === 'hindi' ? 'गहरी कुंडली विश्लेषण' : 'IN-DEPTH KUNDLI BREAKDOWN',
    prosperityReport: language === 'hindi' ? 'आपकी संपूर्ण कुंडली' : 'YOUR COMPLETE KUNDLI'
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

  // Function to simulate Sun data if API fails (fallback)
  const loadFallbackData = () => {
    const fallbackData = {
      house_report: language === 'hindi' 
        ? "सूर्य ग्रह आपकी जन्म कुंडली में धनु राशि के पूर्वाषाढ़ा नक्षत्र में 1वें भाव में स्थित है। यह स्थिति आपको मजबूत व्यक्तित्व, नेतृत्व क्षमता, और आत्मविश्वास प्रदान करती है। आप एक प्राकृतिक नेता हैं और दूसरों को प्रेरित करने की क्षमता रखते हैं। आपमें आत्म-सम्मान और गर्व की भावना प्रबल है। यह स्थिति आपको जीवन में स्पष्टता, दिशा और उद्देश्य देती है। आप अपने सिद्धांतों पर अडिग रहते हैं और न्याय की भावना रखते हैं। स्वास्थ्य के मामले में आप सामान्यतः मजबूत होते हैं लेकिन हृदय और आंखों का विशेष ध्यान रखना चाहिए।"
        : "The Sun is positioned in the 1st house of your birth chart in Sagittarius sign under Purva Ashadha nakshatra. This placement gives you a strong personality, leadership abilities, and self-confidence. You are a natural leader with the ability to inspire others. You have a strong sense of self-respect and pride. This position gives you clarity, direction, and purpose in life. You stand firm on your principles and have a sense of justice. In terms of health, you are generally strong, but you should pay special attention to your heart and eyes. Your vitality and life force are strong, and you have the potential to achieve great success through your determined efforts."
    };
    
    console.log('Loading fallback Sun data:', fallbackData);
    setSunData(fallbackData);
  };

  // Function to fetch Sun analysis data
  const fetchSunData = async () => {
    try {
      setLoading(true);
      setError(''); // Clear previous errors
      
      // Validate birth details first and ensure numeric types
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
      
      // Make POST request with proper headers like Jupiter
      console.log(`Fetching Sun data from: ${API_CONFIG.baseUrl}/${API_CONFIG.api}`);
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
      
      console.log('API Response status:', response.status);
      
      if (!response.ok) {
        // Provide more detailed error information
        let errorMessage = `API Error: ${response.status} - ${response.statusText}`;
        
        try {
          const errorData = await response.json();
          console.log('Error data:', errorData);
          if (errorData.error || errorData.message) {
            errorMessage += ` - ${errorData.error || errorData.message}`;
          }
        } catch (e) {
          console.log('Could not parse error response as JSON');
          // If error response is not JSON, use the basic error message
        }
        
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      console.log('Sun Data:', data);
      
      // Validate the response data structure like Jupiter
      if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
        throw new Error('No data received from API');
      }
      
      // Check for required fields in the response
      if (!data.house_report || !data.planet) {
        console.error('Invalid API response format:', data);
        throw new Error('Invalid data format received from API');
      }
      
      setSunData(data);
      
    } catch (error) {
      console.error('Error fetching Sun data:', error);
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
    fetchSunData();
  }, [language]); // Re-fetch when language changes

  // Function to handle next button click
  const handleNext = () => {
    window.location.href = '/shubham/planets/moon';
  };

  // Function to handle back button click
  const handleBack = () => {
    window.location.href = '/shubham/planets';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-gray-50 rounded-lg p-8 shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="text-center mt-4 text-gray-600">{translations.loading}</p>
        </div>
      </div>
    );
  }

  if (error && !sunData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="bg-gray-50 rounded-lg p-8 shadow-xl max-w-md w-full">
          <div className="text-red-600 text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold mb-2">{translations.error}</h2>
            <p className="text-sm text-gray-600 mb-4">{error}</p>
            <div className="flex flex-col space-y-2">
              <button 
                onClick={fetchSunData} 
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
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
        <div className="bg-gradient-to-b from-orange-50 via-pink-50 to-purple-50 min-h-screen md:min-h-0 flex flex-col md:rounded-3xl md:shadow-2xl md:overflow-hidden md:h-[95vh]">
          {/* Header - Fixed with sticky positioning like Jupiter */}
          <div className="text-center pt-8 pb-6 px-6 flex-shrink-0 md:pt-6 md:pb-4 bg-gradient-to-b from-orange-50 via-pink-50 to-purple-50 sticky top-0 z-10 md:relative md:sticky-none">
            <div className="flex items-center justify-center mb-6 md:mb-3">
              <div className="text-orange-500 text-xl font-bold md:text-lg">Nakshatra</div>
              <div className="text-blue-500 text-xl font-bold md:text-lg">One</div>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto px-6 pb-6 md:scrollbar-thin md:scrollbar-thumb-gray-300 md:scrollbar-track-transparent">
            {/* Sun Image and Title */}
            <div className="text-center mb-6">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-200 to-orange-300 flex items-center justify-center shadow-lg md:w-20 md:h-20">
                <img 
                  src="https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/kundli_analyser/graha_devta/sun.png"
                  alt="Sun"
                  className="w-20 h-20 object-contain md:w-16 md:h-16"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="text-4xl hidden md:text-3xl">☉</div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-4 md:text-xl md:mb-3">{translations.title}</h2>
              
              {/* Tags - Updated colors to match Jupiter style */}
              <div className="flex flex-wrap justify-center gap-2 mb-6 md:mb-4">
                <span className="bg-orange-400 text-white px-4 py-2 rounded-full text-sm font-medium md:px-3 md:py-1 md:text-xs">
                  Purva Ashadha
                </span>
                <span className="bg-orange-400 text-white px-4 py-2 rounded-full text-sm font-medium md:px-3 md:py-1 md:text-xs">
                  Sagittarius
                </span>
                <span className="bg-orange-400 text-white px-4 py-2 rounded-full text-sm font-medium md:px-3 md:py-1 md:text-xs">
                  1 House
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-base text-gray-700 leading-relaxed text-center px-2 md:text-sm">
                {translations.description}
              </p>
            </div>

            {/* House Report - Updated styling to match Jupiter */}
            {sunData && sunData.house_report && (
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4 border border-orange-300 mb-6">
                <p className="text-base text-gray-700 leading-relaxed md:text-sm">
                  {stripHtmlTags(sunData.house_report)}
                </p>
              </div>
            )}

            {/* Kundli Breakdown Section - Updated like Jupiter */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-200 mb-6">
              <div className="mb-4 md:mb-3">
                <button className="bg-gradient-to-r from-orange-400 to-red-400 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:shadow-md transition-all border-2 border-orange-500 md:text-xs">
                  <Link href="/shubham/subscription">{translations.tailoredPlan}</Link>
                </button>
              </div>
              
              <div className="flex items-start space-x-4 md:space-x-3">
                <div className="flex-1">
                  <p className="text-sm text-gray-700 mb-3 leading-relaxed md:text-xs md:mb-2">
                    {language === 'hindi' 
                      ? "विस्तृत ग्रह विश्लेषण, भाव व्याख्या, और व्यक्तिगत अंतर्दृष्टि के साथ अपना संपूर्ण ज्योतिषीय खाका खोजें।"
                      : "Discover your complete astrological blueprint with detailed planetary analysis, house interpretations, and personalized insights."
                    }
                  </p>
                  <p className="text-sm text-gray-700 mb-3 leading-relaxed md:text-xs md:mb-2">
                    {language === 'hindi' 
                      ? "आपकी अनूठी जन्म कुंडली के आधार पर व्यापक जीवन भविष्यवाणियां, करियर मार्गदर्शन, और रिश्ते की अनुकूलता प्राप्त करें।"
                      : "Get comprehensive life predictions, career guidance, and relationship compatibility based on your unique birth chart."
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
            currentPage="planets/sun"
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

export default SunAnalysis;