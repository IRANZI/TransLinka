'use client';
import React, { useEffect, useState } from 'react';
import BusDetailsModal from './BusDetailsModal';
import EditBusModal from './EditBusModal';
import BusRegistrationModal from './BusRegistrationModal';
import AdminHeader from '@/components/AdminHeader';
import { statusColorFor, useFleet, type FleetBus } from '@/components/FleetProvider';
import { useAuth } from '@/components/AuthProvider';
import { api } from '@/lib/api';
import {
  Search,
  Bus,
  Users,
  Plus,
  Eye,
  Edit,
  Trash2,
  AlertTriangle,
} from 'lucide-react';

function busFromRegistration(data: any): Omit<FleetBus, 'id'> {
  return {
    name: data.name || 'Unnamed bus',
    plateNumber: data.plateNumber || 'Pending',
    chassisNumber: data.chassisNumber || '',
    engineNumber: data.engineNumber || '',
    make: data.make || '',
    model: data.model || '',
    year: data.year || new Date().getFullYear(),
    color: data.color || '',
    seats: Number(data.seats) || 50,
    mileage: '0 km',
    assignedRouteId: null,
    assignedRouteName: null,
    driver: {
      name: data.driverName || '',
      licenseNumber: data.driverLicense || '',
      nationalId: data.driverNationalId || '',
    },
    company: {
      name: data.companyName || 'TransLinka Express Ltd',
      registrationNumber: data.companyLicense || '',
      contactPerson: data.ownerName || '',
      phone: data.ownerPhone || '',
    },
    documents: {
      vehicleRegistration: data.registrationCertificate?.name || 'Uploaded',
      roadworthinessCertificate: data.roadworthinessPermit?.name || 'Uploaded',
      insuranceCertificate: data.insuranceCertificate?.name || 'Uploaded',
      operatingLicense: data.operatingLicense?.name || 'Uploaded',
    },
    safetyEquipment: {
      fireExtinguisher: Boolean(data.fireExtinguisher),
      firstAidKit: Boolean(data.firstAidKit),
      emergencyTriangle: Boolean(data.emergencyExits),
      reflectiveVest: Boolean(data.seatBelts),
      speedLimiter: Boolean(data.speedLimiter),
      gpsTracker: true,
    },
    status: 'Active',
    statusColor: statusColorFor('Active'),
    lastMaintenance: new Date().toISOString().slice(0, 10),
    nextMaintenance: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
  };
}

export default function BusManagementPage() {
  const { user } = useAuth();
  const { buses, addBus, updateBus, deleteBus } = useFleet();
  const [showBusDetails, setShowBusDetails] = useState(false);
  const [showEditBus, setShowEditBus] = useState(false);
  const [editingBus, setEditingBus] = useState<FleetBus | null>(null);
  const [selectedBus, setSelectedBus] = useState<FleetBus | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [showAddBusModal, setShowAddBusModal] = useState(false);
  const [companies, setCompanies] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    if (user?.role !== 'SUPER_ADMIN') return;
    api<any[]>('/api/super-admin/companies')
      .then((data) => setCompanies((data || []).map((company) => ({ id: company.id, name: company.name }))))
      .catch(() => setCompanies([]));
  }, [user?.role]);

  const filteredBuses = buses.filter((bus) => {
    const matchesSearch =
      bus.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bus.plateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bus.driver.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || bus.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-navy-50">
      <AdminHeader />

      <main className="page-wrap py-6 sm:py-8">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-navy-900 sm:text-3xl">Buses</h1>
            <p className="mt-1 text-navy-600">Register coaches here, then assign them from Routes.</p>
          </div>
          <button type="button" onClick={() => setShowAddBusModal(true)} className="btn-primary">
            <Plus className="h-4 w-4" />
            Add bus
          </button>
        </div>

        <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-navy-100 bg-white p-4 shadow-soft sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
            <input
              type="text"
              placeholder="Search by name, plate, or driver"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-navy-100 bg-navy-50/60 px-4 py-3 text-sm text-navy-900 outline-none focus:border-navy-500 focus:bg-white focus:ring-2 focus:ring-navy-500/20"
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Maintenance</option>
            <option>Inactive</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredBuses.map((bus) => (
            <div key={bus.id} className="rounded-2xl border border-navy-100 bg-white p-5 shadow-soft">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-700 text-white">
                    <Bus className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-900">{bus.name}</h3>
                    <p className="text-sm text-navy-500">{bus.plateNumber}</p>
                  </div>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${bus.statusColor}`}>
                  {bus.status === 'Maintenance' && <AlertTriangle className="mr-1 inline h-3 w-3" />}
                  {bus.status}
                </span>
              </div>

              <div className="space-y-2 text-sm text-navy-600">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {bus.seats} seats
                  </span>
                  <span className="rounded-lg bg-navy-50 px-2 py-0.5 text-xs text-navy-700">{bus.year}</span>
                </div>
                <p>
                  <span className="font-medium text-navy-800">Make:</span> {bus.make} {bus.model}
                </p>
                <p>
                  <span className="font-medium text-navy-800">Driver:</span> {bus.driver.name}
                </p>
                <p>
                  <span className="font-medium text-navy-800">Route:</span>{' '}
                  {bus.assignedRouteName || 'Unassigned'}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-navy-100 pt-4">
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-sm font-medium text-navy-700 hover:text-navy-900"
                  onClick={() => {
                    setSelectedBus(bus);
                    setShowBusDetails(true);
                  }}
                >
                  <Eye className="h-4 w-4" />
                  Details
                </button>
                <button
                  type="button"
                  className="rounded-lg p-2 text-navy-600 hover:bg-navy-50"
                  onClick={() => {
                    setEditingBus(bus);
                    setShowEditBus(true);
                  }}
                  aria-label="Edit bus"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-sm font-medium text-rose-700 hover:text-rose-800"
                  onClick={async () => {
                    if (window.confirm(`Delete ${bus.name}?`)) {
                      await deleteBus(bus.id);
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredBuses.length === 0 && (
          <div className="rounded-2xl border border-navy-100 bg-white py-12 text-center shadow-soft">
            <Bus className="mx-auto mb-3 h-10 w-10 text-navy-300" />
            <h3 className="text-lg font-semibold text-navy-900">No buses found</h3>
            <p className="mt-1 text-navy-500">
              {searchQuery || statusFilter !== 'All Status'
                ? 'Try a different search or filter.'
                : 'Add the first coach to this fleet.'}
            </p>
          </div>
        )}
      </main>

      {showAddBusModal && (
        <BusRegistrationModal
          open={showAddBusModal}
          onClose={() => setShowAddBusModal(false)}
          companies={companies}
          onSubmit={async (busData) => {
            await addBus({ ...busFromRegistration(busData), companyId: busData.companyId });
            setShowAddBusModal(false);
          }}
        />
      )}
      <BusDetailsModal open={showBusDetails} onClose={() => setShowBusDetails(false)} bus={selectedBus} />
      <EditBusModal
        open={showEditBus}
        onClose={() => setShowEditBus(false)}
        bus={editingBus as any}
        onEdit={async (bus) => {
          if (editingBus) {
            await updateBus({
              ...editingBus,
              ...bus,
              statusColor: statusColorFor(bus.status),
            });
          }
        }}
      />
    </div>
  );
}
