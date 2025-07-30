import React from "react";

export default function DownloadAppSection() {
  return (
    <section className="bg-blue-50 py-16 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="w-full flex flex-col items-center text-center mb-16">
          {/* Small Button */}
          <div className="mb-6">
            <div className="inline-flex items-center bg-blue-50 border border-blue-300 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium">
              📱Download Our Mobile App
            </div>
          </div>
          
          {/* Main Heading */}
          <h2 className="font-heading font-bold text-gray-800 mb-6 text-4xl lg:text-5xl">
            Get TransLinka on Your Phone
          </h2>
          
          {/* Description */}
          <p className="text-gray-600 mb-8 max-w-2xl text-lg">
            Download our mobile app for the complete TransLinka experience. Available for iOS and Android devices.
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* iOS Column */}
          <div className="flex flex-col">
            <h3 className="font-heading font-bold text-gray-800 mb-4 text-2xl">
              Download for iOS
            </h3>
            <p className="text-gray-600 mb-6 text-base leading-relaxed">
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
            <h3 className="font-heading font-bold text-gray-800 mb-4 text-2xl">
              Download for Android
            </h3>
            <p className="text-gray-600 mb-6 text-base leading-relaxed">
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
            <h3 className="font-heading font-bold text-2xl text-gray-800 mb-4 text-center">
              Scan to Download
            </h3>
            <p className="text-gray-600 mb-12 text-center text-base max-w-3xl mx-auto">
              Point your phone camera at the QR code to quickly download the app
            </p>
            
            <div className="flex flex-col md:flex-row justify-center gap-20 w-full max-w-lg mx-auto">
              {/* iOS QR Code */}
              <div className="flex-1 flex flex-col items-center">
                <div className="w-36 h-36 border-2 border-gray-300 rounded-lg p-3 mb-4 bg-white">
                  <svg className="w-full h-full" viewBox="0 0 100 100" fill="currentColor">
                    <rect x="10" y="10" width="80" height="80" fill="white" stroke="black" strokeWidth="1"/>
                    {/* Corner squares */}
                    <rect x="15" y="15" width="20" height="20" fill="black"/>
                    <rect x="65" y="15" width="20" height="20" fill="black"/>
                    <rect x="15" y="65" width="20" height="20" fill="black"/>
                    {/* Inner corner squares */}
                    <rect x="20" y="20" width="10" height="10" fill="white"/>
                    <rect x="70" y="20" width="10" height="10" fill="white"/>
                    <rect x="20" y="70" width="10" height="10" fill="white"/>
                    {/* Center square */}
                    <rect x="35" y="35" width="30" height="30" fill="black"/>
                    <rect x="40" y="40" width="20" height="20" fill="white"/>
                    <rect x="45" y="45" width="10" height="10" fill="black"/>
                    {/* Random QR code pattern */}
                    <rect x="15" y="40" width="5" height="5" fill="black"/>
                    <rect x="25" y="40" width="5" height="5" fill="black"/>
                    <rect x="35" y="40" width="5" height="5" fill="black"/>
                    <rect x="50" y="40" width="5" height="5" fill="black"/>
                    <rect x="60" y="40" width="5" height="5" fill="black"/>
                    <rect x="70" y="40" width="5" height="5" fill="black"/>
                    <rect x="80" y="40" width="5" height="5" fill="black"/>
                    <rect x="15" y="50" width="5" height="5" fill="black"/>
                    <rect x="25" y="50" width="5" height="5" fill="black"/>
                    <rect x="35" y="50" width="5" height="5" fill="black"/>
                    <rect x="50" y="50" width="5" height="5" fill="black"/>
                    <rect x="60" y="50" width="5" height="5" fill="black"/>
                    <rect x="70" y="50" width="5" height="5" fill="black"/>
                    <rect x="80" y="50" width="5" height="5" fill="black"/>
                    <rect x="15" y="60" width="5" height="5" fill="black"/>
                    <rect x="25" y="60" width="5" height="5" fill="black"/>
                    <rect x="35" y="60" width="5" height="5" fill="black"/>
                    <rect x="50" y="60" width="5" height="5" fill="black"/>
                    <rect x="60" y="60" width="5" height="5" fill="black"/>
                    <rect x="70" y="60" width="5" height="5" fill="black"/>
                    <rect x="80" y="60" width="5" height="5" fill="black"/>
                    <rect x="15" y="70" width="5" height="5" fill="black"/>
                    <rect x="25" y="70" width="5" height="5" fill="black"/>
                    <rect x="35" y="70" width="5" height="5" fill="black"/>
                    <rect x="50" y="70" width="5" height="5" fill="black"/>
                    <rect x="60" y="70" width="5" height="5" fill="black"/>
                    <rect x="70" y="70" width="5" height="5" fill="black"/>
                    <rect x="80" y="70" width="5" height="5" fill="black"/>
                    <rect x="15" y="80" width="5" height="5" fill="black"/>
                    <rect x="25" y="80" width="5" height="5" fill="black"/>
                    <rect x="35" y="80" width="5" height="5" fill="black"/>
                    <rect x="50" y="80" width="5" height="5" fill="black"/>
                    <rect x="60" y="80" width="5" height="5" fill="black"/>
                    <rect x="70" y="80" width="5" height="5" fill="black"/>
                    <rect x="80" y="80" width="5" height="5" fill="black"/>
                  </svg>
                </div>
                <div className="font-bold text-gray-800 text-base">iOS App</div>
                <div className="text-gray-500 text-sm">iPhone & iPad</div>
              </div>
              
              {/* Android QR Code */}
              <div className="flex-1 flex flex-col items-center">
                <div className="w-36 h-36 border-2 border-gray-300 rounded-lg p-3 mb-4 bg-white">
                  <svg className="w-full h-full" viewBox="0 0 100 100" fill="currentColor">
                    <rect x="10" y="10" width="80" height="80" fill="white" stroke="black" strokeWidth="1"/>
                    {/* Corner squares */}
                    <rect x="15" y="15" width="20" height="20" fill="black"/>
                    <rect x="65" y="15" width="20" height="20" fill="black"/>
                    <rect x="15" y="65" width="20" height="20" fill="black"/>
                    {/* Inner corner squares */}
                    <rect x="20" y="20" width="10" height="10" fill="white"/>
                    <rect x="70" y="20" width="10" height="10" fill="white"/>
                    <rect x="20" y="70" width="10" height="10" fill="white"/>
                    {/* Center square */}
                    <rect x="35" y="35" width="30" height="30" fill="black"/>
                    <rect x="40" y="40" width="20" height="20" fill="white"/>
                    <rect x="45" y="45" width="10" height="10" fill="black"/>
                    {/* Different QR code pattern */}
                    <rect x="15" y="40" width="5" height="5" fill="black"/>
                    <rect x="25" y="40" width="5" height="5" fill="black"/>
                    <rect x="35" y="40" width="5" height="5" fill="black"/>
                    <rect x="50" y="40" width="5" height="5" fill="black"/>
                    <rect x="60" y="40" width="5" height="5" fill="black"/>
                    <rect x="70" y="40" width="5" height="5" fill="black"/>
                    <rect x="80" y="40" width="5" height="5" fill="black"/>
                    <rect x="15" y="50" width="5" height="5" fill="black"/>
                    <rect x="25" y="50" width="5" height="5" fill="black"/>
                    <rect x="35" y="50" width="5" height="5" fill="black"/>
                    <rect x="50" y="50" width="5" height="5" fill="black"/>
                    <rect x="60" y="50" width="5" height="5" fill="black"/>
                    <rect x="70" y="50" width="5" height="5" fill="black"/>
                    <rect x="80" y="50" width="5" height="5" fill="black"/>
                    <rect x="15" y="60" width="5" height="5" fill="black"/>
                    <rect x="25" y="60" width="5" height="5" fill="black"/>
                    <rect x="35" y="60" width="5" height="5" fill="black"/>
                    <rect x="50" y="60" width="5" height="5" fill="black"/>
                    <rect x="60" y="60" width="5" height="5" fill="black"/>
                    <rect x="70" y="60" width="5" height="5" fill="black"/>
                    <rect x="80" y="60" width="5" height="5" fill="black"/>
                    <rect x="15" y="70" width="5" height="5" fill="black"/>
                    <rect x="25" y="70" width="5" height="5" fill="black"/>
                    <rect x="35" y="70" width="5" height="5" fill="black"/>
                    <rect x="50" y="70" width="5" height="5" fill="black"/>
                    <rect x="60" y="70" width="5" height="5" fill="black"/>
                    <rect x="70" y="70" width="5" height="5" fill="black"/>
                    <rect x="80" y="70" width="5" height="5" fill="black"/>
                    <rect x="15" y="80" width="5" height="5" fill="black"/>
                    <rect x="25" y="80" width="5" height="5" fill="black"/>
                    <rect x="35" y="80" width="5" height="5" fill="black"/>
                    <rect x="50" y="80" width="5" height="5" fill="black"/>
                    <rect x="60" y="80" width="5" height="5" fill="black"/>
                    <rect x="70" y="80" width="5" height="5" fill="black"/>
                    <rect x="80" y="80" width="5" height="5" fill="black"/>
                  </svg>
                </div>
                <div className="font-bold text-gray-800 text-base">Android App</div>
                <div className="text-gray-500 text-sm">Google Play</div>
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
