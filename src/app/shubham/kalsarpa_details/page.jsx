'use client'
import React, { useState, useEffect } from 'react';
import { useKundli } from '../context/KundliContext';
import Navigation from '../components/Navigation';

const KalsarpaDetails = () => {
  const [kalsarpaData, setKalsarpaData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { formData, language } = useKundli();

  // API configuration
  const API_CONFIG = {
    userId: '643886',
    apiKey: '8cfa24ac82f34fa17f090ed5a6a2122b9f3e10bf',
    baseUrl: 'https://json.astrologyapi.com/v1',
    api: 'kalsarpa_details'
  };

  // Translations
  const translations = {
    loading: {
      english: 'Loading Your Kalsarpa Details...',
      hindi: 'आपका कालसर्प विवरण लोड हो रहा है...'
    },
    error: {
      english: 'Error Loading Data',
      hindi: 'डेटा लोड करने में त्रुटि'
    },
    retry: {
      english: 'Retry',
      hindi: 'पुन: प्रयास करें'
    },
    next: {
      english: 'Next →',
      hindi: 'आगे →'
    },
    back: {
      english: 'Back',
      hindi: 'पीछे'
    }
  };
   
  // Birth details from context
  const birthDetails = {
    name: formData.name || "Shubham",
    day: parseInt(formData.day) || 4,
    month: parseInt(formData.month) || 8,
    year: parseInt(formData.year) || 2004,
    hour: parseInt(formData.hour) || 4,
    min: parseInt(formData.minute) || 57,
    lat: parseFloat(formData.latitude) || 19.132,
    lon: parseFloat(formData.longitude) || 72.342,
    tzone: parseFloat(formData.timezone) || 5.5
  };

  // Function to get Basic Auth header
  const getAuthHeader = () => {
    const credentials = `${API_CONFIG.userId}:${API_CONFIG.apiKey}`;
    return `Basic ${btoa(credentials)}`;
  };

  // Function to fetch Kalsarpa details data
  const fetchKalsarpaData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_CONFIG.baseUrl}/${API_CONFIG.api}`, {
        method: 'POST',
        headers: {
          'Authorization': getAuthHeader(),
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Accept-Language': language === 'english' ? 'en' : 'hi'
        },
        body: JSON.stringify(birthDetails)
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Kalsarpa Data:', data);
      setKalsarpaData(data);
      
    } catch (error) {
      console.error('Error fetching Kalsarpa data:', error);
      setError(`Failed to load data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchKalsarpaData();
  }, []);

  // Function to handle next button click
  const handleNext = () => {
    console.log('Navigate to next section');
  };

  // Function to handle back button click
  const handleBack = () => {
    console.log('Navigate back');
  };

  // Function to clean HTML content
  const cleanHtmlContent = (htmlString) => {
    if (!htmlString) return '';
    // Remove HTML tags and clean up the content
    return htmlString
      .replace(/<[^>]*>/g, '')
      .replace(/\n\s*\n/g, '\n\n')
      .trim();
  };

  // Function to get dosha severity color
  const getDoshaColorClass = (type, present) => {
    if (!present) {
      return 'from-green-100 to-green-50 border-green-300';
    }
    if (type?.toLowerCase().includes('partial')) {
      return 'from-yellow-100 to-yellow-50 border-yellow-300';
    }
    return 'from-red-100 to-red-50 border-red-300';
  };

  // Function to get status emoji
  const getStatusEmoji = (present, type) => {
    if (!present) return '✅';
    if (type?.toLowerCase().includes('partial')) return '⚠️';
    return '🔴';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-gray-50 rounded-lg p-8 shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="text-center mt-4 text-gray-600">{language === 'english' ? translations.loading.english : translations.loading.hindi}</p>
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
            <h2 className="text-xl font-bold mb-2">{language === 'english' ? translations.error.english : translations.error.hindi}</h2>
            <p className="text-sm text-gray-600 mb-4">{error}</p>
            <button 
              onClick={fetchKalsarpaData} 
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            >
              {language === 'english' ? translations.retry.english : translations.retry.hindi}
            </button>
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
            {kalsarpaData && (
              <>
                {/* Main Title */}
                <div className="text-center mb-6">
                  <h1 className="text-xl font-bold text-gray-800 mb-2 leading-tight md:text-lg">
                    Kalsarpa Dosha Analysis for {birthDetails.name}
                  </h1>
                  <p className="text-sm text-gray-600">
                    Comprehensive planetary alignment analysis
                  </p>
                </div>

                {/* Lord Vishnu Image */}
                <div className="text-center mb-6">
                  <div className="w-full max-w-xs mx-auto mb-4">
                    <img 
                      src="https://img.freepik.com/premium-vector/lord-vishnu-indian-hindu-god-vector-illustration_545622-1550.jpg"
                      alt="Lord Vishnu - Divine Protection"
                      className="w-full h-auto object-contain rounded-lg"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div className="hidden bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg p-8 border-2 border-yellow-200">
                      <div className="text-6xl mb-4">🐍</div>
                      <div className="text-sm text-gray-600">Kalsarpa Analysis</div>
                    </div>
                  </div>
                </div>

                {/* Status Overview */}
                <div className={`bg-gradient-to-r ${getDoshaColorClass(kalsarpaData.type, kalsarpaData.present)} rounded-xl p-4 border mb-6`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-800 md:text-base flex items-center">
                      <span className="text-2xl mr-2">{getStatusEmoji(kalsarpaData.present, kalsarpaData.type)}</span>
                      Dosha Status
                    </h3>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-800">
                        {kalsarpaData.present ? 'Present' : 'Absent'}
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

                {/* What is Kalsarpa Dosha */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-300 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                    <span className="text-2xl mr-2">🐍</span>
                    What is Kalsarpa Dosha?
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed md:text-xs">
                    Kalsarpa Dosha occurs when all planets are positioned between Rahu (North Node) 
                    and Ketu (South Node) in a birth chart. This creates a serpent-like formation 
                    that can influence various life aspects. The intensity depends on the exact 
                    planetary positions and can be partial or complete.
                  </p>
                </div>

                {/* Specific Dosha Type */}
                {kalsarpaData.name && (
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-300 mb-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                      <span className="text-2xl mr-2">🔮</span>
                      Your Specific Dosha: {kalsarpaData.name}
                    </h3>
                    
                    {kalsarpaData.report && kalsarpaData.report.house_id && (
                      <div className="bg-white bg-opacity-60 rounded-lg p-3 mb-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold text-gray-600">Affected House:</span>
                          <span className="text-lg font-bold text-purple-700">{kalsarpaData.report.house_id}th House</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="bg-purple-100 rounded-lg p-3">
                      <div className="text-sm font-semibold text-purple-800 mb-1">Special Note</div>
                      <div className="text-sm text-purple-700">
                        {kalsarpaData.name} Kalsarpa Dosha has specific characteristics and remedies. 
                        Each type affects different life areas uniquely.
                      </div>
                    </div>
                  </div>
                )}

                {/* Detailed Analysis */}
                {kalsarpaData.report && kalsarpaData.report.report && (
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-300 mb-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                      <span className="text-2xl mr-2">📊</span>
                      Detailed Life Impact Analysis
                    </h3>
                    <div className="bg-orange-600 text-white px-3 py-1 rounded-lg text-sm font-semibold inline-block mb-4">
                      {kalsarpaData.name} Kaal Sarp Yog Effects
                    </div>
                    
                    <div className="bg-white bg-opacity-70 rounded-lg p-4">
                      <p className="text-sm text-gray-700 leading-relaxed md:text-xs whitespace-pre-line">
                        {cleanHtmlContent(kalsarpaData.report.report)}
                      </p>
                    </div>
                  </div>
                )}

                {/* Life Areas Affected */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-300 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                    <span className="text-2xl mr-2">⚡</span>
                    Commonly Affected Life Areas
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white bg-opacity-60 rounded-lg p-3 text-center">
                      <div className="text-lg mb-1">💼</div>
                      <div className="text-xs font-semibold text-gray-700">Career</div>
                    </div>
                    <div className="bg-white bg-opacity-60 rounded-lg p-3 text-center">
                      <div className="text-lg mb-1">👥</div>
                      <div className="text-xs font-semibold text-gray-700">Relationships</div>
                    </div>
                    <div className="bg-white bg-opacity-60 rounded-lg p-3 text-center">
                      <div className="text-lg mb-1">💰</div>
                      <div className="text-xs font-semibold text-gray-700">Finances</div>
                    </div>
                    <div className="bg-white bg-opacity-60 rounded-lg p-3 text-center">
                      <div className="text-lg mb-1">🏥</div>
                      <div className="text-xs font-semibold text-gray-700">Health</div>
                    </div>
                  </div>
                </div>

                {/* Remedies and Solutions */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-300 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                    <span className="text-2xl mr-2">🕉️</span>
                    General Remedies & Protection
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="bg-white bg-opacity-70 rounded-lg p-3">
                      <div className="text-sm font-semibold text-green-800 mb-1">Spiritual Practices</div>
                      <div className="text-xs text-gray-700">Regular prayers, meditation, and visiting temples</div>
                    </div>
                    <div className="bg-white bg-opacity-70 rounded-lg p-3">
                      <div className="text-sm font-semibold text-green-800 mb-1">Mantras</div>
                      <div className="text-xs text-gray-700">Rahu-Ketu mantras and Maha Mrityunjaya mantra</div>
                    </div>
                    <div className="bg-white bg-opacity-70 rounded-lg p-3">
                      <div className="text-sm font-semibold text-green-800 mb-1">Gemstones</div>
                      <div className="text-xs text-gray-700">Appropriate gems after consultation with expert</div>
                    </div>
                    <div className="bg-white bg-opacity-70 rounded-lg p-3">
                      <div className="text-sm font-semibold text-green-800 mb-1">Charitable Acts</div>
                      <div className="text-xs text-gray-700">Donations and helping those in need</div>
                    </div>
                  </div>
                </div>

                {/* Hope and Guidance */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-300 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 md:text-base flex items-center">
                    <span className="text-2xl mr-2">🌟</span>
                    Divine Guidance & Hope
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed md:text-xs">
                    Remember, Kalsarpa Dosha is not a permanent curse but a karmic pattern that can be 
                    transformed through spiritual practices, positive actions, and divine grace. Many great 
                    personalities have had this dosha and achieved remarkable success. Your consciousness 
                    and efforts can overcome any planetary challenge.
                  </p>
                </div>
              </>
            )}

            {/* Bottom padding for scrolling */}
            <div className="h-4"></div>
          </div>

          {/* Navigation - Fixed at bottom */}
          <Navigation 
            currentPage="kalsarpa_details"
            nextText={language === 'english' ? translations.next.english : translations.next.hindi}
            backText={language === 'english' ? translations.back.english : translations.back.hindi}
            onNext={handleNext}
            onBack={handleBack}
          />
        </div>
      </div>
    </div>
  );
};

export default KalsarpaDetails;