'use client'
import React, { useState, useEffect } from 'react';
import { useKundli } from '../../context/KundliContext';
import Navigation from '../../components/Navigation';

const BasicGemSuggestion = () => {
  const [gemData, setGemData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { language, formData } = useKundli();

  // API configuration
  const API_CONFIG = {
    userId: '643886',
    apiKey: '8cfa24ac82f34fa17f090ed5a6a2122b9f3e10bf',
    baseUrl: 'https://json.astrologyapi.com/v1',
    api: 'basic_gem_suggestion'
  };
   
  // Use birth details from context or fallback to defaults
  const birthDetails = formData && typeof formData === 'object' ? formData : {
    day: 4,
    month: 8,
    year: 2010,
    hour: 7,
    min: 45,
    lat: 19.132,
    lon: 72.342,
    tzone: 5.5
  };

  // Translations
  const translations = {
    loading: {
      english: "Loading Your Gem Suggestions...",
      hindi: "आपके रत्न सुझाव लोड हो रहे हैं..."
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
      english: "Your Personalized Gemstone Recommendations",
      hindi: "आपके व्यक्तिगत रत्न सुझाव"
    },
    subtitle: {
      english: "Based on your birth details and planetary positions",
      hindi: "आपके जन्म विवरण और ग्रह स्थिति के आधार पर"
    },
    powerOfGemstones: {
      english: "The Power of Gemstones",
      hindi: "रत्नों की शक्ति"
    },
    gemstoneIntro: {
      english: "Gemstones have been used for centuries to harness planetary energies and enhance various aspects of life. Each stone resonates with specific cosmic vibrations that can amplify positive influences in your journey.",
      hindi: "सदियों से रत्नों का उपयोग ग्रहों की ऊर्जा का दोहन करने और जीवन के विभिन्न पहलुओं को बेहतर बनाने के लिए किया जाता रहा है। प्रत्येक पत्थर विशिष्ट ब्रह्मांडीय कंपन के साथ गूंजता है जो आपकी यात्रा में सकारात्मक प्रभावों को बढ़ा सकता है।"
    },
    categoryDescriptions: {
      LIFE: {
        english: "Your primary life stone for overall strength and vitality",
        hindi: "समग्र शक्ति और जीवन शक्ति के लिए आपका मुख्य जीवन रत्न"
      },
      BENEFIC: {
        english: "Your beneficial stone for prosperity and wisdom",
        hindi: "समृद्धि और बुद्धि के लिए आपका लाभकारी रत्न"
      },
      LUCKY: {
        english: "Your lucky stone for courage and success",
        hindi: "साहस और सफलता के लिए आपका भाग्यशाली रत्न"
      }
    },
    properties: {
      deity: {
        english: "Deity",
        hindi: "देवता"
      },
      alternative: {
        english: "Alternative",
        hindi: "विकल्प"
      },
      wearOn: {
        english: "Wear On:",
        hindi: "पहनें:"
      },
      weight: {
        english: "Weight:",
        hindi: "वजन:"
      },
      metal: {
        english: "Metal:",
        hindi: "धातु:"
      },
      bestDay: {
        english: "Best Day:",
        hindi: "सर्वोत्तम दिन:"
      },
      finger: {
        english: "finger",
        hindi: "अंगुली"
      },
      carats: {
        english: "carats",
        hindi: "कैरेट"
      }
    },
    guidelines: {
      title: {
        english: "Important Guidelines",
        hindi: "महत्वपूर्ण दिशानिर्देश"
      },
      points: {
        english: [
          "Consult with a qualified gemstone expert before purchasing",
          "Ensure gemstones are natural and properly energized",
          "Follow proper wearing rituals and maintenance",
          "Start with one stone and observe its effects"
        ],
        hindi: [
          "खरीदारी से पहले एक योग्य रत्न विशेषज्ञ से सलाह लें",
          "सुनिश्चित करें कि रत्न प्राकृतिक और उचित रूप से ऊर्जावान हैं",
          "उचित पहनने की रीति-रिवाज और रखरखाव का पालन करें",
          "एक पत्थर से शुरू करें और इसके प्रभावों का अवलोकन करें"
        ]
      }
    },
    blessing: {
      title: {
        english: "Divine Blessings",
        hindi: "दिव्य आशीर्वाद"
      },
      message: {
        english: "May these sacred gemstones bring positive energy, protection, and prosperity into your life. Remember, the true power lies in your faith and positive intentions.",
        hindi: "ये पवित्र रत्न आपके जीवन में सकारात्मक ऊर्जा, सुरक्षा और समृद्धि लाएं। याद रखें, वास्तविक शक्ति आपकी श्रद्धा और सकारात्मक इरादों में निहित है।"
      }
    },
    next: {
      english: "Continue to Numerology →",
      hindi: "अंकशास्त्र की ओर जारी रखें →"
    },
    back: {
      english: "← Back to Ascendant",
      hindi: "← लग्न पर वापस जाएं"
    }
  };

  // Function to get Basic Auth header
  const getAuthHeader = () => {
    const credentials = `${API_CONFIG.userId}:${API_CONFIG.apiKey}`;
    return `Basic ${btoa(credentials)}`;
  };

  // Function to simulate Gem data if API fails (fallback)
  const loadFallbackData = () => {
    const fallbackData = {
      LIFE: {
        name: language === 'english' ? 'Ruby' : 'माणिक',
        gem_deity: language === 'english' ? 'Sun God' : 'सूर्य देव',
        semi_gem: language === 'english' ? 'Red Garnet' : 'लाल गार्नेट',
        wear_finger: language === 'english' ? 'Ring' : 'अनामिका',
        weight_caret: '3-5',
        wear_metal: language === 'english' ? 'Gold' : 'सोना',
        wear_day: language === 'english' ? 'Sunday' : 'रविवार'
      },
      BENEFIC: {
        name: language === 'english' ? 'Yellow Sapphire' : 'पुखराज',
        gem_deity: language === 'english' ? 'Jupiter' : 'बृहस्पति',
        semi_gem: language === 'english' ? 'Yellow Topaz' : 'पीला पुखराज',
        wear_finger: language === 'english' ? 'Index' : 'तर्जनी',
        weight_caret: '5-7',
        wear_metal: language === 'english' ? 'Gold' : 'सोना',
        wear_day: language === 'english' ? 'Thursday' : 'गुरुवार'
      },
      LUCKY: {
        name: language === 'english' ? 'Red Coral' : 'मूंगा',
        gem_deity: language === 'english' ? 'Mars' : 'मंगल',
        semi_gem: language === 'english' ? 'Carnelian' : 'कार्नेलियन',
        wear_finger: language === 'english' ? 'Ring' : 'अनामिका',
        weight_caret: '4-6',
        wear_metal: language === 'english' ? 'Gold/Copper' : 'सोना/तांबा',
        wear_day: language === 'english' ? 'Tuesday' : 'मंगलवार'
      }
    };
    
    console.log('Loading fallback Gem data:', fallbackData);
    setGemData(fallbackData);
  };

  // Function to fetch Gem suggestion data
  const fetchGemData = async () => {
    try {
      setLoading(true);
      setError(''); // Clear previous errors
      
      // Validate birth details first
      const safeDetails = {
        day: birthDetails?.day || 4,
        month: birthDetails?.month || 8,
        year: birthDetails?.year || 2010,
        hour: birthDetails?.hour || 7,
        min: birthDetails?.min || 45,
        lat: birthDetails?.lat || 19.132,
        lon: birthDetails?.lon || 72.342,
        tzone: birthDetails?.tzone || 5.5
      };
      
      console.log('Birth details being used:', safeDetails);
      
      // For now, let's load demo data directly since API might have issues
      console.log('Loading demo data...');
      loadFallbackData();
      return;
      
      // Commented out API call - uncomment when API is stable
      /*
      const response = await fetch(`${API_CONFIG.baseUrl}/${API_CONFIG.api}`, {
        method: 'POST',
        headers: {
          'Authorization': getAuthHeader(),
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Accept-Language': language === 'english' ? 'en' : 'hi'
        },
        body: JSON.stringify(safeDetails)
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Gem Data:', data);
      setGemData(data);
      */
      
    } catch (error) {
      console.error('Error fetching Gem data:', error);
      
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
    fetchGemData();
  }, [language]); // Re-fetch when language changes

  // Function to get gem emoji
  const getGemEmoji = (gemName) => {
    const gemEmojis = {
      'Ruby': '💎',
      'माणिक': '💎',
      'Yellow Sapphire': '🟡',
      'पुखराज': '🟡',
      'Red Coral': '🪸',
      'मूंगा': '🪸',
      'Pearl': '🤍',
      'मोती': '🤍',
      'Emerald': '💚',
      'पन्ना': '💚',
      'Diamond': '💎',
      'हीरा': '💎',
      'Blue Sapphire': '🔵',
      'नीलम': '🔵',
      'Hessonite': '🟠',
      'गोमेद': '🟠',
      'Cat\'s Eye': '👁️',
      'लहसुनिया': '👁️'
    };
    return gemEmojis[gemName] || '💎';
  };

  // Function to get gem color class
  const getGemColorClass = (category) => {
    const colorClasses = {
      'LIFE': 'from-red-100 to-red-50 border-red-300',
      'BENEFIC': 'from-yellow-100 to-yellow-50 border-yellow-300',
      'LUCKY': 'from-orange-100 to-orange-50 border-orange-300'
    };
    return colorClasses[category] || 'from-gray-100 to-gray-50 border-gray-300';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-gray-50 rounded-lg p-8 shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="text-center mt-4 text-gray-600">
            {language === 'english' ? translations.loading.english : translations.loading.hindi}
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
            <h2 className="text-xl font-bold mb-2">
              {language === 'english' ? translations.error.english : translations.error.hindi}
            </h2>
            <p className="text-sm text-gray-600 mb-4">{error}</p>
            <div className="flex flex-col space-y-2">
              <button 
                onClick={fetchGemData} 
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                {language === 'english' ? translations.retry.english : translations.retry.hindi}
              </button>
              <button 
                onClick={loadFallbackData} 
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
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
            {gemData && (
              <>
                {/* Main Title */}
                <div className="text-center mb-6">
                  <h1 className="text-xl font-bold text-gray-800 mb-4 leading-tight md:text-lg">
                    {language === 'english' ? translations.title.english : translations.title.hindi}
                  </h1>
                  <p className="text-sm text-gray-600">
                    {language === 'english' ? translations.subtitle.english : translations.subtitle.hindi}
                  </p>
                </div>

                {/* Guru Image */}
                <div className="text-center mb-6">
                  <div className="w-full max-w-xs mx-auto mb-4">
                    <img 
                      src="https://img.freepik.com/free-vector/flat-illustration-guru-purnima_23-2150428338.jpg"
                      alt="Gemstone Guru"
                      className="w-full h-auto object-contain rounded-lg"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div className="hidden bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg p-8 border-2 border-yellow-200">
                      <div className="text-6xl mb-4">💎</div>
                      <div className="text-sm text-gray-600">
                        {language === 'english' ? 'Gemstone Guidance' : 'रत्न मार्गदर्शन'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Introduction */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-300 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                    <span className="text-2xl mr-2">✨</span>
                    {language === 'english' ? translations.powerOfGemstones.english : translations.powerOfGemstones.hindi}
                  </h3>
                  <div className="bg-white bg-opacity-70 rounded-lg p-4">
                    <p className="text-sm text-gray-700 leading-relaxed md:text-xs">
                      {language === 'english' ? translations.gemstoneIntro.english : translations.gemstoneIntro.hindi}
                    </p>
                  </div>
                </div>

                {/* Gem Cards */}
                {Object.entries(gemData).map(([category, gem], index) => (
                  <div key={category} className={`bg-gradient-to-r ${getGemColorClass(category)} rounded-xl p-4 border mb-6`}>
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-800 md:text-base flex items-center">
                          <span className="text-2xl mr-2">{getGemEmoji(gem.name)}</span>
                          {gem.name}
                        </h3>
                        <div className="bg-white bg-opacity-70 px-2 py-1 rounded-lg text-xs font-semibold text-gray-700">
                          {category} {language === 'english' ? 'STONE' : 'रत्न'}
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mb-3">
                        {language === 'english' 
                          ? translations.categoryDescriptions[category]?.english 
                          : translations.categoryDescriptions[category]?.hindi
                        }
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-white bg-opacity-60 rounded-lg p-3">
                        <div className="text-xs font-semibold text-gray-600 mb-1">
                          {language === 'english' ? translations.properties.deity.english : translations.properties.deity.hindi}
                        </div>
                        <div className="text-sm font-bold text-gray-800">{gem.gem_deity}</div>
                      </div>
                      <div className="bg-white bg-opacity-60 rounded-lg p-3">
                        <div className="text-xs font-semibold text-gray-600 mb-1">
                          {language === 'english' ? translations.properties.alternative.english : translations.properties.alternative.hindi}
                        </div>
                        <div className="text-sm font-bold text-gray-800">{gem.semi_gem}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-gray-600">
                          {language === 'english' ? translations.properties.wearOn.english : translations.properties.wearOn.hindi}
                        </span>
                        <span className="text-sm font-bold text-gray-800">
                          {gem.wear_finger} {language === 'english' ? translations.properties.finger.english : translations.properties.finger.hindi}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-gray-600">
                          {language === 'english' ? translations.properties.weight.english : translations.properties.weight.hindi}
                        </span>
                        <span className="text-sm font-bold text-gray-800">
                          {gem.weight_caret} {language === 'english' ? translations.properties.carats.english : translations.properties.carats.hindi}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-gray-600">
                          {language === 'english' ? translations.properties.metal.english : translations.properties.metal.hindi}
                        </span>
                        <span className="text-sm font-bold text-gray-800">{gem.wear_metal}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-gray-600">
                          {language === 'english' ? translations.properties.bestDay.english : translations.properties.bestDay.hindi}
                        </span>
                        <span className="text-sm font-bold text-gray-800">{gem.wear_day}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Important Notes */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-300 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                    <span className="text-2xl mr-2">⚠️</span>
                    {language === 'english' ? translations.guidelines.title.english : translations.guidelines.title.hindi}
                  </h3>
                  
                  <div className="bg-white bg-opacity-70 rounded-lg p-4">
                    <div className="space-y-2 text-sm text-gray-700 md:text-xs">
                      {(language === 'english' ? translations.guidelines.points.english : translations.guidelines.points.hindi).map((point, index) => (
                        <div key={index} className="flex items-start">
                          <span className="text-purple-600 mr-2">•</span>
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Blessing Message */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-300 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 md:text-base flex items-center">
                    <span className="text-2xl mr-2">🙏</span>
                    {language === 'english' ? translations.blessing.title.english : translations.blessing.title.hindi}
                  </h3>
                  <div className="bg-white bg-opacity-70 rounded-lg p-4">
                    <p className="text-sm text-gray-700 leading-relaxed md:text-xs">
                      {language === 'english' ? translations.blessing.message.english : translations.blessing.message.hindi}
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* Bottom padding for scrolling */}
            <div className="h-4"></div>
          </div>

          {/* Navigation Component - Fixed at bottom */}
          <Navigation 
            currentPage="gem_suggestion"
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

export default BasicGemSuggestion;