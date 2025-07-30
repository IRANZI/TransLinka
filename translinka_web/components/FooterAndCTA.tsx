import { Heart } from "lucide-react";
import Link from 'next/link';

export default function FooterAndCTA() {
  return (
    <div className="font-sans">
      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-12 md:py-20 px-4 sm:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
            Ready to Transform Your Commute?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-8 md:mb-10 leading-relaxed max-w-3xl mx-auto">
            Join millions of smart travelers who choose TransLinka for their daily journey. Start your
            free account today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
            <Link 
              href="/signup"
              className="bg-white text-blue-600 font-semibold shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-200 px-6 py-3 md:px-8 md:py-4 rounded-lg text-base md:text-lg w-full sm:w-auto"
            >
              Start Your Journey →
            </Link>
            <Link 
              href="/signin"
              className="border-2 border-white text-white font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200 px-6 py-3 md:px-8 md:py-4 rounded-lg text-base md:text-lg w-full sm:w-auto"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-slate-900 text-white pt-12 md:pt-16 pb-6 md:pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-sm md:text-base">
         
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center mb-4 md:mb-6 space-x-3">
              <img
                src="/logo.png"
                alt="TransLinka Logo"
                className="h-6 w-6 md:h-8 md:w-8 object-contain"
              />
              <span className="text-xl md:text-2xl font-bold select-none">TransLinka</span>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-xs">
              Revolutionizing public transportation with smart technology and user-centric design.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <p className="font-semibold mb-4 text-base">Product</p>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Downloads</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <p className="font-semibold mb-4 text-base">Company</p>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <p className="font-semibold mb-4 text-base">Support</p>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <hr className="border-slate-600 my-8" />

        <div className="text-center text-gray-400 text-sm">
          © 2025 <span className="font-semibold text-white">TransLinka</span>. All rights reserved.
          Built with <Heart className="inline w-4 h-4 text-red-500 mx-1" /> for better transportation.
        </div>
      </footer>


    </div>
  );
}
