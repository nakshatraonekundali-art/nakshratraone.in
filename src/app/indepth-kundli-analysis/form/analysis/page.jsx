'use client'
import React, { useState, useEffect } from 'react';
import { Star, Moon, Sun } from 'lucide-react';

const NakshatraLoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      initials: "PS",
      name: "Priya S.",
      time: "1 month ago",
      rating: 5,
      text: "My personalized Kundli analysis was remarkably accurate. It identified career patterns I'd never connected before and gave practical remedies for obstacles I've been facing. The relationship compatibility insights were especially valuable for my marriage. Worth every penny!"
    },
    {
      initials: "RK",
      name: "Rahul K.",
      time: "2 weeks ago", 
      rating: 5,
      text: "The Nakshatra One predictions helped me make important life decisions. The timing for starting my new business was perfect as suggested. The detailed dasha analysis was spot on and the remedies actually work!"
    },
    {
      initials: "MS",
      name: "Maya S.",
      time: "3 days ago",
      rating: 5,
      text: "Amazing accuracy in birth chart reading! The personality traits described matched perfectly. The career guidance section helped me choose the right path. The gemstone recommendations have brought positive changes in my life."
    },
    {
      initials: "AJ",
      name: "Arjun J.",
      time: "1 week ago",
      rating: 5,
      text: "Best astrology service I've used! The detailed planetary positions and their effects were explained so clearly. The marriage predictions and compatible partner traits were incredibly helpful for my family."
    }
  ];

  // Progress animation
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, []);

  // Testimonial rotation
  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(testimonialInterval);
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white relative overflow-hidden flex items-center justify-center">
      {/* Animated Background Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(60)].map((_, i) => (
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
              left: `${8 + (index * 12)}%`,
              top: `${10 + (index * 11)}%`,
              animationDelay: `${index * 0.8}s`,
              animationDuration: '6s'
            }}
          >
            <div className="text-3xl">{symbol}</div>
          </div>
        ))}
      </div>

      {/* Main Loading Card */}
      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl transform animate-fade-in">
          
          {/* Cosmic Loading Animation */}
          <div className="flex justify-center mb-8">
            <div className="relative w-32 h-32">
              {/* Central Planet */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 rounded-full animate-pulse shadow-lg relative overflow-hidden">
                  {/* Planet surface details */}
                  <div className="absolute top-3 left-4 w-3 h-3 bg-pink-400 rounded-full opacity-80"></div>
                  <div className="absolute bottom-4 right-3 w-2 h-2 bg-cyan-300 rounded-full opacity-60"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-purple-400 rounded-full opacity-70"></div>
                </div>
              </div>
              
              {/* Orbiting Elements */}
              <div className="absolute inset-0 animate-spin-slow">
                {/* Orange orbital element */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <div className="w-4 h-8 bg-gradient-to-b from-orange-400 to-yellow-500 rounded-full"></div>
                </div>
                {/* Red orbital element */}
                <div className="absolute top-1/2 -right-2 transform -translate-y-1/2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                </div>
                {/* Blue orbital element */}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                  <div className="w-2 h-6 bg-gradient-to-b from-blue-400 to-cyan-500 rounded-full"></div>
                </div>
                {/* Yellow orbital element */}
                <div className="absolute top-1/2 -left-2 transform -translate-y-1/2">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                </div>
              </div>
              
              {/* Orbital rings */}
              <div className="absolute inset-0 border-2 border-dashed border-gray-300 rounded-full opacity-30 animate-spin-reverse"></div>
              <div className="absolute inset-2 border border-dashed border-gray-400 rounded-full opacity-20 animate-spin"></div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-400 to-pink-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Loading Text */}
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Calculating Your Cosmic Blueprint...
            </h2>
            <p className="text-gray-600">
              Hang on... Analyzing planetary positions
            </p>
          </div>

          {/* Testimonial Section */}
          <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl p-6 min-h-[180px] relative overflow-hidden">
            <div className="relative z-10">
              {/* User Initial Avatar */}
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {testimonials[currentTestimonial].initials}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-gray-800">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <span className="text-sm text-gray-500">
                      {testimonials[currentTestimonial].time}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {renderStars(testimonials[currentTestimonial].rating)}
                  </div>
                </div>
              </div>

              {/* Testimonial Text */}
              <p className="text-sm text-gray-700 leading-relaxed">
                {testimonials[currentTestimonial].text}
              </p>
            </div>

            {/* Verification Badge */}
            <div className="absolute bottom-3 right-3">
              <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Verified Customer</span>
              </div>
            </div>
          </div>

          {/* Dots indicator for testimonials */}
          <div className="flex justify-center space-x-2 mt-4">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-orange-500 w-6' 
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Cosmic Elements Below */}
        <div className="mt-8 flex justify-center space-x-8">
          <div className="animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }}>
            <Moon className="w-8 h-8 text-yellow-300" />
          </div>
          <div className="animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2s' }}>
            <Sun className="w-8 h-8 text-orange-400" />
          </div>
          <div className="animate-bounce" style={{ animationDelay: '1s', animationDuration: '2s' }}>
            <Star className="w-8 h-8 text-pink-400 fill-current" />
          </div>
        </div>
      </div>

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

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 12s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default NakshatraLoadingScreen;