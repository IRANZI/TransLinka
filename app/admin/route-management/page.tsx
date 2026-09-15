'use client';
import React, { useEffect, useState } from 'react';
import RouteDetailsModal from './RouteDetailsModal';
import EditRouteModal from './EditRouteModal';
import BusAssignmentModal from './BusAssignmentModal';
import AdminHeader from '@/components/AdminHeader';
import { useFleet } from '@/components/FleetProvider';
import { useAuth } from '@/components/AuthProvider';
import { api } from '@/lib/api';
import {
  Search,
  Bus,
  Route,
  Plus,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Clock,
  DollarSign,
  Navigation,
  X,
  Check,
} from 'lucide-react';

export default function RouteManagementPage() {
  const { user } = useAuth();
  const { buses, assignBusesToRoute, refresh } = useFleet();
  const [showRouteDetails, setShowRouteDetails] = useState(false);
  const [showEditRoute, setShowEditRoute] = useState(false);
  const [editingRoute, setEditingRoute] = useState<any | null>(null);
  const [showBusAssignment, setShowBusAssignment] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<any | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [showAddRouteModal, setShowAddRouteModal] = useState(false);
  const [routes, setRoutes] = useState<any[]>([]);
  const [newRouteData, setNewRouteData] = useState({
    name: '',
    origin: '',
    destination: '',
    distance: '',
    duration: '',
    price: '',
    frequency: 'Daily',
    status: 'Active',
    stops: '',
    companyId: ''
  });
  const [newRouteBusIds, setNewRouteBusIds] = useState<string[]>([]);
  const [companies, setCompanies] = useState<{ id: string; name: string }[]>([]);

  const loadRoutes = async () => {
    try {
      const data = await api<any[]>('/api/admin/routes');
      setRoutes(
        (data || []).map((route) => ({
          ...route,
          distance: route.distanceKm || route.distance || 'TBD',
          price: typeof route.price === 'number' ? `${route.price.toLocaleString()} Rwf` : route.price,
          status:
            route.status === 'ACTIVE'
              ? 'Active'
              : route.status === 'INACTIVE'
                ? 'Inactive'
                : route.status === 'MAINTENANCE'
                  ? 'Maintenance'
                  : route.status,
          busesAssigned: route.busesAssigned ?? route.buses?.length ?? 0,
          assignedBusIds: route.assignedBusIds ?? route.buses?.map((bus: any) => bus.id) ?? [],
        }))
      );
    } catch {
      setRoutes([]);
    }
  };

  useEffect(() => {
    loadRoutes();
  }, []);

  useEffect(() => {
    if (user?.role !== 'SUPER_ADMIN') return;
    api<any[]>('/api/super-admin/companies')
      .then((data) => setCompanies((data || []).map((company) => ({ id: company.id, name: company.name }))))
      .catch(() => setCompanies([]));
  }, [user?.role]);

  const filteredRoutes = routes.filter(route => {
    const matchesSearch = route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         route.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         route.destination.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || route.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-navy-50">
      <AdminHeader />

      <main className="page-wrap py-6 sm:py-8">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-navy-900 sm:text-3xl">Routes</h1>
            <p className="mt-1 text-navy-600">Define origins, stops, fares, and assigned coaches.</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setNewRouteBusIds([]);
              setShowAddRouteModal(true);
            }}
            className="btn-primary"
          >
            <Plus className="h-4 w-4" />
            Add route
          </button>
        </div>

        <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-navy-100 bg-white p-4 shadow-soft sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
            <input
              type="text"
              placeholder="Search by name, origin, or destination"
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
            <option>Inactive</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {filteredRoutes.map((route) => (
            <div key={route.id} className="rounded-2xl border border-navy-100 bg-white p-5 shadow-soft">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-700 text-white">
                    <Navigation className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-900">{route.name}</h3>
                    <p className="text-sm text-navy-500">
                      {route.origin} → {route.destination}
                    </p>
                  </div>
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    route.status === 'Active' ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
                  }`}
                >
                  {route.status}
                </span>
              </div>

              <div className="mb-4 grid grid-cols-2 gap-3 text-sm text-navy-600">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {route.distance}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {route.duration}
                </span>
                <span className="inline-flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  {route.price}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Bus className="h-4 w-4" />
                  {route.busesAssigned} assigned
                </span>
              </div>
              <p className="mb-4 text-sm text-navy-600">Frequency: {route.frequency}</p>
              {route.assignedBusIds?.length > 0 && (
                <p className="mb-4 text-sm text-navy-600">
                  Buses:{' '}
                  {buses
                    .filter((bus) => route.assignedBusIds.includes(bus.id))
                    .map((bus) => bus.name)
                    .join(', ') || `${route.busesAssigned} assigned`}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-3 border-t border-navy-100 pt-4">
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-sm font-medium text-navy-700"
                  onClick={() => {
                    setSelectedRoute(route);
                    setShowRouteDetails(true);
                  }}
                >
                  <Eye className="h-4 w-4" />
                  Details
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-sm font-medium text-navy-700"
                  onClick={() => {
                    setEditingRoute(route);
                    setShowEditRoute(true);
                  }}
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-lg bg-navy-50 px-2.5 py-1 text-sm font-medium text-navy-800"
                  onClick={() => {
                    setSelectedRoute(route);
                    setShowBusAssignment(true);
                  }}
                >
                  <Bus className="h-4 w-4" />
                  Assign
                </button>
                <button
                  type="button"
                  className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-rose-700"
                  onClick={async () => {
                    if (!window.confirm(`Delete ${route.name}?`)) return;
                    await api(`/api/admin/routes?id=${encodeURIComponent(route.id)}`, { method: 'DELETE' });
                    await refresh();
                    await loadRoutes();
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredRoutes.length === 0 && (
          <div className="rounded-2xl border border-navy-100 bg-white py-12 text-center shadow-soft">
            <Route className="mx-auto mb-3 h-10 w-10 text-navy-300" />
            <h3 className="text-lg font-semibold text-navy-900">No routes found</h3>
            <p className="mt-1 text-navy-500">Try a different search, or add a new route.</p>
          </div>
        )}
      </main>

      {/* Add New Route Modal */}
      {showAddRouteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/50 p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-lift">
            <div className="border-b border-navy-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-navy-900">Add route</h3>
                  <p className="mt-1 text-sm text-navy-500">Set the trip, then assign buses already registered in the fleet.</p>
                </div>
                <button
                  onClick={() => setShowAddRouteModal(false)}
                  className="rounded-lg p-2 text-navy-400 hover:bg-navy-50 hover:text-navy-800"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <form className="space-y-6">
               
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {companies.length > 0 && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                      <select
                        value={newRouteData.companyId}
                        onChange={(e) => setNewRouteData(prev => ({ ...prev, companyId: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                      >
                        <option value="">Select company</option>
                        {companies.map((company) => (
                          <option key={company.id} value={company.id}>
                            {company.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Route Name</label>
                    <input
                      type="text"
                      placeholder="City Express"
                      value={newRouteData.name}
                      onChange={(e) => setNewRouteData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-navy-500 focus:border-transparent placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                    <select
                      value={newRouteData.frequency}
                      onChange={(e) => setNewRouteData(prev => ({ ...prev, frequency: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    >
                      <option value="Daily">Every 30 min</option>
                      <option value="Weekly">Each hour</option>
                      <option value="Bi-weekly">Every 25 hours</option>
                   
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-navy-500 focus:border-transparent placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
                    <input
                      type="text"
                      placeholder="Remera"
                      value={newRouteData.destination}
                      onChange={(e) => setNewRouteData(prev => ({ ...prev, destination: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-navy-500 focus:border-transparent placeholder-gray-500"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-navy-500 focus:border-transparent placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration (hours)</label>
                    <input
                      type="number"
                      placeholder="12"
                      value={newRouteData.duration}
                      onChange={(e) => setNewRouteData(prev => ({ ...prev, duration: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-navy-500 focus:border-transparent placeholder-gray-500"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-navy-500 focus:border-transparent placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Stops (comma or newline separated)</label>
                    <textarea
                      placeholder="Kumurindi, Free Zone, KIM University"
                      value={newRouteData.stops || ''}
                      onChange={(e) => setNewRouteData(prev => ({ ...prev, stops: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-navy-500 focus:border-transparent placeholder-gray-500 min-h-[48px]"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-navy-800">
                    Assign registered buses
                  </label>
                  <p className="mb-3 text-sm text-navy-500">
                    Only buses already added under Buses can be assigned. Register a coach first if it is missing.
                  </p>
                  {buses.length === 0 ? (
                    <div className="rounded-xl border border-navy-100 bg-navy-50 px-4 py-5 text-sm text-navy-600">
                      No registered buses yet. Open Buses and add a coach, then come back here.
                    </div>
                  ) : (
                    <div className="max-h-56 space-y-2 overflow-y-auto rounded-xl border border-navy-100 p-2">
                      {buses.map((bus) => {
                        const selected = newRouteBusIds.includes(bus.id);
                        const disabled = bus.status !== 'Active';
                        return (
                          <button
                            type="button"
                            key={bus.id}
                            disabled={disabled}
                            onClick={() =>
                              setNewRouteBusIds((prev) =>
                                prev.includes(bus.id)
                                  ? prev.filter((id) => id !== bus.id)
                                  : [...prev, bus.id]
                              )
                            }
                            className={`flex w-full items-start gap-3 rounded-lg p-3 text-left ${
                              disabled
                                ? 'cursor-not-allowed bg-navy-50 text-navy-400'
                                : selected
                                  ? 'bg-navy-50 ring-1 ring-navy-500'
                                  : 'hover:bg-navy-50'
                            }`}
                          >
                            <span
                              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 ${
                                selected ? 'border-navy-700 bg-navy-700' : 'border-navy-300'
                              }`}
                            >
                              {selected && <Check className="h-3 w-3 text-white" />}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block font-medium text-navy-900">
                                {bus.name} · {bus.plateNumber}
                              </span>
                              <span className="block text-xs text-navy-500">
                                {bus.driver.name} · {bus.seats} seats
                                {disabled
                                  ? ` · ${bus.status}`
                                  : bus.assignedRouteName
                                    ? ` · currently ${bus.assignedRouteName}`
                                    : ' · available'}
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </form>
            </div>

          
            <div className="p-6 border-t flex space-x-3">
              <button
                onClick={() => {
                  setShowAddRouteModal(false);
                  setNewRouteBusIds([]);
                  setNewRouteData({
                    name: '',
                    origin: '',
                    destination: '',
                    distance: '',
                    duration: '',
                    price: '',
                    frequency: 'Daily',
                    status: 'Active',
                    stops: '',
                    companyId: ''
                  });
                }}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  if (!newRouteData.name || !newRouteData.origin || !newRouteData.destination || !newRouteData.price) {
                    alert('Please fill in all required fields');
                    return;
                  }
                  if (user?.role === 'SUPER_ADMIN' && !newRouteData.companyId) {
                    alert('Select a company for this route');
                    return;
                  }

                  await api('/api/admin/routes', {
                    method: 'POST',
                    body: JSON.stringify({
                      companyId: newRouteData.companyId || undefined,
                      name: newRouteData.name,
                      origin: newRouteData.origin,
                      destination: newRouteData.destination,
                      distance: newRouteData.distance ? `${newRouteData.distance} km` : undefined,
                      duration: newRouteData.duration,
                      price: newRouteData.price,
                      frequency: newRouteData.frequency,
                      stops: newRouteData.stops,
                      busIds: newRouteBusIds,
                    }),
                  });
                  await refresh();
                  await loadRoutes();
                  setShowAddRouteModal(false);
                  setNewRouteBusIds([]);
                  setNewRouteData({
                    name: '',
                    origin: '',
                    destination: '',
                    distance: '',
                    duration: '',
                    price: '',
                    frequency: 'Daily',
                    status: 'Active',
                    stops: '',
                    companyId: ''
                  });
                }}
                className="btn-primary flex-1"
              >
                Add Route
              </button>
            </div>
          </div>
        </div>
      )}

      <RouteDetailsModal open={showRouteDetails} onClose={() => setShowRouteDetails(false)} route={selectedRoute} />
      <EditRouteModal
        open={showEditRoute}
        onClose={() => setShowEditRoute(false)}
        route={editingRoute}
        onEdit={async (route) => {
          if (!editingRoute) return;
          await api('/api/admin/routes', {
            method: 'PUT',
            body: JSON.stringify({
              id: editingRoute.id,
              name: route.name,
              origin: route.origin,
              destination: route.destination,
              distance: route.distance,
              duration: route.duration,
              price: route.price,
              frequency: route.frequency,
              status: route.status,
              stops: Array.isArray(route.stops) ? route.stops.join(', ') : route.stops,
            }),
          });
          await loadRoutes();
        }}
      />
      <BusAssignmentModal
        open={showBusAssignment}
        onClose={() => setShowBusAssignment(false)}
        route={selectedRoute}
        onAssign={async (routeId: string, busIds: string[]) => {
          const current = routes.find((route) => route.id === routeId);
          const label = current
            ? `${current.origin} → ${current.destination}`
            : 'Assigned route';
          await assignBusesToRoute(routeId, label, busIds);
          await loadRoutes();
          setShowBusAssignment(false);
        }}
      />
    </div>
  );
}
