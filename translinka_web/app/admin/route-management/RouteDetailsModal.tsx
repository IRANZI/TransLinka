import React from 'react';

interface RouteDetailsModalProps {
  open: boolean;
  onClose: () => void;
}

const mockRoute = {
  name: 'City Express',
  distance: '750 km',
  duration: '12 hours',
  price: '1150 Rwf',
  frequency: 'Daily',
  stops: [
    { name: 'Kumurindi', time: '06:00', note: '1st Stop', color: 'bg-blue-500', text: 'text-blue-600', dot: 'bg-blue-500' },
    { name: 'Free Zone', time: '08:00', note: '2nd Stop', color: 'bg-black', text: 'text-black', dot: 'bg-black', sub: '2 min stop' },
    { name: 'KIM University', time: '13:00', note: '3rd Stop', color: 'bg-blue-500', text: 'text-blue-600', dot: 'bg-blue-500' },
  ],
};

export default function RouteDetailsModal({ open, onClose }: RouteDetailsModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-8 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-lg font-semibold mb-1">{mockRoute.name} – Route Details</h2>
        <div className="text-gray-600 text-sm mb-6">Complete route information with all stops and timings</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div>
            <div className="font-bold">Distance:</div>
            <div>{mockRoute.distance}</div>
          </div>
          <div>
            <div className="font-bold">Duration:</div>
            <div>{mockRoute.duration}</div>
          </div>
          <div>
            <div className="font-bold">Price:</div>
            <div>{mockRoute.price}</div>
          </div>
          <div>
            <div className="font-bold">Frequency:</div>
            <div>{mockRoute.frequency}</div>
          </div>
        </div>
        <div>
          <div className="font-bold mb-4">Route Timeline:</div>
          <div className="space-y-8">
            {mockRoute.stops.map((stop, idx) => (
              <div key={stop.name} className="flex items-center">
                <div className="flex flex-col items-center mr-6">
                  <div className={`w-4 h-4 rounded-full ${stop.dot} mb-1`}></div>
                  {idx < mockRoute.stops.length - 1 && (
                    <div className="w-1 h-10 bg-gray-300"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className={`font-semibold ${stop.text}`}>{stop.name}</div>
                  <div className="text-xs text-gray-500">{stop.note}</div>
                  {stop.sub && <div className="text-xs text-gray-400">{stop.sub}</div>}
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
