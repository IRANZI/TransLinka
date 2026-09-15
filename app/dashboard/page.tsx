'use client';
import React, { useState, useEffect } from 'react';
import {
  Ticket,
  MapPin,
  MessageCircle,
  Calendar,
  TrendingUp,
  Clock,
  ArrowRight,
  Navigation,
} from 'lucide-react';
import Link from 'next/link';
import AppHeader from '@/components/AppHeader';
import { api } from '@/lib/api';
import { useAuth } from '@/components/AuthProvider';

interface TicketStats {
  thisMonth: number;
  changeFromLastMonth: number;
}

interface RecentActivity {
  id: string;
  type: 'trip' | 'ticket' | 'payment';
  title: string;
  subtitle: string;
  status: 'completed' | 'confirmed' | 'processed';
  amount?: string;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [ticketStats, setTicketStats] = useState<TicketStats>({ thisMonth: 0, changeFromLastMonth: 0 });
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);

  const [upcoming, setUpcoming] = useState<any | null>(null);

  useEffect(() => {
    api<{ bookings: any[] }>('/api/bookings')
      .then((data) => {
        const bookings = data.bookings || [];
        setTicketStats({ thisMonth: bookings.length, changeFromLastMonth: bookings.length });
        setRecentActivities(
          bookings.slice(0, 5).map((booking) => ({
            id: booking.id,
            type: 'ticket' as const,
            title: `${booking.origin} → ${booking.destination}`,
            subtitle: `${booking.reference} · ${booking.status}`,
            status: booking.status === 'CONFIRMED' ? 'confirmed' : 'completed',
            amount: `${booking.amount.toLocaleString()} Rwf`,
          }))
        );
        const nextTrip = bookings.find((booking) => booking.status === 'CONFIRMED' || booking.status === 'PENDING');
        setUpcoming(nextTrip || null);
      })
      .catch(() => undefined);
  }, []);

  const quickActions = [
    {
      icon: Ticket,
      title: 'Book ticket',
      subtitle: 'Search routes and reserve a seat',
      href: '/book-ticket',
    },
    {
      icon: Calendar,
      title: 'My tickets',
      subtitle: 'Active, upcoming and past trips',
      href: '/my-tickets',
    },
    {
      icon: MapPin,
      title: 'AR navigation',
      subtitle: 'Find your bus at the station',
      href: '/ar-navigation',
    },
    {
      icon: MessageCircle,
      title: 'Travel support',
      subtitle: 'Ask Linka for schedules and help',
      href: '/chat-support',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-50 text-emerald-800';
      case 'confirmed':
        return 'bg-navy-100 text-navy-800';
      default:
        return 'bg-navy-50 text-navy-700';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'trip':
        return <MapPin className="h-4 w-4" />;
      case 'ticket':
        return <Ticket className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-navy-50">
      <AppHeader userInitial={(user?.firstName || 'T').charAt(0)} />

      <main className="page-wrap py-6 sm:py-8 lg:py-10">
        <section className="relative overflow-hidden rounded-3xl bg-navy-950 px-5 py-7 text-white shadow-lift sm:px-8 sm:py-9 lg:px-10">
          <img
            src="/illustrations/hero-bus-3d.png"
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/80 to-navy-950/35" />
          <div className="relative max-w-2xl">
            <p className="text-label text-navy-200">Traveler dashboard</p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl lg:text-5xl">
              Welcome back, {user?.firstName || 'traveler'}
            </h1>
            <p className="mt-3 max-w-xl text-body-lg text-white/75">
              {upcoming
                ? 'Your next coach is confirmed. Track it live, keep the QR ticket ready, or book another seat in seconds.'
                : 'Book a coach, keep your QR ticket, and track your trip from here.'}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/book-ticket" className="btn-primary bg-white text-navy-900 hover:bg-navy-50">
                Book a ticket
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/my-tickets"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                View tickets
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-soft">
            <p className="text-sm text-navy-500">Tickets this month</p>
            <div className="mt-2 flex items-end gap-2">
              <span className="text-3xl font-bold text-navy-900">{ticketStats.thisMonth}</span>
              <span className="mb-1 text-sm text-navy-500">trips</span>
            </div>
            <p className="mt-2 flex items-center text-sm text-emerald-700">
              <TrendingUp className="mr-1 h-4 w-4" />
              +{ticketStats.changeFromLastMonth} from last month
            </p>
          </div>
          <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-soft">
            <p className="text-sm text-navy-500">Upcoming trip</p>
            {upcoming ? (
              <Link href={`/booking-confirmation?reference=${encodeURIComponent(upcoming.reference)}`}>
                <p className="mt-2 text-xl font-bold text-navy-900">
                  {upcoming.origin} → {upcoming.destination}
                </p>
                <p className="mt-1 text-sm text-navy-600">
                  {new Date(upcoming.travelDate).toLocaleDateString()} · {upcoming.departureTime} · Seat {(upcoming.seats || []).join(', ')}
                </p>
              </Link>
            ) : (
              <>
                <p className="mt-2 text-xl font-bold text-navy-900">No trip yet</p>
                <p className="mt-1 text-sm text-navy-600">Book a ticket to see it here</p>
              </>
            )}
          </div>
          <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-soft">
            <p className="text-sm text-navy-500">Live support</p>
            <p className="mt-2 text-xl font-bold text-navy-900">Linka is online</p>
            <Link href="/chat-support" className="mt-2 inline-flex text-sm font-semibold text-navy-700 hover:underline">
              Ask a question
            </Link>
          </div>
        </section>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-navy-900 sm:text-2xl">Quick actions</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {quickActions.map((action) => (
                <Link
                  key={action.title}
                  href={action.href}
                  className="group rounded-2xl border border-navy-100 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
                >
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-navy-700 p-3 text-white transition group-hover:bg-navy-800">
                      <action.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-navy-900">{action.title}</h3>
                      <p className="mt-1 text-sm text-navy-600 sm:text-base">{action.subtitle}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-navy-900">Recent activity</h2>
              <Link href="/my-tickets" className="text-sm font-medium text-navy-700 hover:underline">
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="rounded-2xl border border-navy-100 bg-white p-4 shadow-soft">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-50 text-navy-700">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-semibold text-navy-900">{activity.title}</p>
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${getStatusColor(activity.status)}`}>
                          {activity.status}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-navy-600">{activity.subtitle}</p>
                      {activity.amount && (
                        <p className="mt-1 text-sm font-medium text-navy-900">{activity.amount}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/ar-navigation"
              className="mt-4 flex items-center justify-between rounded-2xl bg-navy-900 p-4 text-white shadow-soft"
            >
              <div>
                <p className="text-sm text-navy-200">Station arrival</p>
                <p className="font-semibold">Open AR navigation</p>
              </div>
              <Navigation className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
