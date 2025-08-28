'use client'
import React, { useState, useEffect } from 'react';
import Navigation from '../../components/Navigation';
import { useKundli } from '../../context/KundliContext';

const VenusAnalysis = () => {
  const [venusData, setVenusData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { language, formData } = useKundli();

  // Translations
  const translations = {
    loading: language === 'hindi' ? 'शुक्र विश्लेषण लोड हो रहा है...' : 'Loading Venus Analysis...',
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
    api: 'general_house_report/venus'
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

// Function to simulate Venus data if API fails (fallback)
const loadFallbackData = () => {
    const fallbackData = {
      house_report: language === 'hindi' 
        ? "शुक्र ग्रह आपकी जन्म कुंडली में कुंभ राशि के धनिष्ठा नक्षत्र में तीसरे भाव में स्थित है। यह स्थिति आपको संचार कला, रचनात्मक अभिव्यक्ति, और भाई-बहनों के साथ मधुर संबंधों का वरदान देती है। आप एक प्राकृतिक कलाकार हैं जो अपनी बात को सुंदर और प्रभावी तरीके से कह सकते हैं। आपमें लेखन, संगीत, या अन्य कलात्मक क्षेत्रों में असाधारण प्रतिभा है। यह स्थिति छोटी यात्राओं से लाभ, स्थानीय व्यापार में सफलता, और मीडिया या संचार क्षेत्र में उन्नति दर्शाती है। आपके पास एक चुंबकीय व्यक्तित्व है जो दूसरों को आकर्षित करता है। साहसिक कार्यों में भाग लेने और नई चीजें सीखने की प्रबल इच्छा है। वाणी में मिठास और दूसरों को प्रभावित करने की क्षमता आपकी विशेषता है।"
        : "Venus is positioned in the 3rd house of your birth chart in Aquarius sign under Dhanishtha nakshatra. This placement blesses you with communication arts, creative expression, and harmonious relationships with siblings. You are a natural artist who can express yourself beautifully and effectively. You possess extraordinary talent in writing, music, or other artistic fields. This position indicates benefits from short travels, success in local business, and advancement in media or communication sectors. You have a magnetic personality that attracts others. There's a strong desire to participate in adventurous activities and learn new things. Sweetness in speech and the ability to influence others are your special qualities. Your creative communication style makes you popular in social circles, and you have the gift of making complex ideas appear simple and beautiful."
    };
    
    console.log('Loading fallback Venus data:', fallbackData);
    setVenusData(fallbackData);
  };

  // Function to fetch Venus analysis data
  const fetchVenusData = async () => {
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
      console.log('Venus Data received from API:', data);
      
      // Validate the response data
      if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
        throw new Error('No data received from API');
      }
      
      // Check if we have the expected structure
      if (!data.house_report && !data.planet) {
        console.warn('Unexpected API response structure:', data);
        throw new Error('Invalid API response structure');
      }
      
      setVenusData(data);
      console.log('Venus data set successfully:', data);
      
    } catch (error) {
      console.error('Error fetching Venus data:', error);
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
    fetchVenusData();
  }, [language]); // Re-fetch when language changes

  // Function to handle next button click
  const handleNext = () => {
    window.location.href = '/shubham/planets/jupiter';
  };

  // Function to handle back button click
  const handleBack = () => {
    window.location.href = '/shubham/planets/mars';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-gray-50 rounded-lg p-8 shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
          <p className="text-center mt-4 text-gray-600">{translations.loading}</p>
        </div>
      </div>
    );
  }

  if (error && !venusData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="bg-gray-50 rounded-lg p-8 shadow-xl max-w-md w-full">
          <div className="text-red-600 text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold mb-2">{translations.error}</h2>
            <p className="text-sm text-gray-600 mb-4">{error}</p>
            <div className="flex flex-col space-y-2">
              <button 
                onClick={fetchVenusData} 
                className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
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
            {/* Venus Image and Title */}
            <div className="text-center mb-6">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-200 to-rose-300 flex items-center justify-center shadow-lg md:w-20 md:h-20">
                <img 
                  src="https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/kundli_analyser/graha_devta/venus.png"
                  alt="Venus"
                  className="w-20 h-20 object-contain md:w-16 md:h-16"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="text-4xl hidden md:text-3xl">♀</div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-4 md:text-xl md:mb-3">
                {language === 'hindi' ? 'शुक्र (Venus)' : 'Shukra (Venus)'}
              </h2>
              
              {/* Tags - Venus themed colors */}
              <div className="flex flex-wrap justify-center gap-2 mb-6 md:mb-4">
                <span className="bg-yellow-600 text-white px-4 py-2 rounded-full text-sm font-medium md:px-3 md:py-1 md:text-xs">
                  Dhanishtha
                </span>
                <span className="bg-yellow-600 text-white px-4 py-2 rounded-full text-sm font-medium md:px-3 md:py-1 md:text-xs">
                  Aquarius
                </span>
                <span className="bg-yellow-600 text-white px-4 py-2 rounded-full text-sm font-medium md:px-3 md:py-1 md:text-xs">
                  3 House
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-base text-gray-700 leading-relaxed text-center px-2 md:text-sm">
                {language === 'hindi' 
                  ? "शुक्र, जिसे अंग्रेजी में वीनस कहते हैं, संस्कृत में उज्ज्वल प्रकाश और गर्मजोशी का अर्थ है। शुक्र हमारे प्रेम की भावनाओं और जीवन में सुंदरता और सद्भावना की हमारी इच्छा का प्रतिनिधित्व करता है। यह हमें अच्छे, सुंदर और शुद्ध की ओर प्रेरित करता है।"
                  : "Shukra, known as Venus in English, means bright light and warmth in Sanskrit. Shukra represents our feelings of love and our desire for beauty and harmony in life. It inspires us towards what is good, beautiful, and pure. Shukra provides the energy to move and inspire others, making a person peaceful, loving, and understanding."
                }
              </p>
            </div>

            {/* House Report - Venus themed colors */}
            {venusData && venusData.house_report && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-400 mb-6">
                <p className="text-base text-gray-700 leading-relaxed md:text-sm">
                  {stripHtmlTags(venusData.house_report)}
                </p>
              </div>
            )}

            {/* Vastu Wealth Secrets Section - Venus themed */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200 mb-6">
              <div className="mb-4 md:mb-3">
                <button className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:shadow-md transition-all border-2 border-pink-600 md:text-xs">
                  {language === 'hindi' ? 'आपके लिए वास्तु धन रहस्य!' : 'VASTU WEALTH SECRETS FOR YOU!'}
                </button>
              </div>
              
              <div className="flex items-start space-x-4 md:space-x-3">
                <div className="flex-1">
                  <p className="text-sm text-gray-700 mb-3 leading-relaxed md:text-xs md:mb-2">
                    {language === 'hindi' 
                      ? "वास्तु और ग्रह संरेखण के रहस्यों को उजागर करें ताकि आपका रहने का स्थान एक धन चुंबक में बदल जाए। आपके लिए विशेष रूप से तैयार किए गए चरणबद्ध, रंग-कोडित उपचार और शक्तिशाली मंत्र।"
                      : "Reveal the secrets of Vastu and planetary alignments to transform your living space into a money magnet. Step-by-step, color-coded treatments and powerful mantras tailored just for you."
                    }
                  </p>
                  <p className="text-sm text-gray-700 mb-3 leading-relaxed md:text-xs md:mb-2">
                    {language === 'hindi' 
                      ? "सटीक दिशा निर्देश और उपचारात्मक समाधानों के साथ अपने घर में समृद्धि क्षेत्रों को अनलॉक करें।"
                      : "Unlock abundance zones in your home with precise directional guidance and remedial solutions."
                    }
                  </p>
                  <div className="mt-3">
                    <button className="text-purple-600 text-sm font-semibold underline hover:text-purple-700 md:text-xs">
                      {language === 'hindi' ? 'मेरे रहस्य प्रकट करें →' : 'Reveal My Secrets →'}
                    </button>
                  </div>
                </div>
                <div className="w-20 h-24 bg-gradient-to-br from-purple-600 to-pink-700 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0 md:w-16 md:h-20">
                  <div className="text-white text-xs font-bold text-center leading-tight px-2 md:text-[10px]">
                    {language === 'hindi' ? 'आपकी समृद्धि रिपोर्ट' : 'YOUR ABUNDANCE REPORT'}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom padding for scrolling */}
            <div className="h-4"></div>
          </div>

          {/* Navigation - Fixed at bottom */}
          <Navigation 
            currentPage="planets/venus"
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

export default VenusAnalysis;