'use client'
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useKundli } from '../context/KundliContext';
import Link from 'next/link';
import Navigation from '../components/Navigation';

const Overview = () => {
  const { formData, language } = useKundli();
  
  // Translations
  const translations = {
    greeting: {
      english: "Namaste",
      hindi: "नमस्ते"
    },
    description: {
      english: "We looked at your details. You have a special birth chart, your kundli is unique. We made a detailed kundli analysis report for you.",
      hindi: "हमने आपके विवरण को देखा। आपका जन्म कुंडली विशेष है, आपकी कुंडली अद्वितीय है। हमने आपके लिए एक विस्तृत कुंडली विश्लेषण रिपोर्ट बनाई है।"
    },
    specialReport: {
      english: "We made a special free report all about you. In over 30 easy-to-read pages, you'll learn about:",
      hindi: "हमने आपके बारे में एक विशेष मुफ्त रिपोर्ट बनाई है। 30 से अधिक आसानी से पढ़ने वाले पृष्ठों में, आप इनके बारे में जानेंगे:"
    },
    features: {
      english: [
        "Foundation of your Kundli - Panchang",
        "Your Big 3 in Kundli",
        "Your Stored Karma",
        "Your Elemental Balance",
        "Your Soul Desire - Atma Karaka",
        "Your Favorable Deity (Ishta Devta)",
        "Benefic and Malefic Grahas in your Kundli",
        "Your Details Planetary Profiles",
        "Your Current Running Dasha",
        "And more ..."
      ],
      hindi: [
        "आपकी कुंडली की नींव - पंचांग",
        "कुंडली में आपके बिग 3",
        "आपका संचित कर्म",
        "आपका तत्व संतुलन",
        "आपकी आत्मा की इच्छा - आत्म कारक",
        "आपके अनुकूल देवता (इष्ट देवता)",
        "आपकी कुंडली में लाभकारी और हानिकारक ग्रह",
        "आपके विस्तृत ग्रह प्रोफाइल",
        "आपका वर्तमान चल रहा दशा",
        "और बहुत कुछ ..."
      ]
    },
    bottomText: {
      english: "Our report helps you understand yourself better and make good choices. Without this knowledge, you might miss out on key insights for personal growth.",
      hindi: "हमारी रिपोर्ट आपको अपने आप को बेहतर समझने और अच्छे विकल्प चुनने में मदद करती है। इस ज्ञान के बिना, आप व्यक्तिगत विकास के लिए महत्वपूर्ण अंतर्दृष्टि से चूक सकते हैं।"
    },
    clickNext: {
      english: "Click 'Next' to get started",
      hindi: "शुरू करने के लिए 'अगला' पर क्लिक करें"
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl h-[85vh] flex flex-col">
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
          {/* Logo */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">
              <span className="text-orange-500">Nakshatra</span>
              <span className="text-blue-500">One</span>
            </h1>
          </div>

          {/* Greeting */}
          <div className="mb-5">
            <h2 className="text-2xl font-semibold text-black mb-4">
              {language === 'english' ? translations.greeting.english : translations.greeting.hindi} {formData.name},
            </h2>
          </div>

          {/* Description */}
          <div className="mb-5 space-y-4">
            <p className="text-gray-700 text-base leading-relaxed">
              {language === 'english' ? translations.description.english : translations.description.hindi}
            </p>
            
            <p className="text-gray-700 text-base leading-relaxed">
              {language === 'english' ? translations.specialReport.english : translations.specialReport.hindi}
            </p>
          </div>

          {/* Features List - Scrollable */}
          <div className="mb-5">
            <ul className="space-y-4">
              {(language === 'english' ? translations.features.english : translations.features.hindi).map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-2 h-2 bg-black rounded-full mt-2.5 mr-4 flex-shrink-0"></span>
                  <span className="text-gray-800 text-base font-semibold">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom text */}
          <div className="mb-5">
            <p className="text-gray-600 text-base leading-relaxed">
              {language === 'english' ? translations.bottomText.english : translations.bottomText.hindi}
            </p>
          </div>
          
            <div className="mb-5">
              <p className="text-gray-600 text-base">
                {language === 'english' ? translations.clickNext.english : translations.clickNext.hindi}
              </p>
            </div>
          </div>
        </div>

        {/* Fixed Navigation */}
        <Navigation 
          currentPage="overreview" 
          nextText={language === 'english' ? translations.next.english : translations.next.hindi}
          backText={language === 'english' ? translations.back.english : translations.back.hindi}
        />
      </div>
    </div>
  );
};

export default Overview;