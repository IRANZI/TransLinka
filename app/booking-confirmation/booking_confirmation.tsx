"use client";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Check, Download, Share, Users, Phone, Mail } from 'lucide-react';
import QRCode from 'qrcode';
import AppHeader from '@/components/AppHeader';
import { api } from '@/lib/api';
import { useAuth } from '@/components/AuthProvider';

export default function BookingConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const reference = searchParams.get('reference') || '';

  const [bookingDetails, setBookingDetails] = useState({
    from: searchParams.get('from') || 'Remera',
    to: searchParams.get('to') || 'Masaka',
    date: searchParams.get('date') || '',
    passengers: parseInt(searchParams.get('passengers') || '1'),
    selectedSeats: searchParams.get('seats')?.split(',').filter(Boolean) || [],
    totalPrice: parseInt(searchParams.get('total') || '0'),
    bookingReference: reference || 'Pending',
    method: searchParams.get('method') || '',
    transactionId: searchParams.get('transactionId') || '',
    company: '',
    routeName: '',
    departureTime: '',
    arrivalTime: '',
    duration: '',
    passengerName: '',
    email: '',
    phone: '',
  });

  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  useEffect(() => {
    if (!reference) return;
    api<{ booking: any }>(`/api/bookings?reference=${encodeURIComponent(reference)}`)
      .then(({ booking }) => {
        if (!booking) return;
        setBookingDetails({
          from: booking.origin,
          to: booking.destination,
          date: new Date(booking.travelDate).toLocaleDateString(),
          passengers: booking.passengers,
          selectedSeats: booking.seats || [],
          totalPrice: booking.amount,
          bookingReference: booking.reference,
          method: booking.payment?.method || '',
          transactionId: booking.payment?.transactionId || '',
          company: booking.company?.name || 'TransLinka',
          routeName: booking.route?.name || '',
          departureTime: booking.departureTime || '',
          arrivalTime: booking.arrivalTime || '',
          duration: booking.route?.duration || '',
          passengerName: `${booking.user?.firstName || ''} ${booking.user?.lastName || ''}`.trim(),
          email: booking.user?.email || '',
          phone: booking.user?.phone || '',
        });
      })
      .catch(() => undefined);
  }, [reference]);

  useEffect(() => {
    // Generating QR code 
    const generateQRCode = async () => {
      try {
        const qrData = JSON.stringify({
          reference: bookingDetails.bookingReference,
          from: bookingDetails.from,
          to: bookingDetails.to,
          date: bookingDetails.date,
          seats: bookingDetails.selectedSeats,
          passenger: user ? `${user.firstName} ${user.lastName}` : 'Traveler',
          amount: bookingDetails.totalPrice,
          transactionId: bookingDetails.transactionId,
        });
        
        const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
          width: 200,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        });
        
        setQrCodeUrl(qrCodeDataUrl);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQRCode();
  }, [bookingDetails]);

  const handleDownload = () => {
    const payload = [
      `TransLinka ticket`,
      `Reference: ${bookingDetails.bookingReference}`,
      `Route: ${bookingDetails.from} → ${bookingDetails.to}`,
      `Date: ${bookingDetails.date}`,
      `Seats: ${bookingDetails.selectedSeats.join(', ')}`,
      `Amount: ${bookingDetails.totalPrice.toLocaleString()} Rwf`,
      bookingDetails.transactionId ? `Transaction: ${bookingDetails.transactionId}` : '',
    ].filter(Boolean).join('\n');
    const blob = new Blob([payload], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${bookingDetails.bookingReference || 'ticket'}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const text = `TransLinka ticket ${bookingDetails.bookingReference}: ${bookingDetails.from} → ${bookingDetails.to}`;
    if (navigator.share) {
      await navigator.share({ title: 'TransLinka ticket', text });
      return;
    }
    await navigator.clipboard.writeText(text);
    alert('Ticket details copied.');
  };

  return (
    <div className="min-h-screen bg-navy-50">
      <AppHeader />

      {/* Main Content */}
      <main className="page-wrap py-6 sm:py-8">
        
        <div className="bg-green-500 rounded-t-xl p-8 text-center text-white">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="text-2xl font-heading font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-green-100 font-sans">Your ticket has been successfully booked</p>
          
          <div className="mt-6 bg-green-600 rounded-lg p-4">
            <p className="text-sm text-green-100 font-sans mb-1">Booking Reference</p>
            <p className="text-xl font-bold font-sans">{bookingDetails.bookingReference}</p>
            {bookingDetails.method && (
              <p className="mt-2 text-sm text-green-100 font-sans">
                Paid with {bookingDetails.method}
                {bookingDetails.transactionId ? ` · ${bookingDetails.transactionId}` : ""}
              </p>
            )}
          </div>
        </div>

     
        <div className="bg-white border-x border-gray-200 p-6">
          <h2 className="text-lg font-heading font-semibold text-gray-900 mb-4">Your Boarding Pass</h2>
          
          {/* QR Code */}
          <div className="flex justify-center mb-6">
            {qrCodeUrl ? (
              <div className="w-32 h-32 bg-white rounded-lg p-2 border border-gray-200">
                <img 
                  src={qrCodeUrl} 
                  alt="Booking QR Code" 
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-xs">Loading...</span>
              </div>
            )}
          </div>

          <div className="text-center mb-6">
            <p className="text-sm text-navy-600 font-medium font-sans">Ready to board!</p>
            <p className="text-xs text-gray-500 font-sans">Show this QR code at the boarding gate</p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 mb-6">
            <button
              onClick={handleDownload}
              className="flex-1 bg-navy-600 text-white py-3 rounded-lg font-medium hover:bg-navy-700 transition-colors flex items-center justify-center font-sans"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </button>
            <button
              onClick={handleShare}
              className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center font-sans"
            >
              <Share className="w-4 h-4 mr-2" />
              Share
            </button>
          </div>
        </div>

        {/* Trip Details */}
        <div className="bg-white border-x border-gray-200 p-6 border-t">
          <h3 className="text-lg font-heading font-semibold text-gray-900 mb-4">
            {bookingDetails.from} → {bookingDetails.to}
          </h3>
          <p className="text-sm text-gray-600 font-sans mb-4">
            {bookingDetails.company || 'TransLinka'}{bookingDetails.routeName ? ` • ${bookingDetails.routeName}` : ''}
          </p>
          
          <div className="flex items-center justify-between mb-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 font-sans">{bookingDetails.departureTime || '—'}</p>
              <p className="text-sm text-gray-600 font-sans">Departure</p>
            </div>
            <div className="flex-1 mx-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-2 text-xs text-gray-500 font-sans">{bookingDetails.duration || 'Trip'}</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 font-sans">{bookingDetails.arrivalTime || '—'}</p>
              <p className="text-sm text-gray-600 font-sans">Arrival</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600 font-sans">Date</p>
              <p className="font-medium text-gray-900 font-sans">{bookingDetails.date}</p>
            </div>
            <div>
              <p className="text-gray-600 font-sans">Seat</p>
              <p className="font-medium text-gray-900 font-sans">{bookingDetails.selectedSeats.join(', ')}</p>
            </div>
          </div>
        </div>

        {/* Passenger Information */}
        <div className="bg-white border-x border-gray-200 p-6 border-t">
          <h3 className="text-base font-heading font-semibold text-gray-900 mb-4">Passenger Information</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <Users className="w-4 h-4 text-gray-400 mr-3" />
              <span className="text-sm text-gray-900 font-sans">
                {bookingDetails.passengerName || (user ? `${user.firstName} ${user.lastName}` : 'Traveler')}
              </span>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 text-gray-400 mr-3" />
              <span className="text-sm text-gray-900 font-sans">{bookingDetails.email || user?.email || '—'}</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 text-gray-400 mr-3" />
              <span className="text-sm text-gray-900 font-sans">{bookingDetails.phone || user?.phone || '—'}</span>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-navy-50 border-x border-gray-200 p-6 border-t">
          <h3 className="text-base font-heading font-semibold text-gray-900 mb-4">What's Next?</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-6 h-6 bg-navy-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 font-sans">Check your email</p>
                <p className="text-xs text-gray-600 font-sans">We've sent you a copy and booking details</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 font-sans">Arrive 15 minutes early</p>
                <p className="text-xs text-gray-600 font-sans">Be at the bus stop 15 min before departure</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-white text-xs font-bold">3</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 font-sans">Arrive 15 minutes early</p>
                <p className="text-xs text-gray-600 font-sans">Be at the bus stop 15 min before departure</p>
              </div>
            </div>
          </div>
        </div>

        {/* View My Tickets Button */}
        <div className="bg-white rounded-b-xl border-x border-b border-gray-200 p-6">
          <Link
            href="/my-tickets"
            className="w-full bg-navy-600 text-white py-4 rounded-lg font-medium hover:bg-navy-700 transition-colors flex items-center justify-center font-sans"
          >
            View My Tickets
          </Link>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="flex items-center text-gray-600 hover:text-gray-900 font-sans"
          >
            <span className="text-sm">Dashboard</span>
          </Link>
          <Link
            href="/book-ticket"
            className="flex items-center text-navy-600 hover:text-navy-700 font-sans"
          >
            <span className="text-sm">Book Another</span>
          </Link>
        </div>

        {/* Support Section */}
        <div className="mt-8 bg-white rounded-xl border p-6 text-center">
          <h3 className="text-base font-heading font-semibold text-gray-900 mb-2">Need Help?</h3>
          <p className="text-sm text-gray-600 font-sans mb-4">Contact our support team if you have any questions</p>
          <div className="flex space-x-3">
            <Link href="/chat-support" className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors font-sans text-center">
              Chat Support
            </Link>
            <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors font-sans">
              Call Us
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
