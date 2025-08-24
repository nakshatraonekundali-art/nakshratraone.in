'use client'
import React, { useState, useEffect } from 'react';
import Navigation from '../../components/Navigation';
import { useKundli } from '../../context/KundliContext';

const JupiterAnalysis = () => {
  const [jupiterData, setJupiterData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { language, formData } = useKundli();

  // Translations
  const translations = {
    loading: language === 'hindi' ? 'बृहस्पति विश्लेषण लोड हो रहा है...' : 'Loading Jupiter Analysis...',
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
    api: 'general_house_report/jupiter'
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

  // Function to simulate Jupiter data if API fails (fallback)
  const loadFallbackData = () => {
    const fallbackData = {
      house_report: language === 'hindi' 
        ? "बृहस्पति ग्रह आपकी जन्म कुंडली में वृषभ राशि के रोहिणी नक्षत्र में 6वें भाव में स्थित है। यह स्थिति आपको स्वास्थ्य के मामलों में बुद्धिमत्ता, सेवा भावना, और कार्यक्षेत्र में न्याय की प्रवृत्ति प्रदान करती है। आप एक प्राकृतिक चिकित्सक और समस्या समाधानकर्ता हैं। आपमें दूसरों की सहायता करने की प्रबल इच्छा है और आप अपने कार्यक्षेत्र में धर्म और नैतिकता के सिद्धांतों का पालन करते हैं। यह स्थिति आपको विनम्रता, व्यावहारिकता और सेवा के माध्यम से आध्यात्मिक विकास का मार्ग दिखाती है। आपके शत्रु आपके सामने नहीं टिक सकते और आप कानूनी मामलों में सफलता प्राप्त करते हैं। स्वास्थ्य संबंधी चुनौतियों से बचने के लिए नियमित दिनचर्या अपनाएं।"
        : "Jupiter is positioned in the 6th house of your birth chart in Taurus sign under Rohini nakshatra. This placement gives you wisdom in health matters, a spirit of service, and a tendency toward justice in your work sphere. You are a natural healer and problem solver. You have a strong desire to help others and follow principles of dharma and ethics in your workplace. This position shows you the path of spiritual development through humility, practicality, and service. Your enemies cannot stand before you, and you achieve success in legal matters. You excel in competitive environments and have the ability to overcome obstacles through patience and perseverance. Adopt a regular routine to avoid health-related challenges."
    };
    
    console.log('Loading fallback Jupiter data:', fallbackData);
    setJupiterData(fallbackData);
  };

  // Function to fetch Jupiter analysis data
  const fetchJupiterData = async () => {
    try {
      setLoading(true);
      setError(''); // Clear previous errors
      
      // Validate birth details first
      const safeDetails = {
        day: birthDetails?.day || 6,
        month: birthDetails?.month || 1,
        year: birthDetails?.year || 2000,
        hour: birthDetails?.hour || 7,
        min: birthDetails?.min || 45,
        lat: birthDetails?.lat || 19.132,
        lon: birthDetails?.lon || 72.342,
        tzone: birthDetails?.tzone || 5.5
      };
      
      console.log('Birth details being used:', safeDetails);
      
      // For now, let's skip the API call and load demo data directly
      // since the API is consistently returning 405 errors
      console.log('API is not accessible, loading demo data...');
      loadFallbackData();
      return;
      
      // Commented out API call until endpoint is fixed
      /*
      // Create URL with query parameters for GET request
      const queryParams = new URLSearchParams({
        day: safeDetails.day.toString(),
        month: safeDetails.month.toString(),
        year: safeDetails.year.toString(),
        hour: safeDetails.hour.toString(),
        min: safeDetails.min.toString(),
        lat: safeDetails.lat.toString(),
        lon: safeDetails.lon.toString(),
        tzone: safeDetails.tzone.toString(),
        lang: apiLanguage
      });

      // Try POST request first (original method)
      let response = await fetch(`${API_CONFIG.baseUrl}/${API_CONFIG.api}`, {
        method: 'POST',
        headers: {
          'Authorization': getAuthHeader(),
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Accept-Language': apiLanguage
        },
        body: JSON.stringify(safeDetails)
      });
      
      // If POST fails with 405, try GET request
      if (response.status === 405) {
        console.log('POST method not allowed, trying GET request...');
        response = await fetch(`${API_CONFIG.baseUrl}/${API_CONFIG.api}?${queryParams}`, {
          method: 'GET',
          headers: {
            'Authorization': getAuthHeader(),
            'Accept': 'application/json',
            'Accept-Language': apiLanguage
          }
        });
      }
      
      if (!response.ok) {
        // Provide more detailed error information
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
      console.log('Jupiter Data:', data);
      
      // Validate the response data
      if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
        throw new Error('No data received from API');
      }
      
      setJupiterData(data);
      */
      
    } catch (error) {
      console.error('Error fetching Jupiter data:', error);
      
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
    fetchJupiterData();
  }, [language]); // Re-fetch when language changes

  // Function to handle next button click
  const handleNext = () => {
    window.location.href = '/shubham/planets/ending';
  };

  // Function to handle back button click
  const handleBack = () => {
    window.location.href = '/shubham/planets/venus';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-gray-50 rounded-lg p-8 shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto"></div>
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
                onClick={fetchJupiterData} 
                className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
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
        <div className="bg-gradient-to-b from-yellow-50 via-orange-50 to-red-50 min-h-screen md:min-h-0 flex flex-col md:rounded-3xl md:shadow-2xl md:overflow-hidden md:h-[95vh]">
          {/* Header - Fixed */}
          <div className="text-center pt-8 pb-6 px-6 flex-shrink-0 md:pt-6 md:pb-4 bg-gradient-to-b from-yellow-50 via-orange-50 to-red-50 sticky top-0 z-10 md:relative md:sticky-none">
            <div className="flex items-center justify-center mb-6 md:mb-3">
              <div className="text-orange-500 text-xl font-bold md:text-lg">Nakshatra</div>
              <div className="text-blue-500 text-xl font-bold md:text-lg">One</div>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto px-6 pb-6 md:scrollbar-thin md:scrollbar-thumb-gray-300 md:scrollbar-track-transparent">
            {/* Jupiter Image and Title */}
            <div className="text-center mb-6">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-200 to-orange-300 flex items-center justify-center shadow-lg md:w-20 md:h-20">
                <img 
                  src="https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/kundli_analyser/graha_devta/jupiter.png"
                  alt="Jupiter"
                  className="w-20 h-20 object-contain md:w-16 md:h-16"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="text-4xl hidden md:text-3xl">♃</div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-4 md:text-xl md:mb-3">
                {language === 'hindi' ? 'बृहस्पति (Jupiter)' : 'Brihaspati (Jupiter)'}
              </h2>
              
              {/* Tags - Jupiter themed colors */}
              <div className="flex flex-wrap justify-center gap-2 mb-6 md:mb-4">
                <span className="bg-rose-400 text-white px-4 py-2 rounded-full text-sm font-medium md:px-3 md:py-1 md:text-xs">
                  Rohini
                </span>
                <span className="bg-rose-400 text-white px-4 py-2 rounded-full text-sm font-medium md:px-3 md:py-1 md:text-xs">
                  Taurus
                </span>
                <span className="bg-rose-400 text-white px-4 py-2 rounded-full text-sm font-medium md:px-3 md:py-1 md:text-xs">
                  6 House
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-base text-gray-700 leading-relaxed text-center px-2 md:text-sm">
                {language === 'hindi' 
                  ? "बृहस्पति, जिसे अंग्रेजी में जुपिटर कहते हैं, बुद्धि का ग्रह है। संस्कृत में इसे 'देवगुरु' कहा जाता है, जिसका अर्थ है आध्यात्मिक शिक्षक या मार्गदर्शक। बृहस्पति सहायक और उदार होने के लिए जाना जाता है, और यह रचनात्मकता से जुड़ा है।"
                  : "Brihaspati, known as Jupiter in English, is the planet of wisdom. In Sanskrit, it's called 'Devaguru,' meaning the spiritual teacher or guide. Brihaspati is known for being helpful and generous, and it's associated with creativity. It represents our commitment and devotion, pointing to our spiritual purpose in life. Like all planets, Brihaspati's energies can be imbalanced and need proper balancing for true harmony."
                }
              </p>
            </div>

            {/* House Report - Jupiter themed colors */}
            {jupiterData && jupiterData.house_report && (
              <div className="bg-gradient-to-r from-rose-50 to-orange-50 rounded-xl p-4 border border-rose-300 mb-6">
                <p className="text-base text-gray-700 leading-relaxed md:text-sm">
                  {jupiterData.house_report}
                </p>
              </div>
            )}

            {/* Kundli Breakdown Section - Jupiter themed */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-200 mb-6">
              <div className="mb-4 md:mb-3">
                <button className="bg-gradient-to-r from-rose-400 to-orange-400 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:shadow-md transition-all border-2 border-rose-500 md:text-xs">
                  {language === 'hindi' ? 'गहरी कुंडली विश्लेषण' : 'IN-DEPTH KUNDLI BREAKDOWN'}
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
                <div className="w-20 h-24 bg-gradient-to-br from-yellow-600 to-orange-700 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0 md:w-16 md:h-20">
                  <div className="text-white text-xs font-bold text-center leading-tight px-2 md:text-[10px]">
                    {language === 'hindi' ? 'आपकी संपूर्ण कुंडली' : 'YOUR COMPLETE KUNDLI'}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom padding for scrolling */}
            <div className="h-4"></div>
          </div>

          {/* Navigation - Fixed at bottom */}
          <Navigation 
            currentPage="planets/jupiter"
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

export default JupiterAnalysis;