'use client'
import React from 'react';
import Link from 'next/link';
import { useKundli } from '../context/KundliContext';

const Navigation = ({ currentPage, onNext, onBack, nextText = "Next →", backText = "Back", showBack = true, showNext = true, disableBack = false }) => {
  const { formData, currentStep, language } = useKundli();
  
  // Default translations
  const translations = {
    next: {
      english: "Next →",
      hindi: "अगला →"
    },
    back: {
      english: "Back",
      hindi: "वापस"
    }
  };

  const getNavigationConfig = () => {
    const config = {
      'form': { next: '/shubham/form/birthplace', back: null },
      'birthplace': { next: '/shubham/overreview', back: '/shubham/form' },
      'overreview': { next: '/shubham/planets', back: '/shubham/form/birthplace' },
      'planets': { next: '/shubham/planets/sun', back: '/shubham/overreview' },
      'planets/sun': { next: '/shubham/planets/moon', back: '/shubham/planets' },
      'planets/moon': { next: '/shubham/planets/mars', back: '/shubham/planets/sun' },
      'planets/mars': { next: '/shubham/planets/jupiter', back: '/shubham/planets/moon' },
      'planets/jupiter': { next: '/shubham/planets/venus', back: '/shubham/planets/mars' },
      'planets/venus': { next: '/shubham/planets/saturn', back: '/shubham/planets/jupiter' },
      'planets/saturn': { next: '/shubham/planets/rahu', back: '/shubham/planets/venus' },
      'planets/rahu': { next: '/shubham/planets/ketu', back: '/shubham/planets/saturn' },
      'planets/ketu': { next: '/shubham/planets/ending', back: '/shubham/planets/rahu' },
      'planets/ending': { next: '/shubham/horoscope', back: '/shubham/planets/ketu' },
      'horoscope': { next: '/shubham/kalsarpa_details', back: '/shubham/planets/ending' },
      'kalsarpa_details': { next: '/shubham/manglikdosh', back: '/shubham/horoscope' },
      'manglikdosh': { next: '/shubham/panchang', back: '/shubham/kalsarpa_details' },
      'panchang': { next: '/shubham/rashi', back: '/shubham/manglikdosh' },
      'rashi': { next: '/shubham/nakshatra', back: '/shubham/panchang' },
      'nakshatra': { next: '/shubham/subscription', back: '/shubham/rashi' },
      'subscription': { next: null, back: '/shubham/nakshatra' }
    };
    return config[currentPage] || { next: null, back: null };
  };

  const navConfig = getNavigationConfig();

  const handleNext = () => {
    if (onNext) {
      onNext();
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    }
  };

  return (
    <div className="flex justify-between items-center p-6 bg-white bg-opacity-90 border-t border-gray-200 flex-shrink-0">
      {showBack && (
        navConfig.back ? (
          <Link
            href={navConfig.back}
            className={`p-3 rounded-full border-2 ${disableBack ? 'border-gray-200 text-gray-300 pointer-events-none' : 'border-gray-300 text-gray-700 hover:bg-gray-100'} transition-all`}
            aria-label={language === 'english' ? translations.back.english : translations.back.hindi}
            aria-disabled={disableBack}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        ) : (
          <button
            onClick={handleBack}
            className={`p-3 rounded-full border-2 ${disableBack ? 'border-gray-200 text-gray-300' : 'border-gray-300 text-gray-700 hover:bg-gray-100'} transition-all`}
            aria-label={language === 'english' ? translations.back.english : translations.back.hindi}
            disabled={disableBack}
            aria-disabled={disableBack}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )
      )}

      {!showBack && <div></div>}

      {showNext && (
        navConfig.next ? (
          <Link
            href={navConfig.next}
            className="bg-gradient-to-r from-orange-400 to-pink-400 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-sm"
          >
            {nextText === "Next →" ? (language === 'english' ? translations.next.english : translations.next.hindi) : nextText}
          </Link>
        ) : (
          <button
            onClick={handleNext}
            className="bg-gradient-to-r from-orange-400 to-pink-400 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-sm"
          >
            {nextText === "Next →" ? (language === 'english' ? translations.next.english : translations.next.hindi) : nextText}
          </button>
        )
      )}
    </div>
  );
};

export default Navigation;