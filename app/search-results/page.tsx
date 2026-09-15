'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { MapPin, Clock, Users, Calendar, ArrowLeft, Bus, CalendarDays } from 'lucide-react';
import AppHeader from '@/components/AppHeader';
import { useSearchParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api';

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
  const [availableBuses, setAvailableBuses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api<any[]>(`/api/public/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(date)}`)
      .then(setAvailableBuses)
      .catch(() => setAvailableBuses([]))
      .finally(() => setLoading(false));
  }, [from, to, date]);

  const handleBooking = (bus: any) => {
    if (bookingType === 'individual') {
      const params = new URLSearchParams({
        busId: bus.busId || '',
        routeId: bus.id,
        company: bus.company,
        route: bus.route,
        from: bus.from,
        to: bus.to,
        date: date,
        departureTime: bus.departureTime,
        arrivalTime: bus.arrivalTime,
        duration: bus.duration,
        price: bus.price,
        bookingType: 'individual',
        passengers: passengers,
      });
      router.push(`/select-seats?${params.toString()}`);
    } else {
      const params = new URLSearchParams({
        busId: bus.busId || '',
        routeId: bus.id,
        company: bus.company,
        route: bus.route,
        from: bus.from,
        to: bus.to,
        date: date,
        departureTime: bus.departureTime,
        arrivalTime: bus.arrivalTime,
        duration: bus.duration,
        price: String((bus.unitPrice || 0) * 40),
        total: String((bus.unitPrice || 0) * 40),
        bookingType: 'charter',
        startDate: charterPeriod.startDate,
        endDate: charterPeriod.endDate,
        charterDuration: charterPeriod.duration,
        totalSeats: bus.totalSeats.toString(),
        passengers: passengers,
      });
      router.push(`/payment?${params.toString()}`);
    }
  };

  return (
    <div className="min-h-screen bg-navy-50">
      <AppHeader />

      {/* Main Content */}
      <main className="page-wrap py-6 sm:py-8">
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
                  ? 'border-navy-500 bg-navy-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center mb-2">
                <Users className="w-5 h-5 mr-2 text-navy-500" />
                <span className="font-semibold text-gray-900">Individual Seats</span>
              </div>
              <p className="text-sm text-gray-600">Book specific seats for passengers</p>
            </button>
            
            <button
              onClick={() => setBookingType('charter')}
              className={`p-4 border-2 rounded-lg transition-colors text-left ${
                bookingType === 'charter'
                  ? 'border-navy-500 bg-navy-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center mb-2">
                <Bus className="w-5 h-5 mr-2 text-navy-500" />
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
                      ? 'border-navy-500 bg-navy-50 text-navy-700'
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
                      ? 'border-navy-500 bg-navy-50 text-navy-700'
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
                      ? 'border-navy-500 bg-navy-50 text-navy-700'
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  />
                </div>
                
                {charterPeriod.duration !== 'single-day' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                    <input
                      type="date"
                      value={charterPeriod.endDate}
                      onChange={(e) => setCharterPeriod({...charterPeriod, endDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
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
                <MapPin className="w-4 h-4 text-navy-500" />
                <span className="text-sm font-medium text-gray-900 font-sans">Today, {date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600 font-sans">{passengers} Passenger{passengers !== '1' ? 's' : ''}</span>
              </div>
            </div>
            <button className="text-navy-600 text-sm font-medium font-sans hover:text-navy-700">
              Modify
            </button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-gray-600 font-sans">{availableBuses.length} buses found</p>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 font-sans">Departure</span>
            <button className="text-sm text-navy-600 font-medium font-sans">
              <Clock className="w-4 h-4 inline mr-1" />
              Sort
            </button>
          </div>
        </div>

        {/* Bus Results */}
        <div className="space-y-4">
          {loading && <p className="text-navy-600">Loading coaches from the database…</p>}
          {!loading && availableBuses.length === 0 && (
            <div className="rounded-xl border bg-white p-6 text-navy-600">
              No coaches found for this route and date. Try Masaka → Remera or Kigali → Huye.
            </div>
          )}
          {availableBuses.map((bus) => (
            <div key={bus.id} className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-heading font-semibold text-gray-900">{bus.company}</h3>
                    <span className="inline-flex px-2 py-1 rounded text-xs font-medium bg-navy-100 text-navy-800 font-sans">
                      {bus.route}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 font-sans">{bus.route}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-navy-600 font-sans">
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
                    <div className="w-3 h-3 bg-navy-500 rounded-full"></div>
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
                  className="bg-navy-500 text-white px-6 py-2 rounded-lg hover:bg-navy-600 transition-colors font-medium font-sans"
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
              className="inline-flex items-center mt-4 text-navy-600 hover:text-navy-700 font-medium font-sans"
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
