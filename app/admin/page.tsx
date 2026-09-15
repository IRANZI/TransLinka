'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Bus,
  Calendar,
  MapPin,
  TrendingUp,
  Users,
} from 'lucide-react';
import AdminHeader from '@/components/AdminHeader';
import { api } from '@/lib/api';

export default function AdminDashboard() {
  const [adminData, setAdminData] = useState({
    totalRevenue: '0 Rwf',
    revenueChange: 'From confirmed payments',
    totalBookings: '0',
    bookingsChange: 'All company bookings',
    activeUsers: '0',
    usersChange: 'Travelers on this fleet',
    activeBuses: '0',
    busesChange: 'Across the active fleet',
  });
  const [recentBookings, setRecentBookings] = useState<any[]>([]);

  useEffect(() => {
    api<any>('/api/admin/overview').then((data) => {
      setAdminData({
        totalRevenue: data.totalRevenue,
        revenueChange: 'From confirmed payments',
        totalBookings: data.totalBookings,
        bookingsChange: 'All company bookings',
        activeUsers: data.activeUsers,
        usersChange: 'Travelers on this fleet',
        activeBuses: data.activeBuses,
        busesChange: 'Across the active fleet',
      });
      setRecentBookings(data.recentBookings || []);
    }).catch(() => undefined);
  }, []);

  const quickActions = [
    { href: '/admin/bus-management', icon: Bus, title: 'Add a bus', subtitle: 'Register a coach in the fleet' },
    { href: '/admin/route-management', icon: MapPin, title: 'Add a route', subtitle: 'Set origin, stops and fare' },
    { href: '/admin/bookings', icon: Calendar, title: 'View bookings', subtitle: 'Payments and passenger lists' },
    { href: '/admin/bus-management', icon: Users, title: 'Fleet drivers', subtitle: 'See assigned drivers' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-emerald-50 text-emerald-800';
      case 'Pending':
        return 'bg-amber-50 text-amber-800';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-800';
      default:
        return 'bg-navy-50 text-navy-700';
    }
  };

  const stats = [
    { label: 'Total revenue', value: adminData.totalRevenue, hint: adminData.revenueChange, icon: TrendingUp },
    { label: 'Bookings', value: adminData.totalBookings, hint: adminData.bookingsChange, icon: Calendar },
    { label: 'Active travelers', value: adminData.activeUsers, hint: adminData.usersChange, icon: Users },
    { label: 'Active buses', value: adminData.activeBuses, hint: adminData.busesChange, icon: Bus },
  ];

  return (
    <div className="min-h-screen bg-navy-50">
      <AdminHeader />

      <main className="page-wrap py-6 sm:py-8 lg:py-10">
        <section className="relative overflow-hidden rounded-3xl bg-navy-950 px-5 py-7 text-white shadow-lift sm:px-8 sm:py-9 lg:px-10">
          <img
            src="/illustrations/hero-bus-3d.png"
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/80 to-navy-950/35" />
          <div className="relative max-w-2xl">
            <p className="text-label text-navy-200">Company admin</p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl lg:text-5xl">Fleet overview</h1>
            <p className="mt-3 max-w-xl text-body-lg text-white/75">
              Track revenue, buses, and bookings in the same layout travelers already use.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/admin/bus-management" className="btn-primary bg-white text-navy-900 hover:bg-navy-50">
                Manage buses
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/admin/bookings"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Open bookings
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-navy-100 bg-white p-5 shadow-soft">
              <div className="flex items-center justify-between">
                <p className="text-sm text-navy-500">{stat.label}</p>
                <stat.icon className="h-4 w-4 text-navy-500" />
              </div>
              <p className="mt-2 text-2xl font-bold text-navy-900">{stat.value}</p>
              <p className="mt-1 text-sm text-emerald-700">{stat.hint}</p>
            </div>
          ))}
        </section>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-navy-900 sm:text-2xl">Recent bookings</h2>
              <Link href="/admin/bookings" className="text-sm font-medium text-navy-700 hover:underline">
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="rounded-2xl border border-navy-100 bg-white p-4 shadow-soft">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold text-navy-900">{booking.passenger}</p>
                      <p className="mt-1 text-sm text-navy-600">
                        {booking.route} · {booking.bookingRef}
                      </p>
                      <p className="text-sm text-navy-500">Departure {booking.departure}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                      <p className="font-semibold text-navy-900">{booking.amount}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-semibold text-navy-900">Quick actions</h2>
            <div className="grid grid-cols-1 gap-3">
              {quickActions.map((action) => (
                <Link
                  key={action.title}
                  href={action.href}
                  className="group rounded-2xl border border-navy-100 bg-white p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-navy-700 p-2.5 text-white transition group-hover:bg-navy-800">
                      <action.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy-900">{action.title}</h3>
                      <p className="mt-0.5 text-sm text-navy-600">{action.subtitle}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
