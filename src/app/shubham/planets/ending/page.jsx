'use client'
import React, { useState } from 'react';
import Navigation from '../../components/Navigation';
import { useKundli } from '../../context/KundliContext';

const PlanetsEndingScreen = () => {
  const [loading, setLoading] = useState(false);
  const { language } = useKundli();

  // Translations
  const translations = {
    loading: language === 'hindi' ? 'लोड हो रहा है...' : 'Loading...',
    next: language === 'hindi' ? 'अगला →' : 'Next →',
    back: language === 'hindi' ? 'वापस' : 'Back',
    mainTitle: language === 'hindi' 
      ? 'आपके जीवन का उद्देश्य क्या है, और आपकी आत्मा क्या चाहती है?' 
      : 'What is the purpose of your life, and what does your soul desire?',
    atmaDescription1: language === 'hindi'
      ? '"आत्मा" का अर्थ है आत्मा, और "कारक" का अर्थ है सूचक। आत्मकारक वह ग्रह है जो आत्मा की इच्छाओं को दर्शाता है। वैदिक ज्योतिष के अनुसार, एक आत्मा का पुनर्जन्म इसलिए होता है क्योंकि उसकी पिछले जन्मों की इच्छाएं हैं जिन्हें पूरा करना आवश्यक है।'
      : '"Atma" means soul, and "karaka" means significator. Atmakaraka is the planet that signifies the soul\'s desires. According to Vedic astrology, a soul is reborn because it has desires from previous lives that need fulfillment.',
    atmaDescription2: language === 'hindi'
      ? 'आपकी जन्म कुंडली में आत्मकारक ग्रह इन इच्छाओं को प्रकट करता है। यह इंगित करता है कि आप उन्हें आसानी से पूरा करेंगे या इसमें चुनौतियों का सामना करेंगे। मेरी राय में, आत्मकारक आपकी ज्योतिषीय कुंडली में सबसे महत्वपूर्ण ग्रहों में से एक है।'
      : 'The Atmakaraka planet in your birth chart reveals these desires. It indicates whether you will fulfill them easily or face challenges in doing so. In my opinion, the Atmakaraka is one of the most crucial planets in your astrological chart.',
    cosmicConnection: language === 'hindi'
      ? 'आपकी आत्मा और ग्रहों के प्रभाव के बीच ब्रह्मांडीय संबंध'
      : 'The cosmic connection between your soul and planetary influences',
    soulJourney: language === 'hindi'
      ? 'अपनी आत्मा की यात्रा को समझना'
      : 'Understanding Your Soul\'s Journey',
    insight1: language === 'hindi'
      ? 'आपका आत्मकारक ग्रह आपकी आत्मा की गहरी इच्छाओं और जीवन उद्देश्य को प्रकट करता है'
      : 'Your Atmakaraka planet reveals your soul\'s deepest desires and life purpose',
    insight2: language === 'hindi'
      ? 'यह दिखाता है कि आप अपने लक्ष्यों को आसानी से प्राप्त करेंगे या चुनौतियों का सामना करेंगे'
      : 'It shows whether you\'ll achieve your goals easily or face challenges',
    insight3: language === 'hindi'
      ? 'इसे समझना आपको अपने आध्यात्मिक मार्ग और कर्म के पाठों के साथ संरेखित करने में मदद करता है'
      : 'Understanding this helps you align with your spiritual path and karmic lessons'
  };

  // Function to handle next button click - navigate to Kalsarpa details
  const handleNext = () => {
    setLoading(true);
    window.location.href = '/shubham/kalsarpa_details';
  };

  // Function to handle back button click - back to Jupiter
  const handleBack = () => {
    window.location.href = '/shubham/planets/jupiter';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-gray-50 rounded-lg p-8 shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="text-center mt-4 text-gray-600">{translations.loading}</p>
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
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-6 leading-tight md:text-xl">
                {translations.mainTitle}
              </h1>
            </div>

            {/* Description Content */}
            <div className="mb-8">
              <p className="text-base text-gray-700 leading-relaxed mb-6 md:text-sm">
                {translations.atmaDescription1}
              </p>
              
              <p className="text-base text-gray-700 leading-relaxed md:text-sm">
                {translations.atmaDescription2}
              </p>
            </div>

            {/* Atmakaraka Illustration */}
            <div className="text-center mb-8">
              <div className="w-full max-w-sm mx-auto mb-4">
                <img 
                  src="https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/kundli_analyser/atmakarka.png"
                  alt="Atmakaraka - Soul's Purpose with Planetary Alignment"
                  className="w-full h-auto object-contain rounded-lg"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="hidden bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-8 border-2 border-purple-200">
                  <div className="text-6xl mb-4">🧘‍♂️</div>
                  <div className="text-sm text-gray-600">Atmakaraka Illustration</div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 italic">
                {translations.cosmicConnection}
              </p>
            </div>

            {/* Key Insights Section */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 text-center md:text-base">
                {translations.soulJourney}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="text-white text-xs font-bold">1</div>
                  </div>
                  <p className="text-sm text-gray-700 md:text-xs">
                    {translations.insight1}
                  </p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="text-white text-xs font-bold">2</div>
                  </div>
                  <p className="text-sm text-gray-700 md:text-xs">
                    {translations.insight2}
                  </p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="text-white text-xs font-bold">3</div>
                  </div>
                  <p className="text-sm text-gray-700 md:text-xs">
                    {translations.insight3}
                  </p>
                </div>
              </div>
            </div>

         

            {/* Bottom padding for scrolling */}
            <div className="h-4"></div>
          </div>

          {/* Navigation - Fixed at bottom */}
          <Navigation 
            currentPage="planets-ending"
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

export default PlanetsEndingScreen;