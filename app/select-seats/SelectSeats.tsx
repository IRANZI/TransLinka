'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { User } from 'lucide-react';
import AppHeader from '@/components/AppHeader';
import { api } from '@/lib/api';

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
  
  const routeId = searchParams.get('routeId') || '';
  const busId = searchParams.get('busId') || '';
  const unitPrice = parseInt((searchParams.get('price') || '2000').replace(/[^0-9]/g, ''), 10) || 2000;
  
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [occupiedSeats, setOccupiedSeats] = useState<string[]>([]);

  const seatLayout = [
    ['1A', '1B', '1C', '1D'],
    ['2A', '2B', '2C', '2D'],
    ['3A', '3B', '3C', '3D'],
    ['4A', '4B', '4C', '4D'],
    ['5A', '5B', '5C', '5D'],
    ['6A', '6B', '6C', '6D'],
  ];

  useEffect(() => {
    if (!routeId || !date) return;
    api<{ occupied: string[] }>(`/api/public/seats?routeId=${routeId}&date=${encodeURIComponent(date)}`)
      .then((data) => setOccupiedSeats(data.occupied || []))
      .catch(() => undefined);
  }, [routeId, date]);

  const toggleSeat = (seatId: string) => {
    if (occupiedSeats.includes(seatId)) return;
    setSelectedSeats((prev) => {
      if (prev.includes(seatId)) return prev.filter((id) => id !== seatId);
      if (prev.length < passengers) return [...prev, seatId];
      return prev;
    });
  };

  const getSeatClass = (seatId: string) => {
    if (occupiedSeats.includes(seatId)) {
      return 'bg-gray-400 cursor-not-allowed';
    }
    if (selectedSeats.includes(seatId)) {
      return 'bg-navy-500 text-white cursor-pointer';
    }
    return 'bg-white border-2 border-gray-300 cursor-pointer hover:border-navy-300';
  };

  return (
    <div className="min-h-screen bg-navy-50">
      <AppHeader />

      {/* Main Content */}
      <main className="page-wrap py-6 sm:py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-heading font-bold text-gray-900 mb-2">Select Seats</h1>
          <p className="text-gray-600 font-sans">{company} · {route}</p>
        </div>

        {/* Trip Info */}
        <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-lg font-heading font-semibold text-gray-900">{date}</span>
                <span className="inline-flex px-2 py-1 rounded text-xs font-medium bg-navy-100 text-navy-800 font-sans">{duration}</span>
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
              <div className="w-8 h-8 bg-navy-500 rounded"></div>
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
                  <span className="text-sm font-medium text-navy-600 font-sans">{price.replace('Rwf', 'Rwf')}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-base font-heading font-semibold text-gray-900">Total</span>
                <span className="text-lg font-bold text-navy-600 font-sans">
                  {(selectedSeats.length * unitPrice).toLocaleString()} Rwf
                </span>
              </div>
            </div>
            
            <button 
              onClick={() => {
                // Navigation to the payment page with selected seats information
                const params = new URLSearchParams({
                  seats: selectedSeats.join(','),
                  totalPrice: String(selectedSeats.length * unitPrice),
                  company: company,
                  route: route,
                  routeId,
                  busId,
                  from: from,
                  to: to,
                  date: date,
                  departureTime: departureTime,
                  arrivalTime: arrivalTime,
                  passengers: String(passengers),
                });
                router.push(`/payment?${params.toString()}`);
              }}
              disabled={selectedSeats.length !== passengers}
              className={`w-full mt-4 py-3 px-6 rounded-lg font-medium font-sans transition-colors ${
                selectedSeats.length === passengers
                  ? 'bg-navy-500 text-white hover:bg-navy-600'
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
