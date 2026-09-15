'use client';
import React from 'react';
import { Camera, MapPin, Navigation, Clock, Zap, Target } from 'lucide-react';
import AppHeader from '@/components/AppHeader';
import { api } from '@/lib/api';

export default function ARNavigationPage() {
  const [showCamera, setShowCamera] = React.useState(false);
  const [cameraError, setCameraError] = React.useState<string | null>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [trip, setTrip] = React.useState<any | null>(null);

  React.useEffect(() => {
    api<{ bookings: any[] }>('/api/bookings')
      .then((data) => {
        const next = (data.bookings || []).find(
          (booking) => booking.status === 'CONFIRMED' || booking.status === 'PENDING'
        );
        setTrip(next || null);
      })
      .catch(() => setTrip(null));
  }, []);

  const handleStartCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setShowCamera(true);
      }
    } catch {
      setCameraError('Unable to access camera. Please check permissions or try a different device.');
    }
  };

  const routeName = trip?.route?.name || trip?.origin || 'No upcoming trip';
  const companyName = trip?.company?.name || 'Book a ticket to start AR navigation';
  const heading = trip ? `${trip.origin} → ${trip.destination}` : 'No upcoming trip';

  return (
    <div className="min-h-screen bg-navy-50">
      <AppHeader />

      <main className="page-wrap py-6 sm:py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-heading font-bold text-gray-900 mb-2">AR Navigation</h1>
          <p className="text-gray-600 font-sans">
            {trip ? `${routeName} • ${companyName}` : 'Book a confirmed trip to follow it here'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-heading font-semibold text-gray-900 mb-1">{heading}</h2>
                  <p className="text-gray-600 font-sans">
                    {trip
                      ? `${companyName} · Seat ${(trip.seats || []).join(', ') || 'TBD'} · ${trip.departureTime}`
                      : 'Your next confirmed coach will appear here'}
                  </p>
                </div>
                <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 font-sans">
                  {trip ? trip.status : 'Idle'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="w-10 h-10 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <MapPin className="w-5 h-5 text-navy-600" />
                  </div>
                  <div className="text-xs text-gray-500 font-sans mb-1">Gate</div>
                  <div className="text-sm font-medium text-gray-900 font-sans">{trip?.gate || '—'}</div>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Clock className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-xs text-gray-500 font-sans mb-1">ETA</div>
                  <div className="text-sm font-medium text-gray-900 font-sans">{trip?.arrivalTime || '—'}</div>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Zap className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="text-xs text-gray-500 font-sans mb-1">Date</div>
                  <div className="text-sm font-medium text-gray-900 font-sans">
                    {trip ? new Date(trip.travelDate).toLocaleDateString() : '—'}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 font-sans">Boarding point</h3>
                  <p className="text-xs text-gray-500 font-sans">
                    {trip ? `Head to ${trip.origin} and show your QR ticket at ${trip.gate || 'the gate'}` : 'No live coach yet'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 font-sans">{trip?.reference || ''}</p>
                </div>
              </div>
            </div>

            <div className="bg-navy-50 rounded-xl p-6">
              <div className="flex items-center mb-3">
                <div className="w-6 h-6 bg-yellow-400 rounded flex items-center justify-center mr-2">
                  <span className="text-xs font-bold text-yellow-800">💡</span>
                </div>
                <h3 className="text-base font-heading font-semibold text-navy-900">Pro Tips</h3>
              </div>
              <div className="space-y-2 text-sm text-navy-800 font-sans">
                <p>• Point your camera towards the street</p>
                <p>• Look for the blue AR markers</p>
                <p>• Follow the directional arrows</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-navy-500 rounded-full flex items-center justify-center mx-auto mb-4">
                {showCamera ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="rounded-xl w-20 h-20 object-cover border-2 border-navy-400"
                  />
                ) : (
                  <Camera className="w-10 h-10 text-white" />
                )}
              </div>
              <h2 className="text-xl font-heading font-semibold text-gray-900 mb-2">AR Navigation</h2>
              <p className="text-gray-600 font-sans">
                Use augmented reality to find your bus in real-time with live directions and distance tracking.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-navy-100 rounded-full flex items-center justify-center">
                  <Target className="w-4 h-4 text-navy-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 font-sans">Real-time bus tracking</h4>
                  <p className="text-xs text-gray-500 font-sans">See exactly where your bus is</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Navigation className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 font-sans">AR direction arrows</h4>
                  <p className="text-xs text-gray-500 font-sans">Follow visual guides to your bus</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 font-sans">Live arrival times</h4>
                  <p className="text-xs text-gray-500 font-sans">Get accurate ETA updates</p>
                </div>
              </div>
            </div>

            <button
              className="w-full bg-navy-500 text-white py-4 px-6 rounded-xl hover:bg-navy-600 transition-colors font-medium text-lg font-sans flex items-center justify-center space-x-3"
              onClick={handleStartCamera}
              disabled={showCamera}
            >
              <Camera className="w-5 h-5" />
              <span>{showCamera ? 'Camera Active' : 'Start AR Navigation'}</span>
            </button>
            {cameraError && <div className="mt-4 text-red-600 text-center text-sm">{cameraError}</div>}
          </div>
        </div>
      </main>
    </div>
  );
}
