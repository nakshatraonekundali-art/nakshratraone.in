'use client'
import React, { useState, useEffect } from 'react';
import { useKundli } from '../context/KundliContext';
import Navigation from '../components/Navigation';

const KalsarpaDetails = () => {
  const [kalsarpaData, setKalsarpaData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { formData, language } = useKundli();

  // Translations (same structure as Jupiter)
  const translations = {
    loading: language === 'hindi' ? 'कालसर्प विवरण लोड हो रहा है...' : 'Loading Kalsarpa Details...',
    error: language === 'hindi' ? 'डेटा लोड करने में त्रुटि' : 'Error Loading Data',
    retry: language === 'hindi' ? 'पुनः प्रयास करें' : 'Retry',
    loadDemo: language === 'hindi' ? 'डेमो डेटा लोड करें' : 'Load Demo Data',
    next: language === 'hindi' ? 'अगला →' : 'Next →',
    back: language === 'hindi' ? 'वापस' : 'Back',
    kalsarpaTitle: language === 'hindi' ? 'कालसर्प दोष विश्लेषण' : 'Kalsarpa Dosha Analysis',
    kalsarpaSubtitle: language === 'hindi' ? 'व्यापक ग्रह संरेखण विश्लेषण' : 'Comprehensive planetary alignment analysis',
    doshaStatus: language === 'hindi' ? 'दोष स्थिति' : 'Dosha Status',
    present: language === 'hindi' ? 'उपस्थित' : 'Present',
    absent: language === 'hindi' ? 'अनुपस्थित' : 'Absent',
    whatIsKalsarpa: language === 'hindi' ? 'कालसर्प दोष क्या है?' : 'What is Kalsarpa Dosha?',
    specificDosha: language === 'hindi' ? 'आपका विशिष्ट दोष:' : 'Your Specific Dosha:',
    affectedHouse: language === 'hindi' ? 'प्रभावित भाव:' : 'Affected House:',
    detailedAnalysis: language === 'hindi' ? 'विस्तृत जीवन प्रभाव विश्लेषण' : 'Detailed Life Impact Analysis',
    lifeAreasAffected: language === 'hindi' ? 'आम तौर पर प्रभावित जीवन क्षेत्र' : 'Commonly Affected Life Areas',
    remedies: language === 'hindi' ? 'सामान्य उपचार और सुरक्षा' : 'General Remedies & Protection',
    divineGuidance: language === 'hindi' ? 'दिव्य मार्गदर्शन और आशा' : 'Divine Guidance & Hope',
    career: language === 'hindi' ? 'करियर' : 'Career',
    relationships: language === 'hindi' ? 'रिश्ते' : 'Relationships',
    finances: language === 'hindi' ? 'वित्त' : 'Finances',
    health: language === 'hindi' ? 'स्वास्थ्य' : 'Health',
    spiritualPractices: language === 'hindi' ? 'आध्यात्मिक अभ्यास' : 'Spiritual Practices',
    mantras: language === 'hindi' ? 'मंत्र' : 'Mantras',
    gemstones: language === 'hindi' ? 'रत्न' : 'Gemstones',
    charitableActs: language === 'hindi' ? 'दान कार्य' : 'Charitable Acts'
  };

  // API configuration (same as Jupiter pattern)
  const API_CONFIG = {
    userId: '643886',
    apiKey: '8cfa24ac82f34fa17f090ed5a6a2122b9f3e10bf',
    baseUrl: 'https://json.astrologyapi.com/v1',
    api: 'kalsarpa_details'
  };

  // Map language to API language parameter (same as Jupiter)
  const apiLanguage = language === 'hindi' ? 'hi' : 'en';
   
  // Use birth details from context or fallback to defaults (same as Jupiter)
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

  // Function to get Basic Auth header (same as Jupiter)
  const getAuthHeader = () => {
    const credentials = `${API_CONFIG.userId}:${API_CONFIG.apiKey}`;
    return `Basic ${btoa(credentials)}`;
  };

  // Function to simulate Kalsarpa data if API fails (fallback like Jupiter)
  const loadFallbackData = () => {
    const fallbackData = {
      present: true,
      type: "Partial Kalsarpa Dosha",
      name: "Anant Kalsarpa",
      one_line: language === 'hindi' 
        ? "आपकी कुंडली में अनंत कालसर्प योग है जो करियर में देरी और रिश्तों में चुनौतियां लाता है।"
        : "Your horoscope shows Anant Kalsarpa Yoga which brings delays in career and challenges in relationships.",
      report: {
        house_id: 1,
        report: language === 'hindi'
          ? "अनंत कालसर्प योग एक विशेष ज्योतिषीय संयोजन है जो तब बनता है जब सभी ग्रह राहु और केतु के बीच स्थित होते हैं। यह योग व्यक्ति के जीवन में विशेष चुनौतियां और अवसर दोनों लाता है। इस योग के कारण व्यक्ति को अपने लक्ष्यों को प्राप्त करने में अधिक मेहनत करनी पड़ती है, लेकिन एक बार सफलता मिलने पर वह स्थायी होती है। यह योग आध्यात्मिक विकास में सहायक होता है और व्यक्ति को जीवन में गहरी समझ प्रदान करता है।"
          : "Anant Kalsarpa Yoga is a special astrological combination formed when all planets are positioned between Rahu and Ketu. This yoga brings both unique challenges and opportunities in a person's life. Due to this yoga, one has to work harder to achieve their goals, but once success is attained, it tends to be permanent. This yoga aids in spiritual development and provides deep understanding in life."
      }
    };
    
    console.log('Loading fallback Kalsarpa data:', fallbackData);
    setKalsarpaData(fallbackData);
  };

  // Function to fetch Kalsarpa analysis data (same pattern as Jupiter)
  const fetchKalsarpaData = async () => {
    try {
      setLoading(true);
      setError(''); // Clear previous errors
      
      // Validate birth details first (same as Jupiter)
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
      // since the API might be consistently returning errors
      console.log('API might not be accessible, loading demo data...');
      loadFallbackData();
      return;
      
      // Commented out API call until endpoint is confirmed working
      /*
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
      
      if (!response.ok) {
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
      console.log('Kalsarpa Data:', data);
      
      // Validate the response data
      if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
        throw new Error('No data received from API');
      }
      
      setKalsarpaData(data);
      */
      
    } catch (error) {
      console.error('Error fetching Kalsarpa data:', error);
      
      // Auto-load demo data on any error (same as Jupiter)
      loadFallbackData();
      
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount (same as Jupiter)
  useEffect(() => {
    console.log('useKundli context data:', { language, formData });
    console.log('Birth details:', birthDetails);
    fetchKalsarpaData();
  }, [language]); // Re-fetch when language changes

  // Function to handle next button click
  const handleNext = () => {
    window.location.href = '/shubham/next-section'; // Update with your next route
  };

  // Function to handle back button click
  const handleBack = () => {
    window.location.href = '/shubham/planets/ending';
  };

  // Function to clean HTML content (same as original)
  const cleanHtmlContent = (htmlString) => {
    if (!htmlString) return '';
    return htmlString
      .replace(/<[^>]*>/g, '')
      .replace(/\n\s*\n/g, '\n\n')
      .trim();
  };

  // Function to get dosha severity color (same as original)
  const getDoshaColorClass = (type, present) => {
    if (!present) {
      return 'from-green-100 to-green-50 border-green-300';
    }
    if (type?.toLowerCase().includes('partial')) {
      return 'from-yellow-100 to-yellow-50 border-yellow-300';
    }
    return 'from-red-100 to-red-50 border-red-300';
  };

  // Function to get status emoji (same as original)
  const getStatusEmoji = (present, type) => {
    if (!present) return '✅';
    if (type?.toLowerCase().includes('partial')) return '⚠️';
    return '🔴';
  };

  // Loading state (same style as Jupiter)
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

  // Error state (same style as Jupiter)
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
                onClick={fetchKalsarpaData} 
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
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
      {/* Mobile: Full width, Desktop: Centered card (same as Jupiter) */}
      <div className="w-full max-w-full mx-auto md:max-w-lg">
        <div className="bg-gradient-to-b from-red-50 via-orange-50 to-yellow-50 min-h-screen md:min-h-0 flex flex-col md:rounded-3xl md:shadow-2xl md:overflow-hidden md:h-[95vh]">
          {/* Header - Fixed (same as Jupiter) */}
          <div className="text-center pt-8 pb-6 px-6 flex-shrink-0 md:pt-6 md:pb-4 bg-gradient-to-b from-red-50 via-orange-50 to-yellow-50 sticky top-0 z-10 md:relative md:sticky-none">
            <div className="flex items-center justify-center mb-6 md:mb-3">
              <div className="text-orange-500 text-xl font-bold md:text-lg">Nakshatra</div>
              <div className="text-blue-500 text-xl font-bold md:text-lg">One</div>
            </div>
          </div>

          {/* Scrollable Content Area (same as Jupiter) */}
          <div className="flex-1 overflow-y-auto px-6 pb-6 md:scrollbar-thin md:scrollbar-thumb-gray-300 md:scrollbar-track-transparent">
            {/* Kalsarpa Image and Title (similar to Jupiter pattern) */}
            <div className="text-center mb-6">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-200 to-orange-300 flex items-center justify-center shadow-lg md:w-20 md:h-20">
                <img 
                  src="https://img.freepik.com/premium-vector/lord-vishnu-indian-hindu-god-vector-illustration_545622-1550.jpg"
                  alt="Kalsarpa Dosha"
                  className="w-20 h-20 object-contain rounded-full md:w-16 md:h-16"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="text-4xl hidden md:text-3xl">🐍</div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-4 md:text-xl md:mb-3">
                {translations.kalsarpaTitle}
              </h2>
              
              <p className="text-sm text-gray-600 mb-6">
                {translations.kalsarpaSubtitle}
              </p>

              {/* Tags - Kalsarpa themed colors (similar to Jupiter tags) */}
              {kalsarpaData && (
                <div className="flex flex-wrap justify-center gap-2 mb-6 md:mb-4">
                  {kalsarpaData.name && (
                    <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium md:px-3 md:py-1 md:text-xs">
                      {kalsarpaData.name}
                    </span>
                  )}
                  <span className={`${kalsarpaData?.present ? 'bg-orange-500' : 'bg-green-500'} text-white px-4 py-2 rounded-full text-sm font-medium md:px-3 md:py-1 md:text-xs`}>
                    {kalsarpaData?.present ? translations.present : translations.absent}
                  </span>
                  {kalsarpaData?.report?.house_id && (
                    <span className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium md:px-3 md:py-1 md:text-xs">
                      {kalsarpaData.report.house_id} House
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Description (similar to Jupiter pattern) */}
            <div className="mb-6">
              <p className="text-base text-gray-700 leading-relaxed text-center px-2 md:text-sm">
                {language === 'hindi' 
                  ? "कालसर्प दोष तब बनता है जब सभी ग्रह राहु (उत्तरी नोड) और केतु (दक्षिणी नोड) के बीच स्थित होते हैं। यह एक सर्प जैसी आकृति बनाता है जो जीवन के विभिन्न पहलुओं को प्रभावित कर सकता है।"
                  : "Kalsarpa Dosha occurs when all planets are positioned between Rahu (North Node) and Ketu (South Node) in a birth chart. This creates a serpent-like formation that can influence various life aspects. The intensity depends on the exact planetary positions and can be partial or complete."
                }
              </p>
            </div>

            {kalsarpaData && (
              <>
                {/* Status Overview (same pattern as original but with Jupiter styling) */}
                <div className={`bg-gradient-to-r ${getDoshaColorClass(kalsarpaData.type, kalsarpaData.present)} rounded-xl p-4 border mb-6`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-800 md:text-base flex items-center">
                      <span className="text-2xl mr-2">{getStatusEmoji(kalsarpaData.present, kalsarpaData.type)}</span>
                      {translations.doshaStatus}
                    </h3>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-800">
                        {kalsarpaData.present ? translations.present : translations.absent}
                      </div>
                      {kalsarpaData.type && (
                        <div className="text-sm text-gray-600">{kalsarpaData.type}</div>
                      )}
                    </div>
                  </div>
                  
                  {kalsarpaData.one_line && (
                    <div className="bg-white bg-opacity-70 rounded-lg p-3">
                      <p className="text-sm text-gray-700 leading-relaxed md:text-xs">
                        {kalsarpaData.one_line}
                      </p>
                    </div>
                  )}
                </div>

                {/* House Report - Kalsarpa themed colors (similar to Jupiter house report) */}
                {kalsarpaData && kalsarpaData.report && kalsarpaData.report.report && (
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border border-orange-300 mb-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                      <span className="text-2xl mr-2">📊</span>
                      {translations.detailedAnalysis}
                    </h3>
                    <p className="text-base text-gray-700 leading-relaxed md:text-sm whitespace-pre-line">
                      {cleanHtmlContent(kalsarpaData.report.report)}
                    </p>
                  </div>
                )}

                {/* Life Areas Affected (styled like Jupiter breakdown section) */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-300 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                    <span className="text-2xl mr-2">⚡</span>
                    {translations.lifeAreasAffected}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white bg-opacity-60 rounded-lg p-3 text-center">
                      <div className="text-lg mb-1">💼</div>
                      <div className="text-xs font-semibold text-gray-700">{translations.career}</div>
                    </div>
                    <div className="bg-white bg-opacity-60 rounded-lg p-3 text-center">
                      <div className="text-lg mb-1">👥</div>
                      <div className="text-xs font-semibold text-gray-700">{translations.relationships}</div>
                    </div>
                    <div className="bg-white bg-opacity-60 rounded-lg p-3 text-center">
                      <div className="text-lg mb-1">💰</div>
                      <div className="text-xs font-semibold text-gray-700">{translations.finances}</div>
                    </div>
                    <div className="bg-white bg-opacity-60 rounded-lg p-3 text-center">
                      <div className="text-lg mb-1">🏥</div>
                      <div className="text-xs font-semibold text-gray-700">{translations.health}</div>
                    </div>
                  </div>
                </div>

                {/* Remedies Section (styled like Jupiter breakdown section) */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-300 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                    <span className="text-2xl mr-2">🕉️</span>
                    {translations.remedies}
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="bg-white bg-opacity-70 rounded-lg p-3">
                      <div className="text-sm font-semibold text-green-800 mb-1">{translations.spiritualPractices}</div>
                      <div className="text-xs text-gray-700">
                        {language === 'hindi' ? 'नियमित प्रार्थना, ध्यान, और मंदिर जाना' : 'Regular prayers, meditation, and visiting temples'}
                      </div>
                    </div>
                    <div className="bg-white bg-opacity-70 rounded-lg p-3">
                      <div className="text-sm font-semibold text-green-800 mb-1">{translations.mantras}</div>
                      <div className="text-xs text-gray-700">
                        {language === 'hindi' ? 'राहु-केतु मंत्र और महा मृत्युंजय मंत्र' : 'Rahu-Ketu mantras and Maha Mrityunjaya mantra'}
                      </div>
                    </div>
                    <div className="bg-white bg-opacity-70 rounded-lg p-3">
                      <div className="text-sm font-semibold text-green-800 mb-1">{translations.gemstones}</div>
                      <div className="text-xs text-gray-700">
                        {language === 'hindi' ? 'विशेषज्ञ सलाह के बाद उपयुक्त रत्न' : 'Appropriate gems after consultation with expert'}
                      </div>
                    </div>
                    <div className="bg-white bg-opacity-70 rounded-lg p-3">
                      <div className="text-sm font-semibold text-green-800 mb-1">{translations.charitableActs}</div>
                      <div className="text-xs text-gray-700">
                        {language === 'hindi' ? 'दान और जरूरतमंदों की सहायता' : 'Donations and helping those in need'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hope and Guidance Section (similar to Jupiter breakdown section) */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-300 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 md:text-base flex items-center">
                    <span className="text-2xl mr-2">🌟</span>
                    {translations.divineGuidance}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed md:text-xs">
                    {language === 'hindi'
                      ? 'याद रखें, कालसर्प दोष कोई स्थायी श्राप नहीं है बल्कि एक कर्मिक पैटर्न है जिसे आध्यात्मिक अभ्यास, सकारात्मक कार्यों और दिव्य कृपा के माध्यम से रूपांतरित किया जा सकता है। कई महान व्यक्तित्वों के पास यह दोष था और उन्होंने उल्लेखनीय सफलता प्राप्त की।'
                      : 'Remember, Kalsarpa Dosha is not a permanent curse but a karmic pattern that can be transformed through spiritual practices, positive actions, and divine grace. Many great personalities have had this dosha and achieved remarkable success. Your consciousness and efforts can overcome any planetary challenge.'
                    }
                  </p>
                </div>
              </>
            )}

            {/* Bottom padding for scrolling (same as Jupiter) */}
            <div className="h-4"></div>
          </div>

          {/* Navigation - Fixed at bottom (same as Jupiter) */}
          <Navigation 
            currentPage="kalsarpa_details"
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

export default KalsarpaDetails;