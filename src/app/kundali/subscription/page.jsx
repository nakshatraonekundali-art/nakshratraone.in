'use client'
import React, { useState } from 'react';
import { useKundli } from '../context/KundliContext';
import { useRouter } from 'next/navigation';

const SubscriptionComponent = () => {
  const { formData, language } = useKundli();
  const router = useRouter();
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isProfileComplete = () => {
    return !!(
      formData?.name &&
      formData?.gender &&
      formData?.city &&
      formData?.country
    );
  };

  const plans = {
    mini: { 
      name: 'Mini Horoscope', 
      originalPrice: 1499, 
      offerPrice: 199, 
      discount: 40,
      color: 'yellow' 
    },
    basic: { 
      name: 'Basic Horoscope', 
      originalPrice: 1999, 
      offerPrice: 499, 
      discount: 56.67,
      color: 'blue' 
    },
    professional: { 
      name: 'Professional Horoscope', 
      originalPrice: 2499, 
      offerPrice: 999, 
      discount: 60,
      color: 'purple' 
    }
  };

  const handleOfferSelect = async (planType) => {
    try {
      setLoading(true);
      setError('');
      setSelectedOffer(planType);

      // Validate user data
      if (!isProfileComplete()) {
        setError('Please complete your profile first. Redirecting you to the profile form...');
        setLoading(false);
        router.push('/kundali/form');
        return;
      }

      const plan = plans[planType];
      
      // Generate unique transaction ID
      const txnid = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Prepare user data for payment
      const userData = {
        name: formData.name,
        email: formData.email || 'user@example.com',
        mobile: formData.mobile || '9999999999',
        gender: formData.gender,
        day: formData.day,
        month: formData.month,
        year: formData.year,
        hour: formData.hour,
        min: formData.min,
        city: formData.city,
        country: formData.country,
        latitude: formData.latitude,
        longitude: formData.longitude,
        timezone: formData.timezone,
        language: language
      };

      // Initiate payment
      const paymentResponse = await fetch('/api/payment/payu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: plan.offerPrice,
          planType: planType,
          userData: userData,
          txnid: txnid
        }),
      });

      const paymentResult = await paymentResponse.json();

      if (!paymentResult.success) {
        throw new Error(paymentResult.message || 'Payment initiation failed');
      }

      // Submit the user to PayU gateway using an auto-submitting form
      const { paymentUrl, paymentData } = paymentResult;
      if (!paymentUrl || !paymentData) {
        throw new Error('Invalid payment initialization response');
      }

      const form = document.createElement('form');
      form.method = 'POST';
      form.action = paymentUrl;
      form.style.display = 'none';

      Object.entries(paymentData).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = String(value ?? '');
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();

    } catch (err) {
      console.error('Payment/PDF error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getButtonClass = (planType) => {
    const plan = plans[planType];
    const baseClass = "w-full font-bold py-3 px-4 rounded-xl mt-3 transition-all duration-200 flex items-center justify-center md:py-2 md:text-sm";
    
    if (loading && selectedOffer === planType) {
      return `${baseClass} bg-gray-400 text-white cursor-not-allowed`;
    }
    
    switch (plan.color) {
      case 'yellow':
        return `${baseClass} bg-yellow-400 hover:bg-yellow-500 text-yellow-900`;
      case 'blue':
        return `${baseClass} bg-blue-400 hover:bg-blue-500 text-white`;
      case 'purple':
        return `${baseClass} bg-purple-400 hover:bg-purple-500 text-white`;
      default:
        return `${baseClass} bg-gray-400 text-white`;
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-white md:bg-gradient-to-br md:from-purple-800 md:via-purple-600 md:to-purple-400 md:flex md:items-center md:justify-center md:p-4">
      {/* Mobile: Full width, Desktop: Centered card */}
      <div className="w-full max-w-full mx-auto md:max-w-lg h-full">
        <div className="bg-gradient-to-b from-gray-50 via-blue-50 to-purple-50 h-full flex flex-col md:rounded-3xl md:shadow-2xl md:overflow-hidden">
          
          {/* Header with NakshatraOne branding */}
          <div className="text-center pt-8 pb-6 px-6 flex-shrink-0 md:pt-6 md:pb-4">
            <div className="flex items-center justify-center mb-6 md:mb-3">
              <span className="text-orange-500 text-xl font-bold md:text-lg">Nakshatra</span>
              <span className="text-blue-500 text-xl font-bold md:text-lg">One</span>
            </div>
            
            <h1 className="text-xl font-bold text-gray-800 mb-2 md:text-lg">
              {language === 'hindi' ? 'अपनी परफेक्ट योजना चुनें' : 'Choose Your Perfect Plan'}
            </h1>
            
            <p className="text-gray-600 text-sm mb-4 md:text-xs">
              {language === 'hindi' ? 'हमारी किफायती ज्योतिष रिपोर्ट्स में से चुनें' : 'Select from our affordable astrology reports'}
            </p>
            
            <p className="text-gray-700 text-sm leading-relaxed md:text-xs">
              {language === 'hindi' 
                ? 'हमारी सावधानी से तैयार की गई रिपोर्ट्स के साथ व्यक्तिगत ज्योतिषीय जानकारियाँ पाएं। अपनी जरूरत और बजट के अनुसार योजना चुनें।'
                : 'Get personalized astrological insights with our carefully crafted reports. Choose the plan that suits your needs and budget.'}
            </p>
          </div>

          {/* Error / Info Message */}
          {error && (
            <div className="mx-6 mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          {!error && !isProfileComplete() && (
            <div className="mx-6 mb-4 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg text-sm">
              Your profile is incomplete. Please fill the form to continue.{' '}
              <button onClick={() => router.push('/kundali/form')} className="underline font-medium">Complete Profile</button>
            </div>
          )}

          {/* Content Area (card scrollable) */}
          <div className="flex-1 px-6 pb-6 overflow-y-auto">
          
            {/* Mini Horoscope - ₹1 */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 mb-4 border border-yellow-200">
              <div className="flex items-start space-x-4 md:space-x-3">
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-gray-800 mb-3 md:text-base">{language === 'hindi' ? 'मिनी राशिफल' : 'Mini Horoscope'}</h2>
                  
                  <p className="text-sm text-gray-700 mb-2 md:text-xs">
                    {language === 'hindi' ? (
                      <>
                        अपनी दैनिक ज्योतिषीय जानकारी की एक त्वरित झलक पाएं। यह 
                        <span className="font-semibold text-blue-600"> संक्षिप्त रिपोर्ट</span> आवश्यक 
                        <span className="font-semibold text-green-600"> दैनिक भविष्यवाणियाँ</span> और 
                        <span className="font-semibold text-purple-600"> मार्गदर्शन</span> प्रदान करती है।
                      </>
                    ) : (
                      <>
                        Get a quick glimpse into your daily astrological insights. This 
                        <span className="font-semibold text-blue-600"> concise report</span> provides essential 
                        <span className="font-semibold text-green-600"> daily predictions</span> and 
                        <span className="font-semibold text-purple-600"> guidance</span> for your day ahead.
                      </>
                    )}
                  </p>
                  
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-gray-500 line-through text-sm">₹{plans.mini.originalPrice}</span>
                    <span className="text-gray-800 font-bold text-lg">₹{plans.mini.offerPrice}</span>
                    <span className="text-green-600 text-sm font-medium">({plans.mini.discount}% OFF)</span>
                  </div>
                  
                  <div className="text-xs text-gray-600 md:text-[10px]">
                    Most Affordable Option
                  </div>
                </div>
                
                <div className="w-20 h-28 flex-shrink-0 md:w-16 md:h-24">
                  <img 
                    src="https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/kundli_analyser/abundance_report.png"
                    alt="Mini Horoscope"
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg shadow-lg hidden flex items-center justify-center">
                    <span className="text-white text-xs font-bold text-center px-2 md:text-[10px]">Mini<br/>₹{plans.mini.offerPrice}</span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => handleOfferSelect('mini')}
                disabled={loading || !isProfileComplete()}
                className={getButtonClass('mini')}
              >
                {loading && selectedOffer === 'mini' ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    {language === 'hindi' ? 'मिनी राशिफल प्राप्त करें' : 'Get Mini Horoscope'}
                    <svg className="w-5 h-5 ml-2 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
            </div>

            {/* Basic Horoscope - ₹5 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 mb-4 border border-blue-200">
              <div className="flex items-start space-x-4 md:space-x-3">
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-gray-800 mb-3 md:text-base">{language === 'hindi' ? 'बेसिक राशिफल' : 'Basic Horoscope'}</h2>
                  
                  <p className="text-sm text-gray-700 mb-2 md:text-xs">
                    {language === 'hindi' ? (
                      <>
                        व्यापक और किफायती ज्योतिषीय रिपोर्ट जिसमें 
                        <span className="font-semibold text-blue-600"> साप्ताहिक भविष्यवाणियाँ</span>,
                        <span className="font-semibold text-green-600"> ग्रह स्थितियाँ</span> और 
                        <span className="font-semibold text-purple-600"> सामान्य उपाय</span> शामिल हैं।
                      </>
                    ) : (
                      <>
                        A comprehensive yet affordable astrological report covering your 
                        <span className="font-semibold text-blue-600"> weekly predictions</span>, 
                        <span className="font-semibold text-green-600"> planetary positions</span>, and 
                        <span className="font-semibold text-purple-600"> basic remedies</span> for better living.
                      </>
                    )}
                  </p>
                  
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-gray-500 line-through text-sm">₹{plans.basic.originalPrice}</span>
                    <span className="text-gray-800 font-bold text-lg">₹{plans.basic.offerPrice}</span>
                    <span className="text-green-600 text-sm font-medium">({plans.basic.discount}% OFF)</span>
                  </div>
                  
                  <div className="text-xs text-gray-600 md:text-[10px]">
                    Great Value for Money
                  </div>
                </div>
                
                <div className="w-20 h-28 flex-shrink-0 md:w-16 md:h-24">
                  <img 
                    src="https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/kundli_analyser/Kundli.png"
                    alt="Basic Horoscope"
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-600 rounded-lg shadow-lg hidden flex items-center justify-center">
                    <span className="text-white text-xs font-bold text-center px-2 md:text-[10px]">Basic<br/>₹{plans.basic.offerPrice}</span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => handleOfferSelect('basic')}
                disabled={loading || !isProfileComplete()}
                className={getButtonClass('basic')}
              >
                {loading && selectedOffer === 'basic' ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    {language === 'hindi' ? 'बेसिक राशिफल प्राप्त करें' : 'Get Basic Horoscope'}
                    <svg className="w-5 h-5 ml-2 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
            </div>

            {/* Professional Horoscope - ₹50 */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 mb-4 border border-purple-200">
              <h2 className="text-lg font-bold text-gray-800 mb-3 md:text-base">{language === 'hindi' ? 'प्रोफेशनल राशिफल' : 'Professional Horoscope'}</h2>
              
              <div className="flex items-start space-x-4 mb-4 md:space-x-3 md:mb-3">
                <div className="flex-1">
                  <p className="text-sm text-gray-700 mb-3 md:text-xs md:mb-2">
                    {language === 'hindi' ? (
                      <>
                        हमारी सबसे विस्तृत ज्योतिषीय विश्लेषण जिसमें 
                        <span className="font-semibold text-purple-600"> मासिक भविष्यवाणियाँ</span>, 
                        <span className="font-semibold text-blue-600"> करियर मार्गदर्शन</span>, 
                        <span className="font-semibold text-green-600"> संबंधों की समझ</span> और 
                        <span className="font-semibold text-red-600"> व्यक्तिगत उपाय</span> शामिल हैं।
                      </>
                    ) : (
                      <>
                        Our most detailed astrological analysis including 
                        <span className="font-semibold text-purple-600"> monthly predictions</span>, 
                        <span className="font-semibold text-blue-600"> career guidance</span>, 
                        <span className="font-semibold text-green-600"> relationship insights</span>, and 
                        <span className="font-semibold text-red-600"> personalized remedies</span>.
                      </>
                    )}
                  </p>
                  
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-gray-500 line-through text-sm">₹{plans.professional.originalPrice}</span>
                    <span className="text-gray-800 font-bold text-lg">₹{plans.professional.offerPrice}</span>
                    <span className="text-green-600 text-sm font-medium">({plans.professional.discount}% OFF)</span>
                  </div>
                </div>
                
                <div className="w-20 h-28 flex-shrink-0 md:w-16 md:h-24">
                  <img 
                    src="https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/kundli_analyser/abundance_combo.png"
                    alt="Professional Horoscope"
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg shadow-lg hidden flex items-center justify-center">
                    <span className="text-white text-xs font-bold text-center px-2 md:text-[10px]">Pro<br/>₹{plans.professional.offerPrice}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-gray-600 mb-4 md:text-[10px] md:mb-3">
                Complete Professional Analysis
              </div>
              
              <button 
                onClick={() => handleOfferSelect('professional')}
                disabled={loading || !isProfileComplete()}
                className={getButtonClass('professional')}
              >
                {loading && selectedOffer === 'professional' ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    {language === 'hindi' ? 'प्रोफेशनल रिपोर्ट प्राप्त करें' : 'Get Professional Report'}
                    <svg className="w-5 h-5 ml-2 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
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
