'use client'
import React from 'react';
import Link from 'next/link';
import { useKundli } from '../context/KundliContext';

const Navigation = ({ currentPage, onNext, onBack, nextText = "Next →", backText = "Back", showBack = true, showNext = true }) => {
  const { formData, currentStep } = useKundli();

  const getNavigationConfig = () => {
    const config = {
      'form': { next: '/shubham/form/birthplace', back: null },
      'birthplace': { next: '/shubham/overreview', back: '/shubham/form' },
      'overreview': { next: '/shubham/planets', back: '/shubham/form/birthplace' },
      'planets': { next: '/shubham/planets/ending', back: '/shubham/overreview' },
      'planets-ending': { next: '/shubham/horoscope', back: '/shubham/planets' },
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
            className="p-3 rounded-full border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        ) : (
          <button
            onClick={handleBack}
            className="p-3 rounded-full border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition-all"
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
            {nextText}
          </Link>
        ) : (
          <button
            onClick={handleNext}
            className="bg-gradient-to-r from-orange-400 to-pink-400 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-sm"
          >
            {nextText}
          </button>
        )
      )}
    </div>
  );
};

export default Navigation; 