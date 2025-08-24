'use client'
import React, { useState } from 'react';

const SubscriptionComponent = () => {
  const [selectedOffer, setSelectedOffer] = useState(null);

  const handleOfferSelect = (offerType) => {
    setSelectedOffer(offerType);
    console.log(`Selected offer: ${offerType}`);
  };

  return (
    <div className="min-h-screen bg-white md:bg-gradient-to-br md:from-purple-800 md:via-purple-600 md:to-purple-400 md:flex md:items-center md:justify-center md:p-4">
      {/* Mobile: Full width, Desktop: Centered card */}
      <div className="w-full max-w-full mx-auto md:max-w-lg">
        <div className="bg-gradient-to-b from-gray-50 via-blue-50 to-purple-50 min-h-screen md:min-h-0 flex flex-col md:rounded-3xl md:shadow-2xl md:overflow-hidden md:h-[95vh]">
          
          {/* Header with VEDICrishi branding */}
          <div className="text-center pt-8 pb-6 px-6 flex-shrink-0 md:pt-6 md:pb-4">
            <div className="flex items-center justify-center mb-6 md:mb-3">
              <span className="text-orange-500 text-xl font-bold md:text-lg">Nakshatra</span>
              <span className="text-blue-500 text-xl font-bold md:text-lg">One</span>
            </div>
            
            <h1 className="text-xl font-bold text-gray-800 mb-2 md:text-lg">
              Here is what we have prepared for you.
            </h1>
            
            <p className="text-gray-600 text-sm mb-4 md:text-xs">
              Check Out These Personalized Reports For You
            </p>
            
            <p className="text-gray-700 text-sm leading-relaxed md:text-xs">
              Our Principal Astrologer has prepared two unique reports specifically for you: 
              <span className="font-semibold"> the Premium Kundli Report</span> and 
              <span className="font-semibold"> the Yearly Varshphal Report</span>. 
              These reports offer valuable, personalized guidance to help you navigate your future.
            </p>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto px-6 pb-6 md:scrollbar-thin md:scrollbar-thumb-gray-300 md:scrollbar-track-transparent">
          
            {/* Your Abundance Report */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 mb-4 border border-yellow-200">
              <div className="flex items-start space-x-4 md:space-x-3">
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-gray-800 mb-3 md:text-base">Your Abundance Report</h2>
                  
                  <p className="text-sm text-gray-700 mb-2 md:text-xs">
                    Get a bespoke <span className="font-semibold text-blue-600">Astro-Vastu blueprint</span> that highlights your home's high-impact 
                    <span className="font-semibold text-green-600"> money zones</span>, provides easy 
                    <span className="font-semibold text-purple-600"> color, pattern</span>, and 
                    <span className="font-semibold text-red-600"> clutter remedies</span>, and includes potent prosperity mantras.
                  </p>
                  
                  <div className="bg-yellow-400 text-yellow-900 px-4 py-2 rounded-lg font-bold text-sm mb-2 inline-block md:px-3 md:py-1 md:text-xs">
                    Get this report for ₹999 ₹599
                  </div>
                  <div className="text-xs text-gray-600 md:text-[10px]">
                    (Save ₹400 - 40% OFF )
                  </div>
                </div>
                
                <div className="w-20 h-28 flex-shrink-0 md:w-16 md:h-24">
                  <img 
                    src="https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/kundli_analyser/abundance_report.png"
                    alt="Abundance Report"
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg shadow-lg hidden flex items-center justify-center">
                    <span className="text-white text-xs font-bold text-center px-2 md:text-[10px]">Abundance<br/>Report</span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => handleOfferSelect('abundance')}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold py-3 px-4 rounded-xl mt-3 transition-all duration-200 flex items-center justify-center md:py-2 md:text-sm"
              >
                Get This Report
                <svg className="w-5 h-5 ml-2 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>

            {/* Your Premium Kundli Report */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 mb-4 border border-blue-200">
              <div className="flex items-start space-x-4 md:space-x-3">
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-gray-800 mb-3 md:text-base">Your Premium Kundli Report</h2>
                  
                  <p className="text-sm text-gray-700 mb-2 md:text-xs">
                    Our principal astrologer <span className="font-semibold">Pt. Rishiraj Tiwari Ji</span> has prepared 
                    <span className="font-semibold"> The Premium Kundli Report</span> specifically for you. This in-depth 
                    <span className="font-semibold text-blue-600"> 165+ page report</span> provides detailed predictions about your life and future, plus guidance on remedies and steps to take.
                  </p>
                  
                  <div className="bg-blue-400 text-white px-4 py-2 rounded-lg font-bold text-sm mb-2 inline-block md:px-3 md:py-1 md:text-xs">
                    Get this report for ₹1500 ₹650
                  </div>
                  <div className="text-xs text-gray-600 md:text-[10px]">
                    (Save ₹850 - 57% OFF )
                  </div>
                </div>
                
                <div className="w-20 h-28 flex-shrink-0 md:w-16 md:h-24">
                  <img 
                    src="https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/kundli_analyser/Kundli.png"
                    alt="Premium Kundli Report"
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg shadow-lg hidden flex items-center justify-center">
                    <span className="text-white text-xs font-bold text-center px-2 md:text-[10px]">Premium<br/>Kundli</span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => handleOfferSelect('premium')}
                className="w-full bg-blue-400 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl mt-3 transition-all duration-200 flex items-center justify-center md:py-2 md:text-sm"
              >
                Get This Report
                <svg className="w-5 h-5 ml-2 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>

            {/* Exclusive Best Combo Offer */}
            <div className="bg-gradient-to-r from-pink-50 to-red-50 rounded-2xl p-4 mb-4 border border-pink-200">
              <h2 className="text-lg font-bold text-gray-800 mb-3 md:text-base">Exclusive Best Combo Offer for You</h2>
              
              <div className="flex items-start space-x-4 mb-4 md:space-x-3 md:mb-3">
                <div className="flex-1">
                  <p className="text-sm text-gray-700 mb-3 md:text-xs md:mb-2">
                    We've put together a special Best Combo Offer designed just for you. This offer includes both the 
                    <span className="font-semibold"> Your Abundance Report</span>, which provides predictions for the coming year, and the 
                    <span className="font-semibold"> Premium Kundli Report</span>, offering in-depth insights into your future.
                  </p>
                </div>
                
                <div className="w-20 h-28 flex-shrink-0 md:w-16 md:h-24">
                  <img 
                    src="https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/kundli_analyser/abundance_combo.png"
                    alt="Combo Offer"
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div className="w-full h-full bg-gradient-to-br from-pink-400 to-purple-500 rounded-lg shadow-lg hidden flex items-center justify-center">
                    <span className="text-white text-xs font-bold text-center px-2 md:text-[10px]">Combo<br/>Offer</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-pink-300 text-pink-900 px-4 py-2 rounded-lg font-bold text-sm mb-2 inline-block md:px-3 md:py-1 md:text-xs">
                Get this combo for ₹2499 ₹999
              </div>
              <div className="text-xs text-gray-600 mb-4 md:text-[10px] md:mb-3">
                (Save ₹1500 - 60% OFF )
              </div>
              
              <button 
                onClick={() => handleOfferSelect('combo')}
                className="w-full bg-pink-400 hover:bg-pink-500 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center md:py-2 md:text-sm"
              >
                Get This Combo
                <svg className="w-5 h-5 ml-2 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>

            {/* Trust Badge */}
            <div className="text-center py-4 md:py-2">
              <div className="inline-flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full border border-green-200 md:px-3 md:py-1">
                <svg className="w-5 h-5 text-green-500 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-green-700 text-sm font-medium md:text-xs">100% Personalized & Authentic</span>
              </div>
            </div>

            {/* Bottom padding for scrolling */}
            <div className="h-4"></div>
          </div>

       
        </div>
      </div>
    </div>
  );
};

export default SubscriptionComponent;