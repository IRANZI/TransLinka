import React from 'react';
import { X } from 'lucide-react';

interface BookingDetailsModalProps {
  open: boolean;
  onClose: () => void;
  booking: any | null;
}

export default function BookingDetailsModal({ open, onClose, booking }: BookingDetailsModalProps) {
  if (!open || !booking) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-navy-950/50 p-0 sm:items-center sm:p-4">
      <div className="relative max-h-[92svh] w-full overflow-y-auto rounded-t-3xl bg-white p-6 shadow-lift sm:max-w-3xl sm:rounded-2xl sm:p-8">
        <button
          type="button"
          className="absolute right-4 top-4 rounded-full p-2 text-navy-400 hover:bg-navy-50 hover:text-navy-800"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        <h2 className="text-xl font-bold text-navy-900">Booking {booking.reference || booking.id}</h2>
        <p className="mt-1 text-sm text-navy-500">Passenger, trip, and payment details</p>
        <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-3 font-semibold text-navy-900">Passenger</h3>
            <p className="mb-2 text-sm text-navy-700"><span className="font-medium">Name:</span> {booking.passenger}</p>
            <p className="mb-2 text-sm text-navy-700"><span className="font-medium">Phone:</span> {booking.phone || '—'}</p>
            <p className="mb-2 text-sm text-navy-700"><span className="font-medium">Email:</span> {booking.email || '—'}</p>
            <p className="text-sm text-navy-700"><span className="font-medium">Booked:</span> {booking.bookedAt || '—'}</p>
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-navy-900">Trip</h3>
            <p className="mb-2 text-sm text-navy-700"><span className="font-medium">Route:</span> {booking.route}</p>
            <p className="mb-2 text-sm text-navy-700"><span className="font-medium">Bus:</span> {booking.bus}</p>
            <p className="mb-2 text-sm text-navy-700"><span className="font-medium">Departure:</span> {booking.date}</p>
            <p className="text-sm text-navy-700"><span className="font-medium">Seats:</span> {booking.seats}</p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-8 border-t border-navy-100 pt-6 md:grid-cols-2">
          <div>
            <h3 className="mb-3 font-semibold text-navy-900">Payment</h3>
            <p className="mb-2 text-sm text-navy-700"><span className="font-medium">Amount:</span> {booking.amount}</p>
            <p className="mb-2 text-sm text-navy-700"><span className="font-medium">Method:</span> {booking.method || booking.paymentStatus}</p>
            <p className="text-sm text-navy-700"><span className="font-medium">Transaction:</span> {booking.transactionId || '—'}</p>
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-navy-900">Status</h3>
            <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-800">
              {booking.status} · {booking.paymentStatus}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
