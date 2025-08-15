'use client'
import React, { useState } from 'react';
import { Star, ArrowLeft, ArrowRight, MapPin, Globe, Moon, Sun } from 'lucide-react';

const NakshatraBirthplaceForm = () => {
  const [formData, setFormData] = useState({
    country: 'India',
    city: ''
  });

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const indianCities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 
    'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur',
    'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri', 'Patna',
    'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad',
    'Meerut', 'Rajkot', 'Kalyan', 'Vasai-Virar', 'Varanasi', 'Srinagar'
  ];

  const handleCityChange = (value) => {
    setFormData(prev => ({ ...prev, city: value }));
    
    if (value.length > 0) {
      const filtered = indianCities.filter(city => 
        city.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectCity = (city) => {
    setFormData(prev => ({ ...prev, city }));
    setShowSuggestions(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white relative overflow-hidden">
      {/* Animated Background Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          >
            <Star className="w-1 h-1 text-yellow-300 fill-current" />
          </div>
        ))}
      </div>

      {/* Floating Nakshatras */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {['🐎', '⭐', '🔥', '🌙', '🦌', '💎', '🏹', '🌸'].map((symbol, index) => (
          <div
            key={index}
            className="absolute animate-float opacity-20"
            style={{
              left: `${5 + (index * 11)}%`,
              top: `${15 + (index * 9)}%`,
              animationDelay: `${index * 0.7}s`,
              animationDuration: '5s'
            }}
          >
            <div className="text-4xl">{symbol}</div>
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl">
                  <Star className="w-7 h-7 text-white fill-current animate-spin" style={{ animationDuration: '8s' }} />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 rounded-full animate-ping"></div>
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                नक्षत्रOne
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Form */}
      <main className="relative z-10 px-6">
        <div className="max-w-lg mx-auto">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-10 shadow-2xl transform animate-fade-in">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-8 py-3 rounded-full text-xl font-bold shadow-lg">
                  नक्षत्र<span className="text-blue-200">One</span>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                What's Your Birthplace?
              </h1>
              
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <MapPin className="w-5 h-5" />
                <span>Enter your birth location for accurate calculations</span>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              {/* Country and City Row */}
              <div className="grid grid-cols-5 gap-4">
                {/* Country Field */}
                <div className="col-span-2">
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all duration-300 text-gray-900 font-medium"
                    />
                  </div>
                </div>

                {/* City Field */}
                <div className="col-span-3 relative">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Type Birth City/District"
                      value={formData.city}
                      onChange={(e) => handleCityChange(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all duration-300 text-gray-900 placeholder-gray-500"
                    />
                  </div>

                  {/* City Suggestions */}
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                      {suggestions.map((city, index) => (
                        <button
                          key={city}
                          type="button"
                          onClick={() => selectCity(city)}
                          className="w-full px-4 py-3 text-left hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 flex items-center space-x-2 first:rounded-t-xl last:rounded-b-xl"
                        >
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{city}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Location Info */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                  <div className="text-sm text-gray-700">
                    <p className="font-semibold mb-1">Why do we need your birthplace?</p>
                    <p>Your exact birth location helps us calculate precise planetary positions and generate accurate Kundli predictions based on astronomical coordinates.</p>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-8">
                <button
                  type="button"
                  className="flex items-center space-x-3 px-6 py-4 border-2 border-gray-300 rounded-xl text-gray-600 hover:border-orange-400 hover:text-orange-600 transition-all duration-300 group bg-white hover:bg-orange-50"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                  <span className="font-semibold">Back</span>
                </button>

                <button
                  type="submit"
                  className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-xl hover:from-orange-500 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg group"
                >
                  <span className="font-semibold">View Your Kundli Now!</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>

            {/* Security Badge */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span>SSL Secured</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <span>Privacy Protected</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                  <span>Vedic Accurate</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cosmic Elements */}
          <div className="mt-10 flex justify-center space-x-12">
            <div className="animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
              <Moon className="w-10 h-10 text-yellow-300" />
            </div>
            <div className="animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}>
              <Sun className="w-10 h-10 text-orange-400" />
            </div>
            <div className="animate-bounce" style={{ animationDelay: '2s', animationDuration: '3s' }}>
              <Star className="w-10 h-10 text-pink-400 fill-current" />
            </div>
          </div>
        </div>
      </main>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(8deg);
          }
          66% {
            transform: translateY(15px) rotate(-5deg);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NakshatraBirthplaceForm;