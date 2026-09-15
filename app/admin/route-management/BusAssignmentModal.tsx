import React, { useEffect, useState } from 'react';
import { X, Bus, Check, Search, Users, AlertCircle } from 'lucide-react';
import { useFleet } from '@/components/FleetProvider';

interface BusAssignmentModalProps {
  open: boolean;
  onClose: () => void;
  route: any;
  onAssign: (routeId: string, busIds: string[]) => void;
}

export default function BusAssignmentModal({ open, onClose, route, onAssign }: BusAssignmentModalProps) {
  const { buses } = useFleet();
  const [selectedBuses, setSelectedBuses] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    if (open) {
      setSelectedBuses(Array.isArray(route?.assignedBusIds) ? route.assignedBusIds : []);
      setSearchQuery('');
      setStatusFilter('All');
    }
  }, [open, route]);

  const filteredBuses = buses.filter((bus) => {
    const matchesSearch =
      bus.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bus.plateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bus.driver.name.toLowerCase().includes(searchQuery.toLowerCase());
    const assigned = Boolean(bus.assignedRouteId);
    const matchesStatus =
      statusFilter === 'All' ||
      (statusFilter === 'Available' && !assigned && bus.status === 'Active') ||
      (statusFilter === 'Assigned' && assigned) ||
      (statusFilter === 'Maintenance' && bus.status === 'Maintenance');
    return matchesSearch && matchesStatus;
  });

  const handleBusToggle = (busId: string) => {
    setSelectedBuses((prev) =>
      prev.includes(busId) ? prev.filter((id) => id !== busId) : [...prev, busId]
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/50 p-4">
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-lift">
        <div className="border-b border-navy-100 px-6 py-5 sm:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-navy-900 sm:text-2xl">Assign registered buses</h2>
              <p className="mt-1 text-sm text-navy-600">
                {route.name}: {route.origin} → {route.destination}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-navy-400 hover:bg-navy-50 hover:text-navy-800"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="border-b border-navy-100 bg-navy-50/60 px-6 py-4 sm:px-8">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
              <input
                type="text"
                placeholder="Search registered buses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-navy-100 bg-white px-4 py-3 text-sm text-navy-900 outline-none focus:border-navy-500 focus:ring-2 focus:ring-navy-500/20"
            >
              <option value="All">All registered buses</option>
              <option value="Available">Available only</option>
              <option value="Assigned">Already assigned</option>
              <option value="Maintenance">In maintenance</option>
            </select>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 sm:px-8">
          <div className="space-y-3">
            {filteredBuses.map((bus) => {
              const assigned = Boolean(bus.assignedRouteId);
              const selectable = bus.status === 'Active';
              return (
                <div
                  key={bus.id}
                  className={`rounded-xl border p-4 transition ${
                    selectedBuses.includes(bus.id)
                      ? 'border-navy-500 bg-navy-50'
                      : bus.status === 'Maintenance'
                        ? 'border-navy-100 bg-navy-50/50 opacity-70'
                        : assigned
                          ? 'border-amber-200 bg-amber-50'
                          : 'border-navy-100 hover:border-navy-300'
                  } ${selectable ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                  onClick={() => {
                    if (selectable) handleBusToggle(bus.id);
                  }}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      {selectable ? (
                        <div
                          className={`flex h-5 w-5 items-center justify-center rounded border-2 ${
                            selectedBuses.includes(bus.id)
                              ? 'border-navy-600 bg-navy-600'
                              : 'border-navy-300'
                          }`}
                        >
                          {selectedBuses.includes(bus.id) && <Check className="h-3 w-3 text-white" />}
                        </div>
                      ) : (
                        <AlertCircle className="h-5 w-5 text-amber-500" />
                      )}
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-100">
                        <Bus className="h-5 w-5 text-navy-700" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-navy-900">{bus.name}</h3>
                        <p className="text-sm text-navy-500">{bus.plateNumber}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-navy-600">
                      <div>
                        <div className="inline-flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {bus.seats} seats
                        </div>
                        <div className="text-xs text-navy-500">
                          {bus.make} {bus.model} ({bus.year})
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-navy-800">Driver</div>
                        <div className="text-xs text-navy-500">{bus.driver.name}</div>
                      </div>
                      {bus.status === 'Maintenance' ? (
                        <span className="rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-800">
                          Maintenance
                        </span>
                      ) : assigned ? (
                        <div className="text-right">
                          <span className="rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-800">
                            On another route
                          </span>
                          <p className="mt-1 text-xs text-navy-500">{bus.assignedRouteName}</p>
                        </div>
                      ) : (
                        <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-800">
                          Available
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredBuses.length === 0 && (
            <div className="py-12 text-center">
              <Bus className="mx-auto mb-3 h-10 w-10 text-navy-300" />
              <h3 className="text-lg font-semibold text-navy-900">No registered buses match</h3>
              <p className="mt-1 text-navy-500">Register a bus first, then assign it here.</p>
            </div>
          )}
        </div>

        <div className="border-t border-navy-100 bg-navy-50/60 px-6 py-4 sm:px-8">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-navy-600">
              {selectedBuses.length > 0
                ? `${selectedBuses.length} bus${selectedBuses.length === 1 ? '' : 'es'} selected`
                : 'Select at least one registered bus'}
            </p>
            <div className="flex gap-3">
              <button type="button" onClick={onClose} className="btn-secondary">
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAssign}
                disabled={selectedBuses.length === 0}
                className={`btn-primary ${selectedBuses.length === 0 ? 'pointer-events-none opacity-50' : ''}`}
              >
                Assign {selectedBuses.length > 0 ? selectedBuses.length : ''} bus
                {selectedBuses.length === 1 ? '' : 'es'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
