'use client';
import React from 'react';
import Link from 'next/link';
import { Camera, MapPin, Navigation, Clock, Zap, Bell, Target } from 'lucide-react';

export default function ARNavigationPage() {
  const [showCamera, setShowCamera] = React.useState(false);
  const [cameraError, setCameraError] = React.useState<string | null>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const handleStartCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setShowCamera(true);
      }
    } catch (err: any) {
      setCameraError('Unable to access camera. Please check permissions or try a different device.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src="/logo.png"
                alt="TransLinka Logo"
                className="h-8 w-8 object-contain mr-3"
              />
              <span className="text-xl font-heading font-bold text-gray-900">TransLinka</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 font-medium">
                Dashboard
              </Link>
              <Link href="/book-ticket" className="text-gray-600 hover:text-gray-900 font-medium">
                Book Ticket
              </Link>
              <Link href="/my-tickets" className="text-gray-600 hover:text-gray-900 font-medium">
                My Tickets
              </Link>
              <Link href="/ar-navigation" className="text-blue-600 font-medium">
                AR Navigation
              </Link>
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">J</span>
                </div>
            
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-full mx-auto px-6 sm:px-8 lg:px-12 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-heading font-bold text-gray-900 mb-2">AR Navigation</h1>
          <p className="text-gray-600 font-sans">Route 42 • City Express</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Route Information */}
          <div className="space-y-6">
            {/* Route Card */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-heading font-semibold text-gray-900 mb-1">Route 42</h2>
                  <p className="text-gray-600 font-sans">City Express to Remera</p>
                </div>
                <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 font-sans">
                  3min
                </span>
              </div>

              {/* Route Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-xs text-gray-500 font-sans mb-1">Distance</div>
                  <div className="text-sm font-medium text-gray-900 font-sans">107m</div>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Clock className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-xs text-gray-500 font-sans mb-1">ETA</div>
                  <div className="text-sm font-medium text-gray-900 font-sans">2m</div>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Zap className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="text-xs text-gray-500 font-sans mb-1">Speed</div>
                  <div className="text-sm font-medium text-gray-900 font-sans">35 mph</div>
                </div>
              </div>

              <div className="text-center text-xs text-gray-400 font-sans mb-4">
                33.4622034647778°S
              </div>

              {/* Current Location */}
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 font-sans">Current Location</h3>
                  <p className="text-xs text-gray-500 font-sans">Bus is approaching Main Street stop</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 font-sans">Head East</p>
                </div>
              </div>
            </div>

            {/* Pro Tips */}
            <div className="bg-blue-50 rounded-xl p-6">
              <div className="flex items-center mb-3">
                <div className="w-6 h-6 bg-yellow-400 rounded flex items-center justify-center mr-2">
                  <span className="text-xs font-bold text-yellow-800">💡</span>
                </div>
                <h3 className="text-base font-heading font-semibold text-blue-900">Pro Tips</h3>
              </div>
              <div className="space-y-2 text-sm text-blue-800 font-sans">
                <p>• Point your camera towards the street</p>
                <p>• Look for the blue AR markers</p>
                <p>• Follow the directional arrows</p>
              </div>
            </div>
          </div>

          {/* Right Side - AR Interface */}
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
  {showCamera ? (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      className="rounded-xl w-20 h-20 object-cover border-2 border-blue-400"
    />
  ) : (
    <Camera className="w-10 h-10 text-white" />
  )}
</div>
              <h2 className="text-xl font-heading font-semibold text-gray-900 mb-2">AR Navigation</h2>
              <p className="text-gray-600 font-sans">
                Use augmented reality to find your bus in real-time with live directions and distance tracking.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Target className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 font-sans">Real-time bus tracking</h4>
                  <p className="text-xs text-gray-500 font-sans">See exactly where your bus is</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Navigation className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 font-sans">AR direction arrows</h4>
                  <p className="text-xs text-gray-500 font-sans">Follow visual guides to your bus</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 font-sans">Live arrival times</h4>
                  <p className="text-xs text-gray-500 font-sans">Get accurate ETA updates</p>
                </div>
              </div>
            </div>

            {/* Start Button */}
            <button
  className="w-full bg-blue-500 text-white py-4 px-6 rounded-xl hover:bg-blue-600 transition-colors font-medium text-lg font-sans flex items-center justify-center space-x-3"
  onClick={handleStartCamera}
  disabled={showCamera}
>
  <Camera className="w-5 h-5" />
  <span>{showCamera ? 'Camera Active' : 'Start AR Navigation'}</span>
</button>
{cameraError && (
  <div className="mt-4 text-red-600 text-center text-sm">{cameraError}</div>
)}
          </div>
        </div>
      </main>
    </div>
  );
}
