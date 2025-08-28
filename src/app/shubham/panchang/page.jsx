'use client'
import React, { useState, useEffect } from 'react';
import { useKundli } from '../context/KundliContext';
import Navigation from '../components/Navigation';

const PanchangDetails = () => {
  const [panchangData, setPanchangData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { language, formData } = useKundli();

  // API configuration (same as Jupiter pattern)
  const API_CONFIG = {
    userId: '643886',
    apiKey: '8cfa24ac82f34fa17f090ed5a6a2122b9f3e10bf',
    baseUrl: 'https://json.astrologyapi.com/v1',
    api: 'advanced_panchang',
    // Helper method to generate auth header
    getAuthHeader: function() {
      const credentials = `${this.userId}:${this.apiKey}`;
      return `Basic ${btoa(credentials)}`;
    },
    // Helper method to get language header value
    getLanguageHeader: function(lang) {
      return lang === 'hindi' ? 'hi' : 'en';
    }
  };

  // Map language to API language parameter
  const apiLanguage = language === 'hindi' ? 'hi' : 'en';

  // Translations
  const translations = {
    loading: language === 'hindi' ? "आज का पंचांग लोड हो रहा है..." : "Loading Today's Panchang...",
    error: language === 'hindi' ? "डेटा लोड करने में त्रुटि" : "Error Loading Data",
    retry: language === 'hindi' ? "पुनः प्रयास करें" : "Retry",
    loadDemo: language === 'hindi' ? "डेमो डेटा लोड करें" : "Load Demo Data",
    title: language === 'hindi' ? " वैदिक कैलेंडर - पंचांग" : " Vedic Calendar - Panchang",
    next: language === 'hindi' ? "अगला →" : "Next →",
    back: language === 'hindi' ? "वापस" : "Back"
  };
   
  // Use birth details from context or fallback to defaults
  const birthDetails = formData && typeof formData === 'object' ? formData : {
    name: "Shubham",
    day: 4,
    month: 8,
    year: 2004,
    hour: 7,
    min: 45,
    lat: 19.132,
    lon: 72.342,
    tzone: 5.5
  };

  // Using API_CONFIG.getAuthHeader() instead of standalone function

  // Function to load fallback demo data
  const loadFallbackData = () => {
    const fallbackData = {
      sunrise: "06:42:15",
      sunset: "18:30:45",
      vedic_sunrise: "06:42:15",
      vedic_sunset: "18:30:45",
      moonrise: "14:23:12",
      moonset: "02:15:30",
      tithi: {
        details: {
          tithi_name: language === 'hindi' ? "पूर्णिमा" : "Purnima",
          tithi_number: 15,
          deity: language === 'hindi' ? "विष्णु" : "Vishnu",
          special: language === 'hindi' ? "अत्यंत शुभ" : "Highly Auspicious",
          summary: language === 'hindi' 
            ? "यह तिथि पूजा-पाठ और धार्मिक कार्यों के लिए अत्यंत शुभ है। इस दिन व्रत रखना और दान करना विशेष फलदायी होता है।"
            : "This tithi is extremely auspicious for worship and religious activities. Fasting and charity on this day brings special benefits."
        },
        end_time: { hour: 14, minute: 32, second: 15 }
      },
      nakshatra: {
        details: {
          nak_name: language === 'hindi' ? "रोहिणी" : "Rohini",
          nak_number: 4,
          ruler: language === 'hindi' ? "चंद्र" : "Moon",
          deity: language === 'hindi' ? "ब्रह्मा" : "Brahma",
          special: language === 'hindi' ? "कृषि कार्य के लिए उत्तम" : "Excellent for agricultural work",
          summary: language === 'hindi'
            ? "यह नक्षत्र कृषि, व्यापार और सौंदर्य संबंधी कार्यों के लिए अत्यंत शुभ है।"
            : "This nakshatra is highly favorable for agriculture, trade, and beauty-related activities."
        },
        end_time: { hour: 16, minute: 45, second: 30 }
      },
      yog: {
        details: {
          yog_name: language === 'hindi' ? "शुभ योग" : "Shubha Yoga",
          yog_number: 5,
          special: language === 'hindi' ? "सभी शुभ कार्यों के लिए उत्तम" : "Excellent for all auspicious activities",
          meaning: language === 'hindi'
            ? "यह योग सभी प्रकार के शुभ कार्यों, नई शुरुआत और महत्वपूर्ण निर्णयों के लिए अत्यंत लाभकारी है।"
            : "This yoga is highly beneficial for all auspicious activities, new beginnings, and important decisions."
        },
        end_time: { hour: 12, minute: 20, second: 45 }
      },
      karan: {
        details: {
          karan_name: language === 'hindi' ? "बव" : "Bava",
          karan_number: 1,
          deity: language === 'hindi' ? "इंद्र" : "Indra",
          special: language === 'hindi' ? "नेतृत्व और साहस बढ़ाने वाला" : "Enhances leadership and courage"
        },
        end_time: { hour: 8, minute: 15, second: 20 }
      },
      sun_sign: language === 'hindi' ? "सिंह" : "Leo",
      moon_sign: language === 'hindi' ? "वृषभ" : "Taurus",
      paksha: language === 'hindi' ? "शुक्ल पक्ष" : "Shukla Paksha",
      ritu: language === 'hindi' ? "वर्षा" : "Rainy Season",
      hindu_maah: {
        purnimanta: language === 'hindi' ? "श्रावण" : "Shravan",
        amanta: language === 'hindi' ? "श्रावण" : "Shravan"
      },
      vikram_samvat: 2081,
      vkram_samvat_name: language === 'hindi' ? "खर" : "Khara",
      shaka_samvat: 1946,
      shaka_samvat_name: language === 'hindi' ? "खर" : "Khara",
      abhijit_muhurta: {
        start: "12:05:30",
        end: "12:53:15"
      },
      rahukaal: {
        start: "09:15:30",
        end: "10:45:15"
      },
      guliKaal: {
        start: "13:30:45",
        end: "15:00:30"
      },
      yamghant_kaal: {
        start: "07:45:20",
        end: "09:15:05"
      },
      disha_shool: language === 'hindi' ? "पूर्व" : "East",
      nak_shool: {
        direction: language === 'hindi' ? "उत्तर" : "North"
      },
      moon_nivas: language === 'hindi' ? "वृक्ष" : "Tree",
      ayana: language === 'hindi' ? "दक्षिणायन" : "Dakshinayana"
    };
    
    console.log('Loading fallback Panchang data:', fallbackData);
    setPanchangData(fallbackData);
  };

  // Function to fetch Panchang data (updated to match Jupiter pattern)
  const fetchPanchangData = async () => {
    try {
      setLoading(true);
      setError(''); // Clear previous errors
      
      // Validate birth details first with proper type conversion
      const safeDetails = {
        day: parseInt(birthDetails?.day) || 4,
        month: parseInt(birthDetails?.month) || 8,
        year: parseInt(birthDetails?.year) || 2004,
        hour: parseInt(birthDetails?.hour) || 7,
        min: parseInt(birthDetails?.min) || 45,
        lat: parseFloat(birthDetails?.lat) || 19.132,
        lon: parseFloat(birthDetails?.lon) || 72.342,
        tzone: parseFloat(birthDetails?.tzone) || 5.5
      };
      
      console.log('Birth details being used:', safeDetails);
      console.log(`Fetching Panchang data from API: ${API_CONFIG.baseUrl}/${API_CONFIG.api}`);
      
      try {
        const response = await fetch(`${API_CONFIG.baseUrl}/${API_CONFIG.api}`, {
          method: 'POST',
          headers: {
            'Authorization': API_CONFIG.getAuthHeader(),
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Accept-Language': API_CONFIG.getLanguageHeader(language)
          },
          body: JSON.stringify(safeDetails)
        });
        
        console.log('API response status:', response.status);
        
        if (!response.ok) {
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
        console.log('Panchang Data received:', data);
        
        // Validate the response data
        if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
          throw new Error('No data received from API');
        }
        
        // Check if the response has the expected structure
        if (!data.tithi && !data.nakshatra) {
          console.warn('API response missing expected fields');
          throw new Error('Invalid data structure received from API');
        }
        
        setPanchangData(data);
        
      } catch (apiError) {
        console.error('API request failed:', apiError);
        console.log('Loading fallback data due to API error');
        loadFallbackData();
      }
      
      const data = await response.json();
      console.log('Panchang Data:', data);
      
      // Validate the response data
      if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
        throw new Error('No data received from API');
      }
      
      setPanchangData(data);
      
      
    } catch (error) {
      console.error('Error fetching Panchang data:', error);
      
      // Auto-load demo data on any error
      loadFallbackData();
      
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount - updated to match Jupiter pattern
  useEffect(() => {
    console.log('Panchang component mounted or language changed');
    console.log('Current language:', language);
    console.log('Context data:', { language, formData });
    console.log('Birth details being used:', birthDetails);
    
    // Fetch panchang data with current language and birth details
    fetchPanchangData();
    
    // Debug log for development
    console.log(`Panchang data fetch initiated with language: ${language}`);
  }, [language]); // Re-fetch when language changes

  // Function to handle next button click
  const handleNext = () => {
    window.location.href = '/shubham/planets/sun';
  };

  // Function to handle back button click
  const handleBack = () => {
    window.location.href = '/shubham/dashboard';
  };

  // Function to format time
  const formatTime = (timeObj) => {
    if (!timeObj) return 'N/A';
    const { hour, minute, second } = timeObj;
    const h = hour % 24; // Handle 24+ hours
    return `${h.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
  };

  // Function to get element color class
  const getElementColorClass = (type) => {
    const colorClasses = {
      'tithi': 'from-blue-100 to-blue-50 border-blue-300',
      'nakshatra': 'from-purple-100 to-purple-50 border-purple-300',
      'yog': 'from-green-100 to-green-50 border-green-300',
      'karan': 'from-yellow-100 to-yellow-50 border-yellow-300',
      'time': 'from-red-100 to-red-50 border-red-300'
    };
    return colorClasses[type] || 'from-gray-100 to-gray-50 border-gray-300';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-gray-50 rounded-lg p-8 shadow-xl max-w-md w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <h2 className="text-center mt-4 font-medium text-gray-800">{translations.loading}</h2>
          <p className="text-center mt-2 text-sm text-gray-600">
            {language === 'hindi' ? 'आपका वैदिक पंचांग विश्लेषण किया जा रहा है...' : 'Analyzing your Vedic calendar details...'}
          </p>
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
                onClick={fetchPanchangData} 
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                {translations.retry}
              </button>
              <button 
                onClick={loadFallbackData} 
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                {translations.loadDemo}
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
            {panchangData && (
              <>
                {/* Main Title */}
                <div className="text-center mt-5 mb-6">
                  <h1 className="text-xl font-bold text-gray-800 mb-2 leading-tight md:text-lg">
                    {translations.title}
                  </h1>
                </div>

                {/* Panchang Image */}
                <div className="text-center mb-6">
                  <div className="w-full max-w-xs mx-auto mb-4">
                    <img 
                      src="https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/kundli_analyser/panchang.png"
                      alt="Panchang - Sacred Time"
                      className="w-full h-auto object-contain rounded-lg"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div className="hidden bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg p-8 border-2 border-yellow-200">
                      <div className="text-6xl mb-4">🕉️</div>
                      <div className="text-sm text-gray-600">Sacred Time</div>
                    </div>
                  </div>
                </div>

                {/* Sun & Moon Times */}
                <div className={`bg-gradient-to-r ${getElementColorClass('time')} rounded-xl p-4 border mb-6`}>
                  <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                    <span className="text-2xl mr-2">🌅</span>
                    {language === 'hindi' ? 'खगोलीय समय' : 'Celestial Timings'}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white bg-opacity-70 rounded-lg p-3 text-center">
                      <div className="text-xs font-semibold text-gray-600 mb-1">
                        {language === 'hindi' ? 'सूर्योदय' : 'Sunrise'}
                      </div>
                      <div className="text-sm font-bold text-gray-800">{panchangData.sunrise}</div>
                      <div className="text-xs text-gray-500">
                        {language === 'hindi' ? 'वैदिक' : 'Vedic'}: {panchangData.vedic_sunrise}
                      </div>
                    </div>
                    <div className="bg-white bg-opacity-70 rounded-lg p-3 text-center">
                      <div className="text-xs font-semibold text-gray-600 mb-1">
                        {language === 'hindi' ? 'सूर्यास्त' : 'Sunset'}
                      </div>
                      <div className="text-sm font-bold text-gray-800">{panchangData.sunset}</div>
                      <div className="text-xs text-gray-500">
                        {language === 'hindi' ? 'वैदिक' : 'Vedic'}: {panchangData.vedic_sunset}
                      </div>
                    </div>
                    <div className="bg-white bg-opacity-70 rounded-lg p-3 text-center">
                      <div className="text-xs font-semibold text-gray-600 mb-1">
                        {language === 'hindi' ? 'चंद्रोदय' : 'Moonrise'}
                      </div>
                      <div className="text-sm font-bold text-gray-800">{panchangData.moonrise}</div>
                    </div>
                    <div className="bg-white bg-opacity-70 rounded-lg p-3 text-center">
                      <div className="text-xs font-semibold text-gray-600 mb-1">
                        {language === 'hindi' ? 'चंद्रास्त' : 'Moonset'}
                      </div>
                      <div className="text-sm font-bold text-gray-800">{panchangData.moonset}</div>
                    </div>
                  </div>
                </div>

                {/* Tithi */}
                <div className={`bg-gradient-to-r ${getElementColorClass('tithi')} rounded-xl p-4 border mb-6`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-800 md:text-base flex items-center">
                      <span className="text-2xl mr-2">🌙</span>
                      {language === 'hindi' ? 'तिथि' : 'Tithi'}
                    </h3>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-800">{panchangData.tithi.details.tithi_name}</div>
                      <div className="text-xs text-gray-600">
                        {language === 'hindi' ? 'समाप्ति' : 'Ends'}: {formatTime(panchangData.tithi.end_time)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="bg-white bg-opacity-70 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-semibold text-gray-600">
                          {language === 'hindi' ? 'संख्या:' : 'Number:'}
                        </span>
                        <span className="text-sm font-bold text-gray-800">{panchangData.tithi.details.tithi_number}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-semibold text-gray-600">
                          {language === 'hindi' ? 'देवता:' : 'Deity:'}
                        </span>
                        <span className="text-sm font-bold text-gray-800">{panchangData.tithi.details.deity}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-gray-600">
                          {language === 'hindi' ? 'विशेष:' : 'Special:'}
                        </span>
                        <span className="text-sm font-bold text-gray-800">{panchangData.tithi.details.special}</span>
                      </div>
                    </div>
                    <div className="bg-blue-100 rounded-lg p-3">
                      <p className="text-xs text-gray-700">{panchangData.tithi.details.summary}</p>
                    </div>
                  </div>
                </div>

                {/* Nakshatra */}
                <div className={`bg-gradient-to-r ${getElementColorClass('nakshatra')} rounded-xl p-4 border mb-6`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-800 md:text-base flex items-center">
                      <span className="text-2xl mr-2">⭐</span>
                      {language === 'hindi' ? 'नक्षत्र' : 'Nakshatra'}
                    </h3>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-800">{panchangData.nakshatra.details.nak_name}</div>
                      <div className="text-xs text-gray-600">
                        {language === 'hindi' ? 'समाप्ति' : 'Ends'}: {formatTime(panchangData.nakshatra.end_time)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="bg-white bg-opacity-70 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-semibold text-gray-600">
                          {language === 'hindi' ? 'संख्या:' : 'Number:'}
                        </span>
                        <span className="text-sm font-bold text-gray-800">{panchangData.nakshatra.details.nak_number}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-semibold text-gray-600">
                          {language === 'hindi' ? 'शासक:' : 'Ruler:'}
                        </span>
                        <span className="text-sm font-bold text-gray-800">{panchangData.nakshatra.details.ruler}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-gray-600">
                          {language === 'hindi' ? 'देवता:' : 'Deity:'}
                        </span>
                        <span className="text-sm font-bold text-gray-800">{panchangData.nakshatra.details.deity}</span>
                      </div>
                    </div>
                    <div className="bg-purple-100 rounded-lg p-3">
                      <div className="text-xs font-semibold text-purple-800 mb-1">
                        {language === 'hindi' ? 'विशेष:' : 'Special:'} {panchangData.nakshatra.details.special}
                      </div>
                      <p className="text-xs text-gray-700">{panchangData.nakshatra.details.summary}</p>
                    </div>
                  </div>
                </div>

                {/* Yoga */}
                <div className={`bg-gradient-to-r ${getElementColorClass('yog')} rounded-xl p-4 border mb-6`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-800 md:text-base flex items-center">
                      <span className="text-2xl mr-2">🧘</span>
                      {language === 'hindi' ? 'योग' : 'Yoga'}
                    </h3>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-800">{panchangData.yog.details.yog_name}</div>
                      <div className="text-xs text-gray-600">
                        {language === 'hindi' ? 'समाप्ति' : 'Ends'}: {formatTime(panchangData.yog.end_time)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="bg-white bg-opacity-70 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-semibold text-gray-600">
                          {language === 'hindi' ? 'संख्या:' : 'Number:'}
                        </span>
                        <span className="text-sm font-bold text-gray-800">{panchangData.yog.details.yog_number}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-gray-600">
                          {language === 'hindi' ? 'विशेष:' : 'Special:'}
                        </span>
                        <span className="text-sm font-bold text-gray-800">{panchangData.yog.details.special}</span>
                      </div>
                    </div>
                    <div className="bg-green-100 rounded-lg p-3">
                      <p className="text-xs text-gray-700">{panchangData.yog.details.meaning}</p>
                    </div>
                  </div>
                </div>

                {/* Karana */}
                <div className={`bg-gradient-to-r ${getElementColorClass('karan')} rounded-xl p-4 border mb-6`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-800 md:text-base flex items-center">
                      <span className="text-2xl mr-2">⚡</span>
                      {language === 'hindi' ? 'करण' : 'Karana'}
                    </h3>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-800">{panchangData.karan.details.karan_name}</div>
                      <div className="text-xs text-gray-600">
                        {language === 'hindi' ? 'समाप्ति' : 'Ends'}: {formatTime(panchangData.karan.end_time)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="bg-white bg-opacity-70 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-semibold text-gray-600">
                          {language === 'hindi' ? 'संख्या:' : 'Number:'}
                        </span>
                        <span className="text-sm font-bold text-gray-800">{panchangData.karan.details.karan_number}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-gray-600">
                          {language === 'hindi' ? 'देवता:' : 'Deity:'}
                        </span>
                        <span className="text-sm font-bold text-gray-800">{panchangData.karan.details.deity}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Information Section */}
                <div className="bg-gradient-to-br from-gray-50 to-orange-50 rounded-xl p-4 border border-gray-200 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                    <span className="text-2xl mr-2">📅</span>
                    {language === 'hindi' ? 'अतिरिक्त जानकारी' : 'Additional Information'}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white bg-opacity-70 rounded-lg p-3 text-center">
                      <div className="text-xs font-semibold text-gray-600 mb-1">
                        {language === 'hindi' ? 'सूर्य राशि' : 'Sun Sign'}
                      </div>
                      <div className="text-sm font-bold text-gray-800">{panchangData.sun_sign}</div>
                    </div>
                    <div className="bg-white bg-opacity-70 rounded-lg p-3 text-center">
                      <div className="text-xs font-semibold text-gray-600 mb-1">
                        {language === 'hindi' ? 'चंद्र राशि' : 'Moon Sign'}
                      </div>
                      <div className="text-sm font-bold text-gray-800">{panchangData.moon_sign}</div>
                    </div>
                    <div className="bg-white bg-opacity-70 rounded-lg p-3 text-center">
                      <div className="text-xs font-semibold text-gray-600 mb-1">
                        {language === 'hindi' ? 'पक्ष' : 'Paksha'}
                      </div>
                      <div className="text-sm font-bold text-gray-800">{panchangData.paksha}</div>
                    </div>
                    <div className="bg-white bg-opacity-70 rounded-lg p-3 text-center">
                      <div className="text-xs font-semibold text-gray-600 mb-1">
                        {language === 'hindi' ? 'ऋतु' : 'Season'}
                      </div>
                      <div className="text-sm font-bold text-gray-800">{panchangData.ritu}</div>
                    </div>
                  </div>
                </div>

                {/* Muhurat Section */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                    <span className="text-2xl mr-2">⏰</span>
                    {language === 'hindi' ? 'शुभ एवं अशुभ समय' : 'Auspicious & Inauspicious Times'}
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="bg-white bg-opacity-70 rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-green-700">
                          {language === 'hindi' ? 'अभिजीत मुहूर्त:' : 'Abhijit Muhurta:'}
                        </span>
                        <span className="text-sm font-bold text-gray-800">
                          {panchangData.abhijit_muhurta?.start} - {panchangData.abhijit_muhurta?.end}
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-white bg-opacity-70 rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-red-700">
                          {language === 'hindi' ? 'राहुकाल:' : 'Rahu Kaal:'}
                        </span>
                        <span className="text-sm font-bold text-gray-800">
                          {panchangData.rahukaal?.start} - {panchangData.rahukaal?.end}
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-white bg-opacity-70 rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-red-700">
                          {language === 'hindi' ? 'गुलिक काल:' : 'Gulik Kaal:'}
                        </span>
                        <span className="text-sm font-bold text-gray-800">
                          {panchangData.guliKaal?.start} - {panchangData.guliKaal?.end}
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-white bg-opacity-70 rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-red-700">
                          {language === 'hindi' ? 'यमघंट काल:' : 'Yamghant Kaal:'}
                        </span>
                        <span className="text-sm font-bold text-gray-800">
                          {panchangData.yamghant_kaal?.start} - {panchangData.yamghant_kaal?.end}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vedic Calendar Section */}
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-200 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                    <span className="text-2xl mr-2">📜</span>
                    {language === 'hindi' ? 'वैदिक कैलेंडर' : 'Vedic Calendar'}
                  </h3>
                  
                  <div className="space-y-2">
                    <div className="bg-white bg-opacity-70 rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-gray-600">
                          {language === 'hindi' ? 'हिंदू मास:' : 'Hindu Month:'}
                        </span>
                        <span className="text-sm font-bold text-gray-800">{panchangData.hindu_maah?.purnimanta}</span>
                      </div>
                    </div>
                    
                    <div className="bg-white bg-opacity-70 rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-gray-600">
                          {language === 'hindi' ? 'विक्रम संवत:' : 'Vikram Samvat:'}
                        </span>
                        <span className="text-sm font-bold text-gray-800">{panchangData.vikram_samvat}</span>
                      </div>
                    </div>
                    
                    <div className="bg-white bg-opacity-70 rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-gray-600">
                          {language === 'hindi' ? 'शक संवत:' : 'Shaka Samvat:'}
                        </span>
                        <span className="text-sm font-bold text-gray-800">{panchangData.shaka_samvat}</span>
                      </div>
                    </div>
                    
                    <div className="bg-white bg-opacity-70 rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-gray-600">
                          {language === 'hindi' ? 'अयन:' : 'Ayana:'}
                        </span>
                        <span className="text-sm font-bold text-gray-800">{panchangData.ayana}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Wealth Map Section - Panchang themed */}
                <div className="bg-gradient-to-br from-gray-50 to-orange-50 rounded-xl p-4 border border-gray-200 mb-6">
                  <div className="mb-4 md:mb-3">
                    <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:shadow-md transition-all border-2 border-orange-600 md:text-xs">
                      {language === 'hindi' ? 'आपके लिए व्यक्तिगत पंचांग गाइड!' : 'PERSONALIZED PANCHANG GUIDE FOR YOU!'}
                    </button>
                  </div>
                  
                  <div className="flex items-start space-x-4 md:space-x-3">
                    <div className="flex-1">
                      <p className="text-sm text-gray-700 mb-3 leading-relaxed md:text-xs md:mb-2">
                        {language === 'hindi' 
                          ? "व्यक्तिगत ज्योतिष अंतर्दृष्टि के साथ अपने जीवन की छुपी हुई संभावनाओं को अनलॉक करें। शक्तिशाली मुहूर्त और सरल उपायों की खोज करें।"
                          : "Unlock your life's hidden potential with personalized astrological insights. Discover powerful muhurtas and simple remedies."
                        }
                      </p>
                      <p className="text-sm text-gray-700 mb-3 leading-relaxed md:text-xs md:mb-2">
                        {language === 'hindi' 
                          ? "लक्षित शुभ समय रणनीतियां, तिथि सिफारिशें, और आपके जीवन के लिए विशेष रूप से डिज़ाइन किए गए ज्योतिष टिप्स प्राप्त करें।"
                          : "Get targeted auspicious timing strategies, tithi recommendations, and astrological tips designed specifically for your life."
                        }
                      </p>
                    </div>
                    <div className="w-20 h-24 bg-gradient-to-br from-orange-600 to-red-700 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0 md:w-16 md:h-20">
                      <div className="text-white text-xs font-bold text-center leading-tight px-2 md:text-[10px]">
                        {language === 'hindi' ? 'आपका पंचांग गाइड' : 'YOUR PANCHANG GUIDE'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom padding for scrolling */}
                <div className="h-4"></div>
              </>
            )}
          </div>

          {/* Navigation - Fixed at bottom */}
          <Navigation 
            currentPage="panchang"
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

export default PanchangDetails;