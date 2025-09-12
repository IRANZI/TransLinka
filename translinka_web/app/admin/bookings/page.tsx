'use client';
import React, { useState } from 'react';
import BookingDetailsModal from './BookingDetailsModal';
import Link from 'next/link';
import { 
  Search, 
  Bell, 
  User, 
  LayoutDashboard, 
  Bus, 
  Route, 
  Calendar, 
  Users, 
  LogOut,
  Filter,
  Download,
  RefreshCw,
  Eye,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Shield
} from 'lucide-react';

export default function BookingManagementPage() {
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('All Payments');
  const [dateRangeFilter, setDateRangeFilter] = useState('All Dates');

  // booking data
  const bookings = [
    {
      id: 'TL-2024-001',
      passenger: 'John Doe',
      route: 'Masaka → Remera',
      seats: 'A12, A13',
      bus: 'City Express 1',
      amount: '25,000 Rwf',
      date: '1/20/2025 at 8:30',
      status: 'confirmed',
      paymentStatus: 'completed',
      verified: true,
      statusLabels: {
        confirmed: { text: 'confirmed', color: 'bg-green-100 text-green-800' },
        completed: { text: 'completed', color: 'bg-green-100 text-green-800' },
        verified: { text: 'verified', color: 'bg-green-100 text-green-800' }
      }
    },
    {
      id: 'TL-2024-002',
      passenger: 'John Doe',
      route: 'Masaka → Remera',
      seats: 'A12, A13',
      bus: 'City Express 2',
      amount: '25,000 Rwf',
      date: '1/20/2025 at 8:30',
      status: 'confirmed',
      paymentStatus: 'pending',
      verified: false,
      statusLabels: {
        confirmed: { text: 'confirmed', color: 'bg-green-100 text-green-800' },
        pending: { text: 'pending', color: 'bg-yellow-100 text-yellow-800' }
      }
    },
    {
      id: 'TL-2024-003',
      passenger: 'John Doe',
      route: 'Masaka → Remera',
      seats: 'A12, A13',
      bus: 'City Express 2',
      amount: '25,000 Rwf',
      date: '1/20/2025 at 8:30',
      status: 'confirmed',
      paymentStatus: 'completed',
      verified: true,
      statusLabels: {
        confirmed: { text: 'confirmed', color: 'bg-green-100 text-green-800' },
        completed: { text: 'completed', color: 'bg-green-100 text-green-800' },
        verified: { text: 'verified', color: 'bg-green-100 text-green-800' }
      }
    },
    {
      id: 'TL-2024-004',
      passenger: 'John Doe',
      route: 'Masaka → Remera',
      seats: 'A12, A13',
      bus: 'City Express 2',
      amount: '25,000 Rwf',
      date: '1/20/2025 at 8:30',
      status: 'cancelled',
      paymentStatus: 'failed',
      verified: false,
      statusLabels: {
        cancelled: { text: 'cancelled', color: 'bg-red-100 text-red-800' },
        failed: { text: 'failed', color: 'bg-red-100 text-red-800' }
      }
    }
  ];

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.passenger.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.route.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || booking.status === statusFilter.toLowerCase();
    const matchesPayment = paymentStatusFilter === 'All Payments' || booking.paymentStatus === paymentStatusFilter.toLowerCase();
    return matchesSearch && matchesStatus && matchesPayment;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b">
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="TransLinka Logo"
              className="h-8 w-8 object-contain mr-3"
            />
            <span className="text-xl font-heading font-bold text-gray-900">TransLinka</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link href="/admin" className="flex items-center px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium">
                <LayoutDashboard className="w-5 h-5 mr-3" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/admin/bus-management" className="flex items-center px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium">
                <Bus className="w-5 h-5 mr-3" />
                Bus 
              </Link>
            </li>
            <li>
              <Link href="/admin/route-management" className="flex items-center px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium">
                <Route className="w-5 h-5 mr-3" />
                Route 
              </Link>
            </li>
            <li>
              <Link href="/admin/bookings" className="flex items-center px-4 py-3 text-blue-600 bg-blue-50 rounded-lg font-medium">
                <Calendar className="w-5 h-5 mr-3" />
                Bookings
              </Link>
            </li>
            <li>
              
            </li>
          </ul>
        </nav>

        {/* Sign Out */}
        <div className="p-4 border-t">
          <button className="flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium w-full">
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-2xl font-heading font-bold text-gray-900">Booking</h1>
              
              <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                  />
                </div>

                {/* Notifications */}
                <button className="relative p-2 text-gray-600 hover:text-gray-900">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Admin Profile */}
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">A</span>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">Admin User</div>
                    <div className="text-gray-500">Administrator</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 sm:p-8 lg:p-12">
          {/* Page Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Management</h2>
              <p className="text-gray-600">View all bookings with payment status and blockchain verification</p>
            </div>
            <div className="flex space-x-3">
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex items-center mb-4">
              <Filter className="w-5 h-5 text-gray-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <input
                  type="text"
                  placeholder="Search booking..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>All Status</option>
                  <option>Confirmed</option>
                  <option>Pending</option>
                  <option>Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Status</label>
                <select
                  value={paymentStatusFilter}
                  onChange={(e) => setPaymentStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>All Payments</option>
                  <option>Completed</option>
                  <option>Pending</option>
                  <option>Failed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Ranges</label>
                <select
                  value={dateRangeFilter}
                  onChange={(e) => setDateRangeFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>All Dates</option>
                  <option>Today</option>
                  <option>This Week</option>
                  <option>This Month</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bookings List */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">All Bookings ({filteredBookings.length})</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <div key={booking.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <h4 className="text-lg font-semibold text-blue-600">{booking.id}</h4>
                        <div className="flex space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${booking.statusLabels.confirmed?.color || booking.statusLabels.cancelled?.color}`}>
                            {booking.statusLabels.confirmed?.text || booking.statusLabels.cancelled?.text}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            booking.statusLabels.completed?.color || 
                            booking.statusLabels.pending?.color || 
                            booking.statusLabels.failed?.color
                          }`}>
                            {booking.statusLabels.completed?.text || booking.statusLabels.pending?.text || booking.statusLabels.failed?.text}
                          </span>
                          
                        </div>
                      </div>
                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {booking.passenger}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {booking.route}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {booking.date}
                        </div>
                      </div>
                      <div className="flex items-center space-x-6 text-sm text-gray-600 mt-2">
                        <span>Seats: {booking.seats}</span>
                        <span>Bus: {booking.bus}</span>
                        <span>Amount: {booking.amount}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button className="flex items-center px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors" onClick={() => setShowBookingDetails(true)}>
  <Eye className="w-4 h-4 mr-2" />
  View Details
</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Empty State */}
          {filteredBookings.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-500">
                {searchQuery || statusFilter !== 'All Status' || paymentStatusFilter !== 'All Payments'
                  ? 'Try adjusting your search or filter criteria'
                  : 'No bookings have been made yet'
                }
              </p>
            </div>
          )}
        </main>
      </div>
      <BookingDetailsModal open={showBookingDetails} onClose={() => setShowBookingDetails(false)} />
    </div>
  );
}
