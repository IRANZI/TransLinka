import React from 'react';

interface RouteDetailsModalProps {
  open: boolean;
  onClose: () => void;
  route: any | null;
}

export default function RouteDetailsModal({ open, onClose, route }: RouteDetailsModalProps) {
  if (!open || !route) return null;

  const stopNames = String(route.stops || '')
    .split(/[,\n]/)
    .map((item: string) => item.trim())
    .filter(Boolean);
  const stops = [
    { name: route.origin, time: route.departureTime || '08:30', note: 'Origin' },
    ...stopNames.map((name: string, index: number) => ({
      name,
      time: '',
      note: `Stop ${index + 1}`,
    })),
    { name: route.destination, time: route.arrivalTime || '13:00', note: 'Destination' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-8 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-lg font-semibold mb-1">{route.name} – Route Details</h2>
        <div className="text-gray-600 text-sm mb-6">
          {route.origin} → {route.destination}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div>
            <div className="font-bold">Distance:</div>
            <div>{route.distance || route.distanceKm || '—'}</div>
          </div>
          <div>
            <div className="font-bold">Duration:</div>
            <div>{route.duration || '—'}</div>
          </div>
          <div>
            <div className="font-bold">Price:</div>
            <div>{route.price}</div>
          </div>
          <div>
            <div className="font-bold">Frequency:</div>
            <div>{route.frequency || 'Daily'}</div>
          </div>
        </div>
        <div>
          <div className="font-bold mb-4">Route Timeline:</div>
          <div className="space-y-8">
            {stops.map((stop, idx) => (
              <div key={`${stop.name}-${idx}`} className="flex items-center">
                <div className="flex flex-col items-center mr-6">
                  <div className="w-4 h-4 rounded-full bg-navy-500 mb-1"></div>
                  {idx < stops.length - 1 && <div className="w-1 h-10 bg-gray-300"></div>}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-navy-900">{stop.name}</div>
                  <div className="text-xs text-gray-500">{stop.note}</div>
                </div>
                <div className="ml-auto font-bold text-lg">{stop.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
