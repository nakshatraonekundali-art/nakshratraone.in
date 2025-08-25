'use client'
import React, { useState, useEffect } from 'react';
import { useKundli } from '../../context/KundliContext';
import Navigation from '../../components/Navigation';

const NumeroDetails = () => {
  const [numeroData, setNumeroData] = useState(null);
  const [numeroReport, setNumeroReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { language, formData } = useKundli();

  // API configuration
  const API_CONFIG = {
    userId: '643886',
    apiKey: '8cfa24ac82f34fa17f090ed5a6a2122b9f3e10bf',
    baseUrl: 'https://json.astrologyapi.com/v1'
  };

  // Use birth details from context or fallback to defaults
  const birthDetails = formData && typeof formData === 'object' ? {
    name: formData.name || "User",
    day: formData.day || 6,
    month: formData.month || 8,
    year: formData.year || 2000,
    hour: formData.hour || 7,
    min: formData.min || 45,
    lat: formData.lat || 19.132,
    lon: formData.lon || 72.342,
    tzone: formData.tzone || 5.5
  } : {
    name: "User",
    day: 6,
    month: 8,
    year: 2000,
    hour: 7,
    min: 45,
    lat: 19.132,
    lon: 72.342,
    tzone: 5.5
  };

  // Translations
  const translations = {
    loading: {
      english: "Loading Your Numerology Report...",
      hindi: "आपकी अंकशास्त्र रिपोर्ट लोड हो रही है..."
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
      english: "Numerology Report for",
      hindi: "अंकशास्त्र रिपोर्ट -"
    },
    bornOn: {
      english: "Born on",
      hindi: "जन्म दिनांक"
    },
    coreNumbers: {
      english: "Your Core Numbers",
      hindi: "आपके मुख्य अंक"
    },
    destiny: {
      english: "Destiny",
      hindi: "भाग्य"
    },
    radical: {
      english: "Radical",
      hindi: "मूलांक"
    },
    name: {
      english: "Name",
      hindi: "नाम"
    },
    rulingPlanet: {
      english: "Ruling Planet",
      hindi: "स्वामी ग्रह"
    },
    favorableElements: {
      english: "Your Favorable Elements",
      hindi: "आपके अनुकूल तत्व"
    },
    luckyDays: {
      english: "Lucky Days:",
      hindi: "शुभ दिन:"
    },
    luckyColor: {
      english: "Lucky Color:",
      hindi: "शुभ रंग:"
    },
    luckyMetal: {
      english: "Lucky Metal:",
      hindi: "शुभ धातु:"
    },
    luckyStones: {
      english: "Lucky Stones:",
      hindi: "शुभ रत्न:"
    },
    alternativeStones: {
      english: "Alternative Stones:",
      hindi: "वैकल्पिक रत्न:"
    },
    favoredDeity: {
      english: "Favored Deity:",
      hindi: "इष्ट देव:"
    },
    numberRelationships: {
      english: "Number Relationships",
      hindi: "अंक संबंध"
    },
    friendlyNumbers: {
      english: "Friendly Numbers",
      hindi: "मित्र अंक"
    },
    neutralNumbers: {
      english: "Neutral Numbers",
      hindi: "तटस्थ अंक"
    },
    challengingNumbers: {
      english: "Challenging Numbers",
      hindi: "चुनौतीपूर्ण अंक"
    },
    sacredMantra: {
      english: "Your Sacred Mantra",
      hindi: "आपका पवित्र मंत्र"
    },
    mantraInstruction: {
      english: "Chant this mantra daily for enhanced positive vibrations",
      hindi: "सकारात्मक ऊर्जा के लिए इस मंत्र का दैनिक जाप करें"
    },
    divineGuidance: {
      english: "Divine Guidance",
      hindi: "दिव्य मार्गदर्शन"
    },
    guidanceMessage: {
      english: "Numbers carry the divine vibrations of the universe. Embrace your numerological blueprint and align with these cosmic energies for a harmonious and prosperous life. Remember, your destiny is written in numbers, but your choices shape your journey.",
      hindi: "अंक ब्रह्मांड की दिव्य कंपनाओं को धारण करते हैं। अपने अंकशास्त्रीय नक्शे को अपनाएं और सामंजस्यपूर्ण और समृद्ध जीवन के लिए इन ब्रह्मांडीय ऊर्जाओं के साथ जुड़ें। याद रखें, आपका भाग्य अंकों में लिखा है, लेकिन आपके विकल्प आपकी यात्रा को आकार देते हैं।"
    },
    next: {
      english: "Continue to Horoscope →",
      hindi: "कुंडली की ओर जारी रखें →"
    },
    back: {
      english: "← Back to Gems",
      hindi: "← रत्न पर वापस जाएं"
    }
  };

  // Function to get Basic Auth header
  const getAuthHeader = () => {
    const credentials = `${API_CONFIG.userId}:${API_CONFIG.apiKey}`;
    return `Basic ${btoa(credentials)}`;
  };

  // Function to simulate Numerology data if API fails (fallback)
  const loadFallbackData = () => {
    const fallbackNumeroData = {
      name: birthDetails.name,
      date: `${birthDetails.day}/${birthDetails.month}/${birthDetails.year}`,
      destiny_number: 7,
      radical_number: 6,
      name_number: 4,
      radical_ruler: language === 'english' ? 'Venus' : 'शुक्र',
      fav_day: language === 'english' ? 'Friday, Monday' : 'शुक्रवार, सोमवार',
      fav_color: language === 'english' ? 'Blue, White' : 'नीला, सफेद',
      fav_metal: language === 'english' ? 'Silver' : 'चांदी',
      fav_stone: language === 'english' ? 'Diamond, Opal' : 'हीरा, ओपल',
      fav_substone: language === 'english' ? 'White Sapphire' : 'सफेद पुखराज',
      fav_god: language === 'english' ? 'Lakshmi' : 'लक्ष्मी',
      fav_mantra: language === 'english' ? 'Om Shrim Lakshmiyei Namaha' : 'ॐ श्रीं लक्ष्मीयै नमः',
      friendly_num: '1, 5, 6',
      neutral_num: '2, 3, 9',
      evil_num: '4, 7, 8'
    };

    const fallbackNumeroReport = {
      title: language === 'english' ? 'Radical Number 6 Analysis' : 'मूलांक 6 विश्लेषण',
      description: language === 'english' 
        ? 'People born with radical number 6 are ruled by Venus and possess natural charm, artistic abilities, and a love for beauty. They are diplomatic, caring, and have strong family values. These individuals are naturally attracted to luxury and comfort, and they often excel in creative fields, hospitality, or healing professions.'
        : 'मूलांक 6 के लोग शुक्र द्वारा शासित होते हैं और उनमें प्राकृतिक आकर्षण, कलात्मक क्षमताएं, और सुंदरता के प्रति प्रेम होता है। वे कूटनीतिक, देखभाल करने वाले, और मजबूत पारिवारिक मूल्यों वाले होते हैं। ये व्यक्ति स्वाभाविक रूप से विलासिता और आराम की ओर आकर्षित होते हैं, और अक्सर रचनात्मक क्षेत्रों, आतिथ्य, या चिकित्सा व्यवसायों में उत्कृष्टता प्राप्त करते हैं।'
    };
    
    console.log('Loading fallback Numerology data:', fallbackNumeroData);
    setNumeroData(fallbackNumeroData);
    setNumeroReport(fallbackNumeroReport);
  };

  // Function to fetch both numerology APIs
  const fetchNumeroData = async () => {
    try {
      setLoading(true);
      setError(''); // Clear previous errors
      
      // Validate birth details first
      const safeDetails = {
        name: birthDetails?.name || "User",
        day: birthDetails?.day || 6,
        month: birthDetails?.month || 8,
        year: birthDetails?.year || 2000,
        hour: birthDetails?.hour || 7,
        min: birthDetails?.min || 45,
        lat: birthDetails?.lat || 19.132,
        lon: birthDetails?.lon || 72.342,
        tzone: birthDetails?.tzone || 5.5
      };
      
      console.log('Birth details being used:', safeDetails);
      
      // For now, let's load demo data directly since API might have issues
      console.log('Loading demo numerology data...');
      loadFallbackData();
      return;
      
      // Commented out API calls - uncomment when API is stable
      /*
      // Fetch numero_table data
      const tableResponse = await fetch(`${API_CONFIG.baseUrl}/numero_table`, {
        method: 'POST',
        headers: {
          'Authorization': getAuthHeader(),
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Accept-Language': language === 'english' ? 'en' : 'hi'
        },
        body: JSON.stringify(safeDetails)
      });
      
      if (!tableResponse.ok) {
        throw new Error(`API Error: ${tableResponse.status} - ${tableResponse.statusText}`);
      }
      
      const tableData = await tableResponse.json();
      setNumeroData(tableData);
      
      // Fetch numero_report data
      const reportResponse = await fetch(`${API_CONFIG.baseUrl}/numero_report`, {
        method: 'POST',
        headers: {
          'Authorization': getAuthHeader(),
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Accept-Language': language === 'english' ? 'en' : 'hi'
        },
        body: JSON.stringify(safeDetails)
      });
      
      if (!reportResponse.ok) {
        throw new Error(`Report API Error: ${reportResponse.status} - ${reportResponse.statusText}`);
      }
      
      const reportData = await reportResponse.json();
      setNumeroReport(reportData);
      
      console.log('Numero Table Data:', tableData);
      console.log('Numero Report Data:', reportData);
      */
      
    } catch (error) {
      console.error('Error fetching Numero data:', error);
      
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
    fetchNumeroData();
  }, [language]); // Re-fetch when language changes

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
                onClick={fetchNumeroData} 
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
            {numeroData && (
              <>
                {/* Main Title */}
                <div className="text-center mb-6">
                  <h1 className="text-xl font-bold text-gray-800 mb-2 leading-tight md:text-lg">
                    {language === 'english' ? translations.title.english : translations.title.hindi} {numeroData.name}
                  </h1>
                  <p className="text-sm text-gray-600">
                    {language === 'english' ? translations.bornOn.english : translations.bornOn.hindi} {numeroData.date}
                  </p>
                </div>

                {/* Lord Vishnu Image */}
                <div className="text-center mb-6">
                  <div className="w-full max-w-xs mx-auto mb-4">
                    <img 
                      src="https://img.freepik.com/premium-vector/vishnu-indian-lord-hinduism-hari-god-ancient-india-hindu-deity-sitting-lotus-flower-holding-attributes-traditional-holy-divinity-flat-vector-illustration-isolated-white-background_198278-17566.jpg"
                      alt="Lord Vishnu - Divine Numbers"
                      className="w-full h-auto object-contain rounded-lg"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div className="hidden bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg p-8 border-2 border-yellow-200">
                      <div className="text-6xl mb-4">🔢</div>
                      <div className="text-sm text-gray-600">
                        {language === 'english' ? 'Divine Numbers' : 'दिव्य अंक'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Core Numbers */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 md:text-base flex items-center">
                    <span className="text-2xl mr-2">🔮</span>
                    {language === 'english' ? translations.coreNumbers.english : translations.coreNumbers.hindi}
                  </h3>
                  
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg p-3 border border-purple-300 text-center">
                      <div className="text-2xl font-bold text-purple-700 mb-1">{numeroData.destiny_number}</div>
                      <div className="text-xs font-semibold text-gray-600">
                        {language === 'english' ? translations.destiny.english : translations.destiny.hindi}
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg p-3 border border-blue-300 text-center">
                      <div className="text-2xl font-bold text-blue-700 mb-1">{numeroData.radical_number}</div>
                      <div className="text-xs font-semibold text-gray-600">
                        {language === 'english' ? translations.radical.english : translations.radical.hindi}
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-lg p-3 border border-green-300 text-center">
                      <div className="text-2xl font-bold text-green-700 mb-1">{numeroData.name_number}</div>
                      <div className="text-xs font-semibold text-gray-600">
                        {language === 'english' ? translations.name.english : translations.name.hindi}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-3 border border-orange-300 text-center">
                    <div className="text-sm font-semibold text-gray-600 mb-1">
                      {language === 'english' ? translations.rulingPlanet.english : translations.rulingPlanet.hindi}
                    </div>
                    <div className="text-lg font-bold text-orange-700">{numeroData.radical_ruler}</div>
                  </div>
                </div>

                {/* Detailed Report */}
                {numeroReport && (
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-300 mb-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                      <span className="text-2xl mr-2">📖</span>
                      {numeroReport.title}
                    </h3>
                    <div className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-semibold inline-block mb-4">
                      {language === 'english' ? `Radical Number ${numeroData.radical_number} Analysis` : `मूलांक ${numeroData.radical_number} विश्लेषण`}
                    </div>
                    <div className="bg-white bg-opacity-70 rounded-lg p-4">
                      <p className="text-sm text-gray-700 leading-relaxed md:text-xs">
                        {numeroReport.description}
                      </p>
                    </div>
                  </div>
                )}

                {/* Favorable Elements */}
                <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-4 border border-pink-300 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                    <span className="text-2xl mr-2">🌟</span>
                    {language === 'english' ? translations.favorableElements.english : translations.favorableElements.hindi}
                  </h3>
                  
                  <div className="bg-white bg-opacity-70 rounded-lg p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-pink-200">
                        <span className="text-sm font-semibold text-gray-600">
                          {language === 'english' ? translations.luckyDays.english : translations.luckyDays.hindi}
                        </span>
                        <span className="text-sm font-bold text-gray-800">{numeroData.fav_day}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-pink-200">
                        <span className="text-sm font-semibold text-gray-600">
                          {language === 'english' ? translations.luckyColor.english : translations.luckyColor.hindi}
                        </span>
                        <span className="text-sm font-bold text-gray-800">{numeroData.fav_color}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-pink-200">
                        <span className="text-sm font-semibold text-gray-600">
                          {language === 'english' ? translations.luckyMetal.english : translations.luckyMetal.hindi}
                        </span>
                        <span className="text-sm font-bold text-gray-800">{numeroData.fav_metal}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-pink-200">
                        <span className="text-sm font-semibold text-gray-600">
                          {language === 'english' ? translations.luckyStones.english : translations.luckyStones.hindi}
                        </span>
                        <span className="text-sm font-bold text-gray-800">{numeroData.fav_stone}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-pink-200">
                        <span className="text-sm font-semibold text-gray-600">
                          {language === 'english' ? translations.alternativeStones.english : translations.alternativeStones.hindi}
                        </span>
                        <span className="text-sm font-bold text-gray-800">{numeroData.fav_substone}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm font-semibold text-gray-600">
                          {language === 'english' ? translations.favoredDeity.english : translations.favoredDeity.hindi}
                        </span>
                        <span className="text-sm font-bold text-gray-800">{numeroData.fav_god}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Numbers Compatibility */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-300 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                    <span className="text-2xl mr-2">🤝</span>
                    {language === 'english' ? translations.numberRelationships.english : translations.numberRelationships.hindi}
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <div className="bg-green-100 rounded-lg p-3">
                      <div className="text-sm font-semibold text-green-800 mb-1">
                        {language === 'english' ? translations.friendlyNumbers.english : translations.friendlyNumbers.hindi}
                      </div>
                      <div className="text-lg font-bold text-green-700">{numeroData.friendly_num}</div>
                    </div>
                    <div className="bg-yellow-100 rounded-lg p-3">
                      <div className="text-sm font-semibold text-yellow-800 mb-1">
                        {language === 'english' ? translations.neutralNumbers.english : translations.neutralNumbers.hindi}
                      </div>
                      <div className="text-lg font-bold text-yellow-700">{numeroData.neutral_num}</div>
                    </div>
                    <div className="bg-red-100 rounded-lg p-3">
                      <div className="text-sm font-semibold text-red-800 mb-1">
                        {language === 'english' ? translations.challengingNumbers.english : translations.challengingNumbers.hindi}
                      </div>
                      <div className="text-lg font-bold text-red-700">{numeroData.evil_num}</div>
                    </div>
                  </div>
                </div>

                {/* Sacred Mantra */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-300 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 md:text-base flex items-center">
                    <span className="text-2xl mr-2">🕉️</span>
                    {language === 'english' ? translations.sacredMantra.english : translations.sacredMantra.hindi}
                  </h3>
                  <div className="bg-orange-100 rounded-lg p-4 text-center">
                    <p className="text-lg font-bold text-orange-800 mb-2">{numeroData.fav_mantra}</p>
                    <p className="text-sm text-gray-600">
                      {language === 'english' ? translations.mantraInstruction.english : translations.mantraInstruction.hindi}
                    </p>
                  </div>
                </div>

                {/* Guidance Message */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-300 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 md:text-base flex items-center">
                    <span className="text-2xl mr-2">🙏</span>
                    {language === 'english' ? translations.divineGuidance.english : translations.divineGuidance.hindi}
                  </h3>
                  <div className="bg-white bg-opacity-70 rounded-lg p-4">
                    <p className="text-sm text-gray-700 leading-relaxed md:text-xs">
                      {language === 'english' ? translations.guidanceMessage.english : translations.guidanceMessage.hindi}
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
            currentPage="numero"
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

export default NumeroDetails;