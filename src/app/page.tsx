'use client'
import React, { useState, useEffect } from 'react';
import { Star, User, Shield, Calculator, ArrowRight, Moon, Sun } from 'lucide-react';
import Link from 'next/link';

const HomeScreen = () => {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Calculator className="w-8 h-8" />,
      title: "Kundli Analysis",
      desc: "Get detailed birth chart analysis",
      color: "from-orange-400 to-pink-500"
    },
    {
      icon: <User className="w-8 h-8" />,
      title: "Admin Panel",
      desc: "Manage users and analytics",
      color: "from-blue-400 to-purple-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Private",
      desc: "Your data is completely safe",
      color: "from-green-400 to-teal-500"
    }
  ];

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
        {nakshatras.map((nakshatra, index) => (
          <div
            key={index}
            className="absolute animate-float opacity-20"
            style={{
              left: `${10 + (index * 10)}%`,
              top: `${10 + (index * 8)}%`,
              animationDelay: `${index * 0.5}s`,
              animationDuration: '6s'
            }}
          >
            <div className="text-3xl">{nakshatra.symbol}</div>
          </div>
        ))}
      </div>

    
      {/* Hero Section */}
      <main className="relative z-10 px-6 py-12">
        <div className="max-w-7xl mx-auto">
       

          {/* Feature Cards */}
          <div className="flex justify-center mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 cursor-pointer group transform hover:scale-105"
                  style={{
                    animationDelay: `${index * 0.2}s`
                  }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-300">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Main Options */}
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Kundli Analysis Option */}
              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 text-gray-800 shadow-2xl transform hover:scale-105 transition-all duration-500">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calculator className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2">Kundli Analysis</h2>
                  <p className="text-gray-600">Get your detailed birth chart analysis</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm">Free basic analysis</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm">Detailed planetary positions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm">Dosha analysis & remedies</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm">30-page detailed report</span>
                  </div>
                </div>

                <Link href="/shubham">
                  <button className="w-full flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-2xl font-semibold hover:from-orange-500 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg group">
                    <span>Start Analysis</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </Link>
              </div>

              {/* Admin Panel Option */}
              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 text-gray-800 shadow-2xl transform hover:scale-105 transition-all duration-500">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2">Admin Panel</h2>
                  <p className="text-gray-600">Manage users and view analytics</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">User management</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Analytics dashboard</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Plan management</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Revenue tracking</span>
                  </div>
                </div>

                <Link href="/admin">
                  <button className="w-full flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-2xl font-semibold hover:from-blue-500 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-lg group">
                    <span>Admin </span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="text-center mt-16">
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Trusted by Millions</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Custom Styles */}
      <style jsx>{`
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

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HomeScreen; 