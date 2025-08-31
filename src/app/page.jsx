'use client'
import React, { useState, useEffect } from 'react';
import { Star, User, Shield, Calculator, ArrowRight, Moon, Sun } from 'lucide-react';
import Link from 'next/link';

const HomeScreen = () => {
  const [panchang, setPanchang] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  // API credentials
  const userId = '643886';
  const apiKey = '8cfa24ac82f34fa17f090ed5a6a2122b9f3e10bf';

  useEffect(() => {
    fetchPanchang();
    // Update current date every minute
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchPanchang = async () => {
    try {
      setLoading(true);
      setError(null);
      const now = new Date();
      
      const requestData = {
        day: now.getDate(),
        month: now.getMonth() + 1,
        year: now.getFullYear(),
        hour: now.getHours(),
        min: now.getMinutes(),
        lat: 19.132, // Mumbai coordinates as default
        lon: 72.342,
        tzone: 5.5,
      };

      // First try your backend API endpoint
      try {
        const response = await fetch('/api/panchang', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData)
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Panchang API Response:', result);
          setPanchang(result);
          return;
        } else {
          console.log('Backend API response not OK:', response.status);
        }
      } catch (apiErr) {
        console.log('Backend API not available:', apiErr.message);
      }

      // If backend fails, try direct API call
      try {
        const directResponse = await fetch('https://json.astrologyapi.com/v1/advanced_panchang', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${btoa(`${userId}:${apiKey}`)}`,
          },
          body: JSON.stringify(requestData)
        });

        if (directResponse.ok) {
          const result = await directResponse.json();
          console.log('Direct API Response:', result);
          setPanchang(result);
          return;
        } else {
          console.log('Direct API response not OK:', directResponse.status);
          throw new Error(`API responded with status: ${directResponse.status}`);
        }
      } catch (directApiErr) {
        console.error('Direct API call failed:', directApiErr);
        throw directApiErr;
      }

    } catch (err) {
      console.error('Error fetching panchang:', err);
      setError(`Unable to load panchang data: ${err.message}`);
      setPanchang(null);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    const parts = timeString.split(':');
    if (parts.length >= 2) {
      return `${parts[0]}:${parts[1]}`;
    }
    return timeString;
  };

  const getCurrentDateString = () => {
    const options = { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return currentDate.toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50">
      {/* Header */}
      <div className="text-center py-4 px-4 sticky top-0 bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 z-10">
        <div className="flex items-center justify-center mb-2">
          <span className="text-orange-500 text-xl md:text-2xl font-bold">Nakshatra</span>
          <span className="text-blue-500 text-xl md:text-2xl font-bold">One</span>
        </div>
      </div>

      {/* Mobile Layout - Stack vertically */}
      <div className="block lg:hidden px-4 pb-4 space-y-4">
        {/* Rishi Image Section - Mobile */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-4 text-center">
            <h2 className="text-xl font-bold mb-2">ANALYZE YOUR KUNDLI</h2>
            <h3 className="text-lg font-semibold">IN-DEPTH FOR FREE</h3>
          </div>
          
          <div className="p-4 text-center">
           

            <Link href="/kundali">
              <img 
                src="https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/kundli_analyser/Analyser.png"
                alt="Spiritual Guru"
                className="w-full max-w-xs mx-auto h-64 object-contain rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300 mb-4"
              />
            </Link>
            <Link href="/kundali">
              <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-3 px-6 rounded-full text-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200">
                Analyze for Free Now
              </button>
            </Link>
          </div>
        </div>
        {/* Panchang Card - Mobile First */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Panchang Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4">
            <h3 className="text-lg font-bold">Today's Panchang</h3>
            <p className="text-sm opacity-90">Mumbai, Maharashtra, India</p>
          </div>

          {/* Date and Time */}
          <div className="p-4 border-b">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">{getCurrentDateString()}</h4>
            
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              </div>
            ) : error ? (
              <div className="text-red-600 text-sm text-center py-4">
                {error}
              </div>
            ) : panchang ? (
              <>
                {/* Sun/Moon Times */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <Sun size={20} className="mx-auto mb-2 text-orange-500" />
                    <div className="text-xs text-gray-500 mb-1">Sunrise</div>
                    <div className="text-sm font-medium text-gray-700">{formatTime(panchang.sunrise)}</div>
                  </div>
                  <div className="text-center">
                    <Sun size={20} className="mx-auto mb-2 text-orange-400" />
                    <div className="text-xs text-gray-500 mb-1">Sunset</div>
                    <div className="text-sm font-medium text-gray-700">{formatTime(panchang.sunset)}</div>
                  </div>
                  <div className="text-center">
                    <Moon size={20} className="mx-auto mb-2 text-blue-500" />
                    <div className="text-xs text-gray-500 mb-1">Moonrise</div>
                    <div className="text-sm font-medium text-gray-700">{formatTime(panchang.moonrise)}</div>
                  </div>
                  <div className="text-center">
                    <Moon size={20} className="mx-auto mb-2 text-blue-400" />
                    <div className="text-xs text-gray-500 mb-1">Moonset</div>
                    <div className="text-sm font-medium text-gray-700">{formatTime(panchang.moonset)}</div>
                  </div>
                </div>
              </>
            ) : null}
          </div>

          {/* Show message when no data is available */}
          {!loading && !error && !panchang && (
            <div className="p-4 text-center text-gray-500">
              No panchang data available
            </div>
          )}

          {/* Panchang Details */}
          {panchang && (
            <div className="p-4 space-y-4">
              {/* Month and Samvat */}
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <h5 className="font-semibold text-gray-800 text-sm mb-2">MONTH</h5>
                  <p className="text-sm text-gray-600">Amanta: {panchang.hindu_maah?.amanta}</p>
                  <p className="text-sm text-gray-600">Purnimanta: {panchang.hindu_maah?.purnimanta}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <h5 className="font-semibold text-gray-800 text-sm mb-2">SAMVAT</h5>
                  <p className="text-sm text-gray-600">Vikram: {panchang.vikram_samvat} - {panchang.vkram_samvat_name}</p>
                  <p className="text-sm text-gray-600">Shaka: {panchang.shaka_samvat} - {panchang.shaka_samvat_name}</p>
                </div>
              </div>

              {/* Tithi */}
              <div className="bg-purple-50 rounded-lg p-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-gray-800 text-sm">TITHI:</span>
                  <span className="text-sm text-purple-600 font-medium">{panchang.tithi?.details?.tithi_name}</span>
                </div>
                <div className="text-xs text-gray-500">
                  Until {formatTime(`${panchang.tithi?.end_time?.hour}:${panchang.tithi?.end_time?.minute}`)}
                </div>
              </div>

              {/* Nakshatra */}
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-gray-800 text-sm">NAKSHATRA:</span>
                  <span className="text-sm text-blue-600 font-medium">{panchang.nakshatra?.details?.nak_name}</span>
                </div>
                <div className="text-xs text-gray-500">
                  Until {formatTime(`${panchang.nakshatra?.end_time?.hour}:${panchang.nakshatra?.end_time?.minute}`)}
                </div>
              </div>

              {/* Yog and Karan */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-50 rounded-lg p-3">
                  <h5 className="font-semibold text-gray-800 text-sm mb-1">YOG:</h5>
                  <p className="text-sm text-green-600 font-medium">{panchang.yog?.details?.yog_name}</p>
                  <p className="text-xs text-gray-500">
                    Until {formatTime(`${panchang.yog?.end_time?.hour}:${panchang.yog?.end_time?.minute}`)}
                  </p>
                </div>
                <div className="bg-orange-50 rounded-lg p-3">
                  <h5 className="font-semibold text-gray-800 text-sm mb-1">KARAN:</h5>
                  <p className="text-sm text-orange-600 font-medium">{panchang.karan?.details?.karan_name}</p>
                  <p className="text-xs text-gray-500">
                    Until {formatTime(`${panchang.karan?.end_time?.hour}:${panchang.karan?.end_time?.minute}`)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Detailed Panchang Button */}
          <div className="p-4">
            <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:from-purple-700 hover:to-pink-700 transition-all duration-200">
              Detailed Panchang
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        
      </div>

      {/* Desktop Layout - Side by side */}
      <div className="hidden lg:flex gap-8 max-w-7xl mx-auto px-4 pb-8">
        {/* Left Section - Rishi Image */}
        <div className="flex-1 bg-white rounded-3xl p-8 shadow-lg flex flex-col justify-center items-center">
        

          <Link href="/kundali">
            <img 
              src="https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/kundli_analyser/Analyser.png"
              alt="Spiritual Guru"
              className="h-[80vh] object-contain rounded-2xl shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300 mb-6"
            />
          </Link>
          <Link href="/kundali">
            <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-4 px-8 rounded-full text-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200">
              Analyze for Free Now
            </button>
          </Link>
        </div>

        {/* Right Section - Today's Panchang */}
        <div className="w-96 bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col">
          {/* Panchang Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4">
            <h3 className="text-xl font-bold">Today's Panchang</h3>
            <p className="text-sm opacity-90">Mumbai, Maharashtra, India</p>
          </div>

          {/* Date and Time */}
          <div className="p-4 border-b">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">{getCurrentDateString()}</h4>
            
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              </div>
            ) : error ? (
              <div className="text-red-600 text-sm text-center py-4">
                {error}
              </div>
            ) : panchang ? (
              <>
                {/* Sun/Moon Times */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <Sun size={20} className="mx-auto mb-2 text-orange-500" />
                    <div className="text-xs text-gray-500 mb-1">Sunrise</div>
                    <div className="text-sm font-medium text-gray-500">{formatTime(panchang.sunrise)}</div>
                  </div>
                  <div className="text-center">
                    <Sun size={20} className="mx-auto mb-2 text-orange-400" />
                    <div className="text-xs text-gray-500 mb-1">Sunset</div>
                    <div className="text-sm font-medium text-gray-500">{formatTime(panchang.sunset)}</div>
                  </div>
                  <div className="text-center">
                    <Moon size={20} className="mx-auto mb-2 text-blue-500" />
                    <div className="text-xs text-gray-500 mb-1">Moonrise</div>
                    <div className="text-sm font-medium text-gray-500">{formatTime(panchang.moonrise)}</div>
                  </div>
                  <div className="text-center">
                    <Moon size={20} className="mx-auto mb-2 text-blue-400" />
                    <div className="text-xs text-gray-500 mb-1">Moonset</div>
                    <div className="text-sm font-medium text-gray-500">{formatTime(panchang.moonset)}</div>
                  </div>
                </div>
              </>
            ) : null}
          </div>

          {/* Panchang Details - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            {panchang && (
              <div className="p-4 space-y-4">
                {/* Month and Samvat */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-gray-800 text-base mb-2">MONTH</h5>
                    <p className="text-sm text-gray-600">Amanta: {panchang.hindu_maah?.amanta}</p>
                    <p className="text-sm text-gray-600">Purnimanta: {panchang.hindu_maah?.purnimanta}</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-800 text-base mb-2">SAMVAT</h5>
                    <p className="text-sm text-gray-600">Vikram: {panchang.vikram_samvat} - {panchang.vkram_samvat_name}</p>
                    <p className="text-sm text-gray-600">Shaka: {panchang.shaka_samvat} - {panchang.shaka_samvat_name}</p>
                  </div>
                </div>

                {/* Tithi */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800 text-base">TITHI:</span>
                    <div className="text-right">
                      <span className="text-sm text-gray-600">{panchang.tithi?.details?.tithi_name}</span>
                      <div className="text-xs text-gray-600">
                        till {formatTime(`${panchang.tithi?.end_time?.hour}:${panchang.tithi?.end_time?.minute}`)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Nakshatra */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800 text-base">NAKSHATRA:</span>
                    <div className="text-right">
                      <span className="text-sm text-gray-600">{panchang.nakshatra?.details?.nak_name}</span>
                      <div className="text-xs text-gray-600">
                        till {formatTime(`${panchang.nakshatra?.end_time?.hour}:${panchang.nakshatra?.end_time?.minute}`)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Yog and Karan */}
                <div className="grid grid-cols-2 gap-4 border-t pt-4">
                  <div>
                    <h5 className="font-semibold text-gray-800 text-base mb-1">YOG:</h5>
                    <p className="text-sm text-gray-600">{panchang.yog?.details?.yog_name}</p>
                    <p className="text-xs text-gray-600">
                      till {formatTime(`${panchang.yog?.end_time?.hour}:${panchang.yog?.end_time?.minute}`)}
                    </p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-800 text-base mb-1">KARAN:</h5>
                    <p className="text-sm text-gray-600">{panchang.karan?.details?.karan_name}</p>
                    <p className="text-xs text-gray-600">
                      till {formatTime(`${panchang.karan?.end_time?.hour}:${panchang.karan?.end_time?.minute}`)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Detailed Panchang Button */}
          <div className="p-4">
            <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:from-purple-700 hover:to-pink-700 transition-all duration-200">
              Detailed Panchang
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;