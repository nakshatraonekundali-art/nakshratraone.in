'use client'
import React, { useState, useEffect } from 'react';
import { useKundli } from '../context/KundliContext';
import Link from 'next/link';
import Navigation from '../components/Navigation';

const KundliChart = () => {
  const { formData, language, getBirthDetails } = useKundli();
  const [planetData, setPlanetData] = useState([]);
  const [chartImage, setChartImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentView, setCurrentView] = useState('chart'); // 'chart' or 'planets'

  // API configuration - Using your credentials
  const API_CONFIG = {
    userId: '643886',
    apiKey: '8cfa24ac82f34fa17f090ed5a6a2122b9f3e10bf',
    baseUrl: 'https://json.astrologyapi.com/v1',
  };
  
  // Get birth details from context
  const birthDetails = getBirthDetails();
  
  // Translations
  const translations = {
    loading: {
      english: "Loading Kundli Chart...",
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
    title: {
      english: "Here's your kundli chart",
      hindi: "यहां आपका कुंडली चार्ट है"
    },
    chartLoading: {
      english: "Chart Loading...",
      hindi: "चार्ट लोड हो रहा है..."
    },
    next: {
      english: "Next →",
      hindi: "अगला →"
    },
    back: {
      english: "Back",
      hindi: "वापस"
    }
  };

  // Function to get Basic Auth header
  const getAuthHeader = () => {
    const credentials = `${API_CONFIG.userId}:${API_CONFIG.apiKey}`;
    return `Basic ${btoa(credentials)}`;
  };

  // Function to fetch planets data
  const fetchPlanetsData = async () => {
    try {
      const response = await fetch(`${API_CONFIG.baseUrl}/planets`, {
        method: 'POST',
        headers: {
          Authorization: getAuthHeader(),
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Accept-Language': language === 'english' ? 'en' : 'hi',
        },
        body: JSON.stringify(birthDetails),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setPlanetData(data || []);
    } catch (error) {
      console.error('Error fetching planets data:', error);
      throw error;
    }
  };

  // Function to fetch chart image
  const fetchChartImage = async (chartId = 'D1') => {
    try {
      const response = await fetch(`${API_CONFIG.baseUrl}/horo_chart_image/${chartId}`, {
        method: 'POST',
        headers: {
          Authorization: getAuthHeader(),
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Accept-Language': language === 'english' ? 'en' : 'hi',
        },
        body: JSON.stringify(birthDetails),
      });

      if (!response.ok) {
        throw new Error(`Chart API Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      if (data?.svg) {
        setChartImage(data.svg);
      } else {
        setChartImage(generateFallbackChart());
      }
    } catch (error) {
      console.error('Error fetching chart image:', error);
      setChartImage(generateFallbackChart());
    }
  };

  // Generate fallback chart similar to your image
  const generateFallbackChart = () => {
    return `
      <svg width="320" height="320" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="320" fill="#fef3c7" stroke="#d97706" stroke-width="2" rx="8"/>
        <rect x="40" y="40" width="240" height="240" fill="none" stroke="#92400e" stroke-width="2"/>
        <line x1="40" y1="40" x2="280" y2="280" stroke="#92400e" stroke-width="1"/>
        <line x1="280" y1="40" x2="40" y2="280" stroke="#92400e" stroke-width="1"/>
        <line x1="160" y1="40" x2="160" y2="280" stroke="#92400e" stroke-width="1"/>
        <line x1="40" y1="160" x2="280" y2="160" stroke="#92400e" stroke-width="1"/>
        <text x="220" y="75" text-anchor="middle" fill="#92400e">1</text>
        <text x="250" y="100" text-anchor="middle" fill="#92400e">12</text>
        <text x="250" y="130" text-anchor="middle" fill="#92400e">11</text>
        <text x="250" y="220" text-anchor="middle" fill="#92400e">10</text>
        <text x="220" y="250" text-anchor="middle" fill="#92400e">9</text>
        <text x="100" y="250" text-anchor="middle" fill="#92400e">8</text>
        <text x="70" y="220" text-anchor="middle" fill="#92400e">7</text>
        <text x="70" y="100" text-anchor="middle" fill="#92400e">6</text>
        <text x="100" y="75" text-anchor="middle" fill="#92400e">5</text>
        <text x="130" y="100" text-anchor="middle" fill="#92400e">4</text>
        <text x="190" y="100" text-anchor="middle" fill="#92400e">3</text>
        <text x="190" y="220" text-anchor="middle" fill="#92400e">2</text>
        <text x="230" y="90" text-anchor="middle" fill="#dc2626">Ra Ur</text>
        <text x="180" y="120" text-anchor="middle" fill="#dc2626">Mo Ma</text>
        <text x="230" y="120" text-anchor="middle" fill="#dc2626">Ju</text>
        <text x="145" y="180" text-anchor="middle" fill="#dc2626">Sa</text>
        <text x="175" y="180" text-anchor="middle" fill="#dc2626">Ve Ne</text>
        <text x="230" y="200" text-anchor="middle" fill="#dc2626">Su Pl</text>
        <text x="100" y="230" text-anchor="middle" fill="#dc2626">Ke</text>
        <text x="190" y="230" text-anchor="middle" fill="#dc2626">Me</text>
      </svg>
    `;
  };

  // Fetch data on component mount (same behavior)
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError('');
      try {
        await Promise.all([fetchPlanetsData(), fetchChartImage()]);
      } catch (err) {
        console.error('Loading error:', err);
        setError(`Failed to load data: ${err.message}`);
      }
      setLoading(false);
    };
    loadData();
  }, []);

  // Helpers
  const getPlanetColor = (planetName) => {
    const colors = {
      Sun: 'bg-orange-200 text-orange-800',
      Moon: 'bg-purple-200 text-purple-800',
      Mars: 'bg-yellow-200 text-yellow-800',
      Mercury: 'bg-pink-200 text-pink-800',
      Jupiter: 'bg-blue-200 text-blue-800',
      Venus: 'bg-green-200 text-green-800',
      Saturn: 'bg-purple-200 text-purple-800',
      Rahu: 'bg-yellow-200 text-yellow-800',
      Ketu: 'bg-lime-200 text-lime-800',
      Ascendant: 'bg-cyan-200 text-cyan-800',
    };
    return colors[planetName] || 'bg-gray-200 text-gray-800';
  };

  const formatDegree = (planet) => {
    if (planet?.normDegree === undefined || planet?.normDegree === null) return '';
    const degree = Math.floor(planet.normDegree);
    const minutes = Math.floor((planet.normDegree - degree) * 60);
    const seconds = Math.floor(((planet.normDegree - degree) * 60 - minutes) * 60);
    return `${degree}°${minutes}'${seconds}\"`;
  };

  const getPlanetIcon = (planetName) => {
    const icons = {
      Sun: '☉',
      Moon: '☽',
      Mars: '♂',
      Mercury: '☿',
      Jupiter: '♃',
      Venus: '♀',
      Saturn: '♄',
      Rahu: '☊',
      Ketu: '☋',
      Ascendant: '↗',
    };
    return icons[planetName] || '●';
  };

  // Navigation handlers
  const handleNext = () => {
    if (currentView === 'chart') {
      setCurrentView('planets');
    } else {
      window.location.href = '/kundali/planets/sun';
    }
  };
  const handleBack = () => {
    if (currentView !== 'chart') {
      setCurrentView('chart');
    } else {
      window.location.href = '/kundali/overreview';
    }
  };

  // Loading UI — matched style
  if (loading) {
    return (
      <div className="min-h-screen bg-white md:bg-gradient-to-br md:from-purple-800 md:via-purple-600 md:to-purple-400 md:flex md:items-center md:justify-center md:p-4">
        <div className="bg-gray-50 rounded-lg p-8 shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
          <p className="text-center mt-4 text-gray-600">{language === 'english' ? translations.loading.english : translations.loading.hindi}</p>
        </div>
      </div>
    );
  }

  // Error UI — matched style
  if (error) {
    return (
      <div className="min-h-screen bg-white md:bg-gradient-to-br md:from-purple-800 md:via-purple-600 md:to-purple-400 md:flex md:items-center md:justify-center md:p-4">
        <div className="bg-gray-50 rounded-lg p-8 shadow-xl max-w-md w-full">
          <div className="text-red-600 text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold mb-2">{language === 'english' ? translations.error.english : translations.error.hindi}</h2>
            <p className="text-sm text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => {
                setError('');
                setLoading(true);
                Promise.all([fetchPlanetsData(), fetchChartImage()]).finally(() => setLoading(false));
              }}
              className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
            >
              {language === 'english' ? translations.retry.english : translations.retry.hindi}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // MAIN UI — perfectly aligned with VenusAnalysis (same card width/height/scrollability)
  return (
    <div className="min-h-screen bg-white md:bg-gradient-to-br md:from-purple-800 md:via-purple-600 md:to-purple-400 md:flex md:items-center md:justify-center md:p-4">
      {/* Mobile: full width; Desktop: centered card same as Venus (md:max-w-lg & md:h-[95vh]) */}
      <div className="w-full max-w-full mx-auto md:max-w-lg">
        <div className="bg-gradient-to-b from-orange-100 via-pink-50 to-purple-50 min-h-screen md:min-h-0 flex flex-col md:rounded-3xl md:shadow-2xl md:overflow-hidden md:h-[95vh]">
          {/* Header — sticky on mobile, normal on desktop (same as Venus) */}
          <div className="text-center pt-8 pb-6 px-6 flex-shrink-0 md:pt-6 md:pb-4 bg-gradient-to-b from-orange-100 via-pink-50 to-purple-50 sticky top-0 z-10 md:relative">
            <div className="flex items-center justify-center mb-2 md:mb-1">
              <div className="text-orange-500 text-xl font-bold md:text-lg">Nakshatra</div>
              <div className="text-blue-500 text-xl font-bold md:text-lg">One</div>
            </div>
            <h2 className="text-lg font-bold text-gray-800">{language === 'english' ? translations.title.english : translations.title.hindi}</h2>
          </div>

          {/* Scrollable content area — flex-1 with overflow (exactly like Venus) */}
          <div className="flex-1 overflow-y-auto px-6 pb-6 md:scrollbar-thin md:scrollbar-thumb-gray-300 md:scrollbar-track-transparent">
            {currentView === 'chart' ? (
              <>
                {/* Chart Container — visually matched spacing & border */}
                <div className="bg-yellow-50 rounded-2xl mt-4 md:p-10 md:mt-4 mb-6 border border-yellow-200 shadow-sm">
                  {chartImage ? (
                    <div
                      className="w-full h-80 md:h-72 flex items-center justify-center"
                      dangerouslySetInnerHTML={{ __html: chartImage }}
                    />
                  ) : (
                    <div className="w-full h-80 md:h-72 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                      <div className="text-center">
                        <div className="text-4xl mb-2">📊</div>
                        <p className="text-gray-600 text-sm">{language === 'english' ? translations.chartLoading.english : translations.chartLoading.hindi}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Planets list — identical badge look & spacing */}
                <div className="space-y-3">
                  {planetData.map((planet, index) => (
                    <div
                      key={planet?.id || `${planet?.name || 'p'}-${index}`}
                      className={`flex items-center justify-between p-4 rounded-xl ${getPlanetColor(planet?.name)} shadow-sm`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{getPlanetIcon(planet?.name)}</span>
                        <span className="font-semibold text-sm">{planet?.name || '—'}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-xs">
                          {planet?.sign ? `♉ ${planet.sign}` : ''} {formatDegree(planet)}
                        </div>
                        <div className="text-xs text-gray-700/80">
                          {planet?.house ? `${planet.house}th House` : ''}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              // All Planets View — same renderer as above (kept for layout parity)
              <div className="space-y-3">
                {planetData.map((planet, index) => (
                  <div
                    key={planet?.id || `${planet?.name || 'p'}-${index}`}
                    className={`flex items-center justify-between p-4 rounded-xl ${getPlanetColor(planet?.name)} shadow-sm`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{getPlanetIcon(planet?.name)}</span>
                      <span className="font-semibold text-sm">{planet?.name || '—'}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-xs">
                        {planet?.sign ? `♉ ${planet.sign}` : ''} {formatDegree(planet)}
                      </div>
                      <div className="text-xs text-gray-700/80">
                        {planet?.house ? `${planet.house}th House` : ''}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Bottom spacer so last item is not hidden behind footer on small screens */}
            <div className="h-4"></div>
          </div>

          {/* Navigation — fixed within card just like Venus */}
          <Navigation 
            currentPage="planets" 
            nextText={language === 'english' ? translations.next.english : translations.next.hindi}
            backText={language === 'english' ? translations.back.english : translations.back.hindi}
            onNext={handleNext}
            onBack={handleBack}
            disableBack={currentView === 'chart'}
          />
        </div>
      </div>
    </div>
  );
};

export default KundliChart;
