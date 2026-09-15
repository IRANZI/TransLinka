'use client';
import React, { useEffect, useState } from 'react';
import BookingDetailsModal from './BookingDetailsModal';
import AdminHeader from '@/components/AdminHeader';
import { api } from '@/lib/api';
import {
  Search,
  Calendar,
  Download,
  RefreshCw,
  Eye,
  MapPin,
  Clock,
  User,
  Filter,
} from 'lucide-react';

export default function BookingManagementPage() {
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('All Payments');
  const [dateRangeFilter, setDateRangeFilter] = useState('All Dates');
  const [bookings, setBookings] = useState<any[]>([]);

  const loadBookings = async () => {
    try {
      const data = await api<any[]>('/api/admin/bookings');
      setBookings(
        (data || []).map((booking) => {
          const status = String(booking.status || 'confirmed').toLowerCase();
          const paymentStatus = String(booking.payment?.status || 'pending').toLowerCase();
          return {
            id: booking.id,
            reference: booking.reference,
            passenger: `${booking.user?.firstName || ''} ${booking.user?.lastName || ''}`.trim() || 'Traveler',
            route: `${booking.origin} → ${booking.destination}`,
            seats: Array.isArray(booking.seats) ? booking.seats.join(', ') : '',
            bus: booking.bus?.name || 'Unassigned',
            amount: `${Number(booking.amount || 0).toLocaleString()} Rwf`,
            date: `${new Date(booking.travelDate).toLocaleDateString()} at ${booking.departureTime}`,
            status,
            paymentStatus,
            email: booking.user?.email || '',
            phone: booking.user?.phone || '',
            bookedAt: booking.createdAt ? new Date(booking.createdAt).toLocaleString() : '',
            travelDate: booking.travelDate,
            method: booking.payment?.method || '',
            transactionId: booking.payment?.transactionId || '',
            statusLabels: {
              [status]: {
                text: status,
                color:
                  status === 'cancelled'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-green-100 text-green-800',
              },
              [paymentStatus]: {
                text: paymentStatus,
                color:
                  paymentStatus === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : paymentStatus === 'failed'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800',
              },
            },
          };
        })
      );
    } catch {
      setBookings([]);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.passenger.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.route.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || booking.status === statusFilter.toLowerCase();
    const matchesPayment = paymentStatusFilter === 'All Payments' || booking.paymentStatus === paymentStatusFilter.toLowerCase();
    const travel = booking.travelDate ? new Date(booking.travelDate) : null;
    const now = new Date();
    const matchesDate =
      dateRangeFilter === 'All Dates' ||
      !travel ||
      (dateRangeFilter === 'Today' && travel.toDateString() === now.toDateString()) ||
      (dateRangeFilter === 'This Week' && travel >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)) ||
      (dateRangeFilter === 'This Month' && travel.getMonth() === now.getMonth() && travel.getFullYear() === now.getFullYear());
    return matchesSearch && matchesStatus && matchesPayment && matchesDate;
  });

  const exportBookings = () => {
    const header = 'Reference,Passenger,Route,Seats,Bus,Amount,Date,Status,Payment\n';
    const rows = filteredBookings
      .map((booking) =>
        [booking.reference || booking.id, booking.passenger, booking.route, booking.seats, booking.bus, booking.amount, booking.date, booking.status, booking.paymentStatus]
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(',')
      )
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'translinka-bookings.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-navy-50">
      <AdminHeader />

      <main className="page-wrap py-6 sm:py-8">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-navy-900 sm:text-3xl">Bookings</h1>
            <p className="mt-1 text-navy-600">Passenger tickets, payment status, and trip details.</p>
          </div>
          <div className="flex gap-2">
            <button type="button" className="btn-secondary" onClick={exportBookings}>
              <Download className="h-4 w-4" />
              Export
            </button>
            <button type="button" className="btn-secondary" onClick={loadBookings}>
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
          </div>
        </div>

        <div className="mb-6 rounded-2xl border border-navy-100 bg-white p-4 shadow-soft sm:p-5">
          <div className="mb-4 flex items-center gap-2 text-navy-800">
            <Filter className="h-4 w-4" />
            <h2 className="font-semibold">Filters</h2>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
              <input
                type="text"
                placeholder="Search booking..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-navy-100 bg-navy-50/60 px-4 py-3 text-sm text-navy-900 outline-none focus:border-navy-500 focus:bg-white"
            >
              <option>All Status</option>
              <option>Confirmed</option>
              <option>Pending</option>
              <option>Cancelled</option>
            </select>
            <select
              value={paymentStatusFilter}
              onChange={(e) => setPaymentStatusFilter(e.target.value)}
              className="rounded-xl border border-navy-100 bg-navy-50/60 px-4 py-3 text-sm text-navy-900 outline-none focus:border-navy-500 focus:bg-white"
            >
              <option>All Payments</option>
              <option>Completed</option>
              <option>Pending</option>
              <option>Failed</option>
            </select>
            <select
              value={dateRangeFilter}
              onChange={(e) => setDateRangeFilter(e.target.value)}
              className="rounded-xl border border-navy-100 bg-navy-50/60 px-4 py-3 text-sm text-navy-900 outline-none focus:border-navy-500 focus:bg-white"
            >
              <option>All Dates</option>
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>
        </div>

        <div className="rounded-2xl border border-navy-100 bg-white shadow-soft">
          <div className="border-b border-navy-100 px-5 py-4">
            <h2 className="font-semibold text-navy-900">All bookings ({filteredBookings.length})</h2>
          </div>
          <div className="divide-y divide-navy-100">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-navy-800">{booking.reference || booking.id}</h3>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${booking.statusLabels[booking.status]?.color || 'bg-navy-50 text-navy-700'}`}>
                      {booking.statusLabels[booking.status]?.text || booking.status}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${booking.statusLabels[booking.paymentStatus]?.color || 'bg-yellow-100 text-yellow-800'}`}
                    >
                      {booking.statusLabels[booking.paymentStatus]?.text || booking.paymentStatus}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-navy-600">
                    <span className="inline-flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {booking.passenger}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {booking.route}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {booking.date}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-navy-500">
                    Seats {booking.seats} · {booking.bus} · {booking.amount}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                    <button
                      type="button"
                      className="text-sm font-medium text-rose-700 hover:text-rose-800"
                      onClick={async () => {
                        if (!window.confirm(`Cancel booking ${booking.reference}? The fare will be returned to the traveler wallet.`)) return;
                        await api(`/api/bookings?id=${encodeURIComponent(booking.id)}`, { method: 'DELETE' });
                        await loadBookings();
                      }}
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 text-sm font-medium text-navy-700 hover:text-navy-900"
                    onClick={() => {
                      setSelectedBooking(booking);
                      setShowBookingDetails(true);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredBookings.length === 0 && (
          <div className="mt-6 rounded-2xl border border-navy-100 bg-white py-12 text-center shadow-soft">
            <Calendar className="mx-auto mb-3 h-10 w-10 text-navy-300" />
            <h3 className="text-lg font-semibold text-navy-900">No bookings found</h3>
            <p className="mt-1 text-navy-500">Try a different search or filter.</p>
          </div>
        )}
      </main>
      <BookingDetailsModal open={showBookingDetails} onClose={() => setShowBookingDetails(false)} booking={selectedBooking} />
    </div>
  );
}
