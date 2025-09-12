'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Bell, MapPin, Clock, Users, Calendar, ArrowLeft, Bus, CalendarDays } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function SearchResultsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || 'Masaka';
  const to = searchParams.get('to') || 'Remera';
  const date = searchParams.get('date') || 'Dec 15';
  const passengers = searchParams.get('passengers') || '1';

  const [selectedBus, setSelectedBus] = useState<string | null>(null);
  const [bookingType, setBookingType] = useState<'individual' | 'charter'>('individual');
  const [charterPeriod, setCharterPeriod] = useState({
    startDate: '',
    endDate: '',
    duration: 'single-day'
  });

  const availableBuses = [
    {
      id: '1',
      company: 'City Express',
      route: 'Route 42',
      departureTime: '08:30AM',
      arrivalTime: '01:00PM',
      duration: '4h 30m',
      price: '2,000 Rwf',
      charterPrice: '150,000 Rwf',
      seatsLeft: 12,
      totalSeats: 45,
      stops: 2,
      from: 'Masaka',
      to: 'Remera'
    }
  ];

  const handleBooking = (bus: any) => {
    if (bookingType === 'individual') {
      const params = new URLSearchParams({
        busId: bus.id,
        company: bus.company,
        route: bus.route,
        from: bus.from,
        to: bus.to,
        date: date,
        departureTime: bus.departureTime,
        arrivalTime: bus.arrivalTime,
        duration: bus.duration,
        price: bus.price,
        bookingType: 'individual'
      });
      router.push(`/select-seats?${params.toString()}`);
    } else {
      const params = new URLSearchParams({
        busId: bus.id,
        company: bus.company,
        route: bus.route,
        from: bus.from,
        to: bus.to,
        date: date,
        departureTime: bus.departureTime,
        arrivalTime: bus.arrivalTime,
        duration: bus.duration,
        price: bus.charterPrice,
        bookingType: 'charter',
        startDate: charterPeriod.startDate,
        endDate: charterPeriod.endDate,
        charterDuration: charterPeriod.duration,
        totalSeats: bus.totalSeats.toString()
      });
      router.push(`/payment?${params.toString()}`);
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
              <Link  href = "/profile">
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
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-heading font-bold text-gray-900 mb-2">Available Buses</h1>
          <p className="text-gray-600 font-sans">{from} → {to}</p>
        </div>

        {/* Booking Type Selection */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <h3 className="text-lg font-heading font-semibold text-gray-900 mb-4">Booking Type</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => setBookingType('individual')}
              className={`p-4 border-2 rounded-lg transition-colors text-left ${
                bookingType === 'individual'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center mb-2">
                <Users className="w-5 h-5 mr-2 text-blue-500" />
                <span className="font-semibold text-gray-900">Individual Seats</span>
              </div>
              <p className="text-sm text-gray-600">Book specific seats for passengers</p>
            </button>
            
            <button
              onClick={() => setBookingType('charter')}
              className={`p-4 border-2 rounded-lg transition-colors text-left ${
                bookingType === 'charter'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center mb-2">
                <Bus className="w-5 h-5 mr-2 text-blue-500" />
                <span className="font-semibold text-gray-900">Whole Bus Charter</span>
              </div>
              <p className="text-sm text-gray-600">Book entire bus for your group or event</p>
            </button>
          </div>

          {/* Charter Period Selection */}
          {bookingType === 'charter' && (
            <div className="border-t pt-6">
              <h4 className="font-semibold text-gray-900 mb-4">Charter Period</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <button
                  onClick={() => setCharterPeriod({...charterPeriod, duration: 'single-day'})}
                  className={`p-3 border-2 rounded-lg transition-colors ${
                    charterPeriod.duration === 'single-day'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <CalendarDays className="w-4 h-4 mx-auto mb-1" />
                  <span className="text-sm font-medium">Single Day</span>
                </button>
                
                <button
                  onClick={() => setCharterPeriod({...charterPeriod, duration: 'multi-day'})}
                  className={`p-3 border-2 rounded-lg transition-colors ${
                    charterPeriod.duration === 'multi-day'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Calendar className="w-4 h-4 mx-auto mb-1" />
                  <span className="text-sm font-medium">Multi-Day</span>
                </button>
                
                <button
                  onClick={() => setCharterPeriod({...charterPeriod, duration: 'weekly'})}
                  className={`p-3 border-2 rounded-lg transition-colors ${
                    charterPeriod.duration === 'weekly'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Calendar className="w-4 h-4 mx-auto mb-1" />
                  <span className="text-sm font-medium">Weekly</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={charterPeriod.startDate}
                    onChange={(e) => setCharterPeriod({...charterPeriod, startDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                {charterPeriod.duration !== 'single-day' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                    <input
                      type="date"
                      value={charterPeriod.endDate}
                      onChange={(e) => setCharterPeriod({...charterPeriod, endDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Search Summary */}
        <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-gray-900 font-sans">Today, {date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600 font-sans">{passengers} Passenger{passengers !== '1' ? 's' : ''}</span>
              </div>
            </div>
            <button className="text-blue-600 text-sm font-medium font-sans hover:text-blue-700">
              Modify
            </button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-gray-600 font-sans">{availableBuses.length} buses found</p>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 font-sans">Departure</span>
            <button className="text-sm text-blue-600 font-medium font-sans">
              <Clock className="w-4 h-4 inline mr-1" />
              Sort
            </button>
          </div>
        </div>

        {/* Bus Results */}
        <div className="space-y-4">
          {availableBuses.map((bus) => (
            <div key={bus.id} className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-heading font-semibold text-gray-900">{bus.company}</h3>
                    <span className="inline-flex px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 font-sans">
                      {bus.route}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 font-sans">{bus.route}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600 font-sans">
                    {bookingType === 'individual' ? bus.price : bus.charterPrice}
                  </div>
                  <div className="text-sm text-gray-500 font-sans">
                    {bookingType === 'individual' ? 'per person' : 'whole bus'}
                  </div>
                </div>
              </div>

              {/* Journey Timeline */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900 font-sans">{bus.departureTime}</div>
                  <div className="text-sm text-gray-600 font-sans">{bus.from}</div>
                </div>
                
                <div className="flex-1 mx-6">
                  <div className="flex items-center justify-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="flex-1 h-0.5 bg-gray-200 mx-2 relative">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                        <span className="text-xs text-gray-500 font-sans">{bus.duration}</span>
                      </div>
                    </div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900 font-sans">{bus.arrivalTime}</div>
                  <div className="text-sm text-gray-600 font-sans">{bus.to}</div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4 text-sm text-gray-600 font-sans">
                  {bookingType === 'individual' ? (
                    <>
                      <span>{bus.seatsLeft} seats left</span>
                      <span>{bus.stops} stops</span>
                    </>
                  ) : (
                    <>
                      <span>{bus.totalSeats} total seats</span>
                      <span>Full bus charter</span>
                    </>
                  )}
                </div>
                <button 
                  onClick={() => handleBooking(bus)}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium font-sans"
                >
                  {bookingType === 'individual' ? 'Select Seat' : 'Charter Bus'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No results message  */}
        {availableBuses.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2 font-heading">No buses found</h3>
            <p className="text-gray-600 font-sans">Try adjusting your search criteria or date</p>
            <Link 
              href="/book-ticket"
              className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-700 font-medium font-sans"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to search
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
