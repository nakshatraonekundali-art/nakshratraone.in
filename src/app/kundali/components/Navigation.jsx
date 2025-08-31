'use client'
import React from 'react';
import Link from 'next/link';
import { useKundli } from '../context/KundliContext';

const Navigation = ({ currentPage, onNext, onBack, nextText = "Next →", backText = "Back", showBack = true, showNext = true, disableBack = false, disableNext = false }) => {
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
      // Initial form pages
      'form': { next: '/kundali/form/birthplace', back: null },
      'birthplace': { next: '/kundali/overreview', back: '/kundali/form' },
      'overreview': { next: '/kundali/horoscope/ghatchakra', back: '/kundali/form/birthplace' },

      // Planets section
      'ghatchakra': { next: '/kundali/planets', back: '/kundali/overreview' },
      'planets': { next: '/kundali/planets/sun', back: '/kundali/horoscope/ghatchakra' },
      'planets/sun': { next: '/kundali/planets/moon', back: '/kundali/planets' },
      'planets/moon': { next: '/kundali/planets/mars', back: '/kundali/planets/sun' },
      'planets/mars': { next: '/kundali/planets/mercurey', back: '/kundali/planets/moon' },
      'planets/mercurey': { next: '/kundali/planets/jupiter', back: '/kundali/planets/mars' },
      'planets/jupiter': { next: '/kundali/planets/venus', back: '/kundali/planets/mercurey' },
      'planets/venus': { next: '/kundali/planets/saturn', back: '/kundali/planets/jupiter' },
      'planets/saturn': { next: '/kundali/planets/rahu', back: '/kundali/planets/venus' },
      'planets/rahu': { next: '/kundali/planets/ketu', back: '/kundali/planets/saturn' },
      'planets/ketu': { next: '/kundali/planets/ending', back: '/kundali/planets/rahu' },
      'planets/ending': { next: '/kundali/panchang', back: '/kundali/planets/ketu' },
      
      // Updated navigation flow based on your requirements:
      // panchang -> rashi -> nakshatra -> ascendant -> gem_suggestion -> numero -> horoscope -> ghatchakra -> subscription
      'panchang': { next: '/kundali/rashi', back: '/kundali/planets/ending' },
      'rashi': { next: '/kundali/nakshatra', back: '/kundali/panchang' },
      'nakshatra': { next: '/kundali/nakshatra/ascendant', back: '/kundali/rashi' },
      'ascendant': { next: '/kundali/nakshatra/gem_suggestion', back: '/kundali/nakshatra' },
      'gem_suggestion': { next: '/kundali/nakshatra/numero', back: '/kundali/nakshatra/ascendant' },
      'numero': { next: '/kundali/subscription', back: '/kundali/gem_suggestion' },
      // 'horoscope': { next: '/kundali/horoscope/ghatchakra', back: '/kundali/numero' },
      'subscription': { next: null, back: '/kundali/numero' },
      
      // Remove old entries that are no longer needed
      'kalsarpa_details': { next: '/kundali/manglikdosh', back: '/kundali/horoscope' },
      'manglikdosh': { next: '/kundali/panchang', back: '/kundali/kalsarpa_details' }
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
        // Only call onNext handler (save user) on birthplace page, otherwise use normal navigation
        (onNext && currentPage === 'birthplace') ? (
          <button
            onClick={handleNext}
            disabled={disableNext}
            className={`bg-gradient-to-r from-orange-400 to-pink-400 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-sm ${disableNext ? 'opacity-50' : ''}`}
            aria-disabled={disableNext}
          >
            {nextText === "Next →" ? (language === 'english' ? translations.next.english : translations.next.hindi) : nextText}
          </button>
        ) : (
          navConfig.next ? (
            <Link
              href={navConfig.next}
              className={`bg-gradient-to-r from-orange-400 to-pink-400 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-sm ${disableNext ? 'opacity-50 pointer-events-none' : ''}`}
              aria-disabled={disableNext}
            >
              {nextText === "Next →" ? (language === 'english' ? translations.next.english : translations.next.hindi) : nextText}
            </Link>
          ) : (
            <button
              onClick={handleNext}
              disabled={disableNext}
              className={`bg-gradient-to-r from-orange-400 to-pink-400 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-sm ${disableNext ? 'opacity-50' : ''}`}
              aria-disabled={disableNext}
            >
              {nextText === "Next →" ? (language === 'english' ? translations.next.english : translations.next.hindi) : nextText}
            </button>
          )
        )
      )}
    </div>
  );
};

export default Navigation;