'use client';
import React, { useState, useEffect } from 'react';
import { 
  Ticket, 
  MapPin, 
  MessageCircle, 
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle,
  DollarSign,
  Menu,
  Bell,
  User,
  LogOut
} from 'lucide-react';
import Link from 'next/link';

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
  time: string;
  amount?: string;
}

export default function DashboardPage() {
  const [user] = useState({ name: 'John', email: 'john@example.com' });
  const [ticketStats] = useState<TicketStats>({ thisMonth: 12, changeFromLastMonth: 3 });
  const [recentActivities] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'trip',
      title: 'Trip to Downtown',
      subtitle: 'Yesterday',
      status: 'completed',
      time: 'Yesterday'
    },
    {
      id: '2',
      type: 'ticket',
      title: 'Kivu Express',
      subtitle: 'Tomorrow 8:30 AM',
      status: 'confirmed',
      time: 'Tomorrow 8:30 AM'
    },
    {
      id: '3',
      type: 'payment',
      title: 'Payment',
      subtitle: '$12.50',
      status: 'processed',
      time: 'Today',
      amount: '$12.50'
    }
  ]);

  const quickActions = [
    {
      icon: Ticket,
      title: 'Book Ticket',
      subtitle: 'Find and book trips',
      color: 'bg-blue-500',
      href: '/book-ticket'
    },
    {
      icon: Calendar,
      title: 'My Tickets',
      subtitle: 'Active & past tickets',
      color: 'bg-green-500',
      href: '/my-tickets'
    },
    {
      icon: MapPin,
      title: 'AR Navigation',
      subtitle: 'Find your bus',
      color: 'bg-purple-500',
      href: '/ar-navigation'
    },
    {
      icon: MessageCircle,
      title: 'AI Chatbot',
      subtitle: 'Instant help',
      color: 'bg-orange-500',
      href: '/chatbot'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'processed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'trip':
        return <MapPin className="w-4 h-4" />;
      case 'ticket':
        return <Ticket className="w-4 h-4" />;
      case 'payment':
        return <DollarSign className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
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
              <Link href="/dashboard" className="text-blue-600 font-medium font-sans">
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
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user.name.charAt(0)}
                  </span>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600 font-sans">Ready for your next Journey?</p>
        </div>

        {/* Stats Card */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 mb-8 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-heading font-medium mb-2">This Month</h2>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-heading font-bold">{ticketStats.thisMonth}</span>
                <span className="text-lg font-sans">Tickets</span>
              </div>
              <div className="flex items-center mt-2 text-blue-100">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm font-sans">+{ticketStats.changeFromLastMonth} from last month</span>
              </div>
            </div>
            <button className="p-2 hover:bg-blue-400 rounded-lg transition-colors">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-heading font-semibold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  href={action.href}
                  className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow group"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`${action.color} p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-gray-900 mb-1">{action.title}</h3>
                      <p className="text-sm text-gray-600 font-sans">{action.subtitle}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-heading font-semibold text-gray-900">Recent Activity</h2>
              <Link href="/activity" className="text-sm text-blue-600 hover:text-blue-700">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="bg-white rounded-lg p-4 shadow-sm border">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        {getActivityIcon(activity.type)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900 font-sans">JD</span>
                        <p className="text-sm font-medium text-gray-900 font-sans">{activity.title}</p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                          {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 font-sans">{activity.subtitle}</p>
                      {activity.amount && (
                        <p className="text-sm font-medium text-gray-900 mt-1 font-sans">{activity.amount}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
