import React from 'react';

interface BusDetailsModalProps {
  open: boolean;
  onClose: () => void;
}

const mockBus = {
  name: 'City Express 1',
  plate: 'RAC 123 B',
  type: 'Coach',
  capacity: 50,
  status: 'Active',
  operator: 'TransLinka',
  route: 'Masaka - Remera',
  driver: 'John Driver',
  phone: '+250 788 123 456',
  lastService: '1/10/2025',
  nextService: '2/10/2025',
  seatsAvailable: 12,
};

export default function BusDetailsModal({ open, onClose }: BusDetailsModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-lg font-semibold mb-1">{mockBus.name} – Bus Details</h2>
        <div className="text-gray-600 text-sm mb-6">Complete bus information and operational status</div>
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <div className="font-bold">Plate Number:</div>
            <div>{mockBus.plate}</div>
          </div>
          <div>
            <div className="font-bold">Type:</div>
            <div>{mockBus.type}</div>
          </div>
          <div>
            <div className="font-bold">Capacity:</div>
            <div>{mockBus.capacity}</div>
          </div>
          <div>
            <div className="font-bold">Status:</div>
            <div>{mockBus.status}</div>
          </div>
          <div>
            <div className="font-bold">Operator:</div>
            <div>{mockBus.operator}</div>
          </div>
          <div>
            <div className="font-bold">Route:</div>
            <div>{mockBus.route}</div>
          </div>
          <div>
            <div className="font-bold">Driver:</div>
            <div>{mockBus.driver}</div>
          </div>
          <div>
            <div className="font-bold">Driver Phone:</div>
            <div>{mockBus.phone}</div>
          </div>
          <div>
            <div className="font-bold">Last Service:</div>
            <div>{mockBus.lastService}</div>
          </div>
          <div>
            <div className="font-bold">Next Service:</div>
            <div>{mockBus.nextService}</div>
          </div>
          <div>
            <div className="font-bold">Seats Available:</div>
            <div>{mockBus.seatsAvailable}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
