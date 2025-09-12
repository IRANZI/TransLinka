"use client";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Check, Download, Share, Bell, Users, Phone, Mail } from 'lucide-react';
import QRCode from 'qrcode';

export default function BookingConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  

  const [bookingDetails, setBookingDetails] = useState({
    from: searchParams.get('from') || 'Remera',
    to: searchParams.get('to') || 'Masaka',
    date: searchParams.get('date') || 'Dec 15, 2024',
    passengers: parseInt(searchParams.get('passengers') || '1'),
    selectedSeats: searchParams.get('seats')?.split(',') || ['1A'],
    totalPrice: parseInt(searchParams.get('total') || '2300'),
    bookingReference: 'TL-2024-005'
  });

  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

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
          passenger: 'John Doe',
          departure: '08:30 AM',
          arrival: '01:00 PM'
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
    console.log('Downloading ticket...');
  };

  const handleShare = () => {
    console.log('Sharing ticket...');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src="/logo.png"
                alt="TransLinka Logo"
                className="h-8 w-8 object-contain mr-3"
              />
              <span className="text-xl font-heading font-bold text-gray-900">TransLinka</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 font-medium font-sans">
                Dashboard
              </Link>
              <Link href="/book-ticket" className="text-gray-600 hover:text-gray-900 font-medium font-sans">
                Book Ticket
              </Link>
              <Link href="/my-tickets" className="text-gray-600 hover:text-gray-900 font-medium font-sans">
                My Tickets
              </Link>
              <Link href="/ar-navigation" className="text-gray-600 hover:text-gray-900 font-medium font-sans">
                AR Navigation
              </Link>
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <Link href="/profile">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium font-sans">JD</span>
                </div>
              </div>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-full mx-auto px-6 sm:px-8 lg:px-12 py-8">
        
        <div className="bg-green-500 rounded-t-xl p-8 text-center text-white">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="text-2xl font-heading font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-green-100 font-sans">Your ticket has been successfully booked</p>
          
          <div className="mt-6 bg-green-600 rounded-lg p-4">
            <p className="text-sm text-green-100 font-sans mb-1">Booking Reference</p>
            <p className="text-xl font-bold font-sans">{bookingDetails.bookingReference}</p>
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
            <p className="text-sm text-blue-600 font-medium font-sans">Ready to board!</p>
            <p className="text-xs text-gray-500 font-sans">Show this QR code at the boarding gate</p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 mb-6">
            <button
              onClick={handleDownload}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center font-sans"
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
          <p className="text-sm text-gray-600 font-sans mb-4">City Express • Route 12</p>
          
          <div className="flex items-center justify-between mb-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 font-sans">08:30 AM</p>
              <p className="text-sm text-gray-600 font-sans">Departure</p>
            </div>
            <div className="flex-1 mx-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-2 text-xs text-gray-500 font-sans">2h 30m</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 font-sans">01:00PM</p>
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
              <span className="text-sm text-gray-900 font-sans">John Doe</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 text-gray-400 mr-3" />
              <span className="text-sm text-gray-900 font-sans">john@example.com</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 text-gray-400 mr-3" />
              <span className="text-sm text-gray-900 font-sans">+1 (555) 123-4567</span>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-blue-50 border-x border-gray-200 p-6 border-t">
          <h3 className="text-base font-heading font-semibold text-gray-900 mb-4">What's Next?</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
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
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center font-sans"
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
            className="flex items-center text-blue-600 hover:text-blue-700 font-sans"
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
