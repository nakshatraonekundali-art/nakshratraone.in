'use client'
import React, { useState, useEffect } from 'react';
import Navigation from '../../components/Navigation';
import { useKundli } from '../../context/KundliContext';
import Link from 'next/link';

const MercuryAnalysis = () => {
  const [mercuryData, setMercuryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { language, formData } = useKundli();

  // Translations
  const translations = {
    loading: language === 'hindi' ? 'बुध विश्लेषण लोड हो रहा है...' : 'Loading Mercury Analysis...',
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
    api: 'general_house_report/mercury'
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

  // Function to simulate Mercury data if API fails (fallback)
  const loadFallbackData = () => {
    const fallbackData = {
      house_report: language === 'hindi' 
        ? "बुध ग्रह आपकी जन्म कुंडली में वृश्चिक राशि के ज्येष्ठा नक्षत्र में 12वें भाव में स्थित है। यह स्थिति आपको गहन चिंतन, आध्यात्मिक ज्ञान और अंतर्दृष्टि की अद्भुत क्षमता प्रदान करती है। आपमें शोध और अनुसंधान की प्रबल प्रवृत्ति है। यह स्थिति आपको विदेशी भाषाओं, गुप्त विद्याओं और रहस्यमय विषयों में गहरी रुचि देती है। आपकी बुद्धि तीक्ष्ण है और आप जटिल समस्याओं को सुलझाने में कुशल हैं। हालांकि कभी-कभी आप अकेलापन महसूस कर सकते हैं, लेकिन यह आपकी आध्यात्मिक यात्रा का हिस्सा है। विदेशी संपर्क और दूर की यात्राएं आपके लिए लाभकारी हो सकती हैं।"
        : "Mercury is positioned in the 12th house of your birth chart in Scorpio sign under Jyeshtha nakshatra. This placement gives you profound thinking abilities, spiritual wisdom, and remarkable intuitive powers. You possess a strong inclination toward research and investigation. This position gives you deep interest in foreign languages, occult sciences, and mystical subjects. Your intellect is sharp and you are skilled at solving complex problems. While you may sometimes feel isolated, this is part of your spiritual journey. Foreign connections and distant travels can be highly beneficial for you. Your Mercury placement indicates a mind that seeks deeper truths and hidden knowledge."
    };
    
    console.log('Loading fallback Mercury data:', fallbackData);
    setMercuryData(fallbackData);
  };

  // Function to fetch Mercury analysis data
  const fetchMercuryData = async () => {
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
      console.log('Mercury Data received from API:', data);
      
      // Validate the response data
      if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
        throw new Error('No data received from API');
      }
      
      // Check if we have the expected structure
      if (!data.house_report && !data.planet) {
        console.warn('Unexpected API response structure:', data);
        throw new Error('Invalid API response structure');
      }
      
      setMercuryData(data);
      console.log('Mercury data set successfully:', data);
      
    } catch (error) {
      console.error('Error fetching Mercury data:', error);
      setError(error.message);
      
      // Load fallback data on any error
      console.log('Loading fallback data due to error:', error.message);
      loadFallbackData();
      
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    console.log('useKundli context data:', { language, formData });
    console.log('Birth details:', birthDetails);
    fetchMercuryData();
  }, [language]); // Re-fetch when language changes

  // Function to handle next button click
  const handleNext = () => {
    window.location.href = '/kundali/planets/jupiter';
  };

  // Function to handle back button click
  const handleBack = () => {
    window.location.href = '/kundali/planets/mars';
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="text-center mt-4 text-gray-600">{translations.loading}</p>
        </div>
      </div>
    );
  }

  if (error && !mercuryData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="bg-gray-50 rounded-lg p-8 shadow-xl max-w-md w-full">
          <div className="text-red-600 text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold mb-2">{translations.error}</h2>
            <p className="text-sm text-gray-600 mb-4">{error}</p>
            <div className="flex flex-col space-y-2">
              <button 
                onClick={fetchMercuryData} 
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
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
    <div className="min-h-screen bg-white md:bg-gradient-to-br md:from-purple-800 md:via-purple-600 md:to-blue-500 md:flex md:items-center md:justify-center md:p-4">
      {/* Mobile: Full width, Desktop: Centered card */}
      <div className="w-full max-w-full mx-auto md:max-w-lg">
        <div className="bg-gradient-to-b from-purple-50 via-blue-50 to-indigo-50 min-h-screen md:min-h-0 flex flex-col md:rounded-3xl md:shadow-2xl md:overflow-hidden md:h-[95vh]">
          {/* Header - Fixed */}
          <div className="text-center pt-8 pb-6 px-6 flex-shrink-0 md:pt-6 md:pb-4 bg-gradient-to-b from-purple-50 via-blue-50 to-indigo-50 sticky top-0 z-10 md:relative md:sticky-none">
            <div className="flex items-center justify-center mb-6 md:mb-3">
              <div className="text-orange-500 text-xl font-bold md:text-lg">Nakshatra</div>
              <div className="text-blue-500 text-xl font-bold md:text-lg">One</div>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto px-6 pb-6 md:scrollbar-thin md:scrollbar-thumb-gray-300 md:scrollbar-track-transparent">
            {/* Mercury Image and Title */}
            <div className="text-center mb-6">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-200 to-blue-300 flex items-center justify-center shadow-lg md:w-20 md:h-20">
                <img 
                  src="https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/kundli_analyser/graha_devta/mercury.png"
                  alt="Mercury"
                  className="w-20 h-20 object-contain md:w-16 md:h-16"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="text-4xl hidden md:text-3xl">☿</div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-4 md:text-xl md:mb-3">
                {language === 'hindi' ? 'बुध (Mercury)' : 'Buddh (Mercury)'}
              </h2>
              
              {/* Tags - Mercury themed colors */}
              <div className="flex flex-wrap justify-center gap-2 mb-6 md:mb-4">
                <span className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium md:px-3 md:py-1 md:text-xs">
                  Jyeshtha
                </span>
                <span className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium md:px-3 md:py-1 md:text-xs">
                  Scorpio
                </span>
                <span className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium md:px-3 md:py-1 md:text-xs">
                  12 House
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-base text-gray-700 leading-relaxed text-center px-2 md:text-sm">
                {language === 'hindi' 
                  ? "बुध संस्कृत नाम है मर्करी का। यह बुद्धि या जागरूकता का प्रतिनिधित्व करता है और 'बुद्धि' से जुड़ा है, जो मन की वह क्षमता है जो वास्तविक और अवास्तविक के बीच अंतर बता सकती है। बुध नियंत्रित करता है कि व्यक्ति स्कूल में कितना अच्छा करता है, गणित कैसे करता है, भाषा का उपयोग कैसे करता है और स्पष्ट रूप से कैसे बोलता है।"
                  : "Budha is the Sanskrit name for Mercury. It stands for intelligence or awareness and is linked to 'buddhi,' which is the mind's ability to tell what's real from what's not. Budha controls how well a person does in school, how well they can do math, use language, and speak clearly. Budha is the most changeable planet and can take on the qualities of other planets it's connected to."
                }
              </p>
            </div>

            {/* House Report - Mercury themed colors */}
            {mercuryData && mercuryData.house_report && (
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-300 mb-6">
                <p className="text-base text-gray-700 leading-relaxed md:text-sm">
                  {stripHtmlTags(mercuryData.house_report)}
                </p>
              </div>
            )}

            {/* Wealth Map Section - Mercury themed */}
            <div className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-xl p-4 border border-gray-200 mb-6">
              <div className="mb-4 md:mb-3 cursor-pointer">
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:shadow-md transition-all border-2 border-purple-600 md:text-xs">
                    <Link href="/kundali/subscription">{language === 'hindi' ? 'आपके लिए व्यक्तिगत संपत्ति मानचित्र!' : 'PERSONALIZED WEALTH MAP FOR YOU!'}</Link>
                
                </button>
              </div>
              
              <div className="flex items-start space-x-4 md:space-x-3">
                <div className="flex-1">
                  <p className="text-sm text-gray-700 mb-3 leading-relaxed md:text-xs md:mb-2">
                    {language === 'hindi' 
                      ? "व्यक्तिगत वास्तु अंतर्दृष्टि के साथ अपने घर की छुपी हुई समृद्धि को अनलॉक करें। शक्तिशाली धन-आकर्षक क्षेत्रों और सरल उपायों की खोज करें।"
                      : "Unlock your home's hidden prosperity with personalized Vastu insights. Discover powerful money-attracting zones and simple remedies."
                    }
                  </p>
                  <p className="text-sm text-gray-700 mb-3 leading-relaxed md:text-xs md:mb-2">
                    {language === 'hindi' 
                      ? "लक्षित धन सक्रियण रणनीतियां, रंग सिफारिशें, और आपके स्थान के लिए विशेष रूप से डिज़ाइन किए गए प्लेसमेंट टिप्स प्राप्त करें।"
                      : "Get targeted wealth activation strategies, color recommendations, and placement tips designed specifically for your space."
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
            currentPage="planets/mercurey"
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

export default MercuryAnalysis;