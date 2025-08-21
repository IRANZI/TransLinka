'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Bell, User } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function SelectSeatsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const passengers = parseInt(searchParams.get('passengers') || '1');
  const price = searchParams.get('price') || '2,000 Rwf';
  const company = searchParams.get('company') || 'City Express';
  const route = searchParams.get('route') || 'Route 42';
  const from = searchParams.get('from') || 'Masaka';
  const to = searchParams.get('to') || 'Remera';
  const date = searchParams.get('date') || 'Dec 15,2024';
  const departureTime = searchParams.get('departureTime') || '8:30 AM';
  const arrivalTime = searchParams.get('arrivalTime') || '01:00 PM';
  const duration = searchParams.get('duration') || '4h 30m';
  
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // Bus seat layout 
  const seatLayout = [
    ['1A', '1B', '1C', '1D'],
    ['2A', '2B', '2C', '2D'], 
    ['3A', '3B', '3C', '3D'],
    ['4A', '4B', '4C', '4D'],
    ['5A', '5B', '5C', '5D'],
    ['6A', '6B', '6C', '6D']
  ];

  const occupiedSeats = ['1B', '3A', '3C', '4C', '5B'];

  const toggleSeat = (seatId: string) => {
    if (occupiedSeats.includes(seatId)) return;
    
    setSelectedSeats(prev => {
      if (prev.includes(seatId)) {
        // Removing seats that have been selected
        return prev.filter(id => id !== seatId);
      } else {
        // Adding seat based passenger limit
        if (prev.length < passengers) {
          return [...prev, seatId];
        }
        return prev;
      }
    });
  };

  const getSeatClass = (seatId: string) => {
    if (occupiedSeats.includes(seatId)) {
      return 'bg-gray-400 cursor-not-allowed';
    }
    if (selectedSeats.includes(seatId)) {
      return 'bg-blue-500 text-white cursor-pointer';
    }
    return 'bg-white border-2 border-gray-300 cursor-pointer hover:border-blue-300';
  };

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
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 font-medium">Dashboard</Link>
              <Link href="/book-ticket" className="text-blue-600 font-medium">Book Ticket</Link>
              <Link href="/my-tickets" className="text-gray-600 hover:text-gray-900 font-medium">My Tickets</Link>
              <Link href="/ar-navigation" className="text-gray-600 hover:text-gray-900 font-medium">AR Navigation</Link>
            </nav>
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
        <div className="mb-8">
          <h1 className="text-2xl font-heading font-bold text-gray-900 mb-2">Select Seats</h1>
          <p className="text-gray-600 font-sans">City Express</p>
        </div>

        {/* Trip Info */}
        <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-lg font-heading font-semibold text-gray-900">{date}</span>
                <span className="inline-flex px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 font-sans">{duration}</span>
              </div>
              <p className="text-sm text-gray-600 font-sans">{departureTime} - {arrivalTime}</p>
              <p className="text-sm text-gray-600 font-sans">{from} → {to}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 font-sans">{route}</p>
            </div>
          </div>
        </div>

        {/* Seat Legend */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <h3 className="text-base font-heading font-semibold text-gray-900 mb-4">Seat Legend</h3>
          <div className="flex space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white border-2 border-gray-300 rounded"></div>
              <span className="text-sm text-gray-600 font-sans">Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded"></div>
              <span className="text-sm text-gray-600 font-sans">Selected</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-400 rounded"></div>
              <span className="text-sm text-gray-600 font-sans">Occupied</span>
            </div>
          </div>
        </div>

        {/* Bus Layout */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          {/* Driver Section */}
          <div className="bg-gray-300 rounded-t-lg p-3 mb-4 text-center">
            <span className="text-sm font-medium text-gray-700 font-sans">Driver</span>
          </div>

          {/* Seats */}
          <div className="space-y-3">
            {seatLayout.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-between items-center">
                <span className="text-sm text-gray-500 font-sans w-4">{rowIndex + 1}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => toggleSeat(row[0])}
                    className={`w-12 h-10 rounded text-xs font-medium font-sans ${getSeatClass(row[0])}`}
                  >
                    {row[0]}
                  </button>
                  <button
                    onClick={() => toggleSeat(row[1])}
                    className={`w-12 h-10 rounded text-xs font-medium font-sans ${getSeatClass(row[1])}`}
                  >
                    {row[1]}
                  </button>
                </div>
                <div className="w-8"></div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => toggleSeat(row[2])}
                    className={`w-12 h-10 rounded text-xs font-medium font-sans ${getSeatClass(row[2])}`}
                  >
                    {row[2]}
                  </button>
                  <button
                    onClick={() => toggleSeat(row[3])}
                    className={`w-12 h-10 rounded text-xs font-medium font-sans ${getSeatClass(row[3])}`}
                  >
                    {row[3]}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Seats Summary */}
        {selectedSeats.length > 0 && (
          <div className="mt-6 bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-base font-heading font-semibold text-gray-900 mb-4">Selected Seats</h3>
            <div className="space-y-3">
              {selectedSeats.map((seat, index) => (
                <div key={seat} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900 font-sans">Seat {seat}</span>
                  </div>
                  <span className="text-sm font-medium text-blue-600 font-sans">{price.replace('Rwf', 'Rwf')}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-base font-heading font-semibold text-gray-900">Total</span>
                <span className="text-lg font-bold text-blue-600 font-sans">
                  {selectedSeats.length * parseInt(price.replace(/[^0-9]/g, ''))},000Rwf
                </span>
              </div>
            </div>
            
            <button 
              onClick={() => {
                // Navigate to payment page with selected seats info
                const params = new URLSearchParams({
                  seats: selectedSeats.join(','),
                  totalPrice: (selectedSeats.length * parseInt(price.replace(/[^0-9]/g, ''))).toString(),
                  company: company,
                  route: route,
                  from: from,
                  to: to,
                  date: date,
                  departureTime: departureTime,
                  arrivalTime: arrivalTime
                });
                router.push(`/payment?${params.toString()}`);
              }}
              disabled={selectedSeats.length !== passengers}
              className={`w-full mt-4 py-3 px-6 rounded-lg font-medium font-sans transition-colors ${
                selectedSeats.length === passengers
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continue Payment
            </button>
            
            {selectedSeats.length < passengers && (
              <p className="text-sm text-gray-500 text-center mt-2 font-sans">
                Please select {passengers - selectedSeats.length} more seat{passengers - selectedSeats.length > 1 ? 's' : ''}
              </p>
            )}
          </div>
        )}
        
        {selectedSeats.length === 0 && (
          <div className="mt-6 text-center">
            <p className="text-gray-500 font-sans">Select {passengers} seat{passengers > 1 ? 's' : ''} to continue</p>
          </div>
        )}
      </main>
    </div>
  );
}
