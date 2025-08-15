'use client'
import React, { useState, useEffect } from 'react';

const AstrologyUI = () => {
  const [currentPage, setCurrentPage] = useState('report');
  const [formData, setFormData] = useState({
    country: 'India',
    state: '',
    city: ''
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Create stars array
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Generate stars
    const generateStars = () => {
      const starArray = [];
      for (let i = 0; i < 150; i++) {
        starArray.push({
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          size: Math.random() * 3 + 1,
          animationDelay: Math.random() * 3,
          layer: i % 3 === 0 ? 2 : i % 5 === 0 ? 3 : 1
        });
      }
      setStars(starArray);
    };

    generateStars();

    // Mouse movement handler
    const handleMouseMove = (e) => {
      const mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
      const mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x: mouseX, y: mouseY });
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Generating your personalized Kundli report! ✨');
  };

  const featuresList = [
    "Foundation of your Kundli - Panchang",
    "Your Big 3 in Kundli",
    "Your Stored Karma",
    "Your Elemental Balance",
    "Your Soul Desire - Atma Karaka",
    "Your Favorable Deity (Ishta Devta)",
    "Benefic and Malefic Grahas in your Kundli",
    "Your Detailed Planetary Profiles",
    "And more ..."
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-800">
      {/* Animated Stars Background */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {stars.map((star) => (
          <div
            key={star.id}
            className={`absolute bg-white rounded-full animate-pulse`}
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.animationDelay}s`,
              animationDuration: star.layer === 2 ? '4s' : star.layer === 3 ? '5s' : '3s'
            }}
          />
        ))}
      </div>

      {/* Main Container */}
      <div className="relative z-20 min-h-screen flex items-center justify-center p-5">
        <div 
          className="bg-white/95 backdrop-blur-xl rounded-3xl p-10 shadow-2xl max-w-2xl w-full border border-white/30 transition-transform duration-300 ease-out"
          style={{
            transform: `perspective(1000px) rotateY(${mousePosition.x * 0.1}deg) rotateX(${mousePosition.y * 0.1}deg)`
          }}
        >
          {/* Report Page */}
          {currentPage === 'report' && (
            <div className="animate-fadeIn">
              {/* Logo */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white px-6 py-2 rounded-full text-xl font-bold mb-4">
                  ⭐ नक्षत्रOne
                </div>
              </div>

              {/* Greeting */}
              <div className="text-3xl font-semibold text-gray-800 mb-6">
                Namaste 🙏
              </div>

              {/* Description */}
              <div className="text-gray-600 text-base leading-relaxed mb-8">
                We looked at your details. You have a special birth chart, your kundli is unique. We made a detailed kundli analysis report for you.
                <br /><br />
                We made a special free report all about you. In over 30 easy-to-read pages, you'll learn about:
              </div>

              {/* Features List */}
              <ul className="mb-10 space-y-3">
                {featuresList.map((feature, index) => (
                  <li 
                    key={index}
                    className="text-gray-800 font-medium relative pl-6 transition-all duration-300 hover:text-indigo-600 hover:translate-x-2 cursor-default"
                  >
                    <span className="absolute left-0 top-0">✨</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Buttons */}
              <div className="flex gap-4 justify-between items-center">
                <button 
                  onClick={() => console.log('Going back')}
                  className="px-8 py-4 bg-transparent border-2 border-indigo-600 text-indigo-600 rounded-full font-semibold transition-all duration-300 hover:bg-indigo-600 hover:text-white hover:-translate-y-1 hover:shadow-lg"
                >
                  ← Back
                </button>
                <button 
                  onClick={() => setCurrentPage('birthForm')}
                  className="flex-1 max-w-xs px-8 py-4 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-full font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg text-center"
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* Birth Form Page */}
          {currentPage === 'birthForm' && (
            <div className="animate-fadeIn">
              {/* Logo */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white px-6 py-2 rounded-full text-xl font-bold mb-4">
                  ⭐ नक्षत्रOne
                </div>
              </div>

              {/* Form Title */}
              <div className="text-2xl font-semibold text-gray-800 mb-3 text-center">
                What's Your Birthplace?
              </div>

              {/* Form Subtitle */}
              <div className="text-gray-500 text-center mb-8 flex items-center justify-center gap-2">
                📍 Enter your birth location for accurate calculations
              </div>

              {/* Form */}
              <div className="space-y-5">
                {/* Input Row */}
                <div className="flex gap-4">
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Country"
                    className="flex-1 p-4 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 bg-white/80 focus:outline-none focus:border-indigo-600 focus:bg-white focus:shadow-lg"
                  />
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="State/Region"
                    className="flex-1 p-4 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 bg-white/80 focus:outline-none focus:border-indigo-600 focus:bg-white focus:shadow-lg"
                  />
                </div>

                {/* City Input */}
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 bg-white/80 focus:outline-none focus:border-indigo-600 focus:bg-white focus:shadow-lg"
                />

                {/* Info Box */}
                <div className="bg-gradient-to-r from-indigo-100/50 to-purple-100/50 rounded-xl p-5 border-l-4 border-indigo-600">
                  <div className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    💡 Why do we need your birth location?
                  </div>
                  <div className="text-gray-600 text-sm leading-relaxed">
                    Your exact birth location helps us calculate precise planetary positions and generate accurate astrological coordinates for your personalized kundli report.
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="flex gap-4 justify-between items-center pt-5">
                  <button 
                    type="button"
                    onClick={() => setCurrentPage('report')}
                    className="px-8 py-4 bg-transparent border-2 border-indigo-600 text-indigo-600 rounded-full font-semibold transition-all duration-300 hover:bg-indigo-600 hover:text-white hover:-translate-y-1 hover:shadow-lg"
                  >
                    ← Back
                  </button>
                  <button 
                    type="button"
                    onClick={handleFormSubmit}
                    className="flex-1 max-w-xs px-8 py-4 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-full font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg text-center"
                  >
                    View Your Kundli Now! →
                  </button>
                </div>
              </div>
            </div>
          )}
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
          animation: fadeIn 0.5s ease-in-out;
        }
        
        @media (max-width: 768px) {
          .flex {
            flex-direction: column;
          }
          
          .max-w-xs {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default AstrologyUI;