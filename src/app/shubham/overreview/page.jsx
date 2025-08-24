import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Overview = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl h-[85vh] flex flex-col">
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
          {/* Logo */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">
              <span className="text-orange-500">Nakshatra</span>
              <span className="text-blue-500">One</span>
            </h1>
          </div>

          {/* Greeting */}
          <div className="mb-5">
            <h2 className="text-2xl font-semibold text-black mb-4">
              Namaste d,
            </h2>
          </div>

          {/* Description */}
          <div className="mb-5 space-y-4">
            <p className="text-gray-700 text-base leading-relaxed">
              We looked at your details. You have a special birth chart, your kundli is unique. We made a detailed kundli analysis report for you.
            </p>
            
            <p className="text-gray-700 text-base leading-relaxed">
              We made a special free report all about you. In over 30 easy-to-read pages, you'll learn about:
            </p>
          </div>

          {/* Features List - Scrollable */}
          <div className="mb-5">
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-black rounded-full mt-2.5 mr-4 flex-shrink-0"></span>
                <span className="text-gray-800 text-base font-semibold">
                  Foundation of your Kundli - Panchang
                </span>
              </li>
              
              <li className="flex items-start">
                <span className="w-2 h-2 bg-black rounded-full mt-2.5 mr-4 flex-shrink-0"></span>
                <span className="text-gray-800 text-base font-semibold">
                  Your Big 3 in Kundli
                </span>
              </li>
              
              <li className="flex items-start">
                <span className="w-2 h-2 bg-black rounded-full mt-2.5 mr-4 flex-shrink-0"></span>
                <span className="text-gray-800 text-base font-semibold">
                  Your Stored Karma
                </span>
              </li>
              
              <li className="flex items-start">
                <span className="w-2 h-2 bg-black rounded-full mt-2.5 mr-4 flex-shrink-0"></span>
                <span className="text-gray-800 text-base font-semibold">
                  Your Elemental Balance
                </span>
              </li>
              
              <li className="flex items-start">
                <span className="w-2 h-2 bg-black rounded-full mt-2.5 mr-4 flex-shrink-0"></span>
                <span className="text-gray-800 text-base font-semibold">
                  Your Soul Desire - Atma Karaka
                </span>
              </li>
              
              <li className="flex items-start">
                <span className="w-2 h-2 bg-black rounded-full mt-2.5 mr-4 flex-shrink-0"></span>
                <span className="text-gray-800 text-base font-semibold">
                  Your Favorable Deity (Ishta Devta)
                </span>
              </li>
              
              <li className="flex items-start">
                <span className="w-2 h-2 bg-black rounded-full mt-2.5 mr-4 flex-shrink-0"></span>
                <span className="text-gray-800 text-base font-semibold">
                  Benefic and Malefic Grahas in your Kundli
                </span>
              </li>
              
              <li className="flex items-start">
                <span className="w-2 h-2 bg-black rounded-full mt-2.5 mr-4 flex-shrink-0"></span>
                <span className="text-gray-800 text-base font-semibold">
                  Your Details Planetary Profiles
                </span>
              </li>
              
              <li className="flex items-start">
                <span className="w-2 h-2 bg-black rounded-full mt-2.5 mr-4 flex-shrink-0"></span>
                <span className="text-gray-800 text-base font-semibold">
                  Your Current Running Dasha
                </span>
              </li>
              
              <li className="flex items-start">
                <span className="w-2 h-2 bg-black rounded-full mt-2.5 mr-4 flex-shrink-0"></span>
                <span className="text-gray-800 text-base font-semibold">
                  And more ...
                </span>
              </li>
            </ul>
          </div>

          {/* Bottom text */}
          <div className="mb-5">
            <p className="text-gray-600 text-base leading-relaxed">
              Our report helps you understand yourself better and make good choices. Without this knowledge, you might miss out on key insights for personal growth.
            </p>
          </div>
          
            <div className="mb-5">
              <p className="text-gray-600 text-base">
                Click 'Next' to get started
              </p>
            </div>
          </div>
        </div>

        {/* Fixed Navigation */}
        <div className="bg-white border-t border-gray-100 p-5 rounded-b-2xl flex-shrink-0">
          <div className="flex items-center justify-between">
            <button className="flex items-center justify-center w-14 h-12 border border-gray-300 rounded-xl text-gray-400">
              <ChevronLeft size={22} />
            </button>

            <button className="flex items-center gap-3 px-10 py-4 bg-orange-400 text-white rounded-xl font-semibold text-lg hover:bg-orange-500 transition-colors">
              Next
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;