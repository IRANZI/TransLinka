'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, QrCode, Share2, Download } from 'lucide-react';
import AppHeader from '@/components/AppHeader';
import { api } from '@/lib/api';

import { useAuth } from '@/components/AuthProvider';

export default function MyTicketsPage() {
  const { refresh } = useAuth();
  const [activeTab, setActiveTab] = useState('active');
  const [tickets, setTickets] = useState<any[]>([]);

  useEffect(() => {
    api<{ bookings: any[] }>('/api/bookings')
      .then((data) => setTickets(data.bookings || []))
      .catch(() => setTickets([]));
  }, []);

  const activeTickets = tickets
    .filter((booking) => booking.status === 'CONFIRMED' || booking.status === 'PENDING')
    .map((booking) => ({
      id: booking.id,
      from: booking.origin,
      to: booking.destination,
      company: booking.company?.name || 'TransLinka',
      route: booking.route?.name || '',
      bookingRef: booking.reference,
      date: new Date(booking.travelDate).toLocaleDateString(),
      departureTime: booking.departureTime,
      arrivalTime: booking.arrivalTime,
      duration: booking.route?.duration || '',
      seat: (booking.seats || []).join(', '),
      gate: booking.gate,
      price: `${booking.amount.toLocaleString()} Rwf`,
      status: booking.status,
    }));
  const pastTickets = tickets
    .filter((booking) => booking.status === 'COMPLETED' || booking.status === 'CANCELLED')
    .map((booking) => ({
      id: booking.id,
      from: booking.origin,
      to: booking.destination,
      company: booking.company?.name || 'TransLinka',
      route: booking.route?.name || '',
      bookingRef: booking.reference,
      date: new Date(booking.travelDate).toLocaleDateString(),
      departureTime: booking.departureTime,
      arrivalTime: booking.arrivalTime,
      duration: booking.route?.duration || '',
      seat: (booking.seats || []).join(', '),
      gate: booking.gate,
      price: `${booking.amount.toLocaleString()} Rwf`,
      status: booking.status,
    }));

  const currentTickets = activeTab === 'active' ? activeTickets : pastTickets;

  const shareTicket = async (reference: string, title: string) => {
    const url = `${window.location.origin}/booking-confirmation?reference=${encodeURIComponent(reference)}`;
    if (navigator.share) {
      await navigator.share({ title, text: `TransLinka ticket ${reference}`, url }).catch(() => undefined);
      return;
    }
    await navigator.clipboard.writeText(url);
    alert('Ticket link copied');
  };

  const cancelTicket = async (reference: string) => {
    if (!window.confirm(`Cancel booking ${reference}? The fare will be returned to your wallet.`)) return;
    await api(`/api/bookings?reference=${encodeURIComponent(reference)}`, { method: 'DELETE' });
    await refresh();
    const data = await api<{ bookings: any[] }>('/api/bookings');
    setTickets(data.bookings || []);
  };

  return (
    <div className="min-h-screen bg-navy-50">
      <AppHeader />

      {/* Main Content */}
      <main className="page-wrap py-6 sm:py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-navy-800 rounded-xl p-6 text-white">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2 font-heading">{activeTickets.length}</div>
              <div className="text-lg font-medium font-sans">Active Tickets</div>
            </div>
          </div>
          <div className="bg-navy-700 rounded-xl p-6 text-white">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2 font-heading">{pastTickets.length}</div>
              <div className="text-lg font-medium font-sans">Past Tickets</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-8 mb-8">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex items-center space-x-2 pb-2 border-b-2 transition-colors ${
              activeTab === 'active'
                ? 'border-navy-500 text-navy-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Clock className="w-5 h-5" />
            <span className="font-medium font-sans">Active</span>
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`flex items-center space-x-2 pb-2 border-b-2 transition-colors ${
              activeTab === 'past'
                ? 'border-navy-500 text-navy-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span className="font-medium font-sans">Past</span>
          </button>
        </div>

        {/* Tickets */}
        <div className="space-y-6">
          {currentTickets.map((ticket) => (
            <div key={ticket.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-gray-900 mb-1">
                      {ticket.from} → {ticket.to}
                    </h3>
                    <p className="text-sm text-gray-600 font-sans">
                      {ticket.company} • {ticket.route}
                    </p>
                    <p className="text-xs text-gray-500 font-sans mt-1">
                      Booking Ref: {ticket.bookingRef}
                    </p>
                  </div>
                  <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-navy-100 text-navy-800 font-sans">
                    {ticket.status}
                  </span>
                </div>

               
                <div className="flex items-center space-x-4 mb-6">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900 font-sans">{ticket.date}</span>
                  <span className="text-sm text-gray-500 font-sans">{ticket.duration}</span>
                </div>

                {/* Journey Timeline */}
                <div className="flex items-center justify-between mb-6">
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900 font-sans">{ticket.departureTime}</div>
                    <div className="text-sm text-gray-600 font-sans">Departure</div>
                  </div>
                  
                  <div className="flex-1 mx-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-navy-500 rounded-full"></div>
                      <div className="flex-1 h-0.5 bg-gray-200 mx-2"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900 font-sans">{ticket.arrivalTime}</div>
                    <div className="text-sm text-gray-600 font-sans">Arrival</div>
                  </div>
                </div>

                {/* Ticket Details */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-navy-50 rounded-lg">
                    <div className="w-8 h-8 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="w-4 h-4 text-navy-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                      </svg>
                    </div>
                    <div className="text-xs text-gray-500 font-sans mb-1">Seat</div>
                    <div className="text-sm font-medium text-gray-900 font-sans">{ticket.seat}</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="text-xs text-gray-500 font-sans mb-1">Gate</div>
                    <div className="text-sm font-medium text-gray-900 font-sans">{ticket.gate}</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="text-xs text-gray-500 font-sans mb-1">Price</div>
                    <div className="text-sm font-medium text-gray-900 font-sans">{ticket.price}</div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Link
                    href={`/booking-confirmation?reference=${encodeURIComponent(ticket.bookingRef)}`}
                    className="flex-1 bg-navy-500 text-white py-3 px-4 rounded-lg hover:bg-navy-600 transition-colors font-medium font-sans flex items-center justify-center space-x-2"
                  >
                    {activeTab === 'active' ? (
                      <>
                        <QrCode className="w-4 h-4" />
                        <span>Show QR Code</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>Download Receipt</span>
                      </>
                    )}
                  </Link>
                  <button
                    type="button"
                    onClick={() => void shareTicket(ticket.bookingRef, `${ticket.from} → ${ticket.to}`)}
                    className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    aria-label="Share ticket"
                  >
                    <Share2 className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                {activeTab === 'active' && ticket.status !== 'CANCELLED' && (
                  <button
                    type="button"
                    onClick={() => void cancelTicket(ticket.bookingRef)}
                    className="mt-3 w-full rounded-lg border border-rose-200 py-2 text-sm font-medium text-rose-700 hover:bg-rose-50"
                  >
                    Cancel booking
                  </button>
                )}
              </div>
            </div>
          ))}
          {currentTickets.length === 0 && (
            <div className="rounded-xl border bg-white py-12 text-center">
              <p className="text-gray-600 font-sans">
                {activeTab === 'active' ? 'No active tickets yet. Book a trip to see it here.' : 'No past tickets yet.'}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

