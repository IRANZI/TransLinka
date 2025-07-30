import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-white py-8 pt-28 md:py-12 md:pt-36 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* LEFT SIDE */}
        <div className="w-full lg:max-w-xl text-center lg:text-left">
          {/* Tag */}
          <div className="mb-4 md:mb-6 flex items-center justify-center lg:justify-start">
            <div className="inline-flex items-center bg-blue-50 text-blue-600 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">
              🚀 Revolutionary Transit Platform
            </div>
          </div>
          
          {/* Heading */}
          <h1 className="font-heading font-bold text-gray-800 mb-4 md:mb-6 leading-tight">
            <span className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl block">Smart Bus Travel</span>
            <span className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-blue-500 block mt-1">Made Simple</span>
          </h1>
          
          {/* Description */}
          <p className="text-gray-600 mb-6 md:mb-8 text-base md:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
            Experience the future of public transportation with real-time tracking, AR navigation, and seamless booking. Travel smarter, not harder.
          </p>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 md:gap-4 mb-6 md:mb-8">
            <Link href="/signup" className="bg-blue-500 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-medium text-base md:text-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto">
              Start Your Journey
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            <button className="bg-white border border-gray-300 px-6 py-3 md:px-8 md:py-4 rounded-lg font-medium text-base md:text-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto">
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Watch Demo
            </button>
          </div>
        </div>

        {/* RIGHT SIDE - Mobile App Preview */}
        <div className="w-full max-w-md">
          <div className="bg-white shadow-xl rounded-2xl p-6 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
            {/* Header */}
            <div className="bg-blue-500 rounded-t-xl -m-6 mb-6 p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-white font-bold text-lg">Route 42</h3>
                  <p className="text-blue-100 text-sm">Express to Downtown</p>
                </div>
                <div className="bg-blue-400 text-white px-3 py-1 rounded-full text-sm font-medium">
                  3 min
                </div>
              </div>
            </div>
            
            {/* Route Details */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-gray-800 font-medium">Central Station</span>
                <span className="ml-auto bg-gray-100 border border-gray-300 text-gray-700 px-2 py-1 rounded text-xs font-medium">Current</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
                <span className="text-gray-800 font-medium">Main Street</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-gray-800 font-medium">Your Stop</span>
              </div>
            </div>
            
            {/* AR Navigation Button */}
            <button className="w-full bg-blue-500 text-white py-4 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586l-.707-.707A1 1 0 0013 4H7a1 1 0 00-.707.293L5.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              Start AR Navigation
            </button>
          </div>
        </div>
      </div>


    </section>
  );
}
