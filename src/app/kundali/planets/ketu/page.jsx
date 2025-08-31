'use client'
import React, { useState, useEffect } from 'react';
import Navigation from '../../components/Navigation';
import { useKundli } from '../../context/KundliContext';
import Link from 'next/link';

const KetuAnalysis = () => {
  const [ketuData, setKetuData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { language, formData } = useKundli();
  
  // Translations
  const translations = {
    loading: language === 'hindi' ? 'केतु विश्लेषण लोड हो रहा है...' : 'Loading Ketu Analysis...',
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
    api: 'general_house_report/ketu'
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

  // Function to simulate Ketu data if API fails (fallback)
  const loadFallbackData = () => {
    const fallbackData = {
      house_report: language === 'hindi' 
        ? "केतु ग्रह आपकी जन्म कुंडली में कन्या राशि के उत्तरा फाल्गुनी नक्षत्र में दसवें भाव में स्थित है। यह स्थिति आपके करियर में महत्वपूर्ण प्रसिद्धि और सफलता की अपेक्षा दर्शाती है। आपका मजबूत व्यक्तित्व संभावित रूप से आपको शक्ति, स्थिति और धन दिलाएगा। आप अपने ज्ञान और दूसरों को प्रभावित करने की क्षमता के लिए प्रसिद्ध होंगे, यहां तक कि प्रतिस्पर्धियों पर भी बढ़त हासिल करेंगे। हालांकि, निराशावाद की प्रवृत्ति आपके दृष्टिकोण को प्रभावित कर सकती है। आपमें आध्यात्मिक झुकाव और गहन शोध की क्षमता है। इस स्थिति से काम में अचानक बदलाव और अप्रत्याशित उपलब्धियां मिल सकती हैं। आप एक प्राकृतिक नेता हैं जो पारंपरिक तरीकों से अलग रास्ते अपनाते हैं।"
        : "Ketu is positioned in the 10th house of your birth chart in Virgo sign under Uttara Phalguni nakshatra. This placement indicates significant fame and success in your career. Your strong personality will likely bring you power, status, and wealth. You'll be renowned for your knowledge and ability to influence others, even gaining an upper hand over competitors. However, a tendency towards pessimism may color your outlook. You possess spiritual inclinations and deep research capabilities. This position can bring sudden changes in work and unexpected achievements. You are a natural leader who takes unconventional paths different from traditional methods. Your analytical skills and attention to detail will be your greatest assets in professional life."
    };
    
    console.log('Loading fallback Ketu data:', fallbackData);
    setKetuData(fallbackData);
  };

  // Function to fetch Ketu analysis data
  const fetchKetuData = async () => {
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
      console.log('Ketu Data:', data);
      
      // Validate the response data
      if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
        throw new Error('No data received from API');
      }
      
      setKetuData(data);
      */
      
    } catch (error) {
      console.error('Error fetching Ketu data:', error);
      
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
    fetchKetuData();
  }, [language]); // Re-fetch when language changes

  // Function to handle next button click
  const handleNext = () => {
    window.location.href = '/kundali/planets/ending';
  };

  // Function to handle back button click
  const handleBack = () => {
    window.location.href = '/kundali/planets/rahu';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-gray-50 rounded-lg p-8 shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
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
                onClick={fetchKetuData} 
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
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
            {/* Ketu Image and Title */}
            <div className="text-center mb-6">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-200 to-emerald-300 flex items-center justify-center shadow-lg md:w-20 md:h-20">
                <img 
                  src="https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/kundli_analyser/graha_devta/ketu.png"
                  alt="Ketu"
                  className="w-20 h-20 object-contain md:w-16 md:h-16"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="text-4xl hidden md:text-3xl">☋</div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-4 md:text-xl md:mb-3">
                {language === 'hindi' ? 'केतु (Ketu)' : 'Ketu'}
              </h2>
              
              {/* Tags - Ketu themed colors */}
              <div className="flex flex-wrap justify-center gap-2 mb-6 md:mb-4">
                <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium md:px-3 md:py-1 md:text-xs">
                  Uttara Phalguni
                </span>
                <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium md:px-3 md:py-1 md:text-xs">
                  Virgo
                </span>
                <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium md:px-3 md:py-1 md:text-xs">
                  10 House
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-base text-gray-700 leading-relaxed text-center px-2 md:text-sm">
                {language === 'hindi' 
                  ? "केतु, जिसका अर्थ 'ध्वज' है, इससे जुड़े शक्तिशाली ग्रहों के प्रभावों को मजबूत बना सकता है। यह चंद्रमा की दक्षिणी गांठ का प्रतिनिधित्व करता है और इसे 'अजगर की पूंछ' के रूप में जाना जाता है। पश्चिमी ज्योतिषी केतु को शनि से जोड़ते हैं। सूर्य की छाया होने के नाते, केतु सूर्य को ढक या छुपा सकता है।"
                  : "Ketu, which means 'a flag', can strengthen the effects of powerful planets it's connected to. It represents the Moon's south node and is known as 'the dragons tail'. Western astrologers link Ketu with Saturn. Being the shadow of the Sun, Ketu can overshadow or hide the Sun."
                }
              </p>
            </div>

            {/* House Report - Ketu themed colors */}
            {ketuData && ketuData.house_report && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-400 mb-6">
                <p className="text-base text-gray-700 leading-relaxed md:text-sm">
                  {ketuData.house_report}
                </p>
              </div>
            )}

            {/* Personalized Life Map Section - Ketu themed */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-200 mb-6">
              <div className="mb-4 md:mb-3">
                <button className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:shadow-md transition-all border-2 border-red-600 md:text-xs">
                  <Link href="/kundali/subscription">{language === 'hindi' ? 'आपके लिए तैयार किया गया समृद्धि योजना!' : 'TAILORED ABUNDANCE PLAN FOR YOU!'}</Link>
                </button>
              </div>
              
              <div className="flex items-start space-x-4 md:space-x-3">
                <div className="flex-1">
                  <p className="text-sm text-gray-700 mb-3 leading-relaxed md:text-xs md:mb-2">
                    {language === 'hindi' 
                      ? "विस्तृत भाव शिखरों के साथ अपनी शक्तियों, कर्मिक पैटर्न और भाग्य की खिड़कियों को प्रकट करें।"
                      : "Reveal your strengths, karmic patterns, and fortune windows with detailed house cusps."
                    }
                  </p>
                  <p className="text-sm text-gray-700 mb-3 leading-relaxed md:text-xs md:mb-2">
                    {language === 'hindi' 
                      ? "आपके अनूठे जन्म कुंडली के अनुरूप सटीक मार्गदर्शन के साथ जीवन की चुनौतियों का सामना करें।"
                      : "Navigate life's challenges with precision guidance tailored to your unique birth chart."
                    }
                  </p>
                  <div className="mt-3">
                 
                  </div>
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
            currentPage="planets/ketu"
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

export default KetuAnalysis;