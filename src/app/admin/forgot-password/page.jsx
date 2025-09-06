'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('/api/admin/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setMessage(data.message || 'Password reset link has been sent to your email');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Custom styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        body { 
          font-family: 'Inter', sans-serif; 
        }
        
        .gradient-bg {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
        }
        
        .glass-effect {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.1);
        }
        
        .input-focus:focus {
          transform: translateY(-1px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        .btn-hover:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }
        
        .floating-animation {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .dot-pattern {
          background-image: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }

        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
      `}</style>

      <div className="min-h-screen flex bg-gray-50">
        {/* Left Side - Brand Section */}
        <div className="hidden lg:flex lg:w-1/2 gradient-bg relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 dot-pattern opacity-30"></div>
          
          {/* Floating Elements */}
          <div className="absolute top-20 left-20 w-32 h-32 glass-effect rounded-2xl floating-animation opacity-20"></div>
          <div className="absolute bottom-32 right-16 w-24 h-24 glass-effect rounded-full floating-animation opacity-20" style={{animationDelay: '-2s'}}></div>
          <div className="absolute top-1/2 right-32 w-16 h-16 glass-effect rounded-lg floating-animation opacity-20" style={{animationDelay: '-4s'}}></div>
          
          <div className="relative z-10 flex flex-col justify-center items-center text-center px-12 w-full">
            {/* Logo */}
            <div className="mb-8 floating-animation">
              <img 
                src="https://www.nakshatraone.com/cdn/shop/files/nakshatraone_logo_White.png?v=1746015984&width=360"
                alt="Nakshatra One"
                className="h-16 w-auto mx-auto filter drop-shadow-2xl"
              />
            </div>
            
            {/* Welcome Text */}
            <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
              Password Recovery
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed max-w-md mb-12">
              Don't worry, we'll help you recover access to your administrative account.
            </p>
            
            {/* Feature Cards */}
            <div className="grid grid-cols-1 gap-4 max-w-sm w-full">
              <div className="glass-effect rounded-lg p-4 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Secure Process</h3>
                    <p className="text-slate-400 text-sm">Email verification required</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-effect rounded-lg p-4 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Quick Recovery</h3>
                    <p className="text-slate-400 text-sm">Reset link expires in 1 hour</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-white">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden mb-8 text-center">
              <img 
                src="https://www.nakshatraone.com/cdn/shop/files/nakshatraone_logo_White.png?v=1746015984&width=360"
                alt="Nakshatra One"
                className="h-12 w-auto mx-auto brightness-0"
              />
            </div>

            {/* Form Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Forgot Password
              </h2>
              <p className="text-gray-600">
                Enter your email address to receive a password reset link
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full px-4 py-3 pl-12 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition duration-200 bg-gray-50 focus:bg-white input-focus"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Success Message */}
              {message && (
                <div className="bg-green-50 border-l-4 border-green-400 rounded-lg p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-green-800 font-medium">
                        {message}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 rounded-lg p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-800 font-medium">
                        {error}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-slate-800 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 btn-hover transform"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending Reset Link...
                  </>
                ) : (
                  <>Send Reset Link</>
                )}
              </button>

              {/* Back to Login */}
              <div className="text-center">
                <Link href="/admin/login" className="text-sm text-slate-600 hover:text-slate-800 font-medium transition duration-200">
                  Back to Login
                </Link>
              </div>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-xs text-gray-500">Protected by enterprise-grade security</span>
              </div>
              <p className="text-xs text-gray-400">
                © 2024 Nakshatra One. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}