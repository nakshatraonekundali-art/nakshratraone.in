'use client'
import React, { useState, useEffect } from 'react';

const BirthPanchang = () => {
  const [stars, setStars] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Generate stars for background
    const generateStars = () => {
      const starArray = [];
      for (let i = 0; i < 100; i++) {
        starArray.push({
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          size: Math.random() * 2 + 1,
          animationDelay: Math.random() * 3,
        });
      }
      setStars(starArray);
    };

    generateStars();

    // Mouse movement handler
    const handleMouseMove = (e) => {
      const mouseX = (e.clientX / window.innerWidth - 0.5) * 10;
      const mouseY = (e.clientY / window.innerHeight - 0.5) * 10;
      setMousePosition({ x: mouseX, y: mouseY });
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleGetReport = () => {
    console.log('Get Abundance Report clicked');
    alert('Generating your personalized Abundance Report! ✨');
  };

  const handleNext = () => {
    console.log('Next page navigation');
    // Add navigation logic here
  };

  const handleBack = () => {
    console.log('Back page navigation');
    // Add navigation logic here
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-800">
      {/* Animated Stars Background */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.animationDelay}s`,
              animationDuration: '3s'
            }}
          />
        ))}
      </div>

      {/* Main Container */}
      <div className="relative z-20 min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white px-6 py-2 rounded-full text-xl font-bold">
              ⭐ नक्षत्रOne
            </div>
          </div>

          {/* Main Content Card */}
          <div 
            className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 transition-transform duration-300 ease-out overflow-hidden"
            style={{
              transform: `perspective(1000px) rotateY(${mousePosition.x * 0.05}deg) rotateX(${mousePosition.y * 0.05}deg)`
            }}
          >
            
            {/* Top Message Section */}
            <div className="bg-gradient-to-r from-purple-200 to-pink-200 p-6 border-b border-purple-100">
              <p className="text-gray-700 text-sm leading-relaxed">
                influencing how we handle life's challenges. Good yoga can mitigate tithi and karan issues.
              </p>
            </div>

            {/* Wealth Map Promotional Section */}
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-8 border-b border-purple-100">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="border-2 border-orange-400 bg-white rounded-lg px-4 py-2 inline-block mb-4">
                    <span className="text-orange-500 font-bold text-sm">PERSONALIZED WEALTH MAP FOR YOU!</span>
                  </div>
                  
                  <div className="text-gray-700 space-y-2">
                    <p>
                      Unlock your home's <span className="font-semibold text-gray-800">hidden prosperity</span> with tailored <span className="font-semibold text-gray-800">Astro-Vastu insights</span> and actionable steps.
                    </p>
                    <p>
                      Balance <span className="font-semibold text-gray-800">energy directions</span>, activate <span className="font-semibold text-gray-800">money zones</span>, and attract <span className="font-semibold text-gray-800">abundance</span> with ancient wisdom customized to your chart.
                    </p>
                  </div>
                  
                  <button 
                    onClick={handleGetReport}
                    className="mt-4 bg-gradient-to-r from-purple-400 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    Get My Abundance Report →
                  </button>
                </div>
                
                <div className="ml-6">
                  <div className="w-24 h-32 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-lg shadow-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-300/30 to-yellow-700/50"></div>
                    <div className="relative">
                      <div className="text-white font-bold text-xs text-center mb-1">YOUR</div>
                      <div className="text-white font-bold text-xs text-center mb-2">ABUNDANCE</div>
                      <div className="text-white font-bold text-xs text-center">REPORT</div>
                      <div className="w-8 h-8 bg-yellow-200 rounded-full mx-auto mt-2 flex items-center justify-center">
                        🌳
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Panchang Information Section */}
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-8 border-b border-orange-100">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  👤
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Panchang holds the keys to our true nature. Ready to learn <span className="font-bold">more?</span> Click 'Next' and find out the panchang elements that were aligned on your special day.
                  </h2>
                </div>
              </div>
            </div>

            {/* Main Content Section */}
            <div className="p-8">
              <div className="flex items-start gap-8">
                <div className="flex-1">
                  <div className="mb-6">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      In the grand narrative of Vedic astrology, Panchang plays the role of a sage, offering insights into our innate strengths and the shadows we carry. It's the whisper of the stars on the day we were born, revealing rituals to harmonize our being with the universe.
                    </p>
                    
                    <p className="text-gray-700 leading-relaxed mb-4">
                      The word "Panchang" comes from "Panch," meaning five, and "Anga," meaning parts or limbs. It refers to the five elements that determine the energy of a day.
                    </p>
                    
                    <p className="text-gray-700 leading-relaxed mb-6">
                      These elements are based on how the Sun and Moon interact every day, affecting our daily life.
                    </p>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-6">
                    The Panchang shows five special aspects
                  </h3>

                  {/* Panchang Elements */}
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-6 border-l-4 border-orange-400">
                      <h4 className="font-bold text-gray-800 mb-2">Vaar - The day of the week</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        A key part of panchanga, influencing the soul. It shapes how the soul feels and communicates.
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-6 border-l-4 border-purple-400">
                      <h4 className="font-bold text-gray-800 mb-2">Tithi - Lunar Phase</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Reflects human nature, showing strengths and weaknesses. Each tithi carries unique energy patterns.
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-green-100 to-teal-100 rounded-xl p-6 border-l-4 border-green-400">
                      <h4 className="font-bold text-gray-800 mb-2">Nakshatra - Star Constellation</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        The star constellation influences personality, career, and life path decisions.
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-pink-100 to-red-100 rounded-xl p-6 border-l-4 border-pink-400">
                      <h4 className="font-bold text-gray-800 mb-2">Yoga - Planetary Combination</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Special planetary combinations that influence success and challenges in life.
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-indigo-100 to-blue-100 rounded-xl p-6 border-l-4 border-indigo-400">
                      <h4 className="font-bold text-gray-800 mb-2">Karan - Half of Tithi</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Represents the subtle energies that affect daily activities and decision-making.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Side Illustration */}
                <div className="w-32 flex-shrink-0">
                  <div className="bg-gradient-to-b from-orange-300 to-orange-500 rounded-2xl p-4 shadow-lg">
                    <div className="text-center">
                      <div className="w-16 h-20 bg-orange-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
                        📜
                      </div>
                      <div className="w-4 h-4 bg-green-400 rounded-full mx-auto mb-1"></div>
                      <div className="w-2 h-2 bg-gray-600 rounded-full mx-auto mb-1"></div>
                      <div className="w-3 h-3 bg-purple-400 rounded-full mx-auto"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="p-8 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <button 
                  onClick={handleBack}
                  className="px-8 py-3 bg-transparent border-2 border-gray-300 text-gray-600 rounded-full font-semibold transition-all duration-300 hover:border-indigo-400 hover:text-indigo-600 hover:-translate-y-1"
                >
                  ← Back
                </button>
                <button 
                  onClick={handleNext}
                  className="px-8 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-full font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-in-out;
        }
        
        @media (max-width: 768px) {
          .flex {
            flex-direction: column !important;
          }
          
          .ml-6 {
            margin-left: 0 !important;
            margin-top: 1rem;
          }
          
          .gap-8 {
            gap: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default BirthPanchang;