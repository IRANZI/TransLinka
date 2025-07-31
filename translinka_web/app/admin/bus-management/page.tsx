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
  Plus,
  Eye,
  Edit,
  Trash2,
  LogOut,
  Filter,
  MapPin,
  Gauge,
  AlertTriangle
} from 'lucide-react';

export default function BusManagementPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [showAddBusModal, setShowAddBusModal] = useState(false);
  const [newBusData, setNewBusData] = useState({
    name: '',
    plateNumber: '',
    driverName: '',
    seats: 50,
    route: 'Masaka → Remera'
  });

  // Mock bus data
  const buses = [
    {
      id: 1,
      name: 'City Express 1',
      plateNumber: 'LAG-123-AA',
      seats: 50,
      mileage: '125,000 km',
      route: 'Masaka → Remera',
      driver: 'Ahmed Ibrahim',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-800'
    },
    {
      id: 2,
      name: 'City Express 2',
      plateNumber: 'LAG-124-AA',
      seats: 50,
      mileage: '125,000 km',
      route: 'Masaka → Remera',
      driver: 'Ahmed Ibrahim',
      status: 'Maintenance',
      statusColor: 'bg-orange-100 text-orange-800'
    }
  ];

  const filteredBuses = buses.filter(bus => {
    const matchesSearch = bus.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bus.plateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bus.driver.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || bus.status === statusFilter;
    return matchesSearch && matchesStatus;
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
              <Link href="/admin/bus-management" className="flex items-center px-4 py-3 text-blue-600 bg-blue-50 rounded-lg font-medium">
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
              <Link href="/admin/users" className="flex items-center px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium">
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
              <h1 className="text-2xl font-heading font-bold text-gray-900">Bus Management</h1>
              
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
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Bus Fleet Management</h2>
            <p className="text-gray-600">Manage your bus fleet, track maintenance, and monitor performance</p>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center space-x-4">
              {/* Search Buses */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search buses by name, plate number, or driver..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Maintenance</option>
                <option>Inactive</option>
              </select>
            </div>

            {/* Add New Bus Button */}
            <button 
              onClick={() => setShowAddBusModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Bus</span>
            </button>
          </div>

          {/* Bus Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBuses.map((bus) => (
              <div key={bus.id} className="bg-white rounded-lg shadow-sm border p-6">
                {/* Bus Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Bus className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{bus.name}</h3>
                      <p className="text-sm text-gray-500">{bus.plateNumber}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${bus.statusColor}`}>
                    {bus.status === 'Maintenance' && <AlertTriangle className="w-3 h-3 inline mr-1" />}
                    {bus.status}
                  </span>
                </div>

                {/* Bus Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{bus.seats} seats</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Gauge className="w-4 h-4 mr-2" />
                    <span>{bus.mileage}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{bus.route}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Driver:</span> {bus.driver}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">View</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors">
                    <Edit className="w-4 h-4" />
                    <span className="text-sm">Edit</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm">Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredBuses.length === 0 && (
            <div className="text-center py-12">
              <Bus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No buses found</h3>
              <p className="text-gray-500 mb-4">
                {searchQuery || statusFilter !== 'All Status' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Get started by adding your first bus to the fleet'
                }
              </p>
              {!searchQuery && statusFilter === 'All Status' && (
                <button 
                  onClick={() => setShowAddBusModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add New Bus
                </button>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Add New Bus Modal */}
      {showAddBusModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            {/* Modal Header */}
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Add New Bus</h3>
                  <p className="text-sm text-gray-500 mt-1">Add a new bus to your fleet</p>
                </div>
                <button
                  onClick={() => setShowAddBusModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <form className="space-y-4">
                {/* Bus Name */}
                <div>
                  <input
                    type="text"
                    placeholder="Bus name"
                    value={newBusData.name}
                    onChange={(e) => setNewBusData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                  />
                </div>

                {/* Plate Number */}
                <div>
                  <input
                    type="text"
                    placeholder="Plate number"
                    value={newBusData.plateNumber}
                    onChange={(e) => setNewBusData(prev => ({ ...prev, plateNumber: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                  />
                </div>

                {/* Driver Name */}
                <div>
                  <input
                    type="text"
                    placeholder="Driver name"
                    value={newBusData.driverName}
                    onChange={(e) => setNewBusData(prev => ({ ...prev, driverName: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                  />
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t flex space-x-3">
              <button
                onClick={() => {
                  setShowAddBusModal(false);
                  setNewBusData({ name: '', plateNumber: '', driverName: '', seats: 50, route: 'Masaka → Remera' });
                }}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Here you would typically add the bus to your state/database
                  console.log('Adding new bus:', newBusData);
                  setShowAddBusModal(false);
                  setNewBusData({ name: '', plateNumber: '', driverName: '', seats: 50, route: 'Masaka → Remera' });
                }}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
              >
                Add Bus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
