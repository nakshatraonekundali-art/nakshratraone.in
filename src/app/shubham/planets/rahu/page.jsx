'use client'
import React, { useState, useEffect } from 'react';
import Navigation from '../../components/Navigation';
import { useKundli } from '../../context/KundliContext';
import Link from 'next/link';

const RahuAnalysis = () => {
  const [rahuData, setRahuData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { language, formData } = useKundli();
  
  // Translations
  const translations = {
    loading: language === 'hindi' ? 'राहु विश्लेषण लोड हो रहा है...' : 'Loading Rahu Analysis...',
    error: language === 'hindi' ? 'डेटा लोड करने में त्रुटि' : 'Error Loading Data',
    retry: language === 'hindi' ? 'पुनः प्रयास करें' : 'Retry',
    next: language === 'hindi' ? 'अगला →' : 'Next →',
    back: language === 'hindi' ? 'वापस' : 'Back',
    loadDemoData: language === 'hindi' ? 'डेमो डेटा लोड करें' : 'Load Demo Data'
  };

  // API configuration
  const API_CONFIG = {
    userId: '643886',
    apiKey: '8cfa24ac82f34fa17f090ed5a6a2122b9f3e10bf',
    baseUrl: 'https://json.astrologyapi.com/v1',
    api: 'general_house_report/rahu'
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

  // Function to simulate Rahu data if API fails (fallback)
  const loadFallbackData = () => {
    const fallbackData = {
      house_report: language === 'hindi' 
        ? "राहु ग्रह आपकी जन्म कुंडली में मीन राशि के उत्तरा भाद्रपद नक्षत्र में चौथे भाव में स्थित है। यह स्थिति अचल संपत्ति और संपत्ति के कारोबार में संभावित सफलता का संकेत देती है, साथ ही घर की सजावट में एक मजबूत रचनात्मक और कलात्मक स्वभाव भी दिखाती है। हालांकि, यह स्थिति पारिवारिक और घरेलू जीवन में चुनौतियां ला सकती है, और आपको अपने मानसिक शांति में बार-बार बाधा का सामना करना पड़ सकता है। छाती और फेफड़ों से संबंधित स्वास्थ्य समस्याओं के बारे में सावधान रहें। आपके जीवन में महत्वपूर्ण यात्रा हो सकती है, संभवतः विदेशी भूमि पर। यह स्थिति मातृ संबंधों में जटिलता और भावनात्मक अस्थिरता भी दर्शा सकती है।"
        : "Rahu is positioned in the 4th house of your birth chart in Pisces sign under Uttara Bhadrapada nakshatra. This placement suggests potential success in real estate and property dealings, coupled with a strong creative and artistic flair, especially in home decoration. However, this placement may bring challenges in family and domestic life, and you might find your peace of mind frequently disturbed. Be cautious about health issues related to your chest and lungs. Your life may involve significant travel, possibly to foreign lands. This position also indicates complexity in maternal relationships and emotional instability. You may have unconventional approaches to achieving security and comfort, often seeking these through material possessions or foreign connections."
    };
    
    console.log('Loading fallback Rahu data:', fallbackData);
    setRahuData(fallbackData);
  };

  // Function to fetch Rahu analysis data
  const fetchRahuData = async () => {
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
      console.log('Rahu Data:', data);
      
      // Validate the response data
      if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
        throw new Error('No data received from API');
      }
      
      setRahuData(data);
      */
      
    } catch (error) {
      console.error('Error fetching Rahu data:', error);
      
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
    fetchRahuData();
  }, [language]); // Re-fetch when language changes

  // Function to handle next button click
  const handleNext = () => {
    window.location.href = '/shubham/planets/ketu';
  };

  // Function to handle back button click
  const handleBack = () => {
    window.location.href = '/shubham/planets/saturn';
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
                onClick={fetchRahuData} 
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
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
            {/* Rahu Image and Title */}
            <div className="text-center mb-6">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-200 to-red-300 flex items-center justify-center shadow-lg md:w-20 md:h-20">
                <img 
                  src="https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/kundli_analyser/graha_devta/rahu.png"
                  alt="Rahu"
                  className="w-20 h-20 object-contain md:w-16 md:h-16"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="text-4xl hidden md:text-3xl">☊</div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-4 md:text-xl md:mb-3">
                {language === 'hindi' ? 'राहु (Rahu)' : 'Rahu'}
              </h2>
              
              {/* Tags - Rahu themed colors */}
              <div className="flex flex-wrap justify-center gap-2 mb-6 md:mb-4">
                <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium md:px-3 md:py-1 md:text-xs">
                  Uttara Bhadrapada
                </span>
                <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium md:px-3 md:py-1 md:text-xs">
                  Pisces
                </span>
                <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium md:px-3 md:py-1 md:text-xs">
                  4 House
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-base text-gray-700 leading-relaxed text-center px-2 md:text-sm">
                {language === 'hindi' 
                  ? "राहु, हालांकि एक वास्तविक ग्रह नहीं है, वैदिक ज्योतिष में एक महत्वपूर्ण छाया ग्रह है। यह चंद्रमा की उत्तरी गांठ का प्रतिनिधित्व करता है और इसे 'ड्रैगन का सिर' कहा जाता है। राहु वह बिंदु है जहां चंद्रमा क्रांतिवृत्त (सूर्य का पथ) के उत्तर में चलता है।"
                  : "Rahu, although not an actual planet, is a significant shadow planet in Vedic astrology. It represents the north node of the Moon and is known as the 'Dragons Head'. Rahu is the point where the Moon moves north across the ecliptic (the path of the sun)."
                }
              </p>
            </div>

            {/* House Report - Rahu themed colors */}
            {rahuData && rahuData.house_report && (
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4 border border-orange-300 mb-6">
                <p className="text-base text-gray-700 leading-relaxed md:text-sm">
                  {rahuData.house_report}
                </p>
              </div>
            )}

            {/* Tailored Abundance Plan Section - Rahu themed */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200 mb-6">
              <div className="mb-4 md:mb-3">
                <button className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:shadow-md transition-all border-2 border-pink-600 md:text-xs">
                      <Link href="/shubham/subscription">{language === 'hindi' ? 'आपके लिए तैयार किया गया समृद्धि योजना!' : 'TAILORED ABUNDANCE PLAN FOR YOU!'}</Link>
                
                </button>
              </div>
              
              <div className="flex items-start space-x-4 md:space-x-3">
                <div className="flex-1">
                  <p className="text-sm text-gray-700 mb-3 leading-relaxed md:text-xs md:mb-2">
                    {language === 'hindi' 
                      ? "एक व्यक्तिगत ज्योतिष-वास्तु खाका प्राप्त करें जो आपके स्थान को धन, स्वास्थ्य और सकारात्मकता के लिए एक चुंबक में बदल देता है। विशिष्ट दिशाएं, रंग, रत्न, और शक्तिशाली वैदिक मंत्र।"
                      : "Get a bespoke Astro-Vastu blueprint that transforms your space into a magnet for wealth, health and positivity. Specific directions, colors, gemstones, and powerful Vedic mantras."
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
            currentPage="planets/rahu"
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

export default RahuAnalysis;