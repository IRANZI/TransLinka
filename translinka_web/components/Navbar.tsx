'use client';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [activeLink, setActiveLink] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll spy functionality
  useEffect(() => {
    const sections = [
      { id: 'hero', name: 'home' },
      { id: 'download', name: 'download' },
      { id: 'features', name: 'features' },
      { id: 'how-it-works', name: 'how-it-works' },
      { id: 'contact', name: 'contact' }
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionName = sections.find(section => section.id === entry.target.id)?.name;
            if (sectionName) {
              setActiveLink(sectionName);
            }
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: '-80px 0px -80px 0px' // Account for navbar height
      }
    );

    // Observe all sections
    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const handleLinkClick = (linkName: string) => {
    setActiveLink(linkName);
    setIsMobileMenuOpen(false); // Close mobile menu when link is clicked
  };

  const getLinkClasses = (linkName: string) => {
    const baseClasses = "font-medium transition-colors duration-300 text-base font-sans";
    if (activeLink === linkName) {
      return `${baseClasses} text-gray-800 border-b-2 border-blue-500 pb-1`;
    }
    return `${baseClasses} text-gray-700 hover:text-blue-600`;
  };

  const getMobileLinkClasses = (linkName: string) => {
    const baseClasses = "block font-medium transition-colors duration-300 py-3 px-4 text-base font-sans";
    if (activeLink === linkName) {
      return `${baseClasses} text-blue-600 bg-blue-50`;
    }
    return `${baseClasses} text-gray-800 hover:text-blue-600 hover:bg-gray-50`;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-5 px-4 md:px-8 bg-white shadow-sm">
      <div className="flex items-center space-x-2">
        {/* Logo */}
        <img
          src="/logo.png"
          alt="TransLinka Logo"
          className="h-8 w-8 object-contain"
        />
        <span className="text-2xl font-bold text-gray-900 font-heading">TransLinka</span>
      </div>
      
      {/* Desktop Navigation */}
      <div className="space-x-8 hidden md:flex text-lg font-sans">
        <a
          href="#hero"
          onClick={() => handleLinkClick('home')}
          className={getLinkClasses('home')}
        >
          Home
        </a>
        <a
          href="#download"
          onClick={() => handleLinkClick('download')}
          className={getLinkClasses('download')}
        >
          Download
        </a>
        <a
          href="#features"
          onClick={() => handleLinkClick('features')}
          className={getLinkClasses('features')}
        >
          Features
        </a>
        <a
          href="#how-it-works"
          onClick={() => handleLinkClick('how-it-works')}
          className={getLinkClasses('how-it-works')}
        >
          How it Works
        </a>
        <a
          href="#contact"
          onClick={() => handleLinkClick('contact')}
          className={getLinkClasses('contact')}
        >
          Contact
        </a>
      </div>
      
      {/* Desktop Buttons */}
      <div className="space-x-3 hidden md:flex items-center font-sans">
        <Link 
          href="/signin"
          className="font-medium bg-white border border-gray-300 px-4 py-2 rounded-md text-base font-sans text-gray-800 hover:bg-gray-50 transition-colors"
        >
          Sign In
        </Link>
        <Link 
          href="/signup"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium text-base font-sans"
        >
          Get started
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 rounded-md text-gray-800 hover:bg-gray-100 transition-colors"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-40">
          <div className="py-2">
            <a
              href="#hero"
              onClick={() => handleLinkClick('home')}
              className={getMobileLinkClasses('home')}
            >
              Home
            </a>
            <a
              href="#download"
              onClick={() => handleLinkClick('download')}
              className={getMobileLinkClasses('download')}
            >
              Download
            </a>
            <a
              href="#features"
              onClick={() => handleLinkClick('features')}
              className={getMobileLinkClasses('features')}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={() => handleLinkClick('how-it-works')}
              className={getMobileLinkClasses('how-it-works')}
            >
              How it Works
            </a>
            <a
              href="#contact"
              onClick={() => handleLinkClick('contact')}
              className={getMobileLinkClasses('contact')}
            >
              Contact
            </a>
            <div className="border-t border-gray-200 mt-2 pt-2 px-4 space-y-2">
              <Link 
                href="/signin"
                className="w-full font-medium bg-white border border-gray-300 py-2 rounded-md text-sm text-gray-800 hover:bg-gray-50 transition-colors block text-center"
              >
                Sign In
              </Link>
              <Link 
                href="/signup"
                className="w-full bg-blue-500 text-white py-2 rounded-md font-medium hover:bg-blue-600 transition-colors text-sm block text-center"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      )}


    </nav>
  );
}
