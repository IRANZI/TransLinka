'use client';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [activeLink, setActiveLink] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const sections = [
      { id: 'hero', name: 'home' },
      { id: 'download', name: 'download' },
      { id: 'features', name: 'features' },
      { id: 'how-it-works', name: 'how-it-works' },
      { id: 'contact', name: 'contact' },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionName = sections.find(section => section.id === entry.target.id)?.name;
            if (sectionName) setActiveLink(sectionName);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-80px 0px -80px 0px',
      }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  const handleLinkClick = (linkName: string) => {
    setActiveLink(linkName);
    setIsMobileMenuOpen(false);
  };

  const getLinkClasses = (linkName: string) => {
    const base = 'font-medium transition-colors duration-300 text-base';
    return activeLink === linkName
      ? `${base} text-gray-800 border-b-2 border-blue-500 pb-1`
      : `${base} text-gray-700 hover:text-blue-600`;
  };

  const getMobileLinkClasses = (linkName: string) => {
    const base = 'block font-medium transition-colors duration-300 py-3 px-4 text-base';
    return activeLink === linkName
      ? `${base} text-blue-600 bg-blue-50`
      : `${base} text-gray-800 hover:text-blue-600 hover:bg-gray-50`;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="flex justify-between items-center py-5 px-4 md:px-8">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="TransLinka Logo" className="h-8 w-8 object-contain" />
          <span className="text-2xl font-bold text-gray-900">TransLinka</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-lg">
          {['home', 'download', 'features', 'how-it-works', 'contact'].map((link) => (
            <a
              key={link}
              href={`#${link === 'home' ? 'hero' : link}`}
              onClick={() => handleLinkClick(link)}
              className={getLinkClasses(link)}
            >
              {link.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </a>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <Link
            href="/signin"
            className="font-medium bg-white border border-gray-300 px-4 py-2 rounded-md text-gray-800 hover:bg-gray-50 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
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
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-full bg-white z-40 transform ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-6 h-6 text-gray-800" />
          </button>
        </div>
        <div className="flex flex-col items-start px-6 space-y-2 mt-4">
          {['home', 'download', 'features', 'how-it-works', 'contact'].map((link) => (
            <a
              key={link}
              href={`#${link === 'home' ? 'hero' : link}`}
              onClick={() => handleLinkClick(link)}
              className={getMobileLinkClasses(link)}
            >
              {link.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </a>
          ))}
          <div className="mt-4 w-full space-y-2">
            <Link
              href="/signin"
              className="block w-full text-center py-2 border border-gray-300 rounded-md text-gray-800 hover:bg-gray-50 transition-colors font-medium"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="block w-full text-center py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
