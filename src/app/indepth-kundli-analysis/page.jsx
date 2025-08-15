'use client'
import React, { useState, useEffect } from 'react';
import { Star, Moon, Sun, Calculator, Heart, BookOpen, ChevronRight } from 'lucide-react';

const VedicRishi = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const nakshatras = [
    { name: 'Ashwini', symbol: '🐎' },
    { name: 'Bharani', symbol: '⭐' },
    { name: 'Krittika', symbol: '🔥' },
    { name: 'Rohini', symbol: '🌙' },
    { name: 'Mrigashira', symbol: '🦌' },
    { name: 'Ardra', symbol: '💎' },
    { name: 'Punarvasu', symbol: '🏹' },
    { name: 'Pushya', symbol: '🌸' }
  ];

  const features = [
    { 
      icon: <Calculator className="w-6 h-6" />, 
      title: "Karma Calculator",
      desc: "Calculate your karmic patterns"
    },
    { 
      icon: <Heart className="w-6 h-6" />, 
      title: "Love Calculator",
      desc: "Analyze relationship compatibility"
    },
    { 
      icon: <BookOpen className="w-6 h-6" />, 
      title: "Numerology Calculator",
      desc: "Discover your life path numbers"
    }
  ];

  const analysisFeatures = [
    "Panchang at your birth predictions",
    "Your detailed Kundli",
    "Your Karmic and Soul Desire Analysis",
    "Detailed Planet and Dasha Predictions"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white relative overflow-hidden">
      {/* Animated Background Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
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

      {/* Header */}
      <header className="relative z-10 p-6">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
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

          {/* Navigation */}
          <div className="hidden md:flex space-x-8">
            <a href="#" className="hover:text-yellow-300 transition-colors duration-300">Home</a>
            <a href="#" className="hover:text-yellow-300 transition-colors duration-300">Kundli</a>
            <a href="#" className="hover:text-yellow-300 transition-colors duration-300">Predictions</a>
            <a href="#" className="hover:text-yellow-300 transition-colors duration-300">Remedies</a>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors duration-300">
              <Moon className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors duration-300">
              <Sun className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Feature Cards */}
          <div className="flex justify-center mb-12">
            <div className="flex space-x-8 bg-white/10 backdrop-blur-md rounded-2xl p-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex flex-col items-center space-y-2 p-4 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                  style={{
                    animationDelay: `${index * 0.2}s`
                  }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-sm text-center">{feature.title}</h3>
                  <p className="text-xs text-gray-300 text-center">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center mb-12">
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
                Karma
              </span>
              <span className="ml-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                Score
              </span>
            </h1>
            <p className="text-xl mb-8 text-gray-300">Let's Calculate your</p>
          </div>

          {/* Kundli Analysis Card */}
          <div className="max-w-md mx-auto">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 text-gray-800 shadow-2xl transform hover:scale-105 transition-all duration-500">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="flex justify-center mb-4">
                  <div className="bg-gradient-to-br from-orange-400 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    VEDICrishi
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-2">Get Your Free In-depth Kundli Analysis</h2>
                <p className="text-gray-600">Your 30-page report includes:</p>
              </div>

              {/* Features List */}
              <div className="space-y-3 mb-8">
                {analysisFeatures.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-start space-x-3 opacity-0 animate-fade-in"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animationFillMode: 'forwards'
                    }}
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Language Selection */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Select your language for free kundli analysis.</h3>
                <p className="text-sm text-gray-600 mb-4">मुफ्त कुंडली विश्लेषण के लिए अपनी भाषा चुनें।</p>
              </div>

              {/* Language Buttons */}
              <div className="space-y-3">
                <button 
                  className="w-full flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-orange-400 transition-all duration-300 group"
                  onClick={() => setSelectedLanguage('english')}
                >
                  <span className="font-medium">View in English</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                
                <button 
                  className="w-full flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-orange-400 transition-all duration-300 group"
                  onClick={() => setSelectedLanguage('hindi')}
                >
                  <span className="font-medium">हिंदी में देखें</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>

          {/* Floating Nakshatras */}
          <div className="absolute inset-0 pointer-events-none">
            {nakshatras.map((nakshatra, index) => (
              <div
                key={index}
                className="absolute animate-float opacity-30"
                style={{
                  left: `${10 + (index * 10)}%`,
                  top: `${20 + (index * 8)}%`,
                  animationDelay: `${index * 0.5}s`,
                  animationDuration: '4s'
                }}
              >
                <div className="text-2xl">{nakshatra.symbol}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default VedicRishi;