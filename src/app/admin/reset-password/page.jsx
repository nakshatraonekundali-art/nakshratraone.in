'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams ? searchParams.get('token') : null;

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [tokenValid, setTokenValid] = useState(true);

  useEffect(() => {
    // Validate token exists
    if (!token) {
      setTokenValid(false);
      setError('Invalid or missing reset token. Please request a new password reset link.');
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Validation
    if (!formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch('/api/admin/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          password: formData.password
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess(data.message || 'Password has been reset successfully');
        setFormData({ password: '', confirmPassword: '' });
        // Redirect to login page after 3 seconds
        setTimeout(() => {
          router.push('/admin/login');
        }, 3000);
      } else {
        setError(data.message || 'Failed to reset password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left side - Brand section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-r from-blue-900 to-indigo-900 p-12 flex-col justify-between">
        <div>
          <Image 
            src="/next.svg" 
            alt="Nakshatra One" 
            width={180} 
            height={40} 
            className="mb-12"
          />
          <h1 className="text-4xl font-bold text-white mb-6">Reset Your Password</h1>
          <p className="text-blue-100 text-xl mb-8">Enter your new password to regain access to your admin account.</p>
        </div>
        
        <div className="space-y-6">
          <div className="bg-blue-800 bg-opacity-40 p-4 rounded-lg">
            <h3 className="text-white font-medium mb-2">Secure Access</h3>
            <p className="text-blue-100">Your security is our priority. Create a strong password to protect your account.</p>
          </div>
          
          <div className="bg-blue-800 bg-opacity-40 p-4 rounded-lg">
            <h3 className="text-white font-medium mb-2">Need Help?</h3>
            <p className="text-blue-100">Contact our support team if you're having trouble resetting your password.</p>
          </div>
        </div>
        
        <div className="text-blue-200 text-sm">
          &copy; {new Date().getFullYear()} Nakshatra One. All rights reserved.
        </div>
      </div>
      
      {/* Right side - Form section */}
      <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
          <div className="text-center mb-8 lg:hidden">
            <Image 
              src="/next.svg" 
              alt="Nakshatra One" 
              width={160} 
              height={36} 
              className="mx-auto mb-6"
            />
          </div>
          
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Reset Password</h2>
            <p className="text-gray-600">Enter your new password below</p>
          </div>
          
          {!tokenValid ? (
            <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
              <p>{error}</p>
              <div className="mt-4">
                <Link href="/admin/forgot-password" className="text-blue-600 hover:text-blue-800 font-medium">
                  Request a new password reset
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-md">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="bg-green-50 text-green-700 p-4 rounded-md">
                  {success}
                </div>
              )}
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter new password"
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Confirm new password"
                />
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Resetting...' : 'Reset Password'}
                </button>
              </div>
              
              <div className="text-center mt-4">
                <Link href="/admin/login" className="text-sm text-blue-600 hover:text-blue-800">
                  Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>
        
        <div className="mt-8 text-center text-gray-500 text-sm lg:hidden">
          &copy; {new Date().getFullYear()} Nakshatra One. All rights reserved.
        </div>
      </div>
    </div>
  );
}