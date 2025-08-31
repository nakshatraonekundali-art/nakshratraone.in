'use client'
import Link from 'next/link';
import React from 'react';
import { useKundli } from './context/KundliContext';

const Select_Language = () => {
  const { setLanguageDirectly } = useKundli();
  
  const handleLanguageSelect = (language) => {
    console.log('Language selected:', language);
    setLanguageDirectly(language);
    // Small delay to ensure context is updated before navigation
    setTimeout(() => {
      console.log('Navigating to form with language:', language);
    }, 100);
  };
  // ddhd
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">
            <span className="text-orange-500">NAKSHATRA</span>
            <span className="text-blue-500">one</span>
          </h1>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 leading-tight">
            Get Your Free In-depth Kundli Analysis
          </h2>
        </div>

        {/* Description */}
        <div className="mb-6">
          <p className="text-gray-600 mb-4">Your 30-page report includes:</p>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-800 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span className="text-gray-700 font-medium">Panchang at your birth predictions</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-800 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span className="text-gray-700 font-medium">Your detailed Kundli</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-800 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span className="text-gray-700 font-medium">Your Karmic and Soul Desire Analysis</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-800 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span className="text-gray-700 font-medium">Detailed Planet and Dasha Predictions</span>
            </li>
          </ul>
        </div>

        {/* Language Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Select your language for free kundli analysis.
          </h3>
          <p className="text-gray-700 mb-6 text-center">
            मुफ्त कुंडली विश्लेषण के लिए अपनी भाषा चुनें।
          </p>
        </div>

        {/* Language Buttons */}
        <div className="space-y-3">
          <Link href="/kundali/form">
            <button 
              onClick={() => handleLanguageSelect('english')}
              className="w-full bg-white border-2 border-gray-300 rounded-lg py-3 px-4 text-gray-700 font-medium hover:border-purple-500 hover:bg-purple-50 transition-all duration-200 flex items-center justify-between group"
            >
              <span>View in English</span>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </Link>
          
          <Link href="/kundali/form">
            <button 
              onClick={() => handleLanguageSelect('hindi')}
              className="w-full bg-white border-2 border-gray-300 rounded-lg py-3 px-4 text-gray-700 font-medium hover:border-purple-500 hover:bg-purple-50 transition-all duration-200 flex items-center justify-between group"
            >
              <span>हिंदी में देखें</span>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Select_Language;