'use client'
import React, { useState, useEffect } from 'react';
import { useKundli } from '../context/KundliContext';
import Navigation from '../components/Navigation';

const MangalDosha = () => {
  const [mangalDoshaData, setMangalDoshaData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { formData, language } = useKundli();

  // Translations
  const translations = {
    loading: language === 'hindi' ? 'मंगल दोष विश्लेषण लोड हो रहा है...' : 'Loading Mangal Dosha Analysis...',
    error: language === 'hindi' ? 'डेटा लोड करने में त्रुटि' : 'Error Loading Data',
    retry: language === 'hindi' ? 'पुनः प्रयास करें' : 'Retry',
    loadDemo: language === 'hindi' ? 'डेमो डेटा लोड करें' : 'Load Demo Data',
    next: language === 'hindi' ? 'अगला →' : 'Next →',
    back: language === 'hindi' ? 'वापस' : 'Back',
    mangalDoshaTitle: language === 'hindi' ? 'मंगल दोष विश्लेषण' : 'Mangal Dosha Analysis',
    mangalDoshaSubtitle: language === 'hindi' ? 'मंगल की स्थिति और उपचार विश्लेषण' : 'Mars Position & Remedial Analysis',
    doshaStatus: language === 'hindi' ? 'दोष स्थिति' : 'Dosha Status',
    present: language === 'hindi' ? 'प्रभावित' : 'Present',
    afterCancellation: language === 'hindi' ? 'निष्प्रभावन के बाद:' : 'After Cancellation:',
    isCancelled: language === 'hindi' ? 'निष्प्रभावित:' : 'Is Cancelled:',
    yes: language === 'hindi' ? 'हाँ ✓' : 'Yes ✓',
    no: language === 'hindi' ? 'नहीं ✗' : 'No ✗',
    detailedReport: language === 'hindi' ? 'विस्तृत रिपोर्ट' : 'Detailed Report',
    houseBased: language === 'hindi' ? 'घर आधारित नियम' : 'House-Based Rules',
    aspectBased: language === 'hindi' ? 'दृष्टि आधारित नियम' : 'Aspect-Based Rules',
    cancellationRules: language === 'hindi' ? 'निष्प्रभावन नियम' : 'Cancellation Rules',
    moreAspects: language === 'hindi' ? 'और दृष्टि' : 'more aspects',
    remedies: language === 'hindi' ? 'सामान्य उपचार और सुरक्षा' : 'General Remedies & Protection',
    spiritualPractices: language === 'hindi' ? 'आध्यात्मिक अभ्यास' : 'Spiritual Practices',
    mantras: language === 'hindi' ? 'मंत्र' : 'Mantras',
    gemstones: language === 'hindi' ? 'रत्न' : 'Gemstones',
    fasting: language === 'hindi' ? 'व्रत' : 'Fasting',
    divineGuidance: language === 'hindi' ? 'दिव्य मार्गदर्शन और आशा' : 'Divine Guidance & Hope'
  };

  // API configuration
  const API_CONFIG = {
    userId: '643886',
    apiKey: '8cfa24ac82f34fa17f090ed5a6a2122b9f3e10bf',
    baseUrl: 'https://json.astrologyapi.com/v1',
    api: 'manglik'
  };

  // Map language to API language parameter
  const apiLanguage = language === 'hindi' ? 'hi' : 'en';
   
  // Use birth details from context or fallback to defaults
  const birthDetails = formData && typeof formData === 'object' ? formData : {
    day: 4,
    month: 8,
    year: 2004,
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

  // Function to simulate Mangal Dosha data if API fails
  const loadFallbackData = () => {
    const fallbackData = {
      manglik_status: "MEDIUM",
      percentage_manglik_present: 75,
      percentage_manglik_after_cancellation: 25,
      is_mars_manglik_cancelled: false,
      manglik_report: language === 'hindi' 
        ? "आपकी कुंडली में मध्यम स्तर का मंगल दोष है। यह दोष मुख्यतः चौथे भाव में मंगल की स्थिति के कारण है। इससे वैवाहिक जीवन में कुछ चुनौतियां हो सकती हैं, परंतु उचित उपचार और समझदारी से इन्हें कम किया जा सकता है। आपको अपने जीवनसाथी के चयन में सावधानी बरतनी चाहिए।"
        : "Your horoscope shows a medium level of Mangal Dosha. This dosha is primarily due to Mars placement in the 4th house. This may cause some challenges in married life, but these can be reduced with proper remedies and understanding. You should be careful in selecting your life partner.",
      manglik_present_rule: {
        based_on_house: [
          language === 'hindi' ? "मंगल चौथे भाव में स्थित है" : "Mars is placed in the 4th house",
          language === 'hindi' ? "यह घर और पारिवारिक सुख को प्रभावित करता है" : "This affects domestic happiness and family peace"
        ],
        based_on_aspect: [
          language === 'hindi' ? "मंगल की सप्तम दृष्टि विवाह भाव पर है" : "Mars aspects the 7th house of marriage",
          language === 'hindi' ? "यह वैवाहिक संबंधों में तनाव लाता है" : "This brings tension in marital relationships",
          language === 'hindi' ? "मंगल की चौथी दृष्टि दशम भाव पर है" : "Mars aspects the 10th house",
          language === 'hindi' ? "यह करियर में आक्रामकता बढ़ाता है" : "This increases aggressiveness in career"
        ]
      },
      manglik_cancel_rule: [
        language === 'hindi' ? "गुरु की शुभ दृष्टि मंगल दोष को कम करती है" : "Benefic aspect of Jupiter reduces Mangal Dosha",
        language === 'hindi' ? "शुक्र की युति आंशिक सुधार देती है" : "Conjunction with Venus provides partial relief"
      ]
    };
    
    console.log('Loading fallback Mangal Dosha data:', fallbackData);
    setMangalDoshaData(fallbackData);
  };

  // Function to fetch Mangal Dosha data
  const fetchMangalDoshaData = async () => {
    try {
      setLoading(true);
      setError(''); // Clear previous errors
      
      // Validate birth details first
      const safeDetails = {
        name: birthDetails?.name || "User",
        day: birthDetails?.day || 4,
        month: birthDetails?.month || 8,
        year: birthDetails?.year || 2004,
        hour: birthDetails?.hour || 7,
        min: birthDetails?.min || 45,
        lat: birthDetails?.lat || 19.132,
        lon: birthDetails?.lon || 72.342,
        tzone: birthDetails?.tzone || 5.5
      };
      
      console.log('Birth details being used:', safeDetails);
      
      // For now, let's skip the API call and load demo data directly
      console.log('Loading demo data for consistency...');
      loadFallbackData();
      return;
      
    } catch (error) {
      console.error('Error fetching Mangal Dosha data:', error);
      
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
    fetchMangalDoshaData();
  }, [language]); // Re-fetch when language changes

  // Function to get status color and styling
  const getStatusStyling = (status) => {
    switch (status) {
      case 'LESS_EFFECTIVE':
        return {
          bgColor: 'from-yellow-100 to-orange-50 border-yellow-300',
          textColor: 'text-yellow-800',
          emoji: '⚠️'
        };
      case 'HIGH':
        return {
          bgColor: 'from-red-100 to-red-50 border-red-300',
          textColor: 'text-red-800',
          emoji: '🔥'
        };
      case 'MEDIUM':
        return {
          bgColor: 'from-orange-100 to-orange-50 border-orange-300',
          textColor: 'text-orange-800',
          emoji: '🟠'
        };
      case 'LOW':
        return {
          bgColor: 'from-green-100 to-green-50 border-green-300',
          textColor: 'text-green-800',
          emoji: '✅'
        };
      default:
        return {
          bgColor: 'from-gray-100 to-gray-50 border-gray-300',
          textColor: 'text-gray-800',
          emoji: '⚪'
        };
    }
  };

  // Loading state
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

  // Error state
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
                onClick={fetchMangalDoshaData} 
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
      {/* Mobile: Full width, Desktop: Centered card */}
      <div className="w-full max-w-full mx-auto md:max-w-lg">
        <div className="bg-gradient-to-b from-orange-50 via-red-50 to-pink-50 min-h-screen md:min-h-0 flex flex-col md:rounded-3xl md:shadow-2xl md:overflow-hidden md:h-[95vh]">
          {/* Header - Fixed */}
          <div className="text-center pt-8 pb-6 px-6 flex-shrink-0 md:pt-6 md:pb-4 bg-gradient-to-b from-orange-50 via-red-50 to-pink-50 sticky top-0 z-10 md:relative">
            <div className="flex items-center justify-center mb-6 md:mb-3">
              <div className="text-orange-500 text-xl font-bold md:text-lg">Nakshatra</div>
              <div className="text-blue-500 text-xl font-bold md:text-lg">One</div>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto px-6 pb-6 md:scrollbar-thin md:scrollbar-thumb-gray-300 md:scrollbar-track-transparent">
            {/* Shiva Image and Title */}
            <div className="text-center mb-6">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-200 to-orange-300 flex items-center justify-center shadow-lg md:w-20 md:h-20">
                <img 
                  src="https://img.freepik.com/premium-vector/flat-maha-shivaratri-illustration_23-2149314570.jpg" 
                  alt="Lord Shiva - Maha Shivaratri" 
                  className="w-20 h-20 object-contain rounded-full md:w-16 md:h-16"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="text-4xl hidden md:text-3xl">🕉️</div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-4 md:text-xl md:mb-3">
                {translations.mangalDoshaTitle}
              </h2>
              
              <p className="text-sm text-gray-600 mb-6">
                {translations.mangalDoshaSubtitle}
              </p>

              {/* Tags */}
              {mangalDoshaData && (
                <div className="flex flex-wrap justify-center gap-2 mb-6 md:mb-4">
                  <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium md:px-3 md:py-1 md:text-xs">
                    {mangalDoshaData.manglik_status?.replace('_', ' ')}
                  </span>
                  <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium md:px-3 md:py-1 md:text-xs">
                    {mangalDoshaData.percentage_manglik_present}% {translations.present}
                  </span>
                  {mangalDoshaData.is_mars_manglik_cancelled && (
                    <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium md:px-3 md:py-1 md:text-xs">
                      Cancelled
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-base text-gray-700 leading-relaxed text-center px-2 md:text-sm">
                {language === 'hindi' 
                  ? "मंगल दोष तब बनता है जब मंगल ग्रह कुंडली के 1, 2, 4, 7, 8, या 12वें भाव में स्थित होता है। यह विवाह और पारिवारिक जीवन को प्रभावित कर सकता है।"
                  : "Mangal Dosha occurs when Mars is positioned in the 1st, 2nd, 4th, 7th, 8th, or 12th house of the birth chart. This can affect marriage and family life, but its effects can be mitigated through proper understanding and remedies."
                }
              </p>
            </div>

            {mangalDoshaData && (
              <>
                {/* Status Overview */}
                {(() => {
                  const statusStyle = getStatusStyling(mangalDoshaData.manglik_status);
                  return (
                    <div className={`bg-gradient-to-r ${statusStyle.bgColor} rounded-xl p-4 border mb-6`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{statusStyle.emoji}</span>
                          <div>
                            <h3 className={`text-lg font-bold ${statusStyle.textColor} md:text-base`}>
                              {translations.doshaStatus}
                            </h3>
                            <div className="text-xs text-gray-600 mt-1">
                              {mangalDoshaData.manglik_status?.replace('_', ' ')}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-xl font-bold ${statusStyle.textColor} md:text-lg`}>
                            {mangalDoshaData.percentage_manglik_present}%
                          </div>
                          <div className="text-xs text-gray-600">
                            {translations.present}
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white bg-opacity-40 rounded-lg p-3 mt-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-gray-700">{translations.afterCancellation}</span>
                          <span className={`text-sm font-bold ${statusStyle.textColor}`}>
                            {mangalDoshaData.percentage_manglik_after_cancellation}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-semibold text-gray-700">{translations.isCancelled}</span>
                          <span className={`text-sm font-bold ${mangalDoshaData.is_mars_manglik_cancelled ? 'text-green-600' : 'text-red-600'}`}>
                            {mangalDoshaData.is_mars_manglik_cancelled ? translations.yes : translations.no}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Mangal Dosha Report */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-300 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                    <span className="text-2xl mr-2">📋</span>
                    {translations.detailedReport}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed md:text-xs">
                    {mangalDoshaData.manglik_report}
                  </p>
                </div>

                {/* Present Rules */}
                {mangalDoshaData.manglik_present_rule && (
                  <div className="space-y-4 mb-6">
                    {/* Based on House */}
                    {mangalDoshaData.manglik_present_rule.based_on_house && mangalDoshaData.manglik_present_rule.based_on_house.length > 0 && (
                      <div className="bg-gradient-to-r from-red-100 to-red-50 rounded-xl p-4 border border-red-300">
                        <h3 className="text-lg font-bold text-red-800 mb-3 md:text-base flex items-center">
                          <span className="text-2xl mr-2">🏠</span>
                          {translations.houseBased}
                        </h3>
                        <div className="space-y-2">
                          {mangalDoshaData.manglik_present_rule.based_on_house.map((rule, index) => (
                            <div key={index} className="bg-white bg-opacity-50 rounded-lg p-3">
                              <p className="text-sm text-gray-700 md:text-xs">{rule}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Based on Aspect */}
                    {mangalDoshaData.manglik_present_rule.based_on_aspect && mangalDoshaData.manglik_present_rule.based_on_aspect.length > 0 && (
                      <div className="bg-gradient-to-r from-orange-100 to-orange-50 rounded-xl p-4 border border-orange-300">
                        <h3 className="text-lg font-bold text-orange-800 mb-3 md:text-base flex items-center">
                          <span className="text-2xl mr-2">👁️</span>
                          {translations.aspectBased}
                        </h3>
                        <div className="space-y-2">
                          {mangalDoshaData.manglik_present_rule.based_on_aspect.slice(0, 3).map((rule, index) => (
                            <div key={index} className="bg-white bg-opacity-50 rounded-lg p-3">
                              <p className="text-sm text-gray-700 md:text-xs">{rule}</p>
                            </div>
                          ))}
                          {mangalDoshaData.manglik_present_rule.based_on_aspect.length > 3 && (
                            <div className="bg-white bg-opacity-30 rounded-lg p-2 text-center">
                              <p className="text-xs text-gray-600">
                                +{mangalDoshaData.manglik_present_rule.based_on_aspect.length - 3} {translations.moreAspects}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Cancellation Rules */}
                {mangalDoshaData.manglik_cancel_rule && mangalDoshaData.manglik_cancel_rule.length > 0 && (
                  <div className="bg-gradient-to-r from-green-100 to-emerald-50 rounded-xl p-4 border border-green-300 mb-6">
                    <h3 className="text-lg font-bold text-green-800 mb-3 md:text-base flex items-center">
                      <span className="text-2xl mr-2">✅</span>
                      {translations.cancellationRules}
                    </h3>
                    <div className="space-y-2">
                      {mangalDoshaData.manglik_cancel_rule.map((rule, index) => (
                        <div key={index} className="bg-white bg-opacity-50 rounded-lg p-3">
                          <p className="text-sm text-gray-700 md:text-xs">{rule}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Remedies Section */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-300 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                    <span className="text-2xl mr-2">🕉️</span>
                    {translations.remedies}
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="bg-white bg-opacity-70 rounded-lg p-3">
                      <div className="text-sm font-semibold text-purple-800 mb-1">{translations.spiritualPractices}</div>
                      <div className="text-xs text-gray-700">
                        {language === 'hindi' ? 'हनुमान जी की पूजा, मंगलवार का व्रत' : 'Worship of Lord Hanuman, Tuesday fasting'}
                      </div>
                    </div>
                    <div className="bg-white bg-opacity-70 rounded-lg p-3">
                      <div className="text-sm font-semibold text-purple-800 mb-1">{translations.mantras}</div>
                      <div className="text-xs text-gray-700">
                        {language === 'hindi' ? 'हनुमान चालीसा, मंगल मंत्र' : 'Hanuman Chalisa, Mars mantras'}
                      </div>
                    </div>
                    <div className="bg-white bg-opacity-70 rounded-lg p-3">
                      <div className="text-sm font-semibold text-purple-800 mb-1">{translations.gemstones}</div>
                      <div className="text-xs text-gray-700">
                        {language === 'hindi' ? 'मूंगा (कोरल) - विशेषज्ञ सलाह के बाद' : 'Red Coral - after expert consultation'}
                      </div>
                    </div>
                    <div className="bg-white bg-opacity-70 rounded-lg p-3">
                      <div className="text-sm font-semibold text-purple-800 mb-1">{translations.fasting}</div>
                      <div className="text-xs text-gray-700">
                        {language === 'hindi' ? 'मंगलवार का व्रत और दान' : 'Tuesday fasting and donations'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hope and Guidance Section */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-300 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 md:text-base flex items-center">
                    <span className="text-2xl mr-2">🌟</span>
                    {translations.divineGuidance}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed md:text-xs">
                    {language === 'hindi'
                      ? 'मंगल दोष कोई अभिशाप नहीं है। यह केवल एक ग्रहीय स्थिति है जो उचित समझ, आध्यात्मिक अभ्यास और सकारात्मक कार्यों से संतुलित की जा सकती है। कई सफल विवाह मंगलिक व्यक्तियों के होते हैं जब इसे बुद्धिमानी और सही मार्गदर्शन के साथ देखा जाता है।'
                      : 'Mangal Dosha is not a curse. It is merely a planetary position that can be balanced through proper understanding, spiritual practices, and positive actions. Many successful marriages involve Manglik individuals when approached with wisdom and the right guidance.'
                    }
                  </p>
                </div>
              </>
            )}

            {/* Bottom padding for scrolling */}
            <div className="h-4"></div>
          </div>

          {/* Navigation Component - Fixed at bottom */}
          <Navigation 
            currentPage="manglikdosh"
            nextText={translations.next}
            backText={translations.back}
            showNext={true}
            showBack={true}
          />
        </div>
      </div>
    </div>
  );
};

export default MangalDosha;