'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Bell,
  User,
  CreditCard,
  Settings,
  Globe,
  Moon,
  HelpCircle,
  Shield,
  LogOut,
} from 'lucide-react';

export default function ProfilePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');

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
              <span className="text-xl font-heading font-bold text-gray-900">
                TransLinka
              </span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Dashboard
              </Link>
              <Link
                href="/book-ticket"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Book Ticket
              </Link>
              <Link
                href="/my-tickets"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                My Tickets
              </Link>
              <Link
                href="/ar-navigation"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                AR Navigation
              </Link>
             
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              {/* Profile */}
              <Link href="/profile">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:opacity-90 transition">
                  <span className="text-white text-base font-medium">J</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-full mx-auto px-6 sm:px-8 lg:px-12 py-8">
        <div className="w-full bg-white rounded-xl shadow-sm border p-6 space-y-6">
          {/* Profile Info */}
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center font-medium text-lg">
              JD
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">John Doe</h2>
              <p className="text-sm text-gray-600">john.doe@email.com</p>
             
            </div>
          </div>

          {/* Account Section */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Account</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100">
                <User className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-gray-700">
                  Personal Information
                </span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100">
                <CreditCard className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-700">Payment Methods</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100">
                <Settings className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-700">Notifications</span>
              </button>
            </div>
          </div>

          {/* Preferences Section */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Preferences</h3>
            <div className="space-y-3">
              {/* Language Selector */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-700">Language</span>
                </div>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="text-sm text-gray-700 bg-transparent border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option>English</option>
                  <option>Kinyarwanda</option>
                  <option>French</option>
                  <option>Kiswahili</option>
                </select>
              </div>

              {/* Dark Mode Toggle */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center space-x-3">
                  <Moon className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700">Dark Mode</span>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
                    darkMode
                      ? 'bg-blue-600 justify-end'
                      : 'bg-gray-300 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 bg-white rounded-full shadow-md" />
                </button>
              </div>
            </div>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Support</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100">
                <HelpCircle className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-gray-700">Help & Support</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100">
                <Shield className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-700">Privacy & Security</span>
              </button>
            </div>
          </div>

          {/* Sign Out */}
          <div>
            <button className="w-full flex items-center space-x-3 p-3 rounded-lg text-red-600 hover:bg-red-50">
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
