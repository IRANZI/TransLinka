'use client';
import React, { useEffect, useState } from 'react';
import { MapPin, Calendar, Users, Search, Briefcase, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import AppHeader from '@/components/AppHeader';
import { api } from '@/lib/api';

export default function BookTicketPage() {
  const router = useRouter();
  const [passengers, setPassengers] = useState(1);
  const [tripType, setTripType] = useState('One Way');
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '2026-09-20',
    returnDate: '2026-09-27',
    luggage: '1 Kg',
  });

  const [fromSearch, setFromSearch] = useState('');
  const [toSearch, setToSearch] = useState('');
  const [fromDropdownOpen, setFromDropdownOpen] = useState(false);
  const [toDropdownOpen, setToDropdownOpen] = useState(false);
  const [luggageDropdownOpen, setLuggageDropdownOpen] = useState(false);
  const [busStops, setBusStops] = useState([
    'Kigali', 'Remera', 'Nyabugogo', 'Masaka', 'Huye', 'Muhanga', 'Rubavu',
  ]);
  const [popularRoutes, setPopularRoutes] = useState([
    { from: 'Masaka', to: 'Remera', duration: '45 min', price: '2,000 Rwf' },
  ]);

  const luggageOptions = ['1 Kg', '5 Kg', '10 Kg', '15 Kg'];

  useEffect(() => {
    api<string[]>('/api/public/cities').then(setBusStops).catch(() => undefined);
    api<{ from: string; to: string; duration: string; price: string }[]>('/api/public/popular-routes')
      .then(setPopularRoutes)
      .catch(() => undefined);
  }, []);

  return (
    <div className="min-h-screen bg-navy-50">
      <AppHeader />

      <main className="page-wrap py-6 sm:py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-navy-900 sm:text-3xl">Book a ticket</h1>
          <p className="mt-1 text-navy-600">Search coaches, compare times, and reserve your seat.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-soft sm:p-7">
              <div className="mb-6 flex rounded-xl bg-navy-50 p-1">
                {['One Way', 'Round Trip'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setTripType(type)}
                    className={`flex-1 rounded-lg py-2.5 px-4 text-sm font-semibold transition ${
                      tripType === type ? 'bg-white text-navy-900 shadow-soft' : 'text-navy-600'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div className="space-y-5">
                <div className="relative">
                  <label className="mb-2 block text-sm font-medium text-navy-700">From</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 h-5 w-5 text-navy-600" />
                    <input
                      type="text"
                      placeholder="Select departure city"
                      value={fromSearch}
                      onChange={(e) => {
                        setFromSearch(e.target.value);
                        setFromDropdownOpen(true);
                      }}
                      onFocus={() => setFromDropdownOpen(true)}
                      className="w-full rounded-xl border border-navy-100 bg-navy-50/50 py-4 pl-12 pr-4 outline-none focus:border-navy-500 focus:bg-white focus:ring-2 focus:ring-navy-500/20"
                    />
                  </div>
                  {fromDropdownOpen && (
                    <div className="absolute z-20 mt-2 max-h-40 w-full overflow-y-auto rounded-xl border border-navy-100 bg-white shadow-lift">
                      {busStops
                        .filter((stop) => stop.toLowerCase().includes(fromSearch.toLowerCase()))
                        .map((stop) => (
                          <button
                            key={stop}
                            className="w-full px-4 py-2.5 text-left hover:bg-navy-50"
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

                <div className="relative">
                  <label className="mb-2 block text-sm font-medium text-navy-700">To</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 h-5 w-5 text-emerald-600" />
                    <input
                      type="text"
                      placeholder="Select destination city"
                      value={toSearch}
                      onChange={(e) => {
                        setToSearch(e.target.value);
                        setToDropdownOpen(true);
                      }}
                      onFocus={() => setToDropdownOpen(true)}
                      className="w-full rounded-xl border border-navy-100 bg-navy-50/50 py-4 pl-12 pr-4 outline-none focus:border-navy-500 focus:bg-white focus:ring-2 focus:ring-navy-500/20"
                    />
                  </div>
                  {toDropdownOpen && (
                    <div className="absolute z-20 mt-2 max-h-40 w-full overflow-y-auto rounded-xl border border-navy-100 bg-white shadow-lift">
                      {busStops
                        .filter((stop) => stop.toLowerCase().includes(toSearch.toLowerCase()))
                        .map((stop) => (
                          <button
                            key={stop}
                            className="w-full px-4 py-2.5 text-left hover:bg-navy-50"
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

                <div className={`grid gap-4 ${tripType === 'Round Trip' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-navy-700">Departure date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-4 h-5 w-5 text-navy-400" />
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full rounded-xl border border-navy-100 py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-navy-500/20"
                      />
                    </div>
                  </div>
                  {tripType === 'Round Trip' && (
                    <div>
                      <label className="mb-2 block text-sm font-medium text-navy-700">Return date</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-4 h-5 w-5 text-navy-400" />
                        <input
                          type="date"
                          value={formData.returnDate}
                          onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                          className="w-full rounded-xl border border-navy-100 py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-navy-500/20"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-navy-700">Passengers</label>
                  <div className="relative">
                    <Users className="absolute left-4 top-4 h-5 w-5 text-navy-400" />
                    <div className="flex items-center justify-between rounded-xl border border-navy-100 py-4 pl-12 pr-4">
                      <span>
                        {passengers} Passenger{passengers > 1 ? 's' : ''}
                      </span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setPassengers(Math.max(1, passengers - 1))}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-navy-200 hover:bg-navy-50"
                        >
                          -
                        </button>
                        <button
                          onClick={() => setPassengers(passengers + 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-navy-200 hover:bg-navy-50"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-navy-700">Luggage</label>
                  <div className="relative">
                    <button
                      type="button"
                      className="flex w-full items-center rounded-xl border border-navy-100 bg-white py-4 pl-12 pr-4"
                      onClick={() => setLuggageDropdownOpen((open) => !open)}
                    >
                      <Briefcase className="absolute left-4 top-4 h-5 w-5 text-navy-400" />
                      <span>{formData.luggage}</span>
                    </button>
                    {luggageDropdownOpen && (
                      <div className="absolute left-0 right-0 z-20 mt-2 rounded-xl border border-navy-100 bg-white shadow-lift">
                        {luggageOptions.map((option) => (
                          <button
                            key={option}
                            type="button"
                            className={`w-full px-6 py-3 text-left hover:bg-navy-50 ${
                              formData.luggage === option ? 'bg-navy-50 font-medium text-navy-900' : ''
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
                  className="btn-primary mt-2 w-full"
                >
                  <Search className="h-5 w-5" />
                  Search buses
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-soft">
              <div className="p-5">
                <h3 className="text-lg font-semibold text-navy-900">Popular routes</h3>
                <div className="mt-4 space-y-3">
                  {popularRoutes.map((route) => (
                    <button
                      key={`${route.from}-${route.to}`}
                      className="w-full rounded-xl border border-navy-100 p-4 text-left transition hover:bg-navy-50"
                      onClick={() => {
                        setFormData({ ...formData, from: route.from, to: route.to });
                        setFromSearch(route.from);
                        setToSearch(route.to);
                      }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium text-navy-900">
                          {route.from} <ArrowRight className="inline h-3.5 w-3.5" /> {route.to}
                        </span>
                        <span className="text-sm font-semibold text-navy-700">{route.price}</span>
                      </div>
                      <p className="mt-1 text-xs text-navy-500">{route.duration}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-5 rounded-2xl bg-navy-900 p-5 text-white">
              <h4 className="font-semibold">Quick tips</h4>
              <div className="mt-3 space-y-2 text-sm text-navy-100">
                <p>Book early for better prices</p>
                <p>Check live updates before you leave</p>
                <p>Use AR navigation at the station</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
