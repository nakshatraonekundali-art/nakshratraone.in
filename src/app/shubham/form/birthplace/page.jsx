'use client'
import React, { useState, useEffect, useRef } from 'react';
import { useKundli } from '../../context/KundliContext';
import Navigation from '../../components/Navigation';

const BirthPlace = () => {
  const { formData, updateFormData, language } = useKundli();
  const [country, setCountry] = useState(formData.country || 'India');
  const [city, setCity] = useState(formData.city || '');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);
  
  // Translations
  const translations = {
    title: {
      english: "What's Your Birthplace?",
      hindi: "आपका जन्म स्थान क्या है?"
    },
    placeholder: {
      english: "Type Birth City/District",
      hindi: "जन्म शहर/जिला टाइप करें"
    },
    viewKundli: {
      english: "View Your Kundli Now!",
      hindi: "अपनी कुंडली अभी देखें!"
    },
    next: {
      english: "View Your Kundli Now!",
      hindi: "अपनी कुंडली अभी देखें!"
    },
    back: {
      english: "Back",
      hindi: "वापस"
    }
  };

  // Sample Indian cities data for demonstration
  const indianCities = [
    'Delhi, Delhi, India',
    'New Delhi, Delhi, India', 
    'Mumbai, Maharashtra, India',
    'Bangalore, Karnataka, India',
    'Chennai, Tamil Nadu, India',
    'Hyderabad, Telangana, India',
    'Kolkata, West Bengal, India',
    'Pune, Maharashtra, India',
    'Ahmedabad, Gujarat, India',
    'Jaipur, Rajasthan, India',
    'Surat, Gujarat, India',
    'Lucknow, Uttar Pradesh, India',
    'Kanpur, Uttar Pradesh, India',
    'Nagpur, Maharashtra, India',
    'Indore, Madhya Pradesh, India',
    'Thane, Maharashtra, India',
    'Bhopal, Madhya Pradesh, India',
    'Visakhapatnam, Andhra Pradesh, India',
    'Pimpri-Chinchwad, Maharashtra, India',
    'Patna, Bihar, India',
    'Vadodara, Gujarat, India',
    'Ghaziabad, Uttar Pradesh, India',
    'Ludhiana, Punjab, India',
    'Agra, Uttar Pradesh, India',
    'Nashik, Maharashtra, India',
    'Faridabad, Haryana, India',
    'Meerut, Uttar Pradesh, India',
    'Rajkot, Gujarat, India',
    'Kalyan-Dombivali, Maharashtra, India',
    'Vasai-Virar, Maharashtra, India',
    'Varanasi, Uttar Pradesh, India',
    'Srinagar, Jammu and Kashmir, India',
    'Aurangabad, Maharashtra, India',
    'Dhanbad, Jharkhand, India',
    'Amritsar, Punjab, India',
    'Navi Mumbai, Maharashtra, India',
    'Allahabad, Uttar Pradesh, India',
    'Ranchi, Jharkhand, India',
    'Howrah, West Bengal, India',
    'Coimbatore, Tamil Nadu, India',
    'Jabalpur, Madhya Pradesh, India',
    'Gwalior, Madhya Pradesh, India',
    'Vijayawada, Andhra Pradesh, India',
    'Jodhpur, Rajasthan, India',
    'Madurai, Tamil Nadu, India',
    'Raipur, Chhattisgarh, India',
    'Kota, Rajasthan, India',
    'Guwahati, Assam, India',
    'Chandigarh, Chandigarh, India',
    'Solapur, Maharashtra, India',
    'Hubli-Dharwad, Karnataka, India',
    'Bareilly, Uttar Pradesh, India',
    'Moradabad, Uttar Pradesh, India',
    'Mysore, Karnataka, India',
    'Gurgaon, Haryana, India',
    'Aligarh, Uttar Pradesh, India',
    'Jalandhar, Punjab, India',
    'Tiruchirappalli, Tamil Nadu, India',
    'Bhubaneswar, Odisha, India',
    'Salem, Tamil Nadu, India',
    'Mira-Bhayandar, Maharashtra, India',
    'Warangal, Telangana, India',
    'Jalgaon, Maharashtra, India',
    'Guntur, Andhra Pradesh, India',
    'Bhiwandi, Maharashtra, India',
    'Saharanpur, Uttar Pradesh, India',
    'Gorakhpur, Uttar Pradesh, India',
    'Bikaner, Rajasthan, India',
    'Amravati, Maharashtra, India',
    'Noida, Uttar Pradesh, India',
    'Jamshedpur, Jharkhand, India',
    'Bhilai, Chhattisgarh, India',
    'Cuttack, Odisha, India',
    'Firozabad, Uttar Pradesh, India',
    'Kochi, Kerala, India',
    'Nellore, Andhra Pradesh, India',
    'Bhavnagar, Gujarat, India',
    'Dehradun, Uttarakhand, India',
    'Durgapur, West Bengal, India',
    'Asansol, West Bengal, India',
    'Rourkela, Odisha, India',
    'Nanded, Maharashtra, India',
    'Kolhapur, Maharashtra, India',
    'Ajmer, Rajasthan, India',
    'Akola, Maharashtra, India',
    'Gulbarga, Karnataka, India',
    'Jamnagar, Gujarat, India',
    'Ujjain, Madhya Pradesh, India',
    'Loni, Uttar Pradesh, India',
    'Siliguri, West Bengal, India',
    'Jhansi, Uttar Pradesh, India',
    'Ulhasnagar, Maharashtra, India',
    'Jammu, Jammu and Kashmir, India',
    'Sangli-Miraj & Kupwad, Maharashtra, India',
    'Mangalore, Karnataka, India',
    'Erode, Tamil Nadu, India',
    'Belgaum, Karnataka, India',
    'Ambattur, Tamil Nadu, India',
    'Tirunelveli, Tamil Nadu, India',
    'Malegaon, Maharashtra, India',
    'Gaya, Bihar, India',
    'Jalgaon, Maharashtra, India',
    'Udaipur, Rajasthan, India',
    'Maheshtala, West Bengal, India',
    'Davanagere, Karnataka, India',
    'Kozhikode, Kerala, India',
    'Kurnool, Andhra Pradesh, India',
    'Rajpur Sonarpur, West Bengal, India',
    'Rajahmundry, Andhra Pradesh, India',
    'Bokaro, Jharkhand, India',
    'South Dumdum, West Bengal, India',
    'Bellary, Karnataka, India',
    'Patiala, Punjab, India',
    'Gopalpur, Odisha, India',
    'Agartala, Tripura, India',
    'Bhagalpur, Bihar, India',
    'Muzaffarnagar, Uttar Pradesh, India',
    'Bhatpara, West Bengal, India',
    'Panihati, West Bengal, India',
    'Latur, Maharashtra, India',
    'Dhule, Maharashtra, India',
    'Rohtak, Haryana, India',
    'Korba, Chhattisgarh, India',
    'Bhilwara, Rajasthan, India',
    'Berhampur, Odisha, India',
    'Muzaffarpur, Bihar, India',
    'Ahmednagar, Maharashtra, India',
    'Mathura, Uttar Pradesh, India',
    'Kollam, Kerala, India',
    'Avadi, Tamil Nadu, India',
    'Kadapa, Andhra Pradesh, India',
    'Kamarhati, West Bengal, India',
    'Sambalpur, Odisha, India',
    'Bilaspur, Chhattisgarh, India',
    'Shahjahanpur, Uttar Pradesh, India',
    'Satara, Maharashtra, India',
    'Bijapur, Karnataka, India',
    'Rampur, Uttar Pradesh, India',
    'Shivamogga, Karnataka, India',
    'Chandrapur, Maharashtra, India',
    'Junagadh, Gujarat, India',
    'Thrissur, Kerala, India',
    'Alwar, Rajasthan, India',
    'Bardhaman, West Bengal, India',
    'Kulti, West Bengal, India',
    'Kakinada, Andhra Pradesh, India',
    'Nizamabad, Telangana, India',
    'Parbhani, Maharashtra, India',
    'Tumkur, Karnataka, India',
    'Khammam, Telangana, India',
    'Ozhukarai, Puducherry, India',
    'Bihar Sharif, Bihar, India',
    'Panipat, Haryana, India',
    'Darbhanga, Bihar, India',
    'Bally, West Bengal, India',
    'Aizawl, Mizoram, India',
    'Dewas, Madhya Pradesh, India',
    'Ichalkaranji, Maharashtra, India',
    'Karnal, Haryana, India',
    'Bathinda, Punjab, India',
    'Jalna, Maharashtra, India',
    'Eluru, Andhra Pradesh, India',
    'Kirari Suleman Nagar, Delhi, India',
    'Barabanki, Uttar Pradesh, India',
    'Purnia, Bihar, India',
    'Satna, Madhya Pradesh, India',
    'Mau, Uttar Pradesh, India',
    'Sonipat, Haryana, India',
    'Farrukhabad, Uttar Pradesh, India',
    'Sagar, Madhya Pradesh, India',
    'Rourkela, Odisha, India',
    'Durg, Chhattisgarh, India',
    'Imphal, Manipur, India',
    'Ratlam, Madhya Pradesh, India',
    'Hapur, Uttar Pradesh, India',
    'Arrah, Bihar, India',
    'Karimnagar, Telangana, India',
    'Anantapur, Andhra Pradesh, India',
    'Etawah, Uttar Pradesh, India',
    'Ambernath, Maharashtra, India',
    'North Dumdum, West Bengal, India',
    'Bharatpur, Rajasthan, India',
    'Begusarai, Bihar, India',
    'New Delhi, Delhi, India',
    'Gandhidham, Gujarat, India',
    'Baranagar, West Bengal, India',
    'Tiruvottiyur, Tamil Nadu, India',
    'Pondicherry, Puducherry, India',
    'Sikar, Rajasthan, India',
    'Thoothukudi, Tamil Nadu, India',
    'Rewa, Madhya Pradesh, India',
    'Mirzapur, Uttar Pradesh, India',
    'Raichur, Karnataka, India',
    'Pali, Rajasthan, India',
    'Ramagundam, Telangana, India',
    'Haridwar, Uttarakhand, India',
    'Vijayanagaram, Andhra Pradesh, India',
    'Katihar, Bihar, India',
    'Nagarcoil, Tamil Nadu, India',
    'Sri Ganganagar, Rajasthan, India',
    'Karawal Nagar, Delhi, India',
    'Mango, Jharkhand, India',
    'Thanjavur, Tamil Nadu, India',
    'Bulandshahr, Uttar Pradesh, India',
    'Uluberia, West Bengal, India',
    'Murwara, Madhya Pradesh, India',
    'Sambhal, Uttar Pradesh, India',
    'Singrauli, Madhya Pradesh, India',
    'Nadiad, Gujarat, India',
    'Secunderabad, Telangana, India',
    'Naihati, West Bengal, India',
    'Yamunanagar, Haryana, India',
    'Bidhan Nagar, West Bengal, India',
    'Pallavaram, Tamil Nadu, India',
    'Bidar, Karnataka, India',
    'Munger, Bihar, India',
    'Panchkula, Haryana, India',
    'Burhanpur, Madhya Pradesh, India',
    'Raurkela Industrial Township, Odisha, India',
    'Kharagpur, West Bengal, India',
    'Dindigul, Tamil Nadu, India',
    'Gandhinagar, Gujarat, India',
    'Hospet, Karnataka, India',
    'Nangloi Jat, Delhi, India',
    'Malda, West Bengal, India',
    'Ongole, Andhra Pradesh, India',
    'Deoghar, Jharkhand, India',
    'Chapra, Bihar, India',
    'Haldia, West Bengal, India',
    'Khandwa, Madhya Pradesh, India',
    'Nandyal, Andhra Pradesh, India',
    'Morena, Madhya Pradesh, India',
    'Amroha, Uttar Pradesh, India',
    'Mahbubnagar, Telangana, India',
    'Saharsa, Bihar, India',
    'Kamareddy, Telangana, India',
    'Sambalpur, Odisha, India',
    'Azamgarh, Uttar Pradesh, India',
    'Chhapra, Bihar, India',
    'Kurnool, Andhra Pradesh, India',
    'Nizamabad, Telangana, India',
    'Orai, Uttar Pradesh, India',
    'Calicut, Kerala, India',
    'Xianyang, Shaanxi, China',
    'Karur, Tamil Nadu, India',
    'Udupi, Karnataka, India',
    'Ballia, Uttar Pradesh, India',
    'Pilibhit, Uttar Pradesh, India',
    'Cottonpet, Karnataka, India',
    'Hansi, Haryana, India',
    'Pratapgarh, Uttar Pradesh, India',
    'Sirsa, Haryana, India',
    'Kasganj, Uttar Pradesh, India',
    'Kishanganj, Bihar, India',
    'Jamalpur, Bihar, India',
    'Balasore, Odisha, India',
    'Jaunpur, Uttar Pradesh, India',
    'Jalna, Maharashtra, India',
    'Neyveli, Tamil Nadu, India',
    'Mahoba, Uttar Pradesh, India',
    'Siswa Bazar, Uttar Pradesh, India',
    'Malerkotla, Punjab, India'
  ];

  // Function to get coordinates for a city
  const getCityCoordinates = (cityString) => {
    // Default coordinates (Delhi)
    let lat = 28.6139;
    let lon = 77.2090;
    let tzone = 5.5;
    
    // Map of city coordinates
    const cityCoordinates = {
      'Delhi': { lat: 28.6139, lon: 77.2090, tzone: 5.5 },
      'New Delhi': { lat: 28.6139, lon: 77.2090, tzone: 5.5 },
      'Mumbai': { lat: 19.0760, lon: 72.8777, tzone: 5.5 },
      'Bangalore': { lat: 12.9716, lon: 77.5946, tzone: 5.5 },
      'Chennai': { lat: 13.0827, lon: 80.2707, tzone: 5.5 },
      'Hyderabad': { lat: 17.3850, lon: 78.4867, tzone: 5.5 },
      'Kolkata': { lat: 22.5726, lon: 88.3639, tzone: 5.5 },
      'Pune': { lat: 18.5204, lon: 73.8567, tzone: 5.5 },
      'Ahmedabad': { lat: 23.0225, lon: 72.5714, tzone: 5.5 },
      'Jaipur': { lat: 26.9124, lon: 75.7873, tzone: 5.5 },
      'Surat': { lat: 21.1702, lon: 72.8311, tzone: 5.5 },
      'Lucknow': { lat: 26.8467, lon: 80.9462, tzone: 5.5 },
      'Kanpur': { lat: 26.4499, lon: 80.3319, tzone: 5.5 },
      'Nagpur': { lat: 21.1458, lon: 79.0882, tzone: 5.5 },
      'Indore': { lat: 22.7196, lon: 75.8577, tzone: 5.5 },
      'Thane': { lat: 19.2183, lon: 72.9781, tzone: 5.5 },
      'Bhopal': { lat: 23.2599, lon: 77.4126, tzone: 5.5 },
      'Visakhapatnam': { lat: 17.6868, lon: 83.2185, tzone: 5.5 },
      'Patna': { lat: 25.5941, lon: 85.1376, tzone: 5.5 },
      'Vadodara': { lat: 22.3072, lon: 73.1812, tzone: 5.5 },
      'Ghaziabad': { lat: 28.6654, lon: 77.4391, tzone: 5.5 },
      'Ludhiana': { lat: 30.9010, lon: 75.8573, tzone: 5.5 },
      'Agra': { lat: 27.1767, lon: 78.0081, tzone: 5.5 },
      'Nashik': { lat: 19.9975, lon: 73.7898, tzone: 5.5 },
      'Faridabad': { lat: 28.4089, lon: 77.3178, tzone: 5.5 },
      'Meerut': { lat: 28.9845, lon: 77.7064, tzone: 5.5 },
      'Rajkot': { lat: 22.3039, lon: 70.8022, tzone: 5.5 },
      'Kalyan-Dombivali': { lat: 19.2350, lon: 73.1299, tzone: 5.5 },
      'Vasai-Virar': { lat: 19.4250, lon: 72.8223, tzone: 5.5 },
      'Varanasi': { lat: 25.3176, lon: 82.9739, tzone: 5.5 },
      'Srinagar': { lat: 34.0837, lon: 74.7973, tzone: 5.5 },
      'Aurangabad': { lat: 19.8762, lon: 75.3433, tzone: 5.5 },
      'Dhanbad': { lat: 23.7957, lon: 86.4304, tzone: 5.5 },
      'Amritsar': { lat: 31.6340, lon: 74.8723, tzone: 5.5 },
      'Navi Mumbai': { lat: 19.0330, lon: 73.0297, tzone: 5.5 },
      'Allahabad': { lat: 25.4358, lon: 81.8463, tzone: 5.5 },
      'Ranchi': { lat: 23.3441, lon: 85.3096, tzone: 5.5 },
      'Howrah': { lat: 22.5958, lon: 88.2636, tzone: 5.5 },
      'Coimbatore': { lat: 11.0168, lon: 76.9558, tzone: 5.5 },
      'Jabalpur': { lat: 23.1815, lon: 79.9864, tzone: 5.5 },
      'Gwalior': { lat: 26.2183, lon: 78.1828, tzone: 5.5 },
      'Vijayawada': { lat: 16.5062, lon: 80.6480, tzone: 5.5 },
      'Jodhpur': { lat: 26.2389, lon: 73.0243, tzone: 5.5 },
      'Madurai': { lat: 9.9252, lon: 78.1198, tzone: 5.5 },
      'Raipur': { lat: 21.2514, lon: 81.6296, tzone: 5.5 },
      'Kota': { lat: 25.2138, lon: 75.8648, tzone: 5.5 },
      'Guwahati': { lat: 26.1833, lon: 91.7462, tzone: 5.5 },
      'Chandigarh': { lat: 30.7333, lon: 76.7794, tzone: 5.5 },
      'Solapur': { lat: 17.6599, lon: 75.9064, tzone: 5.5 },
      'Hubli-Dharwad': { lat: 15.3647, lon: 75.1240, tzone: 5.5 },
      'Bareilly': { lat: 28.3670, lon: 79.4304, tzone: 5.5 },
      'Moradabad': { lat: 28.8389, lon: 78.7738, tzone: 5.5 },
      'Mysore': { lat: 12.2958, lon: 76.6394, tzone: 5.5 },
      'Gurgaon': { lat: 28.4595, lon: 77.0266, tzone: 5.5 },
      'Aligarh': { lat: 27.8974, lon: 78.0880, tzone: 5.5 },
      'Jalandhar': { lat: 31.3260, lon: 75.5762, tzone: 5.5 }
    };
    
    // Extract city name from the full string (e.g., "Mumbai, Maharashtra, India" -> "Mumbai")
    const cityParts = cityString.split(',');
    const cityName = cityParts[0].trim();
    
    // Look up coordinates for the city
    if (cityCoordinates[cityName]) {
      return cityCoordinates[cityName];
    }
    
    // Return default coordinates if city not found
    return { lat, lon, tzone };
  };

  const searchCities = (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const filteredCities = indianCities
      .filter(cityName => 
        cityName.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 10); // Limit to top 10 results

    setSuggestions(filteredCities);
  };

  const handleCityChange = (value) => {
    setCity(value);
    updateFormData({ city: value });
    
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (value.trim()) {
        setLoading(true);
        searchCities(value);
        setShowSuggestions(true);
        setLoading(false);
      } else {
        setShowSuggestions(false);
        setSuggestions([]);
      }
    }, 300);
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion);
    
    // Extract city and country from suggestion
    const parts = suggestion.split(',').map(part => part.trim());
    const cityName = parts[0];
    
    // Get coordinates for the selected city
    const coordinates = getCityCoordinates(suggestion);
    
    // Update form data with city and coordinates
    updateFormData({ 
      city: suggestion,
      latitude: coordinates.lat,
      longitude: coordinates.lon,
      timezone: coordinates.tzone
    });
    
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const handleCityBlur = () => {
    // Delay hiding suggestions to allow clicking
    setTimeout(() => {
      setShowSuggestions(false);
      
      // Get coordinates for the current city
      if (city) {
        const coordinates = getCityCoordinates(city);
        
        // Update formData when focus is lost
        updateFormData({ 
          country, 
          city,
          latitude: coordinates.lat,
          longitude: coordinates.lon,
          timezone: coordinates.tzone
        });
      }
    }, 150);
  };

  const handleCityFocus = () => {
    if (city.trim() && suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <>
    {/* Desktop Version */}
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 hidden md:flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 min-h-[500px] max-h-[90vh] overflow-y-auto">
        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">
            <span className="text-orange-500">NAKSHATRA</span>
            <span className="text-blue-500">one</span>
          </h1>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 leading-tight">
            {language === 'english' ? translations.title.english : translations.title.hindi}
          </h2>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Country and City Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <select
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  updateFormData({ country: e.target.value });
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-gray-700 bg-white"
              >
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
              </select>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder={language === 'english' ? translations.placeholder.english : translations.placeholder.hindi}
                value={city}
                onChange={(e) => handleCityChange(e.target.value)}
                onFocus={handleCityFocus}
                onBlur={handleCityBlur}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-gray-700"
              />
              
              {/* Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleSuggestionClick(suggestion);
                      }}
                      className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                    >
                      <span className="text-gray-700">{suggestion}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {loading && (
                <div className="absolute right-3 top-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-500"></div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="pt-32">
            <Navigation 
              currentPage="birthplace" 
              nextText={language === 'english' ? translations.next.english : translations.next.hindi}
              backText={language === 'english' ? translations.back.english : translations.back.hindi}
              onNext={() => window.location.href = "/shubham/overreview"}
              onBack={() => window.location.href = "/shubham/form"}
            />
          </div>
        </div>
      </div>
    </div>

    {/* Mobile Version - Full Screen White */}
    <div className="md:hidden min-h-screen bg-white p-4 overflow-y-auto">
      <div className="max-w-md mx-auto">
        {/* Logo */}
        <div className="text-center mb-6 mt-4">
          <h1 className="text-2xl font-bold">
            <span className="text-orange-500">NAKSHATRA</span>
            <span className="text-blue-500">one</span>
          </h1>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 leading-tight">
            {language === 'english' ? translations.title.english : translations.title.hindi}
          </h2>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Country and City Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <select
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  updateFormData({ country: e.target.value });
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-gray-700 bg-white"
              >
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
              </select>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder={language === 'english' ? translations.placeholder.english : translations.placeholder.hindi}
                value={city}
                onChange={(e) => handleCityChange(e.target.value)}
                onFocus={handleCityFocus}
                onBlur={handleCityBlur}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-gray-700"
              />
              
              {/* Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleSuggestionClick(suggestion);
                      }}
                      className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                    >
                      <span className="text-gray-700">{suggestion}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {loading && (
                <div className="absolute right-3 top-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-500"></div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="pt-32 pb-6">
            <Navigation 
              currentPage="birthplace" 
              nextText={language === 'english' ? translations.next.english : translations.next.hindi}
              backText={language === 'english' ? translations.back.english : translations.back.hindi}
              onNext={() => window.location.href = "/shubham/overreview"}
              onBack={() => window.location.href = "/shubham/form"}
            />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default BirthPlace;