'use client'
import React from 'react';
import { useKundli } from '../context/KundliContext';
import Navigation from '../components/Navigation';

const Form = () => {
  const { formData, updateFormData, language } = useKundli();

  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value });
  };
  
  // Translations
  const translations = {
    title: {
      english: "Enter Your Birth Details To Get Your Free Kundli Analysis",
      hindi: "अपना मुफ्त कुंडली विश्लेषण प्राप्त करने के लिए अपना जन्म विवरण दर्ज करें"
    },
    name: {
      english: "Your Name",
      hindi: "आपका नाम"
    },
    dateOfBirth: {
      english: "Date of Birth:",
      hindi: "जन्म तिथि:"
    },
    timeOfBirth: {
      english: "Time of Birth:",
      hindi: "जन्म समय:"
    },
    next: {
      english: "Next",
      hindi: "अगला"
    },
    back: {
      english: "Back",
      hindi: "पीछे"
    }
  };

  const months = [
    'MM', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const days = ['DD', ...Array.from({length: 31}, (_, i) => i + 1)];
  const years = ['YYYY', ...Array.from({length: 100}, (_, i) => 2024 - i)];
  const hours = ['HH', ...Array.from({length: 24}, (_, i) => String(i).padStart(2, '0'))];
  const minutes = ['MM', ...Array.from({length: 60}, (_, i) => String(i).padStart(2, '0'))];

  return (
    <>
    {/* Desktop Version */}
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 hidden md:flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 max-h-[90vh] overflow-y-auto">
        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">
            <span className="text-orange-500">NAKSHATRA</span>
            <span className="text-blue-500">one</span>
          </h1>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-gray-800 leading-tight">
            {language === 'english' ? translations.title.english : translations.title.hindi}{' '}
            <span className="text-orange-500 underline">{language === 'english' ? 'Free Kundli Analysis' : 'मुफ्त कुंडली विश्लेषण'}</span>
          </h2>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Name and Gender Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder={language === 'english' ? translations.name.english : translations.name.hindi}
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-gray-700"
              />
            </div>
            <div>
              <select
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-gray-700 bg-white"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">{language === 'english' ? translations.dateOfBirth.english : translations.dateOfBirth.hindi}</label>
            <div className="grid grid-cols-3 gap-4">
              <select
                value={formData.month}
                onChange={(e) => handleInputChange('month', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-gray-700 bg-white"
              >
                {months.map((month, index) => (
                  <option key={index} value={month}>{month}</option>
                ))}
              </select>
              <select
                value={formData.day}
                onChange={(e) => handleInputChange('day', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-gray-700 bg-white"
              >
                {days.map((day, index) => (
                  <option key={index} value={day}>{day}</option>
                ))}
              </select>
              <select
                value={formData.year}
                onChange={(e) => handleInputChange('year', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-gray-700 bg-white"
              >
                {years.map((year, index) => (
                  <option key={index} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Time of Birth */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">{language === 'english' ? translations.timeOfBirth.english : translations.timeOfBirth.hindi}</label>
            <div className="grid grid-cols-2 gap-4">
              <select
                value={formData.hour}
                onChange={(e) => handleInputChange('hour', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-gray-700 bg-white"
              >
                {hours.map((hour, index) => (
                  <option key={index} value={hour}>{hour}</option>
                ))}
              </select>
              <select
                value={formData.minute}
                onChange={(e) => handleInputChange('minute', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-gray-700 bg-white"
              >
                {minutes.map((minute, index) => (
                  <option key={index} value={minute}>{minute}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Navigation */}
          <div className="pt-6">
            <Navigation 
              currentPage="form"
              nextText={language === 'english' ? translations.next.english : translations.next.hindi}
              backText={language === 'english' ? translations.back.english : translations.back.hindi}
              onNext={() => window.location.href = '/shubham/form/birthplace'}
              onBack={() => window.location.href = '/shubham'}
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
          <h2 className="text-xl font-bold text-gray-800 leading-tight">
            {language === 'english' ? translations.title.english : translations.title.hindi}{' '}
            <span className="text-orange-500 underline">{language === 'english' ? 'Free Kundli Analysis' : 'मुफ्त कुंडली विश्लेषण'}</span>
          </h2>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Name and Gender Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder={language === 'english' ? translations.name.english : translations.name.hindi}
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-gray-700"
              />
            </div>
            <div>
              <select
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-gray-700 bg-white"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">{language === 'english' ? translations.dateOfBirth.english : translations.dateOfBirth.hindi}</label>
            <div className="grid grid-cols-3 gap-4">
              <select
                value={formData.month}
                onChange={(e) => handleInputChange('month', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-gray-700 bg-white"
              >
                {months.map((month, index) => (
                  <option key={index} value={month}>{month}</option>
                ))}
              </select>
              <select
                value={formData.day}
                onChange={(e) => handleInputChange('day', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-gray-700 bg-white"
              >
                {days.map((day, index) => (
                  <option key={index} value={day}>{day}</option>
                ))}
              </select>
              <select
                value={formData.year}
                onChange={(e) => handleInputChange('year', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-gray-700 bg-white"
              >
                {years.map((year, index) => (
                  <option key={index} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Time of Birth */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">{language === 'english' ? translations.timeOfBirth.english : translations.timeOfBirth.hindi}</label>
            <div className="grid grid-cols-2 gap-4">
              <select
                value={formData.hour}
                onChange={(e) => handleInputChange('hour', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-gray-700 bg-white"
              >
                {hours.map((hour, index) => (
                  <option key={index} value={hour}>{hour}</option>
                ))}
              </select>
              <select
                value={formData.minute}
                onChange={(e) => handleInputChange('minute', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-gray-700 bg-white"
              >
                {minutes.map((minute, index) => (
                  <option key={index} value={minute}>{minute}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Navigation */}
          <div className="pt-6 pb-6">
            <Navigation 
              currentPage="form"
              nextText={language === 'english' ? translations.next.english : translations.next.hindi}
              backText={language === 'english' ? translations.back.english : translations.back.hindi}
              onNext={() => window.location.href = '/shubham/form/birthplace'}
              onBack={() => window.location.href = '/shubham'}
            />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Form;