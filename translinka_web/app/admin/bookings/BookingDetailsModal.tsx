import React from 'react';

interface BookingDetailsModalProps {
  open: boolean;
  onClose: () => void;
}

const mockBooking = {
  id: 'TL-2024-001',
  name: 'John Doe',
  email: 'johndoe@gmail.com',
  phone: '+234 801 234 5678',
  bookingDate: '1/15/2024, 12:30:00 PM',
  route: 'Masaka - Remera',
  bus: 'City Express 1',
  departure: '1/20/2024 at 8:00',
  seats: 'A12, A13',
  amount: '12,000 Rwf',
  method: 'Card',
  transactionId: '17TX_2024_001',
  paymentStatus: 'completed',
  blockchainHash: 'bc4e2a6a8f9e1...',
  blockchainStatus: 'verified',
};

export default function BookingDetailsModal({ open, onClose }: BookingDetailsModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-8 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-lg font-semibold mb-1">Booking Details – {mockBooking.id}</h2>
        <div className="text-gray-600 text-sm mb-6">Complete Booking Information including payment</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Passenger Information */}
          <div>
            <h3 className="font-semibold mb-4">Passenger Information:</h3>
            <div className="mb-2"><span className="font-semibold">Name:</span> {mockBooking.name}</div>
            <div className="mb-2"><span className="font-semibold">Phone:</span> {mockBooking.phone}</div>
            <div className="mb-2"><span className="font-semibold">Email:</span> {mockBooking.email}</div>
            <div className="mb-2"><span className="font-semibold">Booking Date:</span> {mockBooking.bookingDate}</div>
          </div>
          {/* Trip Information */}
          <div>
            <h3 className="font-semibold mb-4">Trip Information:</h3>
            <div className="mb-2"><span className="font-semibold">Route:</span> {mockBooking.route}</div>
            <div className="mb-2"><span className="font-semibold">Bus:</span> {mockBooking.bus}</div>
            <div className="mb-2"><span className="font-semibold">Departure:</span> {mockBooking.departure}</div>
            <div className="mb-2"><span className="font-semibold">Seats:</span> {mockBooking.seats}</div>
          </div>
        </div>
        {/* Payment Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4">Payment Information:</h3>
            <div className="mb-2"><span className="font-semibold">Amount:</span> {mockBooking.amount}</div>
            <div className="mb-2"><span className="font-semibold">Method:</span> {mockBooking.method}</div>
            <div className="mb-2"><span className="font-semibold">Transaction ID:</span> {mockBooking.transactionId}</div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Status:</h3>
            <span className="inline-block bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-semibold mb-2">{mockBooking.paymentStatus}</span>
          </div>
        </div>
       
        
      </div>
    </div>
  );
}
