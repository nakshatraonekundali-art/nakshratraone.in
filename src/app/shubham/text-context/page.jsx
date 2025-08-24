'use client'
import React from 'react';
import { useKundli } from '../context/KundliContext';

const TestContext = () => {
  const { language, toggleLanguage, setLanguageDirectly } = useKundli();

  console.log('TestContext rendered with language:', language);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Context Test Page</h1>
        
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded border">
            <h2 className="font-semibold text-blue-800">Current State:</h2>
            <p className="text-blue-700">Language: <span className="font-mono bg-white px-2 py-1 rounded">{language}</span></p>
          </div>

          <div className="space-y-2">
            <button
              onClick={toggleLanguage}
              className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Toggle Language (Current: {language})
            </button>
            
            <button
              onClick={() => setLanguageDirectly('english')}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Set to English
            </button>
            
            <button
              onClick={() => setLanguageDirectly('hindi')}
              className="w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
            >
              Set to Hindi
            </button>
          </div>

          <div className="p-4 bg-gray-50 rounded border">
            <h3 className="font-semibold text-gray-800 mb-2">Debug Info:</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <div>Component rendered at: {new Date().toLocaleTimeString()}</div>
              <div>Language value: {language}</div>
              <div>Language type: {typeof language}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestContext; 