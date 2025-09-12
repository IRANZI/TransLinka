'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import BusDetailsModal from './BusDetailsModal';
import EditBusModal from './EditBusModal';
import BusRegistrationModal from './BusRegistrationModal';
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
  const [showBusDetails, setShowBusDetails] = useState(false);
  const [showEditBus, setShowEditBus] = useState(false);
  const [editingBus, setEditingBus] = useState<any | null>(null);
  const [selectedBus, setSelectedBus] = useState<any | null>(null);
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

  //bus data
  const buses = [
    {
      id: 1,
      name: 'City Express 1',
      plateNumber: 'RAD-123-A',
      chassisNumber: 'CH123456789',
      engineNumber: 'EN987654321',
      make: 'Isuzu',
      model: 'NPR 75L',
      year: 2022,
      color: 'White',
      seats: 50,
      mileage: '125,000 km',
      route: 'Masaka → Remera',
      driver: {
        name: 'Jean Baptiste Uwimana',
        licenseNumber: 'DL-2023-001234',
        nationalId: '1199012345678901'
      },
      company: {
        name: 'TransLinka Express Ltd',
        registrationNumber: 'REG-2023-001',
        contactPerson: 'Marie Mukamana',
        phone: '+250788123456'
      },
      documents: {
        vehicleRegistration: 'VR-2023-001.pdf',
        roadworthinessCertificate: 'RC-2023-001.pdf',
        insuranceCertificate: 'IC-2023-001.pdf',
        operatingLicense: 'OL-2023-001.pdf'
      },
      safetyEquipment: {
        fireExtinguisher: true,
        firstAidKit: true,
        emergencyTriangle: true,
        reflectiveVest: true,
        speedLimiter: true,
        gpsTracker: true
      },
      status: 'Active',
      statusColor: 'bg-green-100 text-green-800',
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-04-15'
    },
    {
      id: 2,
      name: 'City Express 2',
      plateNumber: 'RAD-124-A',
      chassisNumber: 'CH123456790',
      engineNumber: 'EN987654322',
      make: 'Toyota',
      model: 'Coaster',
      year: 2021,
      color: 'Blue',
      seats: 45,
      mileage: '98,500 km',
      route: 'Kimisagara → Nyabugogo',
      driver: {
        name: 'Paul Niyonzima',
        licenseNumber: 'DL-2023-001235',
        nationalId: '1199012345678902'
      },
      company: {
        name: 'TransLinka Express Ltd',
        registrationNumber: 'REG-2023-001',
        contactPerson: 'Marie Mukamana',
        phone: '+250788123456'
      },
      documents: {
        vehicleRegistration: 'VR-2023-002.pdf',
        roadworthinessCertificate: 'RC-2023-002.pdf',
        insuranceCertificate: 'IC-2023-002.pdf',
        operatingLicense: 'OL-2023-002.pdf'
      },
      safetyEquipment: {
        fireExtinguisher: true,
        firstAidKit: true,
        emergencyTriangle: true,
        reflectiveVest: true,
        speedLimiter: false,
        gpsTracker: true
      },
      status: 'Maintenance',
      statusColor: 'bg-orange-100 text-orange-800',
      lastMaintenance: '2024-02-01',
      nextMaintenance: '2024-05-01'
    }
  ];

  const filteredBuses = buses.filter(bus => {
    const matchesSearch = bus.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bus.plateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bus.driver.name.toLowerCase().includes(searchQuery.toLowerCase());
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
              <Link href="/admin/bookings" className="flex items-center px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium">
                <Calendar className="w-5 h-5 mr-3" />
                Bookings
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
              <h1 className="text-2xl font-heading font-bold text-gray-900">Bus </h1>
              
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
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      <span>{bus.seats} seats</span>
                    </div>
                    <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {bus.year}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Make/Model:</span> {bus.make} {bus.model}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Driver:</span> {bus.driver.name}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors" onClick={() => {
                    setSelectedBus(bus);
                    setShowBusDetails(true);
                  }}>
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">View Details</span>
                  </button>
                  <button
                    className="p-2 border rounded-md text-gray-600 hover:bg-gray-100"
                    onClick={() => {
                      setEditingBus(bus);
                      setShowEditBus(true);
                    }}
                  >
                    <Edit className="w-4 h-4" />
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
        <BusRegistrationModal 
          open={showAddBusModal} 
          onClose={() => setShowAddBusModal(false)} 
          onSubmit={(busData) => {
            // Handle bus registration submission
            console.log('New bus registered:', busData);
            // TODO: Add API call to save bus data
            setShowAddBusModal(false);
          }}
        />
      )}
      <BusDetailsModal open={showBusDetails} onClose={() => setShowBusDetails(false)} bus={selectedBus} />
      <EditBusModal
        open={showEditBus}
        onClose={() => setShowEditBus(false)}
        bus={editingBus}
        onEdit={bus => {
         
        }}
      />
    </div>
  );
}
