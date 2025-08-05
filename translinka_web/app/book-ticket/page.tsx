'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Calendar, Users, Search, Bell, User, Briefcase } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BookTicketPage() {
  const router = useRouter();
  const [passengers, setPassengers] = useState(1);
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '2024-12-15',
    luggage: 'Small Size',
  });

  const [luggageDropdownOpen, setLuggageDropdownOpen] = useState(false);
  const luggageOptions = [
    'No Luggage',
    'Small Size',
    'Medium Size',
    'Large Size',
  ];
  
  const popularRoutes = [
    { from: 'Masaka', to: 'Remera', duration: '4h 30m', price: '2,000 Rwf' },
    { from: 'Masaka', to: 'Remera', duration: '4h 30m', price: '2,000 Rwf' },
    { from: 'Masaka', to: 'Remera', duration: '4h 30m', price: '2,000 Rwf' },
    { from: 'Masaka', to: 'Remera', duration: '4h 30m', price: '2,000 Rwf' },
    { from: 'Masaka', to: 'Remera', duration: '4h 30m', price: '2,000 Rwf' },
  ];

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
              <Link href="/book-ticket" className="text-blue-600 font-medium">
                Book Ticket
              </Link>
              <Link href="/my-tickets" className="text-gray-600 hover:text-gray-900 font-medium">
                My Tickets
              </Link>
              <Link href="/ar-navigation" className="text-gray-600 hover:text-gray-900 font-medium">
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border p-6 lg:p-8">
            
              <div className="space-y-6">
               
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-3 font-sans">From</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 w-5 h-5 text-blue-500" />
                    <input
                      type="text"
                      placeholder="Select departure city"
                      value={formData.from}
                      onChange={(e) => setFormData({...formData, from: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base font-sans placeholder-gray-400"
                    />
                  </div>
                </div>

                
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-3 font-sans">To</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 w-5 h-5 text-green-500" />
                    <input
                      type="text"
                      placeholder="Select destination city"
                      value={formData.to}
                      onChange={(e) => setFormData({...formData, to: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base font-sans placeholder-gray-400"
                    />
                  </div>
                </div>

               
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-3 font-sans">Departure Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base font-sans"
                    />
                  </div>
                </div>

                
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-3 font-sans">Passengers</label>
                  <div className="relative">
                    <Users className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                    <div className="flex items-center justify-between w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                      <span className="text-base font-sans text-gray-700">{passengers} Passenger{passengers > 1 ? 's' : ''}</span>
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={() => setPassengers(Math.max(1, passengers - 1))}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-gray-600"
                        >
                          -
                        </button>
                        <button 
                          onClick={() => setPassengers(passengers + 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-gray-600"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

                {/* Luggage Dropdown */}
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-3 font-sans">Luggage</label>
                  <div className="relative">
                    <button
                      type="button"
                      className="w-full flex items-center pl-12 pr-4 py-4 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base font-sans placeholder-gray-400 text-gray-400 hover:border-blue-400 transition"
                      onClick={() => setLuggageDropdownOpen((open) => !open)}
                    >
                      <Briefcase className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                      <span className={`text-base font-sans ${formData.luggage === 'No Luggage' ? 'text-gray-400' : 'text-gray-700'}`}>{formData.luggage}</span>
                      <svg className="ml-auto w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    {luggageDropdownOpen && (
                      <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border z-20 overflow-hidden" style={{minWidth: '100%'}}>
                        {luggageOptions.map((option) => (
                          <button
                            key={option}
                            type="button"
                            className={`w-full text-left px-6 py-4 text-base font-sans flex items-center gap-3 hover:bg-blue-50 focus:bg-blue-50 ${formData.luggage === option ? 'bg-blue-100 text-blue-900' : 'text-gray-700'}`}
                            onClick={() => {
                              setFormData({ ...formData, luggage: option });
                              setLuggageDropdownOpen(false);
                            }}
                          >
                            {formData.luggage === option && (
                              <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            )}
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

             
              <button 
                onClick={() => {
                  const params = new URLSearchParams({
                    from: formData.from || 'Masaka',
                    to: formData.to || 'Remera',
                    date: formData.date,
                    passengers: passengers.toString(),
                    luggage: formData.luggage || 'No Luggage',
                  });
                  router.push(`/search-results?${params.toString()}`);
                }}
                className="w-full mt-8 bg-blue-500 text-white py-4 px-6 rounded-xl hover:bg-blue-600 transition-colors font-medium text-lg font-sans flex items-center justify-center gap-3"
              >
                <Search className="w-5 h-5" />
                Search Buses
              </button>
            </div>
          </div>

          {/* Right Side - Popular Routes */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-heading font-semibold text-gray-900 mb-6">Popular Routes</h3>
              
              <div className="space-y-4">
                {popularRoutes.map((route, index) => (
                  <div key={index} className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2 text-sm font-medium text-gray-900 font-sans">
                        <span>{route.from}</span>
                        <span className="text-gray-400">→</span>
                        <span>{route.to}</span>
                      </div>
                      <span className="text-sm font-medium text-blue-600 font-sans">{route.price}</span>
                    </div>
                    <div className="text-sm text-gray-500 font-sans">
                      <span>per person</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1 font-sans">{route.duration}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="mt-6 bg-blue-50 rounded-xl p-6">
              <h4 className="text-base font-heading font-semibold text-blue-900 mb-3">Quick Tips</h4>
              <div className="space-y-2 text-sm text-blue-800 font-sans">
                <p>• Book early for better prices</p>
                <p>• Check real-time updates</p>
                <p>• Use AR navigation to find your bus</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
