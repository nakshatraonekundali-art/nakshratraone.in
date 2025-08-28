'use client'
import React, { useState, useEffect } from 'react';
import { useKundli } from '../../shubham/context/KundliContext';
import Navigation from '../../shubham/components/Navigation';

const HoroscopeChart = () => {
  const [chartData, setChartData] = useState(null);
  const [chartImage, setChartImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { language, formData } = useKundli();

  // API configuration (same as Jupiter pattern)
  const API_CONFIG = {
    userId: '643886',
    apiKey: '8cfa24ac82f34fa17f090ed5a6a2122b9f3e10bf',
    baseUrl: 'https://json.astrologyapi.com/v1',
    chartDataApi: 'horo_chart/D1', // D1 for main birth chart
    chartImageApi: 'horo_chart_image/D1',
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

  // Use birth details from context or fallback to defaults
  const birthDetails = formData && typeof formData === 'object' ? {
    name: formData.name || "User",
    day: formData.day || 4,
    month: formData.month || 8,
    year: formData.year || 2004,
    hour: formData.hour || 7,
    min: formData.min || 45,
    lat: formData.lat || 19.132,
    lon: formData.lon || 72.342,
    tzone: formData.tzone || 5.5
  } : {
    name: "User",
    day: 4,
    month: 8,
    year: 2004,
    hour: 7,
    min: 45,
    lat: 19.132,
    lon: 72.342,
    tzone: 5.5
  };

  // Translations
  const translations = {
    loading: {
      english: "Loading Horoscope Chart...",
      hindi: "कुंडली चार्ट लोड हो रहा है..."
    },
    error: {
      english: "Error Loading Data",
      hindi: "डेटा लोड करने में त्रुटि"
    },
    retry: {
      english: "Retry",
      hindi: "पुनः प्रयास करें"
    },
    loadDemo: {
      english: "Load Demo Data",
      hindi: "डेमो डेटा लोड करें"
    },
    title: {
      english: "Your Vedic Birth Chart",
      hindi: "आपकी वैदिक जन्म कुंडली"
    },
    subtitle: {
      english: "Planetary positions at your time of birth",
      hindi: "आपके जन्म समय पर ग्रह स्थिति"
    },
    birthChart: {
      english: "Birth Chart",
      hindi: "जन्म कुंडली"
    },
    chartDescription: {
      english: "This is your personalized Vedic birth chart showing planetary positions at your time of birth",
      hindi: "यह आपकी व्यक्तिगत वैदिक जन्म कुंडली है जो आपके जन्म समय पर ग्रहों की स्थिति दिखाती है"
    },
    housesAndPlanets: {
      english: "Houses & Planetary Positions",
      hindi: "भाव और ग्रह स्थिति"
    },
    house: {
      english: "House",
      hindi: "भाव"
    },
    planet: {
      english: "Planet",
      hindi: "ग्रह"
    },
    planets: {
      english: "Planets",
      hindi: "ग्रह"
    },
    noPlanets: {
      english: "No planets in this house",
      hindi: "इस भाव में कोई ग्रह नहीं"
    },
    chartIntro: {
      english: "Your Horoscope Reveals",
      hindi: "आपकी कुंडली का रहस्य"
    },
    chartIntroDesc: {
      english: "The positions of celestial bodies at your birth time create a unique cosmic blueprint that influences your life's journey, personality, and destiny.",
      hindi: "आपके जन्म समय पर आकाशीय पिंडों की स्थिति एक अनोखा ब्रह्मांडीय नक्शा बनाती है जो आपकी जीवन यात्रा, व्यक्तित्व और भाग्य को प्रभावित करती है।"
    },
    blessings: {
      title: {
        english: "Cosmic Blessings",
        hindi: "ब्रह्मांडीय आशीर्वाद"
      },
      message: {
        english: "Your birth chart is a sacred map written by the stars. Each planetary position holds divine wisdom and guidance for your spiritual and material journey through life.",
        hindi: "आपकी जन्म कुंडली तारों द्वारा लिखा गया एक पवित्र मानचित्र है। प्रत्येक ग्रह स्थिति आपकी आध्यात्मिक और भौतिक जीवन यात्रा के लिए दिव्य ज्ञान और मार्गदर्शन रखती है।"
      }
    },
    next: {
      english: "Continue to Ghatchakra →",
      hindi: "घटचक्र की ओर जारी रखें →"
    },
    back: {
      english: "← Back to Numerology",
      hindi: "← अंकशास्त्र पर वापस जाएं"
    }
  };

  // Planet translations and info
  const getPlanetInfo = (planet) => {
    const planetData = {
      'SUN': { 
        english: 'Sun', 
        hindi: 'सूर्य', 
        emoji: '☉', 
        color: 'text-yellow-600' 
      },
      'MOON': { 
        english: 'Moon', 
        hindi: 'चंद्र', 
        emoji: '☽', 
        color: 'text-gray-600' 
      },
      'MARS': { 
        english: 'Mars', 
        hindi: 'मंगल', 
        emoji: '♂', 
        color: 'text-red-600' 
      },
      'MERCURY': { 
        english: 'Mercury', 
        hindi: 'बुध', 
        emoji: '☿', 
        color: 'text-green-600' 
      },
      'JUPITER': { 
        english: 'Jupiter', 
        hindi: 'बृहस्पति', 
        emoji: '♃', 
        color: 'text-purple-600' 
      },
      'VENUS': { 
        english: 'Venus', 
        hindi: 'शुक्र', 
        emoji: '♀', 
        color: 'text-pink-600' 
      },
      'SATURN': { 
        english: 'Saturn', 
        hindi: 'शनि', 
        emoji: '♄', 
        color: 'text-blue-600' 
      },
      'RAHU': { 
        english: 'Rahu', 
        hindi: 'राहु', 
        emoji: '☊', 
        color: 'text-orange-600' 
      },
      'KETU': { 
        english: 'Ketu', 
        hindi: 'केतु', 
        emoji: '☋', 
        color: 'text-indigo-600' 
      }
    };
    
    const planetInfo = planetData[planet] || { 
      english: planet, 
      hindi: planet, 
      emoji: '●', 
      color: 'text-gray-600' 
    };
    
    return {
      name: language === 'english' ? planetInfo.english : planetInfo.hindi,
      emoji: planetInfo.emoji,
      color: planetInfo.color
    };
  };

  // Using API_CONFIG.getAuthHeader() instead of standalone function

  // Function to simulate Horoscope data if API fails (fallback)
  const loadFallbackData = () => {
    const fallbackChartData = [
      {
        sign: 1,
        sign_name: language === 'english' ? 'Aries' : 'मेष',
        planet: ['SUN', 'MERCURY']
      },
      {
        sign: 2,
        sign_name: language === 'english' ? 'Taurus' : 'वृषभ',
        planet: ['VENUS']
      },
      {
        sign: 3,
        sign_name: language === 'english' ? 'Gemini' : 'मिथुन',
        planet: []
      },
      {
        sign: 4,
        sign_name: language === 'english' ? 'Cancer' : 'कर्क',
        planet: ['MOON']
      },
      {
        sign: 5,
        sign_name: language === 'english' ? 'Leo' : 'सिंह',
        planet: []
      },
      {
        sign: 6,
        sign_name: language === 'english' ? 'Virgo' : 'कन्या',
        planet: ['MARS']
      },
      {
        sign: 7,
        sign_name: language === 'english' ? 'Libra' : 'तुला',
        planet: []
      },
      {
        sign: 8,
        sign_name: language === 'english' ? 'Scorpio' : 'वृश्चिक',
        planet: ['SATURN']
      },
      {
        sign: 9,
        sign_name: language === 'english' ? 'Sagittarius' : 'धनु',
        planet: ['JUPITER']
      },
      {
        sign: 10,
        sign_name: language === 'english' ? 'Capricorn' : 'मकर',
        planet: []
      },
      {
        sign: 11,
        sign_name: language === 'english' ? 'Aquarius' : 'कुंभ',
        planet: ['RAHU']
      },
      {
        sign: 12,
        sign_name: language === 'english' ? 'Pisces' : 'मीन',
        planet: ['KETU']
      }
    ];

    const fallbackChartImage = {
      svg: `<svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="300" height="300" fill="white" stroke="black" stroke-width="2"/>
        <line x1="150" y1="0" x2="150" y2="300" stroke="black" stroke-width="1"/>
        <line x1="0" y1="150" x2="300" y2="150" stroke="black" stroke-width="1"/>
        <line x1="50" y1="50" x2="250" y2="250" stroke="black" stroke-width="1"/>
        <line x1="250" y1="50" x2="50" y2="250" stroke="black" stroke-width="1"/>
        <text x="75" y="30" text-anchor="middle" font-size="12" fill="black">मेष</text>
        <text x="225" y="30" text-anchor="middle" font-size="12" fill="black">वृषभ</text>
        <text x="270" y="75" text-anchor="middle" font-size="12" fill="black">मिथुन</text>
        <text x="270" y="225" text-anchor="middle" font-size="12" fill="black">कर्क</text>
        <text x="225" y="280" text-anchor="middle" font-size="12" fill="black">सिंह</text>
        <text x="75" y="280" text-anchor="middle" font-size="12" fill="black">कन्या</text>
        <text x="30" y="225" text-anchor="middle" font-size="12" fill="black">तुला</text>
        <text x="30" y="75" text-anchor="middle" font-size="12" fill="black">वृश्चिक</text>
        <text x="75" y="125" text-anchor="middle" font-size="10" fill="red">सूर्य</text>
        <text x="225" y="125" text-anchor="middle" font-size="10" fill="blue">चंद्र</text>
      </svg>`
    };
    
    console.log('Loading fallback Horoscope data:', { fallbackChartData, fallbackChartImage });
    setChartData(fallbackChartData);
    setChartImage(fallbackChartImage);
  };

  // Function to fetch chart image (SVG) - updated to match Jupiter pattern
  const fetchChartImage = async (safeDetails) => {
    try {
      console.log(`Fetching chart image from API: ${API_CONFIG.baseUrl}/${API_CONFIG.chartImageApi}`);
      
      const response = await fetch(`${API_CONFIG.baseUrl}/${API_CONFIG.chartImageApi}`, {
        method: 'POST',
        headers: {
          'Authorization': API_CONFIG.getAuthHeader(),
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Accept-Language': API_CONFIG.getLanguageHeader(language)
        },
        body: JSON.stringify(safeDetails)
      });
      
      console.log('Chart Image API response status:', response.status);
      
      if (!response.ok) {
        let errorMessage = `Chart Image API Error: ${response.status} - ${response.statusText}`;
        
        try {
          const errorData = await response.json();
          console.log('Error data:', errorData);
          if (errorData.error || errorData.message) {
            errorMessage += ` - ${errorData.error || errorData.message}`;
          }
        } catch (e) {
          console.log('Could not parse error response as JSON');
        }
        
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      console.log('Chart Image Data received:', data);
      
      // Validate the response data
      if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
        throw new Error('No chart image data received from API');
      }
      
      // Check if the response has the expected structure
      if (!data.svg) {
        console.warn('API response missing expected svg field');
        throw new Error('Invalid chart image data structure received from API');
      }
      
      setChartImage(data);
      return data;
      
    } catch (error) {
      console.error('Error fetching chart image:', error);
      throw error;
    }
  };

  // Function to fetch chart data - updated to match Jupiter pattern
  const fetchChartData = async (safeDetails) => {
    try {
      console.log(`Fetching chart data from API: ${API_CONFIG.baseUrl}/${API_CONFIG.chartDataApi}`);
      
      const response = await fetch(`${API_CONFIG.baseUrl}/${API_CONFIG.chartDataApi}`, {
        method: 'POST',
        headers: {
          'Authorization': API_CONFIG.getAuthHeader(),
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Accept-Language': API_CONFIG.getLanguageHeader(language)
        },
        body: JSON.stringify(safeDetails)
      });
      
      console.log('Chart Data API response status:', response.status);
      
      if (!response.ok) {
        let errorMessage = `Chart Data API Error: ${response.status} - ${response.statusText}`;
        
        try {
          const errorData = await response.json();
          console.log('Error data:', errorData);
          if (errorData.error || errorData.message) {
            errorMessage += ` - ${errorData.error || errorData.message}`;
          }
        } catch (e) {
          console.log('Could not parse error response as JSON');
        }
        
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      console.log('Chart Data received:', data);
      
      // Validate the response data
      if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
        throw new Error('No chart data received from API');
      }
      
      // Check if the response has the expected structure
      if (!Array.isArray(data)) {
        console.warn('API response is not an array as expected');
        throw new Error('Invalid chart data structure received from API');
      }
      
      setChartData(data);
      return data;
      
    } catch (error) {
      console.error('Error fetching chart data:', error);
      throw error;
    }
  };

  // Function to fetch both chart image and data - updated to match Jupiter pattern
  const fetchHoroscopeData = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('Starting horoscope data fetch process...');
      
      // Validate birth details with numeric parsing for safety
      const safeDetails = {
        name: birthDetails?.name || "User",
        day: parseInt(birthDetails?.day) || 4,
        month: parseInt(birthDetails?.month) || 8,
        year: parseInt(birthDetails?.year) || 2004,
        hour: parseInt(birthDetails?.hour) || 7,
        min: parseInt(birthDetails?.min) || 45,
        lat: parseFloat(birthDetails?.lat) || 19.132,
        lon: parseFloat(birthDetails?.lon) || 72.342,
        tzone: parseFloat(birthDetails?.tzone) || 5.5
      };
      
      console.log('Validated birth details:', safeDetails);
      
      // For now, let's load demo data directly since API might have issues
      // When API is stable, uncomment the API calls below and comment out this section
      console.log('Loading demo horoscope data (API calls disabled)...');
      loadFallbackData();
      return;
      
      // Uncomment this section when API is stable
      /*
      console.log('Attempting to fetch data from both APIs...');
      
      try {
        // Fetch both APIs simultaneously
        const [imageData, chartData] = await Promise.all([
          fetchChartImage(safeDetails),
          fetchChartData(safeDetails)
        ]);
        
        console.log('Successfully fetched both chart image and data');
        
        // Validate that we have the necessary data
        if (!imageData?.svg) {
          throw new Error('Missing SVG data in chart image response');
        }
        
        if (!Array.isArray(chartData) || chartData.length === 0) {
          throw new Error('Invalid or empty chart data received');
        }
        
        // Data is valid, update state
        setChartImage(imageData);
        setChartData(chartData);
        
      } catch (apiError) {
        console.error('API fetch failed:', apiError.message);
        throw apiError; // Re-throw to be caught by outer catch block
      }
      */
      
    } catch (error) {
      console.error('Error in horoscope data fetch process:', error);
      setError(error.message || 'Failed to load horoscope data');
      
      // Auto-load demo data on any error
      console.log('Loading fallback demo data due to error...');
      loadFallbackData();
      
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount - updated to match Jupiter pattern
  useEffect(() => {
    console.log('Horoscope component mounted or language changed');
    console.log('Current language:', language);
    console.log('Context data:', { language, formData });
    console.log('Birth details being used:', birthDetails);
    
    // Fetch horoscope data with current language and birth details
    fetchHoroscopeData();
    
    // Debug log for development
    console.log(`Horoscope data fetch initiated with language: ${language}`);
  }, [language]); // Re-fetch when language changes

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-gray-50 rounded-lg p-8 shadow-xl max-w-md w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <h2 className="text-center mt-4 text-gray-800 font-medium">
            {language === 'english' ? translations.loading.english : translations.loading.hindi}
          </h2>
          <p className="text-center mt-2 text-gray-600 text-sm">
            {language === 'english' 
              ? "Analyzing your birth chart and planetary positions..." 
              : "आपके जन्म कुंडली और ग्रहों की स्थिति का विश्लेषण किया जा रहा है..."}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="bg-gray-50 rounded-lg p-8 shadow-xl max-w-md w-full">
          <div className="text-center">
            <div className="text-4xl mb-4 text-amber-500">⚠️</div>
            <h2 className="text-xl font-bold mb-2 text-gray-800">
              {language === 'english' ? translations.error.english : translations.error.hindi}
            </h2>
            <p className="text-sm text-gray-600 mb-4">{error}</p>
            <p className="text-xs text-gray-500 mb-4">
              {language === 'english' 
                ? "We're having trouble connecting to our astrology servers. Please try again or view demo data." 
                : "हमें अपने ज्योतिष सर्वर से कनेक्ट करने में समस्या हो रही है। कृपया पुनः प्रयास करें या डेमो डेटा देखें।"}
            </p>
            <div className="flex flex-col space-y-3">
              <button 
                onClick={fetchHoroscopeData} 
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                {language === 'english' ? translations.retry.english : translations.retry.hindi}
              </button>
              <button 
                onClick={loadFallbackData} 
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                {language === 'english' ? translations.loadDemo.english : translations.loadDemo.hindi}
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
            {/* Main Title */}
            <div className="text-center mb-6">
              <h1 className="text-xl font-bold text-gray-800 mb-4 leading-tight md:text-lg">
                {language === 'english' ? translations.title.english : translations.title.hindi}
              </h1>
              <p className="text-sm text-gray-600">
                {language === 'english' ? translations.subtitle.english : translations.subtitle.hindi}
              </p>
            </div>

            {/* Horoscope Intro */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-300 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                <span className="text-2xl mr-2">✨</span>
                {language === 'english' ? translations.chartIntro.english : translations.chartIntro.hindi}
              </h3>
              <div className="bg-white bg-opacity-70 rounded-lg p-4">
                <p className="text-sm text-gray-700 leading-relaxed md:text-xs">
                  {language === 'english' ? translations.chartIntroDesc.english : translations.chartIntroDesc.hindi}
                </p>
              </div>
            </div>

            {/* Chart Image - SVG Display */}
            {chartImage && chartImage.svg && (
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-300 mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                  <span className="text-2xl mr-2">🔮</span>
                  {language === 'english' ? translations.birthChart.english : translations.birthChart.hindi}
                </h3>
                <div className="bg-white rounded-lg p-4 flex justify-center">
                  <div 
                    dangerouslySetInnerHTML={{ __html: chartImage.svg }}
                    className="max-w-full"
                    style={{ maxHeight: '400px', overflow: 'visible' }}
                  />
                </div>
                <div className="mt-3 bg-blue-100 rounded-lg p-3">
                  <p className="text-xs text-blue-800 text-center">
                    {language === 'english' ? translations.chartDescription.english : translations.chartDescription.hindi}
                  </p>
                </div>
              </div>
            )}

            {/* Chart Data Analysis */}
            {chartData && (
              <>
                {/* Houses with Planets */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-300 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                    <span className="text-2xl mr-2">🏠</span>
                    {language === 'english' ? translations.housesAndPlanets.english : translations.housesAndPlanets.hindi}
                  </h3>
                  
                  <div className="space-y-3">
                    {chartData.map && chartData.map((house, index) => (
                      <div key={index} className="bg-white bg-opacity-70 rounded-lg p-3">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center">
                            <span className="text-sm font-bold text-purple-700 mr-2">
                              {language === 'english' ? translations.house.english : translations.house.hindi} {house.sign}
                            </span>
                            <span className="text-xs text-gray-600">
                              ({house.sign_name})
                            </span>
                          </div>
                          {house.planet && house.planet.length > 0 && (
                            <div className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                              {house.planet.length} {house.planet.length > 1 ? 
                                (language === 'english' ? translations.planets.english : translations.planets.hindi) : 
                                (language === 'english' ? translations.planet.english : translations.planet.hindi)
                              }
                            </div>
                          )}
                        </div>
                        
                        {house.planet && house.planet.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {house.planet.map((planet, planetIndex) => {
                              const planetInfo = getPlanetInfo(planet);
                              return (
                                <div 
                                  key={planetIndex}
                                  className={`flex items-center bg-gray-100 rounded-full px-3 py-1 text-xs ${planetInfo.color}`}
                                >
                                  <span className="mr-1">{planetInfo.emoji}</span>
                                  <span className="font-semibold">{planetInfo.name}</span>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="text-xs text-gray-500 italic">
                            {language === 'english' ? translations.noPlanets.english : translations.noPlanets.hindi}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Blessing Message */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-300 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2 md:text-base flex items-center">
                <span className="text-2xl mr-2">🙏</span>
                {language === 'english' ? translations.blessings.title.english : translations.blessings.title.hindi}
              </h3>
              <div className="bg-white bg-opacity-70 rounded-lg p-4">
                <p className="text-sm text-gray-700 leading-relaxed md:text-xs">
                  {language === 'english' ? translations.blessings.message.english : translations.blessings.message.hindi}
                </p>
              </div>
            </div>

            {/* Bottom padding for scrolling */}
            <div className="h-4"></div>
          </div>

          {/* Navigation Component - Fixed at bottom */}
          <Navigation 
            currentPage="horoscope"
            nextText={language === 'english' ? translations.next.english : translations.next.hindi}
            backText={language === 'english' ? translations.back.english : translations.back.hindi}
            showNext={true}
            showBack={true}
          />
        </div>
      </div>
    </div>
  );
};

export default HoroscopeChart;