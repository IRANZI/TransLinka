import React, { useState } from 'react';
import { X, Bus, Check, Search, Users, Calendar, AlertCircle } from 'lucide-react';

interface BusAssignmentModalProps {
  open: boolean;
  onClose: () => void;
  route: any;
  onAssign: (routeId: number, busIds: number[]) => void;
}

// bus data 
const availableBuses = [
  {
    id: 1,
    name: 'City Express 1',
    plateNumber: 'RAD-123-A',
    make: 'Isuzu',
    model: 'NPR 75L',
    year: 2022,
    seats: 50,
    driver: { name: 'Jean Baptiste Uwimana' },
    status: 'Active',
    currentRoute: null,
    isAssigned: false
  },
  {
    id: 2,
    name: 'City Express 2',
    plateNumber: 'RAD-124-A',
    make: 'Toyota',
    model: 'Coaster',
    year: 2021,
    seats: 45,
    driver: { name: 'Paul Niyonzima' },
    status: 'Active',
    currentRoute: 'Kimisagara → Nyabugogo',
    isAssigned: true
  },
  {
    id: 3,
    name: 'City Express 3',
    plateNumber: 'RAD-125-A',
    make: 'Mercedes',
    model: 'Sprinter',
    year: 2023,
    seats: 35,
    driver: { name: 'Marie Uwimana' },
    status: 'Active',
    currentRoute: null,
    isAssigned: false
  },
  {
    id: 4,
    name: 'City Express 4',
    plateNumber: 'RAD-126-A',
    make: 'Isuzu',
    model: 'NPR 75L',
    year: 2020,
    seats: 50,
    driver: { name: 'David Mugisha' },
    status: 'Maintenance',
    currentRoute: null,
    isAssigned: false
  }
];

export default function BusAssignmentModal({ open, onClose, route, onAssign }: BusAssignmentModalProps) {
  const [selectedBuses, setSelectedBuses] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredBuses = availableBuses.filter(bus => {
    const matchesSearch = bus.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bus.plateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bus.driver.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || 
                         (statusFilter === 'Available' && !bus.isAssigned && bus.status === 'Active') ||
                         (statusFilter === 'Assigned' && bus.isAssigned) ||
                         (statusFilter === 'Maintenance' && bus.status === 'Maintenance');
    return matchesSearch && matchesStatus;
  });

  const handleBusToggle = (busId: number) => {
    setSelectedBuses(prev => 
      prev.includes(busId) 
        ? prev.filter(id => id !== busId)
        : [...prev, busId]
    );
  };

  const handleAssign = () => {
    if (selectedBuses.length > 0) {
      onAssign(route.id, selectedBuses);
      setSelectedBuses([]);
      onClose();
    }
  };

  if (!open || !route) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Assign Buses to Route</h2>
              <p className="text-gray-600 mt-1">
                {route.name}: {route.origin} → {route.destination}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="px-8 py-4 border-b bg-gray-50">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search buses by name, plate number, or driver..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="All">All Buses</option>
              <option value="Available">Available Only</option>
              <option value="Assigned">Already Assigned</option>
              <option value="Maintenance">In Maintenance</option>
            </select>
          </div>
        </div>

        {/* Bus List */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="space-y-4">
            {filteredBuses.map((bus) => (
              <div
                key={bus.id}
                className={`border rounded-lg p-4 transition-all cursor-pointer ${
                  selectedBuses.includes(bus.id)
                    ? 'border-blue-500 bg-blue-50'
                    : bus.status === 'Maintenance'
                    ? 'border-gray-200 bg-gray-50 opacity-60'
                    : bus.isAssigned
                    ? 'border-orange-200 bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => {
                  if (bus.status === 'Active') {
                    handleBusToggle(bus.id);
                  }
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      {bus.status === 'Active' && (
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          selectedBuses.includes(bus.id)
                            ? 'bg-blue-500 border-blue-500'
                            : 'border-gray-300'
                        }`}>
                          {selectedBuses.includes(bus.id) && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                      )}
                      {bus.status === 'Maintenance' && (
                        <AlertCircle className="w-5 h-5 text-orange-500" />
                      )}
                    </div>
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Bus className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{bus.name}</h3>
                      <p className="text-sm text-gray-500">{bus.plateNumber}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{bus.seats} seats</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {bus.make} {bus.model} ({bus.year})
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      <div className="font-medium">Driver:</div>
                      <div className="text-xs text-gray-500">{bus.driver.name}</div>
                    </div>
                    
                    <div className="text-right">
                      {bus.status === 'Maintenance' ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Maintenance
                        </span>
                      ) : bus.isAssigned ? (
                        <div>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mb-1">
                            Currently Assigned
                          </span>
                          <div className="text-xs text-gray-500">{bus.currentRoute}</div>
                        </div>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Available
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredBuses.length === 0 && (
            <div className="text-center py-12">
              <Bus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No buses found</h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t px-8 py-6 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {selectedBuses.length > 0 && (
                <span>
                  {selectedBuses.length} bus{selectedBuses.length !== 1 ? 'es' : ''} selected
                </span>
              )}
            </div>
            <div className="flex space-x-4">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAssign}
                disabled={selectedBuses.length === 0}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  selectedBuses.length > 0
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Assign {selectedBuses.length > 0 ? `${selectedBuses.length} ` : ''}Bus{selectedBuses.length !== 1 ? 'es' : ''}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
