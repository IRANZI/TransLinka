'use client';
import React, { useState } from 'react';
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
  TrendingUp, 
  TrendingDown,
  Plus,
  MapPin,
  Eye,
  Settings,
  LogOut
} from 'lucide-react';

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState('');

  // admin data
  const adminData = {
    totalRevenue: '30,000 Rwf',
    revenueChange: '+10.5% from last month',
    totalBookings: '1,248',
    bookingsChange: '+4.3% from last month',
    activeUsers: '8,542',
    usersChange: '+18.2% from last month',
    activeBuses: '127',
    busesChange: '-0.1% utilization'
  };

  const recentBookings = [
    {
      id: 1,
      passenger: 'John Doe',
      route: 'Masaka → Remera',
      bookingRef: 'BK001',
      departure: '1/6/2024, 8:00:00 AM',
      amount: '15,000 Rwf',
      status: 'Confirmed'
    },
    {
      id: 2,
      passenger: 'Sarah Johnson',
      route: 'Masaka → Remera',
      bookingRef: 'BK002',
      departure: '1/6/2024, 10:30:00 AM',
      amount: '18,000 Rwf',
      status: 'Pending'
    },
    {
      id: 3,
      passenger: 'Michael Brown',
      route: 'Masaka → Remera',
      bookingRef: 'BK003',
      departure: '1/5/2024, 2:00:00 PM',
      amount: '12,999 Rwf',
      status: 'Confirmed'
    },
    {
      id: 4,
      passenger: 'Emma Wilson',
      route: 'Masaka → Remera',
      bookingRef: 'BK004',
      departure: '1/5/2024, 4:45:00 PM',
      amount: '9,500 Rwf',
      status: 'Cancelled'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
              <Link href="/admin" className="flex items-center px-4 py-3 text-blue-600 bg-blue-50 rounded-lg font-medium">
                <LayoutDashboard className="w-5 h-5 mr-3" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/admin/bus-management" className="flex items-center px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium">
                <Bus className="w-5 h-5 mr-3" />
                Bus Management
              </Link>
            </li>
            <li>
              <Link href="/admin/route-management" className="flex items-center px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium">
                <Route className="w-5 h-5 mr-3" />
                Route Management
              </Link>
            </li>
            <li>
              <Link href="/admin/bookings" className="flex items-center px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium">
                <Calendar className="w-5 h-5 mr-3" />
                Bookings
              </Link>
            </li>
            <li>
              <Link href="/admin/user-management" className="flex items-center px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium">
                <Users className="w-5 h-5 mr-3" />
                Users
              </Link>
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
              <h1 className="text-2xl font-heading font-bold text-gray-900">Dashboard</h1>
              
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

        {/* Dashboard Content */}
        <main className="flex-1 p-6 sm:p-8 lg:p-12">
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Revenue */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{adminData.totalRevenue}</div>
              <div className="text-sm text-green-600">{adminData.revenueChange}</div>
            </div>

            {/* Total Bookings */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500">Total Bookings</h3>
                <Calendar className="w-5 h-5 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{adminData.totalBookings}</div>
              <div className="text-sm text-green-600">{adminData.bookingsChange}</div>
            </div>

            {/* Active Users */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500">Active Users</h3>
                <Users className="w-5 h-5 text-purple-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{adminData.activeUsers}</div>
              <div className="text-sm text-green-600">{adminData.usersChange}</div>
            </div>

            {/* Active Buses */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500">Active Buses</h3>
                <Bus className="w-5 h-5 text-orange-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{adminData.activeBuses}</div>
              <div className="text-sm text-red-600">{adminData.busesChange}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Bookings */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
                    <span className="text-sm text-gray-500">Latest ticket reservations</span>
                    <Link href="/admin/bookings" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View All
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <div>
                              <div className="font-medium text-gray-900">{booking.passenger}</div>
                              <div className="text-sm text-gray-500">{booking.route} {booking.bookingRef}</div>
                              <div className="text-sm text-gray-500">Departure: {booking.departure}</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                          <div className="text-right">
                            <div className="font-medium text-gray-900">{booking.amount}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
                <p className="text-sm text-gray-500">Common administrative tasks</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <Bus className="w-6 h-6 text-blue-600 mb-2" />
                    <span className="text-sm font-medium text-gray-900">Add Bus</span>
                  </button>
                  <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <MapPin className="w-6 h-6 text-green-600 mb-2" />
                    <span className="text-sm font-medium text-gray-900">Add Route</span>
                  </button>
                  <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <Eye className="w-6 h-6 text-purple-600 mb-2" />
                    <span className="text-sm font-medium text-gray-900">View Bookings</span>
                  </button>
                  <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <Users className="w-6 h-6 text-orange-600 mb-2" />
                    <span className="text-sm font-medium text-gray-900">Manage Users</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
