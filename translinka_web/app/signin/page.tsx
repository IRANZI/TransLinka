'use client';
import React, { useState } from 'react';
import { Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    role: 'user'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'radio' ? value : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign in submitted:', formData);
    
    // Check if user is admin based on email or role
    const isAdmin = formData.email.toLowerCase().includes('admin') || 
                   formData.email.toLowerCase() === 'admin@translinka.com' ||
                   formData.role === 'admin';
    
    // Redirect based on user type
    if (isAdmin) {
      router.push('/admin');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex font-sans">
      {/* Left Side - Information */}
      <div className="hidden lg:flex lg:w-1/2 bg-white p-16 flex-col justify-start pt-20 relative">
        <div className="max-w-lg">
          <div className="flex items-center mb-8">
            <img
              src="/logo.png"
              alt="TransLinka Logo"
              className="h-8 w-8 object-contain mr-3"
            />
            <span className="text-xl font-bold text-gray-900 font-heading">TransLinka</span>
          </div>

          <h1 className="font-heading font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
            <span className="text-lg sm:text-xl lg:text-2xl xl:text-3xl block">Welcome Back to the</span>
            <span className="text-lg sm:text-xl lg:text-2xl xl:text-3xl block mt-1">Future of <span className="text-blue-600">Transit</span></span>
          </h1>
          
          <p className="text-gray-600 mb-6 md:mb-8 text-base md:text-lg leading-relaxed">
            Sign in to access real-time tracking, AR navigation, and<br />
            seamless booking. Your smart travel experience awaits
          </p>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 text-base md:text-lg font-heading">Real-time Updates</h4>
                <p className="text-gray-600">Get live bus locations and arrival times</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 text-base md:text-lg font-heading">Secure Platform</h4>
                <p className="text-gray-600">Your data is protected with enterprise security</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-3xl shadow-2xl p-14">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 font-heading">Sign In</h2>
            <p className="text-gray-500 mb-8 text-sm md:text-base">Enter your credentials to access your account</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Role Selection */}
              <div>
                
                <div className="grid grid-cols-2 gap-3">
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="user"
                      checked={formData.role === 'user'}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className={`relative p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                      formData.role === 'user'
                        ? 'border-blue-500 bg-blue-50 shadow-sm'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}>
                      <div className="flex flex-col items-center text-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                          formData.role === 'user' ? 'bg-blue-500' : 'bg-gray-400'
                        }`}>
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className={`text-sm md:text-base font-semibold ${
                          formData.role === 'user' ? 'text-blue-700' : 'text-gray-700'
                        }`}>User</span>
                        <span className="text-xs md:text-sm text-gray-500 mt-1">Regular access</span>
                      </div>
                      {formData.role === 'user' && (
                        <div className="absolute top-2 right-2">
                          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </label>
                  
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="admin"
                      checked={formData.role === 'admin'}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className={`relative p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                      formData.role === 'admin'
                        ? 'border-purple-500 bg-purple-50 shadow-sm'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}>
                      <div className="flex flex-col items-center text-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                          formData.role === 'admin' ? 'bg-purple-500' : 'bg-gray-400'
                        }`}>
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className={`text-sm md:text-base font-semibold ${
                          formData.role === 'admin' ? 'text-purple-700' : 'text-gray-700'
                        }`}>Admin</span>
                        <span className="text-xs md:text-sm text-gray-500 mt-1">Full access</span>
                      </div>
                      {formData.role === 'admin' && (
                        <div className="absolute top-2 right-2">
                          <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              </div>
              {/* Email Field */}
              <div>
                <label className="block text-sm md:text-base font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john.doe@email.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-gray-50 transition-all"
                    required
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm md:text-base font-medium text-gray-700 mb-4">
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1(555)123-4567"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-gray-50 transition-all"
                    required
                  />
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm md:text-base font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-gray-50 transition-all"
                    required
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <a href="#" className="text-blue-600 hover:underline text-sm md:text-base font-medium">
                  Forgot Password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full py-3 md:py-4 rounded-xl font-medium transition-all duration-200 mt-6 text-base md:text-lg flex items-center justify-center gap-2 ${
                  formData.role === 'admin'
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {formData.role === 'admin' ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                )}
                Sign In as {formData.role === 'admin' ? 'Admin' : 'User'}
              </button>

              {/* Social Login */}
              <div className="text-center mt-6">
                <p className="text-gray-500 text-sm md:text-base mb-4">Or continue with</p>
                <button
                  type="button"
                  className="flex items-center justify-center w-full border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition-colors bg-white"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-gray-700 font-medium text-sm md:text-base">Google</span>
                </button>
              </div>

              {/* Sign Up Link */}
              <div className="text-center mt-6">
                <p className="text-gray-500 text-sm md:text-base">
                  Already have an account?{' '}
                  <Link href="/signup" className="text-blue-600 hover:underline font-semibold">
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
