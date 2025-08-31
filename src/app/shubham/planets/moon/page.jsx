'use client'
import React, { useState, useEffect } from 'react';
import { useKundli } from '../../context/KundliContext';
import Navigation from '../../components/Navigation';
import Link from 'next/link';

const Moon = () => {
  const [moonData, setMoonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { formData, language } = useKundli();

  // API configuration
  const API_CONFIG = {
    userId: '643886',
    apiKey: '8cfa24ac82f34fa17f090ed5a6a2122b9f3e10bf',
    baseUrl: 'https://json.astrologyapi.com/v1',
    api: 'general_house_report/moon'
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

  // Translations - Updated structure
  const translations = {
    loading: language === 'hindi' ? 'चंद्र विश्लेषण लोड हो रहा है...' : 'Loading Moon Analysis...',
    error: language === 'hindi' ? 'डेटा लोड करने में त्रुटि' : 'Error Loading Data',
    retry: language === 'hindi' ? 'पुनः प्रयास करें' : 'Retry',
    next: language === 'hindi' ? 'अगला →' : 'Next →',
    back: language === 'hindi' ? 'वापस' : 'Back',
    title: language === 'hindi' ? 'चंद्र (Moon)' : 'Chandra (Moon)',
    description: language === 'hindi' 
      ? "चंद्र एक सात्विक या आध्यात्मिक ग्रह है। यह विश्वास, ईमानदारी, शांति और आनंद की भावनाओं को लाता है। यह देवी की दयालुता, दिव्य माता को दर्शाता है। चंद्र महिला गुणों का प्रतिनिधित्व करता है, सुंदरता और आकर्षण प्रदान करता है। मानवीय रिश्तों में, चंद्र माता के समान है। यह हमारी भावनाओं, मन और अंतर्ज्ञान का प्रतिनिधित्व करता है।"
      : "Chandra is a sattvic or a spiritual planet. It brings feelings of trust, honesty, calmness, and joy. It shows the kindness of the Goddess, the divine Mother. Chandra represents female qualities, giving beauty and charm. In human relationships, Chandra is like the Mother. It represents our emotions, mind, and intuition, governing our subconscious and emotional responses to life.",
    personalizedMap: language === 'hindi' ? 'गहरी कुंडली विश्लेषण' : 'IN-DEPTH KUNDLI BREAKDOWN',
    kundliReport: language === 'hindi' ? 'आपकी संपूर्ण कुंडली' : 'YOUR COMPLETE KUNDLI'
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

  // Function to simulate Moon data if API fails (fallback)
  const loadFallbackData = () => {
    const fallbackData = {
      house_report: language === 'hindi' 
        ? "चंद्र ग्रह आपकी जन्म कुंडली में मकर राशि के उत्तराषाढ़ा नक्षत्र में 2वें भाव में स्थित है। यह स्थिति आपको भावनात्मक स्थिरता, पारिवारिक मूल्यों के प्रति लगाव, और धन संचय की प्रवृत्ति प्रदान करती है। आप एक संवेदनशील और देखभाल करने वाले व्यक्तित्व के मालिक हैं। आपका मन व्यावहारिक मामलों में तेज़ है और आप सुरक्षा की तलाश करते हैं। यह स्थिति पारिवारिक परंपराओं और संस्कारों के प्रति गहरा सम्मान दर्शाती है। आप भोजन, कला और सुंदरता से प्रेम करते हैं। मानसिक शांति के लिए प्रकृति के साथ समय बिताना आपके लिए लाभकारी है।"
        : "The Moon is positioned in the 2nd house of your birth chart in Capricorn sign under Uttara Ashadha nakshatra. This placement gives you emotional stability, attachment to family values, and a tendency to accumulate wealth. You have a sensitive and caring personality. Your mind is sharp in practical matters and you seek security. This position shows deep respect for family traditions and values. You love food, art, and beauty. Your emotional well-being is closely tied to your sense of financial and material security. Spending time with nature is beneficial for your mental peace and emotional balance."
    };
    
    console.log('Loading fallback Moon data:', fallbackData);
    setMoonData(fallbackData);
  };

  // Function to fetch Moon analysis data
  const fetchMoonData = async () => {
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
      console.log('Moon Data received from API:', data);
      
      // Validate the response data
      if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
        throw new Error('No data received from API');
      }
      
      // Check if we have the expected structure
      if (!data.house_report && !data.planet) {
        console.warn('Unexpected API response structure:', data);
        throw new Error('Invalid API response structure');
      }
      
      setMoonData(data);
      console.log('Moon data set successfully:', data);
      
    } catch (error) {
      console.error('Error fetching Moon data:', error);
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
    fetchMoonData();
  }, [language]); // Re-fetch when language changes

  // Function to handle next button click
  const handleNext = () => {
    window.location.href = '/shubham/planets/mars';
  };

  // Function to handle back button click
  const handleBack = () => {
    window.location.href = '/shubham/planets/sun';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-gray-50 rounded-lg p-8 shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-center mt-4 text-gray-600">{translations.loading}</p>
        </div>
      </div>
    );
  }

  if (error && !moonData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="bg-gray-50 rounded-lg p-8 shadow-xl max-w-md w-full">
          <div className="text-red-600 text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold mb-2">{translations.error}</h2>
            <p className="text-sm text-gray-600 mb-4">{error}</p>
            <div className="flex flex-col space-y-2">
              <button 
                onClick={fetchMoonData} 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
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
        <div className="bg-gradient-to-b from-gray-50 via-blue-50 to-purple-50 min-h-screen md:min-h-0 flex flex-col md:rounded-3xl md:shadow-2xl md:overflow-hidden md:h-[95vh]">
          {/* Header - Fixed with sticky positioning */}
          <div className="text-center pt-8 pb-6 px-6 flex-shrink-0 md:pt-6 md:pb-4 bg-gradient-to-b from-gray-50 via-blue-50 to-purple-50 sticky top-0 z-10 md:relative md:sticky-none">
            <div className="flex items-center justify-center mb-6 md:mb-3">
              <div className="text-orange-500 text-xl font-bold md:text-lg">Nakshatra</div>
              <div className="text-blue-500 text-xl font-bold md:text-lg">One</div>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto px-6 pb-6 md:scrollbar-thin md:scrollbar-thumb-gray-300 md:scrollbar-track-transparent">
            {/* Moon Image and Title */}
            <div className="text-center mb-6">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center shadow-lg md:w-20 md:h-20">
                <img 
                  src="https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/kundli_analyser/graha_devta/moon.png"
                  alt="Moon"
                  className="w-20 h-20 object-contain md:w-16 md:h-16"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="text-4xl hidden md:text-3xl">☽</div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-4 md:text-xl md:mb-3">{translations.title}</h2>
              
              {/* Blue Tags - Updated to match other components' styling */}
              <div className="flex flex-wrap justify-center gap-2 mb-6 md:mb-4">
                <span className="bg-blue-400 text-white px-4 py-2 rounded-full text-sm font-medium md:px-3 md:py-1 md:text-xs">
                  Uttara Ashadha
                </span>
                <span className="bg-blue-400 text-white px-4 py-2 rounded-full text-sm font-medium md:px-3 md:py-1 md:text-xs">
                  Capricorn
                </span>
                <span className="bg-blue-400 text-white px-4 py-2 rounded-full text-sm font-medium md:px-3 md:py-1 md:text-xs">
                  2 House
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-base text-gray-700 leading-relaxed text-center px-2 md:text-sm">
                {translations.description}
              </p>
            </div>

            {/* House Report - Blue bordered section */}
            {moonData && moonData.house_report && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-300 mb-6">
                <p className="text-base text-gray-700 leading-relaxed md:text-sm">
                  {stripHtmlTags(moonData.house_report)}
                </p>
              </div>
            )}

            {/* Kundli Breakdown Section - Updated like other components */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 border border-orange-200 mb-6">
              <div className="mb-4 md:mb-3">
                <button className="bg-gradient-to-r cursor-pointer from-blue-400 to-indigo-400 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:shadow-md transition-all border-2 border-blue-500 md:text-xs">
                   <Link href="/shubham/subscription">{translations.personalizedMap}</Link>
                
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
                  <div className="bg-blue-200 px-3 py-1 rounded-lg inline-block md:px-2">
                    <span className="text-sm font-semibold text-gray-800 md:text-xs">
                      {language === 'hindi' ? 'अपनी नियति जानें ⭐' : 'Know Your Destiny ⭐'}
                    </span>
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
            currentPage="planets/moon"
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

export default Moon;