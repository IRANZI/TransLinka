'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Calendar, Users, Search, Bell, Briefcase } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BookTicketPage() {
  const router = useRouter();
  const [passengers, setPassengers] = useState(1);
  const [tripType, setTripType] = useState('One Way');
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '2024-12-15',
    returnDate: '2024-12-15',
    luggage: '1 Kg',
  });

 
  const [fromSearch, setFromSearch] = useState('');
  const [toSearch, setToSearch] = useState('');
  const [fromDropdownOpen, setFromDropdownOpen] = useState(false);
  const [toDropdownOpen, setToDropdownOpen] = useState(false);
  const [luggageDropdownOpen, setLuggageDropdownOpen] = useState(false);

  // bus stops
  const busStops = [
    'Kigali',
    'Remera',
    'Nyabugogo',
    'Masaka',
    'Huye',
    'Muhanga',
    'Rubavu',
    'Rusizi',
    'Musanze',
    'Nyamata',
    'Kayonza',
    'Rwamagana',
  ];

  const luggageOptions = ['1 Kg', '5 Kg', '10 Kg', '15 Kg'];

  // Popular Routes
  const popularRoutes = [
    { from: 'Masaka', to: 'Remera', duration: '4h 30m', price: '2,000 Rwf' },
    { from: 'Kigali', to: 'Huye', duration: '2h 10m', price: '3,000 Rwf' },
    { from: 'Nyabugogo', to: 'Rubavu', duration: '3h 45m', price: '4,500 Rwf' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src="/logo.png" alt="TransLinka Logo" className="h-8 w-8 object-contain mr-3" />
              <span className="text-xl font-heading font-bold text-gray-900">TransLinka</span>
            </div>

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

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <Link href="/profile">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">J</span>
                  </div>
                </div>
              </Link>
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
              {/* Trip Type Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
                <button
                  onClick={() => setTripType('One Way')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    tripType === 'One Way' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  One Way
                </button>
                <button
                  onClick={() => setTripType('Round Trip')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    tripType === 'Round Trip' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  Round Trip
                </button>
              </div>

              <div className="space-y-6">
                {/* From */}
                <div className="relative">
                  <label className="block text-base font-medium text-gray-700 mb-3">From</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 w-5 h-5 text-blue-500" />
                    <input
                      type="text"
                      placeholder="Select departure city"
                      value={fromSearch}
                      onChange={(e) => {
                        setFromSearch(e.target.value);
                        setFromDropdownOpen(true);
                      }}
                      onFocus={() => setFromDropdownOpen(true)}
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  {fromDropdownOpen && (
                    <div className="absolute z-20 mt-2 w-full bg-white border rounded-lg shadow max-h-40 overflow-y-auto">
                      {busStops
                        .filter((stop) => stop.toLowerCase().includes(fromSearch.toLowerCase()))
                        .map((stop, idx) => (
                          <button
                            key={idx}
                            className="w-full text-left px-4 py-2 hover:bg-blue-50"
                            onClick={() => {
                              setFormData({ ...formData, from: stop });
                              setFromSearch(stop);
                              setFromDropdownOpen(false);
                            }}
                          >
                            {stop}
                          </button>
                        ))}
                    </div>
                  )}
                </div>

                {/* To */}
                <div className="relative">
                  <label className="block text-base font-medium text-gray-700 mb-3">To</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 w-5 h-5 text-green-500" />
                    <input
                      type="text"
                      placeholder="Select destination city"
                      value={toSearch}
                      onChange={(e) => {
                        setToSearch(e.target.value);
                        setToDropdownOpen(true);
                      }}
                      onFocus={() => setToDropdownOpen(true)}
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  {toDropdownOpen && (
                    <div className="absolute z-20 mt-2 w-full bg-white border rounded-lg shadow max-h-40 overflow-y-auto">
                      {busStops
                        .filter((stop) => stop.toLowerCase().includes(toSearch.toLowerCase()))
                        .map((stop, idx) => (
                          <button
                            key={idx}
                            className="w-full text-left px-4 py-2 hover:bg-blue-50"
                            onClick={() => {
                              setFormData({ ...formData, to: stop });
                              setToSearch(stop);
                              setToDropdownOpen(false);
                            }}
                          >
                            {stop}
                          </button>
                        ))}
                    </div>
                  )}
                </div>

                {/* Date Fields */}
                <div className={`grid ${tripType === 'Round Trip' ? 'grid-cols-2 gap-4' : 'grid-cols-1'}`}>
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-3">Departure Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {tripType === 'Round Trip' && (
                    <div>
                      <label className="block text-base font-medium text-gray-700 mb-3">Return Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                        <input
                          type="date"
                          value={formData.returnDate}
                          onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                          className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Passengers */}
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-3">Passengers</label>
                  <div className="relative">
                    <Users className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                    <div className="flex items-center justify-between w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl">
                      <span>{passengers} Passenger{passengers > 1 ? 's' : ''}</span>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setPassengers(Math.max(1, passengers - 1))}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          -
                        </button>
                        <button
                          onClick={() => setPassengers(passengers + 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Luggage Dropdown */}
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-3">Luggage</label>
                  <div className="relative">
                    <button
                      type="button"
                      className="w-full flex items-center pl-12 pr-4 py-4 border border-gray-200 rounded-xl bg-white"
                      onClick={() => setLuggageDropdownOpen((open) => !open)}
                    >
                      <Briefcase className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                      <span>{formData.luggage}</span>
                      <svg
                        className="ml-auto w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {luggageDropdownOpen && (
                      <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border z-20">
                        {luggageOptions.map((option) => (
                          <button
                            key={option}
                            type="button"
                            className={`w-full text-left px-6 py-4 hover:bg-blue-50 ${
                              formData.luggage === option ? 'bg-blue-100 text-blue-900' : ''
                            }`}
                            onClick={() => {
                              setFormData({ ...formData, luggage: option });
                              setLuggageDropdownOpen(false);
                            }}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Search Button */}
                <button
                  onClick={() => {
                    const params = new URLSearchParams({
                      from: formData.from || 'Masaka',
                      to: formData.to || 'Remera',
                      date: formData.date,
                      passengers: passengers.toString(),
                      luggage: formData.luggage,
                    });
                    router.push(`/search-results?${params.toString()}`);
                  }}
                  className="w-full mt-8 bg-blue-500 text-white py-4 px-6 rounded-xl hover:bg-blue-600 flex items-center justify-center gap-3"
                >
                  <Search className="w-5 h-5" />
                  Search Buses
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Popular Routes */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Popular Routes</h3>
              <div className="space-y-4">
                {popularRoutes.map((route, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      setFormData({ ...formData, from: route.from, to: route.to });
                      setFromSearch(route.from);
                      setToSearch(route.to);
                    }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2 text-sm font-medium text-gray-900">
                        <span>{route.from}</span>
                        <span className="text-gray-400">→</span>
                        <span>{route.to}</span>
                      </div>
                      <span className="text-sm font-medium text-blue-600">{route.price}</span>
                    </div>
                    <div className="text-xs text-gray-400">{route.duration}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="mt-6 bg-blue-50 rounded-xl p-6">
              <h4 className="text-base font-semibold text-blue-900 mb-3">Quick Tips</h4>
              <div className="space-y-2 text-sm text-blue-800">
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
