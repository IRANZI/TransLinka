'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import RouteDetailsModal from './RouteDetailsModal';
import EditRouteModal from './EditRouteModal';

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
  MapPin,
  Clock,
  DollarSign,
  Navigation
} from 'lucide-react';

export default function RouteManagementPage() {
  const [showRouteDetails, setShowRouteDetails] = useState(false);
  const [showEditRoute, setShowEditRoute] = useState(false);
  const [editingRoute, setEditingRoute] = useState<any | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [showAddRouteModal, setShowAddRouteModal] = useState(false);
  const [newRouteData, setNewRouteData] = useState({
    name: '',
    origin: '',
    destination: '',
    distance: '',
    duration: '',
    price: '',
    frequency: 'Daily',
    status: 'Active',
    stops: ''
  });

  //route data
  const routes = [
    {
      id: 1,
      name: 'City Express',
      origin: 'Masaka',
      destination: 'Remera',
      distance: '750 km',
      duration: '12h',
      price: '12,000 Rwf',
      activeBuses: 3,
      frequency: 'Daily',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-800',
      stops: [
        { name: 'Kumurindi', time: '06:00' },
        { name: 'Free Zone', time: '08:00' },
        { name: 'KIM University', time: '13:00' }
      ],
      moreStops: 1
    },
    {
      id: 2,
      name: 'City Express',
      origin: 'Masaka',
      destination: 'Remera',
      distance: '750 km',
      duration: '12h',
      price: '12,000 Rwf',
      activeBuses: 3,
      frequency: 'Daily',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-800',
      stops: [
        { name: 'Kumurindi', time: '06:00' },
        { name: 'Free Zone', time: '08:00' },
        { name: 'KIM University', time: '13:00' }
      ],
      moreStops: 1
    }
  ];

  const filteredRoutes = routes.filter(route => {
    const matchesSearch = route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         route.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         route.destination.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || route.status === statusFilter;
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
              <Link href="/admin/bus-management" className="flex items-center px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium">
                <Bus className="w-5 h-5 mr-3" />
                Bus Management
              </Link>
            </li>
            <li>
              <Link href="/admin/route-management" className="flex items-center px-4 py-3 text-blue-600 bg-blue-50 rounded-lg font-medium">
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
              <h1 className="text-2xl font-heading font-bold text-gray-900">Route Management</h1>
              
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Route Management</h2>
            <p className="text-gray-600">Define routes, stops, and timings for bus services</p>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center space-x-4">
              {/* Search Routes */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search routes by name, origin, or destination..."
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
                <option>Inactive</option>
                <option>Under Review</option>
              </select>
            </div>

            {/* Add New Route Button */}
            <button 
              onClick={() => setShowAddRouteModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Route</span>
            </button>
          </div>

          {/* Route Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredRoutes.map((route) => (
              <div key={route.id} className="bg-white rounded-lg shadow-sm border p-6">
                {/* Route Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Navigation className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{route.name}</h3>
                      <p className="text-sm text-gray-500">{route.origin} → {route.destination}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${route.statusColor}`}>
                    {route.status}
                  </span>
                </div>

                {/* Route Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{route.distance}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{route.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="w-4 h-4 mr-2" />
                    <span>{route.price}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Bus className="w-4 h-4 mr-2" />
                    <span>{route.activeBuses} active</span>
                  </div>
                </div>

                {/* Frequency */}
                <div className="mb-4">
                  <span className="text-sm text-gray-600">Frequency: {route.frequency}</span>
                </div>

                {/* Stops */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Stops ({route.stops.length + route.moreStops})</h4>
                  <div className="space-y-2">
                    {route.stops.map((stop, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          <span className="text-gray-900">{stop.name}</span>
                        </div>
                        <span className="text-gray-500">{stop.time}</span>
                      </div>
                    ))}
                    {route.moreStops > 0 && (
                      <div className="text-sm text-gray-500 ml-5">
                        +{route.moreStops} more stops
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex gap-48">
                    <button
                      className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
                      onClick={() => setShowRouteDetails(true)}
                    >
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">View Details</span>
                    </button>
                    <button
                      className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
                      onClick={() => {
                        setEditingRoute(route);
                        setShowEditRoute(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                      <span className="text-sm">Edit</span>
                    </button>
                  </div>
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm">Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredRoutes.length === 0 && (
            <div className="text-center py-12">
              <Route className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No routes found</h3>
              <p className="text-gray-500 mb-4">
                {searchQuery || statusFilter !== 'All Status' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Get started by adding your first route'
                }
              </p>
              {!searchQuery && statusFilter === 'All Status' && (
                <button 
                  onClick={() => setShowAddRouteModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add New Route
                </button>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Add New Route Modal */}
      {showAddRouteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Add New Route</h3>
                  <p className="text-sm text-gray-500 mt-1">Create a new bus route with stops and timings</p>
                </div>
                <button
                  onClick={() => setShowAddRouteModal(false)}
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
              <form className="space-y-6">
               
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Route Name</label>
                    <input
                      type="text"
                      placeholder="City Express"
                      value={newRouteData.name}
                      onChange={(e) => setNewRouteData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                    <select
                      value={newRouteData.frequency}
                      onChange={(e) => setNewRouteData(prev => ({ ...prev, frequency: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Bi-weekly">Bi-weekly</option>
                      <option value="Monthly">Monthly</option>
                    </select>
                  </div>
                </div>

               
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Origin</label>
                    <input
                      type="text"
                      placeholder="Masaka"
                      value={newRouteData.origin}
                      onChange={(e) => setNewRouteData(prev => ({ ...prev, origin: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
                    <input
                      type="text"
                      placeholder="Remera"
                      value={newRouteData.destination}
                      onChange={(e) => setNewRouteData(prev => ({ ...prev, destination: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                    />
                  </div>
                </div>

               
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Distance (km)</label>
                    <input
                      type="number"
                      placeholder="750"
                      value={newRouteData.distance}
                      onChange={(e) => setNewRouteData(prev => ({ ...prev, distance: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration (hours)</label>
                    <input
                      type="number"
                      placeholder="12"
                      value={newRouteData.duration}
                      onChange={(e) => setNewRouteData(prev => ({ ...prev, duration: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                    />
                  </div>
                </div>

               
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price (Rwf)</label>
                    <input
                      type="number"
                      placeholder="15,000"
                      value={newRouteData.price}
                      onChange={(e) => setNewRouteData(prev => ({ ...prev, price: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Stops (comma or newline separated)</label>
                    <textarea
                      placeholder="Kumurindi, Free Zone, KIM University"
                      value={newRouteData.stops || ''}
                      onChange={(e) => setNewRouteData(prev => ({ ...prev, stops: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 min-h-[48px]"
                    />
                  </div>
                </div>
              </form>
            </div>

          
            <div className="p-6 border-t flex space-x-3">
              <button
                onClick={() => {
                  setShowAddRouteModal(false);
                  setNewRouteData({
                    name: '',
                    origin: '',
                    destination: '',
                    distance: '',
                    duration: '',
                    price: '',
                    frequency: 'Daily',
                    status: 'Active',
                    stops:''

                  });
                }}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  
                  console.log('Adding new route:', newRouteData);
                  setShowAddRouteModal(false);
                  setNewRouteData({
                    name: '',
                    origin: '',
                    destination: '',
                    distance: '',
                    duration: '',
                    price: '',
                    frequency: 'Daily',
                    status: 'Active',
                    stops:''
                  });
                }}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
              >
                Add Route
              </button>
            </div>
          </div>
        </div>
      )}

      <RouteDetailsModal open={showRouteDetails} onClose={() => setShowRouteDetails(false)} />
      <EditRouteModal
        open={showEditRoute}
        onClose={() => setShowEditRoute(false)}
        route={editingRoute}
        onEdit={route => {
          
        }}
      />
    </div>
  );
}
