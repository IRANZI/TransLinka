import React, { useState, useEffect } from "react";
import QRCode from 'qrcode';

export default function DownloadAppSection() {
  const [iosQrCode, setIosQrCode] = useState<string>('');
  const [androidQrCode, setAndroidQrCode] = useState<string>('');

  useEffect(() => {
    // Generate QR codes for app store links
    const generateQRCodes = async () => {
      try {
        // iOS App Store link (example URL - replace with actual when available)
        const iosAppStoreUrl = 'https://apps.apple.com/app/translinka';
        const iosQrCodeDataUrl = await QRCode.toDataURL(iosAppStoreUrl, {
          width: 160,
          margin: 1,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        });
        setIosQrCode(iosQrCodeDataUrl);

        // Google Play Store link (example URL - replace with actual when available)
        const androidPlayStoreUrl = 'https://play.google.com/store/apps/details?id=com.translinka';
        const androidQrCodeDataUrl = await QRCode.toDataURL(androidPlayStoreUrl, {
          width: 160,
          margin: 1,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        });
        setAndroidQrCode(androidQrCodeDataUrl);
      } catch (error) {
        console.error('Error generating QR codes:', error);
      }
    };

    generateQRCodes();
  }, []);

  return (
    <section className="bg-blue-50 py-16 px-6 font-sans">
      <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top Section */}
        <div className="w-full flex flex-col items-center text-center mb-16">
          {/* Small Button */}
          <div className="mb-6">
            <div className="inline-flex items-center bg-blue-50 border border-blue-300 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium">
              📱Download Our Mobile App
            </div>
          </div>
          
          {/* Main Heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-gray-900 mb-6">
            Get TransLinka on Your Phone
          </h2>
          
          {/* Description */}
          <p className="text-gray-600 mb-8 max-w-2xl text-xl font-sans">
            Download our mobile app for the complete TransLinka experience. Available for iOS and Android devices.
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* iOS Column */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-heading font-bold text-gray-900 mb-4">
              Download for iOS
            </h3>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed font-sans">
              Get the full TransLinka experience on your iPhone or iPad with seamless iOS integration.
            </p>
            
            {/* App Store Button */}
            <div className="mb-8">
              <button className="flex items-center bg-black text-white px-6 py-4 rounded-lg hover:bg-gray-800 transition-colors">
                <svg className="w-8 h-8 mr-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.665 13.973c-.025-2.568 2.099-3.797 2.192-3.857-1.197-1.748-3.06-1.99-3.715-2.017-1.58-.16-3.085.927-3.887.927-.8 0-2.027-.904-3.34-.88-1.719.025-3.312 1.002-4.195 2.547-1.797 3.115-.459 7.719 1.29 10.246.857 1.23 1.872 2.607 3.21 2.557 1.297-.051 1.785-.828 3.354-.828 1.568 0 1.995.828 3.36.803 1.393-.025 2.266-1.23 3.117-2.463.613-.893.867-1.367 1.357-2.395-3.567-1.367-3.43-4.012-3.404-4.104zm-3.23-7.98c.713-.863 1.197-2.07 1.064-3.293-1.029.041-2.27.684-3.01 1.547-.662.76-1.24 1.973-1.021 3.133 1.137.088 2.254-.578 2.967-1.387z" />
                </svg>
                <div className="text-left">
                  <div className="text-gray-300 text-sm">Download on the</div>
                  <div className="font-bold text-white text-lg">App Store</div>
                </div>
              </button>
              </div>
            
            {/* Features List */}
            <ul className="space-y-3 text-gray-600 text-base">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Native iOS widgets
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Siri shortcuts
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Apple Watch support
              </li>
            </ul>
          </div>

          {/* Android Column */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-heading font-bold text-gray-900 mb-4">
              Download for Android
            </h3>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed font-sans">
              Experience TransLinka on Android with advanced AR features and Google integration.
            </p>
            
            {/* Google Play Button */}
            <div className="mb-8">
              <button className="flex items-center bg-black text-white px-6 py-4 rounded-lg hover:bg-gray-800 transition-colors">
                <svg className="w-8 h-8 mr-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M1.5 2.5v19l13-9.5zm14.5 7.5v4l5 3.5v-11zm-1 5.5v-4l-2.5 2z" />
                </svg>
                <div className="text-left">
                  <div className="text-gray-300 text-sm">Get it on</div>
                  <div className="font-bold text-white text-lg">Google Play</div>
                </div>
              </button>
              </div>
            
            {/* Features List */}
            <ul className="space-y-3 text-gray-600 text-base">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Advanced AR Navigation
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Google Assistant integration
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Material Design 3
              </li>
            </ul>
          </div>
        </div>

        {/* QR Code Download Section */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg px-8 py-12 w-full border border-blue-200">
            <h3 className="text-2xl font-heading font-bold text-gray-900 mb-4 text-center">
              Scan to Download
            </h3>
            <p className="text-gray-600 mb-12 text-center text-lg max-w-3xl mx-auto font-sans">
              Point your phone camera at the QR code to quickly download the app
            </p>
            
            <div className="flex flex-col md:flex-row justify-center gap-20 w-full max-w-lg mx-auto">
              {/* QR Code for iOS */}
              <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="mb-4">
                  {iosQrCode ? (
                    <div className="w-32 h-32 bg-white rounded-lg p-2 border border-gray-200">
                      <img 
                        src={iosQrCode} 
                        alt="iOS App Store QR Code" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500 text-xs">Loading...</span>
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <div className="font-bold text-gray-800 text-base">iOS App</div>
                  <div className="text-gray-500 text-sm">App Store</div>
                </div>
              </div>
              
              {/* Android QR Code */}
              <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="mb-4">
                  {androidQrCode ? (
                    <div className="w-32 h-32 bg-white rounded-lg p-2 border border-gray-200">
                      <img 
                        src={androidQrCode} 
                        alt="Android Google Play QR Code" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500 text-xs">Loading...</span>
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <div className="font-bold text-gray-800 text-base">Android App</div>
                  <div className="text-gray-500 text-sm">Google Play</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="flex flex-wrap justify-center gap-16">
          <div className="flex flex-col items-center">
            <span className="text-blue-500 font-bold text-3xl">50K</span>
            <span className="text-gray-600 text-sm">App Store Rating</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-green-500 font-bold text-3xl">200</span>
            <span className="text-gray-600 text-sm">Google Play Rating</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-green-500 font-bold text-3xl">1M+</span>
            <span className="text-gray-600 text-sm">Downloads</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-blue-500 font-bold text-3xl">50K+</span>
            <span className="text-gray-600 text-sm">Reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
}
