'use client'
import React, { useState } from 'react';
import { Star, ArrowLeft, ArrowRight, ChevronDown, Moon, Sun } from 'lucide-react';

const NakshatraBirthForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: 'Male',
    month: '',
    day: '',
    year: '',
    hour: '',
    minute: ''
  });

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const years = Array.from({ length: 100 }, (_, i) => 2024 - i);
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const CustomSelect = ({ value, onChange, options, placeholder, type = "text" }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-left flex items-center justify-between hover:border-orange-300 focus:border-orange-400 focus:outline-none transition-all duration-300"
        >
          <span className={value ? "text-gray-900" : "text-gray-500"}>
            {value || placeholder}
          </span>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white relative overflow-hidden">
      {/* Animated Background Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(100)].map((_, i) => (
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
              left: `${10 + (index * 12)}%`,
              top: `${10 + (index * 10)}%`,
              animationDelay: `${index * 0.5}s`,
              animationDuration: '6s'
            }}
          >
            <div className="text-3xl">{symbol}</div>
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <Star className="w-6 h-6 text-white fill-current animate-spin" style={{ animationDuration: '8s' }} />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full animate-ping"></div>
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                नक्षत्रOne
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Form */}
      <main className="relative z-10 px-6">
        <div className="max-w-md mx-auto">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl transform animate-fade-in">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-6 py-2 rounded-full text-lg font-bold">
                  VEDIC<span className="text-blue-300">rishi</span>
                </div>
              </div>
              
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Enter Your Birth Details To Get Your{' '}
                <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                  Free Kundli Analysis
                </span>
              </h1>
            </div>

            {/* Form */}
            <form className="space-y-6">
              {/* Name and Gender Row */}
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-orange-400 focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-500"
                  />
                </div>
                <div>
                  <CustomSelect
                    value={formData.gender}
                    onChange={(value) => handleInputChange('gender', value)}
                    options={['Male', 'Female', 'Other']}
                    placeholder="Gender"
                  />
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-gray-700 font-semibold mb-3">Date of Birth:</label>
                <div className="grid grid-cols-3 gap-4">
                  <CustomSelect
                    value={formData.month}
                    onChange={(value) => handleInputChange('month', value)}
                    options={months}
                    placeholder="MM"
                  />
                  <CustomSelect
                    value={formData.day}
                    onChange={(value) => handleInputChange('day', value)}
                    options={days}
                    placeholder="DD"
                  />
                  <CustomSelect
                    value={formData.year}
                    onChange={(value) => handleInputChange('year', value)}
                    options={years}
                    placeholder="YYYY"
                  />
                </div>
              </div>

              {/* Time of Birth */}
              <div>
                <label className="block text-gray-700 font-semibold mb-3">Time of Birth:</label>
                <div className="grid grid-cols-2 gap-4">
                  <CustomSelect
                    value={formData.hour}
                    onChange={(value) => handleInputChange('hour', value)}
                    options={hours}
                    placeholder="HH"
                  />
                  <CustomSelect
                    value={formData.minute}
                    onChange={(value) => handleInputChange('minute', value)}
                    options={minutes}
                    placeholder="MM"
                  />
                </div>
              </div>

              {/* Birth Place */}
              <div>
                <input
                  type="text"
                  placeholder="Birth Place (City, Country)"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-orange-400 focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-500"
                />
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-6">
                <button
                  type="button"
                  className="flex items-center space-x-2 px-6 py-3 border-2 border-gray-300 rounded-lg text-gray-600 hover:border-orange-400 hover:text-orange-600 transition-all duration-300 group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg hover:from-orange-500 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg group"
                >
                  <span className="font-semibold">Next</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </form>

            {/* Trust Indicators */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span>Trusted by Millions</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cosmic Elements */}
          <div className="mt-8 flex justify-center space-x-8">
            <div className="animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
              <Moon className="w-8 h-8 text-yellow-300" />
            </div>
            <div className="animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}>
              <Sun className="w-8 h-8 text-orange-400" />
            </div>
            <div className="animate-bounce" style={{ animationDelay: '2s', animationDuration: '3s' }}>
              <Star className="w-8 h-8 text-pink-400 fill-current" />
            </div>
          </div>
        </div>
      </main>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
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
            transform: translateY(-15px) rotate(5deg);
          }
          66% {
            transform: translateY(10px) rotate(-3deg);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NakshatraBirthForm;